/**
 * Вставляет предрендеренный HTML в dist/index.html.
 *
 * Запускается после двух сборок:
 *   vite build                      → dist/ (клиент)
 *   vite build --ssr src/entry-server.tsx --outDir dist-ssr
 *   node scripts/prerender.mjs      → dist/index.html с готовой разметкой
 *
 * Что делает:
 * 1. Берёт готовую разметку из dist-ssr/entry-server.js.
 * 2. Кладёт её внутрь <div id="root"> вместо пустого места.
 * 3. Убирает блок <noscript> — он больше не нужен, текст и так в HTML.
 *
 * Клиентский React при загрузке заменит эту разметку своей (createRoot).
 * Для посетителя разницы нет, для поисковика — есть: контент виден сразу.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const INDEX = path.join(DIST, 'index.html');


/**
 * Подставляет title, description, canonical, og и JSON-LD FAQ для посадочной страницы.
 * Без этого все страницы отдавали бы мета-теги главной и канонизировались на неё.
 */
function applyHead(html, page) {
  const url = `https://ust38.ru/${page.slug}/`;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url + '#webpage', url, name: page.h1, description: page.description, isPartOf: { '@id': 'https://ust38.ru/#website' } },
      { '@type': 'FAQPage', mainEntity: page.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://ust38.ru/' },
        { '@type': 'ListItem', position: 2, name: page.h1, item: url } ] },
    ],
  };
  // Главный JSON-LD (LegalService) оставляем, а страничный добавляем вторым блоком
  html = html.replace('</head>', `<script type="application/ld+json" id="seo-page-ld">${JSON.stringify(ld)}</script>\n  </head>`);
  return html;
}


/** Читает seoPages.ts без сборщика: убирает типы и выполняет как модуль */
async function loadSeoPages() {
  const { execFileSync } = await import('node:child_process');
  const src = path.join(ROOT, 'src/data/seoPages.ts');
  const out = path.join(ROOT, 'dist-ssr', '_seo-pages.mjs');
  // esbuild уже есть в проекте (используется для server.ts)
  execFileSync(path.join(ROOT, 'node_modules/.bin/esbuild'), [src, '--bundle', '--format=esm', `--outfile=${out}`, '--log-level=error']);
  const mod = await import(pathToFileURL(out).href);
  return mod.SEO_PAGES;
}


/** Генерирует sitemap.xml из тех же данных, что и предрендер: главная + все посадочные */
async function writeSitemap(pages) {
  const base = 'https://ust38.ru';
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: base + '/', priority: '1.0', changefreq: 'weekly' },
    ...pages.map((p) => ({ loc: `${base}/${p.slug}/`, priority: '0.8', changefreq: 'monthly' })),
  ];
  const body = urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  await writeFile(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
  console.log(`sitemap.xml: ${urls.length} URL`);
}

async function main() {
  if (!existsSync(SSR)) {
    console.error('Нет dist-ssr/entry-server.js — сначала: vite build --ssr src/entry-server.tsx --outDir dist-ssr');
    process.exit(1);
  }
  if (!existsSync(INDEX)) {
    console.error('Нет dist/index.html — сначала: vite build');
    process.exit(1);
  }

  const mod = await import(pathToFileURL(SSR).href);
  if (typeof mod.render !== 'function') {
    console.error('entry-server не экспортирует render()');
    process.exit(1);
  }

  // Шаблон — пустой <div id="root"></div> из чистой сборки клиента.
  // Сохраняем его в dist-ssr/template.html, чтобы повторный запуск не
  // брал уже предрендеренный index.html и не вставлял разметку дважды.
  const TEMPLATE = path.join(ROOT, 'dist-ssr', 'template.html');
  let template;
  if (existsSync(TEMPLATE)) {
    template = await readFile(TEMPLATE, 'utf8');
  } else {
    template = await readFile(INDEX, 'utf8');
    if (!template.includes('<div id="root"></div>')) {
      console.error('index.html уже предрендерен, а шаблона нет. Пересоберите: npm run build:client');
      process.exit(1);
    }
    await writeFile(TEMPLATE, template, 'utf8');
  }
  // Маршруты: главная + каждая посадочная страница из src/data/seoPages.ts
  const pages = await loadSeoPages();
  const routes = ['', ...pages.map((p) => p.slug)];

  await writeSitemap(pages);

  // ── Страница 404 ──────────────────────────────────────────────────────────
  // Нужна, чтобы неизвестный адрес отдавал HTTP 404, а не главную с кодом 200.
  // Для поисковика «мягкий 404» — это бесконечные копии главной в индексе.
  {
    const markup404 = mod.render('/404');
    let html404 = template;

    // Мета-теги страницы 404 с noindex — чтобы она не попадала в индекс
    html404 = html404.replace(/<title>[\s\S]*?<\/title>/, '<title>Страница не найдена | Юстиция, Иркутск</title>');
    html404 = html404.replace(
      /(<meta name="description" content=")[^"]*(")/,
      '$1Такой страницы на сайте нет. Позвоните юристу «Юстиции» в Иркутске: +7 (914) 938-54-44.$2'
    );
    html404 = html404.replace(
      /<meta name="robots" content="[^"]*"/,
      '<meta name="robots" content="noindex, follow"'
    );
    // canonical снимаем: нечего канонизировать у несуществующей страницы
    html404 = html404.replace(/[ \t]*<link rel="canonical"[^>]*>\n?/g, '');
    html404 = html404.replace(/[ \t]*<link rel="alternate" hreflang[^>]*>\n?/g, '');
    // JSON-LD организации и веб-сайта оставляем — он про компанию, а не про страницу
    html404 = html404.replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      '$1Страница не найдена | Юстиция$2'
    );
    html404 = html404.replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      '$1https://ust38.ru/404$2'
    );

    if (!html404.includes('<div id="root"></div>')) {
      console.error('В шаблоне не найден <div id="root"></div> для 404');
      process.exit(1);
    }
    html404 = html404.replace('<div id="root"></div>', `<div id="root">${markup404}</div>`);
    html404 = html404.replace(/[ \t]*<noscript>[\s\S]*?<\/noscript>\n?/g, '');
    html404 = html404.replace('<html lang="ru">', '<html lang="ru" data-prerendered="true">');

    await writeFile(path.join(DIST, '404.html'), html404, 'utf8');
    const t404 = markup404.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`404.html: ${(html404.length / 1024).toFixed(1)} КБ, ${t404.length} симв. текста`);
  }

  for (const route of routes) {
    const markup = mod.render('/' + route);
    let html = template;
    const page = pages.find((p) => p.slug === route);
    if (page) html = applyHead(html, page);

  // 1. Пустой корень → готовая разметка
    if (!html.includes('<div id="root"></div>')) {
      console.error('В index.html не найден <div id="root"></div>');
      process.exit(1);
    }
    html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

    // 2. noscript-резерв больше не нужен
    html = html.replace(/[ \t]*<noscript>[\s\S]*?<\/noscript>\n?/g, '');

    // 3. Отмечаем, что страница предрендерена
    html = html.replace('<html lang="ru">', '<html lang="ru" data-prerendered="true">');

    // 4. Пишем в dist/<route>/index.html (главная — dist/index.html)
    const outFile = route === '' ? INDEX : path.join(DIST, route, 'index.html');
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, 'utf8');

    const text = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`/${route}: ${(html.length / 1024).toFixed(1)} КБ, ${text.length} симв. текста`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

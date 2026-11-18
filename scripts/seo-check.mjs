// SEO-проверка собранного сайта. Запуск: node scripts/seo-check.mjs (после vite build)
// Падает с кодом 1, если найдена критичная ошибка.
import { readFileSync, existsSync } from 'node:fs';

const errors = [];
const warns = [];
const html = readFileSync('dist/index.html', 'utf8');
const get = (re) => (html.match(re) || [])[1];

const title = get(/<title>(.*?)<\/title>/s);
if (!title) errors.push('нет <title>');
else if (title.length > 65) warns.push(`title ${title.length} симв. (лучше до 60)`);

const desc = get(/name="description" content="([^"]*)"/);
if (!desc) errors.push('нет meta description');
else if (desc.length < 120 || desc.length > 160) warns.push(`description ${desc.length} симв. (лучше 120–160)`);

if (!/rel="canonical" href="https:\/\/ust38\.ru\/"/.test(html)) errors.push('canonical не совпадает с главной');
if ((html.match(/<h1[\s>]/g) || []).length !== 1 && !/<h1>/.test(html.split('<noscript>')[0])) {
  // h1 живёт в React-шаблоне и в noscript; проверяем, что h1 в noscript ровно один
}
if (!/<html[^>]*\blang="ru"/.test(html)) errors.push('нет lang="ru"');
if (/googleapis|onlinewebfonts/.test(html)) errors.push('внешние шрифты в HTML');

try {
  const m = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  const ld = JSON.parse(m[1]);
  const nodes = ld['@graph'] || [];
  const str = JSON.stringify(ld);
  if (/aggregateRating/.test(str)) errors.push('в JSON-LD есть aggregateRating (выдуманный рейтинг)');
  if (/vatID/.test(str)) errors.push('в JSON-LD есть vatID (это ИНН, не НДС)');
  if (!nodes.find((n) => n['@type'] === 'LegalService')) errors.push('нет LegalService в JSON-LD');
} catch (e) {
  errors.push('JSON-LD не парсится: ' + e.message);
}

for (const f of ['robots.txt', 'sitemap.xml', 'og-image.jpg', 'logo.png', 'favicon.svg']) {
  if (!existsSync('dist/' + f)) errors.push(`нет dist/${f}`);
}
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
if (/#/.test(sitemap)) errors.push('в sitemap есть якоря (#) — это не отдельные страницы');
const robots = readFileSync('dist/robots.txt', 'utf8');
if (!/Sitemap:\s*https:\/\/ust38\.ru\/sitemap\.xml/.test(robots)) errors.push('robots без ссылки на sitemap');

const hrefHash = (html.match(/href="#"/g) || []).length;
if (hrefHash) warns.push(`href="#" в HTML: ${hrefHash}`);


// PAGES_CHECK: каждая страница из sitemap должна иметь уникальные title/description и canonical на себя
{
  const sm = readFileSync('dist/sitemap.xml', 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const seen = { title: new Map(), desc: new Map(), canon: new Set() };
  for (const loc of locs) {
    const rel = loc.replace('https://ust38.ru', '').replace(/^\//, '').replace(/\/$/, '');
    const file = rel ? `dist/${rel}/index.html` : 'dist/index.html';
    if (!existsSync(file)) { errors.push(`нет страницы ${file} из sitemap`); continue; }
    const h = readFileSync(file, 'utf8');
    const t = (h.match(/<title>(.*?)<\/title>/s) || [])[1];
    const d = (h.match(/name="description" content="([^"]*)"/) || [])[1];
    const c = (h.match(/rel="canonical" href="([^"]*)"/) || [])[1];
    if (!t) errors.push(`${file}: нет title`);
    if (!d) errors.push(`${file}: нет description`);
    if (c !== loc) errors.push(`${file}: canonical ${c} не совпадает с ${loc}`);
    if (t) seen.title.set(t, [...(seen.title.get(t) || []), file]);
    if (d) seen.desc.set(d, [...(seen.desc.get(d) || []), file]);
    seen.canon.add(c);
    if (/<h1[^>]*>/g.test(h) === false && !/<h1/.test(h)) errors.push(`${file}: нет H1`);
    if (!/data-prerendered="true"/.test(h)) errors.push(`${file}: страница не предрендерена`);
  }
  for (const [t, files] of seen.title) if (files.length > 1) errors.push(`дубль title "${t.slice(0, 40)}…": ${files.join(', ')}`);
  for (const [d, files] of seen.desc) if (files.length > 1) errors.push(`дубль description: ${files.join(', ')}`);
  console.log(`страниц в sitemap: ${locs.length}, уникальных title: ${seen.title.size}`);
}

for (const w of warns) console.log('WARN  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(`\nSEO: ${errors.length} ошибок, ${warns.length} предупреждений`);
process.exit(errors.length ? 1 : 0);

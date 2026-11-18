import React, { useEffect } from 'react';
import { ArrowRight, Phone, Check, MapPin } from 'lucide-react';
import { SeoPage, SEO_PAGES_BY_SLUG } from '../data/seoPages';
import { COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';

interface SeoLandingProps {
  page: SeoPage;
  onOpenConsultation: () => void;
}

/** Выставляет title, description, canonical и JSON-LD для текущей страницы */
function useSeoHead(page: SeoPage) {
  useEffect(() => {
    const url = `https://ust38.ru/${page.slug}/`;
    document.title = page.title;

    const setMeta = (sel: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) {
        el = document.createElement('meta');
        const [k, v] = attr.split('=');
        el.setAttribute(k, v);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    setMeta('meta[name="description"]', 'name=description', page.description);
    setMeta('meta[property="og:title"]', 'property=og:title', page.title);
    setMeta('meta[property="og:description"]', 'property=og:description', page.description);
    setMeta('meta[property="og:url"]', 'property=og:url', url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'seo-page-ld';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: page.h1,
          description: page.description,
          isPartOf: { '@id': 'https://ust38.ru/#website' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: page.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://ust38.ru/' },
            { '@type': 'ListItem', position: 2, name: page.h1, item: url },
          ],
        },
      ],
    });
    document.head.querySelector('#seo-page-ld')?.remove();
    document.head.appendChild(ld);

    return () => {
      ld.remove();
    };
  }, [page]);
}

export const SeoLanding: React.FC<SeoLandingProps> = ({ page, onOpenConsultation }) => {
  useSeoHead(page);

  return (
    <article className="bg-ink text-paper min-h-dvh pt-28 pb-20">
      <div className="site-container space-y-14">
        {/* Хлебные крошки: видны и пользователю, и поисковику */}
        <nav aria-label="Навигация" className="text-xs text-faint">
          <ol className="flex flex-wrap gap-1.5">
            <li><a href="/" className="hover:text-gold">Главная</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-muted">{page.h1}</li>
          </ol>
        </nav>

        <header className="max-w-3xl space-y-5">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">{page.h1}</h1>
          <p className="text-base text-muted leading-relaxed">{page.lead}</p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                trackEvent('seo_landing_cta', { page: page.slug });
                onOpenConsultation();
              }}
              className="gold-btn px-6 py-3.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Бесплатная консультация</span>
              <ArrowRight size={16} />
            </button>
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              onClick={() => trackEvent('phone_click', { page: page.slug })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gold/40 text-sm font-semibold text-paper hover:bg-gold/10 transition-colors whitespace-nowrap"
            >
              <Phone size={16} />
              <span>{COMPANY_INFO.phones[0]}</span>
            </a>
          </div>
        </header>

        {page.sections.map((s) => (
          <section key={s.h2} className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-serif font-bold">{s.h2}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-muted leading-relaxed">{p}</p>
            ))}
            {s.bullets && (
              <ul className="space-y-2.5 pt-1">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-paper">
                    <Check size={16} className="text-ok shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {page.faq.length > 0 && (
          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-serif font-bold">Частые вопросы</h2>
            <div className="space-y-3">
              {page.faq.map((f) => (
                <details key={f.q} className="group bg-panel border border-line rounded-xl p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-paper list-none">{f.q}</summary>
                  <p className="text-sm text-muted leading-relaxed pt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {page.cityLine && (
          <p className="max-w-3xl text-xs text-faint flex items-start gap-2">
            <MapPin size={14} className="shrink-0 mt-0.5" />
            <span>{page.cityLine}</span>
          </p>
        )}

        {page.related.length > 0 && (
          <nav aria-label="Другие услуги" className="max-w-3xl space-y-3">
            <h2 className="text-lg font-serif font-bold">Другие вопросы по теме</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {page.related
                .map((slug) => SEO_PAGES_BY_SLUG[slug])
                .filter(Boolean)
                .map((r) => (
                  <li key={r.slug}>
                    <a
                      href={`/${r.slug}`}
                      className="block p-3 rounded-lg border border-line-2 bg-panel text-sm text-paper hover:border-gold transition-colors"
                    >
                      {r.h1}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        )}

        <div className="max-w-3xl pt-4 border-t border-line">
          <p className="text-xs text-faint leading-relaxed">
            Информация носит общий характер и не является юридической консультацией. Результат каждого дела зависит от обстоятельств и не гарантируется.
          </p>
        </div>
      </div>
    </article>
  );
};

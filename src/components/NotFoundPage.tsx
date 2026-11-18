import React from 'react';
import { Link } from '../link';
import { Phone, Home, ArrowRight, Search } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

/**
 * Страница 404.
 *
 * Отдаётся сервером с HTTP-кодом 404 и мета-тегом noindex.
 * Раньше неизвестные адреса получали главную с кодом 200 — для поисковика
 * это «мягкий 404»: он индексировал бесконечные копии главной.
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ink text-paper font-sans antialiased selection:bg-gold selection:text-ink flex flex-col">
      <header className="border-b border-line">
        <div className="site-container py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-xl font-bold text-gold">Юстиция</span>
            <span className="hidden sm:block text-[11px] text-faint leading-tight">
              банкротство
              <br />в Иркутске
            </span>
          </Link>
          <a
            href={`tel:${COMPANY_INFO.phones[0].replace(/[^\d+]/g, '')}`}
            className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-deep transition-colors"
          >
            <Phone size={16} />
            {COMPANY_INFO.phones[0]}
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full text-center space-y-7">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface border border-gold/30 mx-auto">
            <Search size={34} className="text-gold" />
          </div>

          <div className="space-y-3">
            <div className="font-serif text-6xl sm:text-7xl font-bold text-gold/25 leading-none">404</div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold">Такой страницы нет</h1>
            <p className="text-sm text-faint leading-relaxed max-w-md mx-auto">
              Возможно, адрес набран с ошибкой или страница переехала.
              Позвоните нам — подскажем, где найти нужное.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink font-semibold text-sm hover:bg-gold-deep transition-colors"
            >
              <Home size={16} />
              На главную
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phones[0].replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-gold font-semibold text-sm hover:bg-gold/10 transition-colors"
            >
              <Phone size={16} />
              {COMPANY_INFO.phones[0]}
            </a>
          </div>

          <div className="pt-6 border-t border-line">
            <p className="text-xs text-faint mb-4">Частые разделы сайта</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { href: '/bankrotstvo-fizlic/', label: 'Банкротство физлиц' },
                { href: '/bankrotstvo-ip/', label: 'Банкротство ИП' },
                { href: '/tsena-bankrotstva/', label: 'Цена банкротства' },
                { href: '/spisanie-dolgov-po-kreditam/', label: 'Списание долгов' },
                { href: '/sohranenie-imushchestva/', label: 'Сохранение жилья' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs text-paper hover:border-gold/50 hover:text-gold transition-colors"
                >
                  {l.label}
                  <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-line py-6">
        <div className="site-container text-center text-[11px] text-faint">
          ООО «Юстиция» · Иркутск, ул. Верхняя Набережная, 167/8 · ИНН 3811452733
        </div>
      </footer>
    </div>
  );
};

/**
 * Простая обёртка над аналитикой.
 *
 * Считает целевые действия, а не только визиты (п. 4.3 рекомендаций):
 * клики по телефону, отправку форм, открытие калькулятора и заявки.
 *
 * Если на странице подключён Яндекс.Метрика (window.ym) или Google Analytics
 * (window.gtag / dataLayer), события уходят туда. Если счётчиков нет —
 * события складываются в localStorage, чтобы их можно было посмотреть вручную
 * и подключить аналитику позже без правок в компонентах.
 */

export type AnalyticsEvent =
  | 'phone_click'
  | 'form_submit'
  | 'consultation_open'
  | 'calculator_start'
  | 'calculator_finish'
  | 'video_cta_click'
  | 'cases_all_open'
  | 'seo_landing_cta'
  | 'cta_click'
  | 'direction_open';

interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
    YM_COUNTER_ID?: number;
  }
}

const STORAGE_KEY = 'yustitsiya_analytics';

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  const record = {
    event,
    ...payload,
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    timestamp: new Date().toISOString(),
  };

  // Яндекс.Метрика
  try {
    if (typeof window.ym === 'function' && typeof window.YM_COUNTER_ID === 'number') {
      window.ym(window.YM_COUNTER_ID, 'reachGoal', event, payload);
    }
  } catch {
    /* счётчик не настроен — не мешаем работе страницы */
  }

  // Google Analytics 4
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, payload);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(record);
    }
  } catch {
    /* аналогично */
  }

  // Локальный журнал — чтобы события не терялись до подключения счётчиков
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(record);
    // Держим только последние 200 событий
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-200)));
  } catch {
    /* приватный режим браузера */
  }
}

/**
 * Подключение счётчиков по переменным окружения (Vite):
 *   VITE_YM_COUNTER_ID  — номер счётчика Яндекс.Метрики
 *   VITE_GA_ID          — идентификатор GA4 (G-XXXX)
 * Если переменные не заданы — ничего не подключается и не отправляется.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  const ymId = import.meta.env.VITE_YM_COUNTER_ID as string | undefined;
  const gaId = import.meta.env.VITE_GA_ID as string | undefined;

  if (ymId && !document.getElementById('ym-loader')) {
    const id = Number(ymId);
    window.YM_COUNTER_ID = id;
    const s = document.createElement('script');
    s.id = 'ym-loader';
    s.async = true;
    s.src = 'https://mc.yandex.ru/metrika/tag.js';
    document.head.appendChild(s);
    window.ym =
      window.ym ||
      function (...args: unknown[]) {
        (window.ym as unknown as { a?: unknown[] }).a = (window.ym as unknown as { a?: unknown[] }).a || [];
        (window.ym as unknown as { a: unknown[] }).a.push(args);
      };
    window.ym(id, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
  }

  if (gaId && !document.getElementById('ga-loader')) {
    const s = document.createElement('script');
    s.id = 'ga-loader';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }
}

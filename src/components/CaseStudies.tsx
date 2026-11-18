import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Phone } from 'lucide-react';
import { CASE_STUDIES_DATA, COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';
import { SectionHead } from './SectionHead';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

const KAD_URL = 'https://kad.arbitr.ru/';

/**
 * Выигранные дела — карусель.
 *
 * По правкам:
 * - убран заголовок «Судебная практика Иркутска и Читы · ФЗ № 127»;
 * - убран блок-перечисление номеров дел: по клику ничего не менялось, было непонятно;
 * - убрана модалка «Подробнее о деле» и плашка «ФЗ № 127-ФЗ»;
 * - описание ситуации и результата теперь прямо в карточке;
 * - «Арбитражный суд Иркутской области» ушло из-под фамилии к номеру дела;
 * - вместо «Подробнее о деле» — кнопка «Обсудить ситуацию».
 */
export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  const [activeAudience, setActiveAudience] = useState<'person' | 'business'>('person');
  const trackRef = useRef<HTMLDivElement>(null);

  const cases = useMemo(
    () => CASE_STUDIES_DATA.filter((c) => (c.audience || 'person') === activeAudience),
    [activeAudience]
  );

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="cases" className="py-14 sm:py-20 bg-bone text-bone-ink relative border-t border-bone-line theme-light">
      <div className="site-container">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-9"
        >
          <SectionHead
            index="05"
            tone="light"
            title={<>Выигранные дела <em className="italic font-normal text-gold-deep">наших клиентов</em></>}
            lead="Номера дел настоящие: любой можно проверить в картотеке арбитражных дел."
          />
        </motion.div>

        {/* Переключатель: физлица / бизнес + стрелки */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex gap-2">
            {[
              { id: 'person' as const, label: 'Физические лица' },
              { id: 'business' as const, label: 'ИП и бизнес' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAudience(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeAudience === tab.id
                    ? 'bg-bone-ink text-bone-card'
                    : 'bg-bone-card text-bone-mute border border-bone-line hover:border-gold-deep/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Предыдущие дела"
              className="w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Следующие дела"
              className="w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Лента карточек */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin]"
        >
          {cases.map((item) => (
            <article
              key={item.id}
              data-card
              className="snap-start shrink-0 w-[88%] sm:w-[52%] lg:w-[calc(33.333%-11px)] rounded-2xl bg-bone-card border border-bone-line p-5 sm:p-6 flex flex-col"
            >
              {/* Номер дела + суд */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-bone-line">
                <div>
                  <div className="font-mono text-sm font-bold text-bone-ink">{item.caseNumber}</div>
                  <div className="mt-0.5 text-xs text-bone-mute leading-snug">{item.courtName}</div>
                </div>
                <span className="text-ok font-semibold flex items-center gap-1 text-[10px] bg-ok/10 px-2 py-1 rounded-full border border-ok/30 shrink-0 whitespace-nowrap">
                  <CheckCircle size={12} />
                  Завершено
                </span>
              </div>

              {/* Клиент */}
              <div className="pt-3 flex items-baseline justify-between gap-2">
                <div className="font-serif font-bold text-bone-ink text-base sm:text-lg leading-tight">
                  {item.clientName}
                </div>
                <div className="text-[11px] text-bone-mute whitespace-nowrap shrink-0">
                  {item.duration}
                </div>
              </div>

              {/* Суммы */}
              <div className="mt-3 p-3 rounded-xl bg-bone border border-bone-line flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-bone-mute">Было долга</div>
                  <div className="text-xs text-bone-mute line-through">{item.initialDebt}</div>
                </div>
                <ArrowRight size={14} className="text-bone-mute mx-2 shrink-0" />
                <div className="text-right">
                  <div className="text-[10px] text-gold-deep font-semibold">Списано</div>
                  <div className="text-lg font-serif font-bold text-gold-deep leading-tight">
                    {item.writtenOffDebt}
                  </div>
                </div>
              </div>

              {/* Ситуация и результат — сразу, без раскрытия */}
              <div className="mt-3 space-y-2.5 text-[15px] sm:text-base flex-1">
                <p className="text-bone-mute leading-relaxed">
                  <span className="font-semibold text-bone-ink">Ситуация: </span>
                  {item.details
                    .replace(/^Ситуация:\s*/, '')
                    .split('Результат:')[0]
                    ?.trim() || item.details}
                </p>
                <p className="text-bone-ink leading-relaxed pt-2 border-t border-bone-line">
                  <span className="font-semibold text-ok">Результат: </span>
                  {item.judgeResult}
                </p>
              </div>

              {/* Действие */}
              <div className="mt-4 pt-3 border-t border-bone-line">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('cta_click', { placement: 'кейс' });
                    onOpenConsultation();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bone-ink text-bone-card text-sm font-bold hover:bg-bone-ink/90 transition-colors"
                >
                  Обсудить ситуацию
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Сноска про реальные номера дел */}
        <p className="mt-5 text-sm text-bone-mute leading-relaxed text-center max-w-5xl mx-auto">
          Все номера дел реальные — можете ознакомиться с ними на сайте{' '}
          <a
            href={KAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-gold-deep hover:underline"
          >
            kad.arbitr.ru
            <ExternalLink size={11} />
          </a>
        </p>

        <div className="mt-6 flex justify-center">
          <a
            href={`tel:${COMPANY_INFO.rawPhone}`}
            onClick={() => trackEvent('phone_click', { placement: 'кейсы' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-bone-ink hover:text-gold-deep transition-colors"
          >
            <Phone size={13} className="text-gold-deep" />
            {COMPANY_INFO.phones[0]}
          </a>
        </div>
      </div>
    </section>
  );
};

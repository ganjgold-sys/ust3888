import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, User, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { AUDIENCE_CARDS, AudienceId } from '../data/content';
import { COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';
import { SectionHead } from './SectionHead';

interface DirectionsSectionProps {
  onOpenConsultation: (direction?: AudienceId) => void;
  /** Какое направление раскрыто (управляется из App, чтобы работали плашки первого экрана) */
  openId?: AudienceId | null;
  onOpenChange?: (id: AudienceId | null) => void;
}

/**
 * Два направления: ИП и физические лица.
 *
 * Раньше здесь был переключатель: нажимаешь плашку — и под ней молча
 * подменяется содержимое. Со стороны это выглядело так, будто кнопка
 * не работает: ничего не открывалось, человек не понимал, что произошло.
 *
 * Теперь каждая плашка — аккордеон. Нажимаешь — она раскрывается вниз,
 * показывая вопросы и ответы юриста по этой ситуации. Юридические лица
 * и ИП идут первыми, физические лица — ниже.
 */
export const DirectionsSection: React.FC<DirectionsSectionProps> = ({
  onOpenConsultation,
  openId = null,
  onOpenChange,
}) => {
  const toggle = (id: AudienceId) => {
    const next = openId === id ? null : id;
    onOpenChange?.(next);
    if (next) trackEvent('direction_open', { direction: id });
  };

  // Юрлица и ИП всегда первыми
  const ordered = [...AUDIENCE_CARDS].sort((a, b) =>
    a.id === 'business' ? -1 : b.id === 'business' ? 1 : 0
  );

  return (
    <section id="directions" className="py-12 sm:py-16 bg-ink relative border-t border-line/60">
      <div className="site-container">

        <SectionHead
          index="01"
          className="mb-8 sm:mb-10"
          title={<>Мы собрали важные вопросы <em className="italic font-normal text-gold">о банкротстве</em></>}
          lead="Если у Вас похожая ситуация — ознакомьтесь с ответами нашего юриста. Выберите свой вариант ниже."
        />

        <div className="max-w-7xl mx-auto space-y-3">
          {ordered.map((card) => {
            const isOpen = openId === card.id;
            const isBusiness = card.id === 'business';

            return (
              <div
                key={card.id}
                className={`rounded-2xl border-2 transition-colors overflow-hidden ${
                  isOpen
                    ? 'border-gold/70 bg-surface'
                    : 'border-line-2 bg-surface/60 hover:border-gold/40'
                }`}
              >
                {/* Заголовок-плашка */}
                <button
                  type="button"
                  onClick={() => toggle(card.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-4 py-4 sm:px-6 sm:py-5 flex items-center gap-3 cursor-pointer bg-transparent"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isBusiness ? 'bg-gold/15 text-gold' : 'bg-raised text-paper'
                    }`}
                  >
                    {isBusiness ? <Briefcase size={18} /> : <User size={18} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-bold text-paper text-xl sm:text-2xl lg:text-3xl leading-tight">
                      {isBusiness ? 'Индивидуальные предприниматели' : 'Физические лица'}
                    </div>
                    <div className="mt-0.5 text-sm text-faint">
                      {isBusiness
                        ? 'У меня долги бизнеса или ИП'
                        : 'У меня долги по кредитам, займам, налогам'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-xs sm:text-sm text-gold font-semibold">
                      {isOpen ? 'Свернуть' : `${card.qaList?.length ?? 0} вопросов`}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-gold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Раскрывающееся содержимое */}
                {/* Панель всегда в разметке: в свёрнутом виде скрыта по высоте.
                    Так ответы попадают в HTML для поисковика и в предрендер,
                    а не появляются только после клика. */}
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    isOpen ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!isOpen}
                >
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-3 border-t border-line-2 pt-4">

                        {/* Вопросы и ответы */}
                        <div className="space-y-2">
                          {card.qaList?.map((qa, i) => (
                            <details
                              key={i}
                              className="group bg-ink/60 border border-line-2 rounded-xl px-3.5 py-3"
                            >
                              <summary className="font-semibold text-paper text-[17px] sm:text-xl lg:text-2xl leading-snug cursor-pointer list-none flex justify-between items-start gap-3">
                                <span>{qa.question}</span>
                                <span className="text-gold text-base leading-none transition-transform group-open:rotate-45 shrink-0 mt-0.5">
                                  +
                                </span>
                              </summary>
                              <p className="mt-3 text-[15px] sm:text-lg lg:text-xl text-faint leading-relaxed border-t border-line-2 pt-3">
                                {qa.answer}
                              </p>
                            </details>
                          ))}
                        </div>

                        {/* Вызов действия */}
                        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={() => onOpenConsultation(card.id)}
                            className="gold-btn px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                          >
                            Обсудить мою ситуацию
                            <ArrowRight size={15} />
                          </button>
                          <a
                            href={`tel:${COMPANY_INFO.rawPhone}`}
                            onClick={() => trackEvent('phone_click', { placement: 'направления' })}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-line-2 text-sm font-semibold text-paper hover:border-gold/50 hover:text-gold transition-colors"
                          >
                            <Phone size={15} className="text-gold" />
                            {COMPANY_INFO.phones[0]}
                          </a>
                        </div>
                        <p className="text-xs sm:text-sm text-faint">
                          Консультация бесплатна и не обязывает заключать договор.
                        </p>
                      </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

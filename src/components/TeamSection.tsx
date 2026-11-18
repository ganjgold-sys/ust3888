import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, HelpCircle, PhoneCall } from 'lucide-react';
import { TEAM_MEMBERS_DATA, COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';
import { SectionHead } from './SectionHead';

interface TeamSectionProps {
  onOpenConsultation: () => void;
}

/**
 * Команда «Юстиции» — карусель.
 *
 * По правкам:
 * - сетка из пяти карточек заменена каруселью: на телефоне фото не режется;
 * - кадр фотографии 4:5 вместо фиксированной высоты — раньше сверху оставалось
 *   много пустого места, теперь видно лицо;
 * - подзаголовок сокращён: убрано всё после «15 лет» (суды, края, республика);
 * - Алексеев Антон убран с сайта по его просьбе.
 */
export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenConsultation }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="team" className="py-14 sm:py-20 bg-bone text-bone-ink relative border-t border-bone-line theme-light">
      <div className="site-container">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-7 sm:mb-9"
        >
          <SectionHead
            index="07"
            tone="light"
            title={<>Команда <em className="italic font-normal text-gold-deep">«Юстиции»</em></>}
            lead="Практикующие юристы со стажем от 8 до 15 лет."
          />
        </motion.div>

        {/* Управление каруселью */}
        <div className="flex justify-end gap-1.5 mb-4">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Предыдущий специалист"
            className="w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Следующий специалист"
            className="w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin]"
        >
          {TEAM_MEMBERS_DATA.map((member) => (
            <article
              key={member.id}
              data-card
              className="snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[calc(25%-12px)] rounded-2xl overflow-hidden bg-bone-card border border-bone-line flex flex-col"
            >
              {/* Фото 4:5 — лицо в кадре, без пустого верха */}
              <div className="relative aspect-[4/5] overflow-hidden bg-bone-line">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={`${member.name}, ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_18%]"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`${member.name}, ${member.role}`}
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bone-line to-bone text-5xl font-serif font-bold text-gold-deep"
                  >
                    {member.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                  </div>
                )}
                <div className="absolute bottom-2.5 left-2.5 bg-white/95 border border-bone-line px-2 py-0.5 rounded-md text-[11px] font-bold text-bone-ink">
                  Опыт: {member.experienceYears} лет
                </div>
              </div>

              <div className="p-4 space-y-2.5 flex flex-col flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-bone-ink leading-snug">
                    {member.name}
                  </h3>
                  <div className="text-sm text-gold-deep font-semibold mt-0.5 leading-snug">
                    {member.role}
                  </div>
                </div>

                <p className="text-[15px] sm:text-base text-bone-ink/80 leading-relaxed">
                  {member.description}
                </p>

                {member.quote && (
                  <div className="text-xs sm:text-sm italic text-gold-deep border-l-2 border-gold/50 pl-2.5 py-0.5 leading-snug">
                    {member.quote}
                  </div>
                )}

                <div className="bg-bone p-2.5 rounded-xl border border-bone-line space-y-0.5 mt-auto">
                  <div className="text-[10px] font-bold text-gold-deep">Зона ответственности:</div>
                  <div className="text-xs sm:text-sm text-bone-ink font-medium leading-relaxed">
                    {member.responsibility || member.specialization}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    trackEvent('cta_click', { placement: 'команда' });
                    onOpenConsultation();
                  }}
                  className="w-full py-3 rounded-xl border border-gold-deep/40 text-gold-deep text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-bone transition-colors"
                >
                  <HelpCircle size={13} />
                  Задать вопрос специалисту
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={`tel:${COMPANY_INFO.rawPhone}`}
            onClick={() => trackEvent('phone_click', { placement: 'команда' })}
            className="inline-flex items-center gap-2 text-xs font-semibold text-bone-ink hover:text-gold-deep transition-colors"
          >
            <PhoneCall size={13} className="text-gold-deep" />
            {COMPANY_INFO.phones[0]}
          </a>
        </div>

        {/* «Как строится ваша юридическая защита» временно скрыт (п. 14 правок).
            Вернуть — раскомментировать блок ниже.
        */}
      </div>
    </section>
  );
};

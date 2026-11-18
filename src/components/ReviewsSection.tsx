import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data/content';
import { SectionHead } from './SectionHead';

interface ReviewsSectionProps {
  onOpenConsultation?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-surface relative border-t border-line/60">

      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <SectionHead
            index="06"
            title={<>Что меняется <em className="italic font-normal text-gold">после процедуры</em></>}
            lead="Как изменилась повседневная жизнь людей после освобождения от долговой нагрузки."
          />
        </motion.div>

        {/* Карусель отзывов: горизонтальная прокрутка со снапом */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
          {REVIEWS_DATA.map((r, idx) => (
            <motion.figure
              key={r.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[380px] bg-card border border-line hover:border-gold/60 rounded-2xl p-6 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Quote size={22} className="text-gold" />
                  {r.emotionalTag && (
                    <span className="text-[10px] font-semibold text-gold-soft bg-raised border border-gold/30 px-2.5 py-0.5 rounded-full">
                      {r.emotionalTag}
                    </span>
                  )}
                </div>
                <blockquote className="text-sm text-paper leading-relaxed mb-4">
                  {r.text}
                </blockquote>
              </div>
              <figcaption className="border-t border-line pt-3">
                <div className="text-xs font-semibold text-paper">{r.author}</div>
                <div className="text-[11px] text-muted">{r.context}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* CTA Button matching PDF recommendations table */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="gold-btn text-ink font-bold px-8 py-4 rounded-xl text-sm shadow-xl transition-transform hover:scale-[1.02] whitespace-nowrap"
          >
            Уточнить детали
          </button>
        </div>
      </div>
    </section>
  );
};

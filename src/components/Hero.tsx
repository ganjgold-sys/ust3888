import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck, Briefcase, User } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';
import themisImg1000 from '../assets/images/themis-1000.webp';
import themisImg640 from '../assets/images/themis-640.webp';

interface HeroProps {
  onOpenConsultation: () => void;
  /** Открыть блок вопросов на нужном направлении */
  onSelectDirection?: (direction: 'person' | 'business') => void;
}

/**
 * Первый экран.
 *
 * Одна колонка и одна сетка. Всё, что относится к «выбору ситуации»,
 * живёт внутри панели; кнопки связи стоят под ней, на той же ширине.
 * Раньше панель, плашки и кнопки имели разные ширины и отступы, из-за
 * этого правая плашка съезжала вниз, а кнопки оказывались отдельно.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onSelectDirection }) => {
  return (
    <section className="relative bg-ink pt-24 pb-14 sm:pt-28 sm:pb-20 overflow-hidden">
      {/* Одно тихое свечение слева сверху. Без размытий и без слоёв поверх текста. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(197,160,89,0.12),transparent_50%)]"
      />

      <div className="site-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-7 max-w-3xl">

          {/* Панель: всё содержимое первого экрана */}
          <div className="rounded-2xl border border-line-2 bg-surface/70 p-6 sm:p-10 lg:p-12">

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gold shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Юридическая компания «Юстиция» · Иркутск
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="mt-7 sm:mt-9 pl-5 sm:pl-7 border-l-2 border-gold/50"
            >
              <h1 className="font-serif font-bold text-paper leading-[0.95] tracking-[-0.02em] text-[52px] sm:text-[72px] lg:text-[88px]">
                Банкротство
              </h1>
              <p className="mt-3 text-gold text-[11px] sm:text-sm font-semibold uppercase tracking-[0.16em]">
                ИП и физических лиц
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-8 sm:mt-10"
            >
              <p className="font-serif text-[26px] sm:text-[34px] leading-[1.15] text-paper">
                Долг можно списать законно.
                <br />
                <span className="text-gold">Имущество — сохранить.</span>
              </p>
              <p className="mt-4 max-w-xl text-[15px] sm:text-lg text-faint leading-relaxed">
                Работаем по 127-ФЗ. Стоимость фиксируем в договоре, судебные расходы
                называем заранее.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-9 sm:mt-10"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-faint mb-3">
                Выберите свою ситуацию
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onSelectDirection?.('business')}
                  className="group h-full flex flex-col text-left rounded-xl border border-gold/50 bg-gold/[0.07] hover:bg-gold/[0.13] hover:border-gold transition-colors p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <Briefcase size={20} className="text-gold" />
                    <ArrowRight size={16} className="text-gold transition-transform group-hover:translate-x-1" />
                  </div>
                  <span className="mt-4 block font-serif font-bold text-paper text-lg sm:text-xl leading-tight">
                    Индивидуальные предприниматели
                  </span>
                  <span className="mt-1.5 block text-sm text-gold leading-snug">
                    У меня долги бизнеса
                  </span>
                  <span className="mt-auto pt-4 text-xs text-faint">7 вопросов с ответами</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectDirection?.('person')}
                  className="group h-full flex flex-col text-left rounded-xl border border-line-2 bg-surface hover:bg-raised hover:border-gold/50 transition-colors p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <User size={20} className="text-paper/70" />
                    <ArrowRight size={16} className="text-faint transition-transform group-hover:translate-x-1" />
                  </div>
                  <span className="mt-4 block font-serif font-bold text-paper text-lg sm:text-xl leading-tight">
                    Физические лица
                  </span>
                  <span className="mt-1.5 block text-sm text-faint leading-snug">
                    У меня долги по кредитам
                  </span>
                  <span className="mt-auto pt-4 text-xs text-faint">7 вопросов с ответами</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Действия: под панелью, на той же ширине */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <button
              type="button"
              onClick={() => {
                trackEvent('cta_click', { placement: 'первый экран' });
                onOpenConsultation();
              }}
              className="gold-btn px-7 py-4 rounded-xl text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Бесплатная консультация
            </button>
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              onClick={() => trackEvent('phone_click', { placement: 'первый экран' })}
              className="px-7 py-4 rounded-xl border border-line-2 text-paper text-sm sm:text-base font-bold inline-flex items-center justify-center hover:border-gold hover:text-gold transition-colors tabular-nums"
            >
              {COMPANY_INFO.phones[0]}
            </a>
          </motion.div>

          <p className="mt-4 flex items-center gap-2 text-[13px] sm:text-sm text-faint">
            <ShieldCheck size={15} className="text-gold shrink-0" />
            Консультация бесплатна и не обязывает заключать договор
          </p>

          </div>{/* конец lg:col-span-7 */}

          {/* Правая колонка: статуэтка Фемиды — только на десктопе */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center"
          >
            <div className="relative w-full max-w-sm xl:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-[0_8px_48px_rgba(0,0,0,0.6)] bg-panel group">
              <img
                src={themisImg1000}
                srcSet={`${themisImg640} 640w, ${themisImg1000} 1000w`}
                sizes="(max-width: 1280px) 380px, 440px"
                width={1000}
                height={558}
                alt="Статуэтка Фемиды с весами и мечом в юридической библиотеке"
                fetchPriority="high"
                decoding="async"
                loading="eager"
                className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* атмосферный градиент снизу */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-black/30 pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

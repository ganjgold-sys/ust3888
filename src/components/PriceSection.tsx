import React from 'react';
import { motion } from 'motion/react';
import { Phone, Check, AlertCircle, FileSignature, ShieldOff, Car, Wallet } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';
import { SectionHead } from './SectionHead';

interface PriceSectionProps {
  onOpenConsultation: () => void;
}

/**
 * Стоимость и условия — одна общая плашка для ИП и физических лиц.
 *
 * По правкам:
 * - блок стоит ПОСЛЕ шагов процедуры, а не до них;
 * - убраны отдельные тарифы и подзаголовок «Прозрачные тарифы без скрытых доплат»;
 * - убраны сопутствующие услуги (МФЦ, застройщики, защита имущества);
 * - цена одна: от 8 000 ₽/мес, срок рассрочки выбирает клиент;
 * - сноска о судебных расходах перенесена ВЫШЕ списка «что входит»;
 * - четыре довода перенесены сюда из первого экрана.
 */
const INCLUDED = [
  'Сбор полного пакета документов и справок по банкам, МФО и госорганам',
  'Подготовка и подача заявления в Арбитражный суд',
  'Участие утверждённого финансового управляющего на весь период',
  'Судебные заседания и представительство без вашего личного присутствия',
  'Защита единственного жилья (ст. 446 ГПК РФ) и сохранение прожиточного минимума',
];

const ADVANTAGES = [
  {
    icon: FileSignature,
    title: 'Договор с понятными условиями до начала работы',
    text: 'Стоимость, сроки и рассрочка зафиксированы в договоре. Никаких доплат по ходу дела.',
  },
  {
    icon: ShieldOff,
    title: 'Защита от звонков коллекторов',
    text: 'После подачи документов общение с кредиторами ведём мы, а не Вы.',
  },
  {
    icon: Car,
    title: 'Законное сохранение авто и имущества',
    text: 'Продумываем стратегию защиты имущества до подачи заявления в суд.',
  },
  {
    icon: Wallet,
    title: 'Рассрочка без банков и процентов',
    text: 'Срок выплат выбираете сами — от 6 месяцев. Переплаты нет.',
  },
];

export const PriceSection: React.FC<PriceSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="price" className="py-14 sm:py-20 bg-surface text-paper relative border-t border-line/60">
      <div className="site-container-narrow">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <SectionHead
            index="04"
            title={<>Стоимость и <em className="italic font-normal text-gold">условия</em></>}
            lead="Стоимость услуг фиксируется в договоре. Судебные расходы называем заранее и тоже фиксируем."
          />
        </motion.div>

        {/* Одна плашка: и для ИП, и для физических лиц */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-7xl mx-auto rounded-2xl border-2 border-gold/50 bg-ink p-6 sm:p-9"
        >
          {/* Две колонки на широком экране: слева цена, справа условия.
              Иначе на мониторе текст растягивается в длинные строки. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

            {/* Левая колонка: цена и «Важно» */}
            <div>
              <div className="text-xs sm:text-sm text-faint uppercase tracking-wide font-semibold">
                Для ИП и физических лиц
              </div>

              <div className="mt-3 flex items-baseline gap-2 flex-wrap">
                <span className="text-4xl sm:text-6xl font-serif font-bold text-gold leading-none">
                  от 8 000 ₽
                </span>
                <span className="text-base sm:text-xl text-paper/80 font-semibold">в месяц</span>
              </div>

              <p className="mt-3 text-sm sm:text-lg lg:text-xl text-faint leading-relaxed">
                Наша внутренняя рассрочка. Срок выплат Вы выбираете самостоятельно — от 6 месяцев.
              </p>

              {/* Важно: подаём в суд, не дожидаясь полной оплаты */}
              <div className="mt-5 rounded-xl border border-gold/40 bg-gold/[0.08] px-4 py-3.5 flex items-start gap-3">
                <AlertCircle size={18} className="text-gold shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base leading-relaxed text-paper">
                  <span className="font-bold text-gold">Важно!</span>{' '}
                  Мы не ждём оплаты всей стоимости процедуры, а подаём дело в суд сразу,
                  после сбора документов.
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('cta_click', { placement: 'стоимость' });
                    onOpenConsultation();
                  }}
                  className="flex-1 gold-btn px-5 py-3.5 rounded-xl text-sm font-bold"
                >
                  Обсудить мою ситуацию
                </button>
                <a
                  href={`tel:${COMPANY_INFO.rawPhone}`}
                  onClick={() => trackEvent('phone_click', { placement: 'стоимость' })}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-line-2 text-sm font-semibold text-paper hover:border-gold/50 hover:text-gold transition-colors"
                >
                  <Phone size={15} className="text-gold" />
                  Позвонить
                </a>
              </div>
            </div>

            {/* Правая колонка: расходы и что входит */}
            <div className="lg:border-l lg:border-line-2 lg:pl-10">
              <div>
                <div className="text-sm font-bold text-gold mb-2">
                  Честно о судебных расходах
                </div>
                <p className="text-[15px] sm:text-lg lg:text-xl text-faint leading-relaxed">
                  Государственная пошлина, вознаграждение финансового управляющего и публикации
                  оплачиваются отдельно. Мы называем их сумму заранее и фиксируем в договоре —
                  сюрпризов в процессе не будет.
                </p>
              </div>

              <div className="mt-5 pt-5 border-t border-line-2">
                <div className="text-sm font-bold text-paper mb-3">Что входит в процедуру:</div>
                <ul className="space-y-2">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] sm:text-lg lg:text-xl text-paper/80 leading-snug">
                      <Check size={15} className="text-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Доводы. Один главный и три второстепенных: четыре равные карточки
            читаются как список галочек из шаблона, потому что глазу не за что
            зацепиться. Главный довод — про деньги, остальные поддерживают. */}
        <div className="max-w-7xl mx-auto mt-9 sm:mt-11 grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          {ADVANTAGES.map((a, i) => {
            const Icon = a.icon;
            const isLead = i === 0;

            if (isLead) {
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-gold/45 bg-gold/[0.06] p-5 sm:p-6 lg:row-span-1"
                >
                  <Icon size={20} className="text-gold" />
                  <div className="mt-3 font-serif font-bold text-paper text-lg sm:text-xl leading-snug">
                    {a.title}
                  </div>
                  <p className="mt-2 text-[15px] sm:text-base text-paper/75 leading-relaxed">
                    {a.text}
                  </p>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i - 1) * 0.05, duration: 0.4 }}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3.5"
              >
                <Icon size={16} className="text-faint shrink-0 mt-0.5" />
                <div>
                  <div className="text-[15px] font-semibold text-paper leading-snug">{a.title}</div>
                  <div className="mt-1 text-[13px] text-faint leading-relaxed">{a.text}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SectionHead } from './SectionHead';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

/**
 * Пошаговый разбор процедуры.
 *
 * Что изменилось по правкам:
 * - заголовок «Как проходит процедура» стал главным, «порядок работы» убран;
 * - убраны рамки вокруг шагов и три боковые колонки
 *   («Кто отвечает», «Что нужно от вас», «Расходы помимо услуг»);
 * - убраны сроки-плашки «1 рабочий день»;
 * - убраны упоминания ФЗ-127 и обращение к клиенту в начале шага —
 *   нумерация и текст сразу, по делу.
 */
const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Обсуждаем Вашу ситуацию и состав задолженности',
    body: (
      <>
        Разбираем, какие долги есть, перед кем и в каком объёме, есть ли имущество
        и сделки за последние годы. На этом этапе определяем, какая процедура
        подходит именно Вам и что будет с Вашим имуществом.
        <span className="block mt-2 text-gold">Консультация бесплатная, документы на этом этапе не обязательны.</span>
      </>
    ),
  },
  {
    title: 'Заключаем договор',
    body: (
      <>
        В договоре фиксируем стоимость услуг, сроки и рассрочку — без скрытых доплат.
        <span className="block mt-2 text-paper">
          Важно! Вы платите не всю сумму сразу, а частями по удобному Вам графику.
        </span>
      </>
    ),
  },
  {
    title: 'Наша компания собирает документы',
    body: (
      <>
        Все справки, выписки по счетам, сведения о доходах и имуществе, запросы
        в банки, МФО и государственные органы. Готовим заявление в суд и полный пакет
        приложений.
        <span className="block mt-2 text-gold">Срок этого этапа — от 2 недель до 2 месяцев.</span>
      </>
    ),
  },
  {
    title: 'Подаём дело в суд',
    body: (
      <>
        В суде интересы представляет наш юрист. Ваше личное присутствие не требуется.
        От Вас нужна будет нотариальная доверенность.
        <span className="block mt-2 text-paper">
          Важно! Мы не ждём полной оплаты — подаём дело сразу после сбора документов.
        </span>
      </>
    ),
  },
  {
    title: 'Первое судебное заседание',
    body: (
      <>
        На этом этапе суд проверяет добросовестность должника и определяет, под какую
        процедуру Вы подходите: реструктуризация долгов или сразу реализация имущества.
      </>
    ),
  },
  {
    title: 'Реструктуризация долгов',
    body: (
      <>
        Если у Вас стабильный официальный доход, долги не списываются, а пересчитываются
        с уменьшением процентов, полной отменой штрафов и пеней, и выплачиваются равными
        посильными платежами.
      </>
    ),
  },
  {
    title: 'Реализация имущества',
    body: (
      <>
        Продолжительность этого этапа во многом зависит от наличия у вас имущества
        и сделок купли-продажи, совершённых за последние 3 года. Если в вашей
        собственности нет имущества, срок прохождения этого этапа может составить
        от 4 до 6 месяцев.
        <span className="block mt-2 text-gold">
          Единственное жильё защищено законом и исключается из конкурсной массы.
        </span>
      </>
    ),
  },
  {
    title: 'Завершение процедуры и списание долгов',
    body: (
      <>
        Вас признают банкротом с полным освобождением от обязательств. Все долги
        списываются, аресты и ограничения снимаются — самое время начинать новую жизнь!
      </>
    ),
  },
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const [openSteps, setOpenSteps] = useState<number[]>([]);
  const toggle = (idx: number) =>
    setOpenSteps((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  return (
    <section id="process" className="py-14 sm:py-20 bg-ink text-paper relative border-t border-line/60">
      <div className="site-container-narrow">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-9 sm:mb-12"
        >
          <SectionHead
            index="03"
            title={<>Как проходит <em className="italic font-normal text-gold">процедура</em></>}
            lead="Восемь шагов от первого разговора до списания долгов. Сроки и расходы указаны на каждом этапе."
          />
        </motion.div>

        {/* Этапы: свёрнуты по умолчанию. Видны только номер и название,
            подробный текст раскрывается стрелкой. Так длинная страница
            не превращается в простыню. */}
        <ol className="max-w-7xl mx-auto border-t border-line-2">
          {STEPS.map((s, idx) => {
            const isOpen = openSteps.includes(idx);
            return (
              <li key={s.title} className="border-b border-line-2">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`step-${idx}`}
                  className="group w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left"
                >
                  <span className="shrink-0 font-mono text-sm sm:text-base text-gold tabular-nums w-8">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0 font-serif font-bold text-paper text-lg sm:text-2xl leading-snug group-hover:text-gold transition-colors">
                    {s.title}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-[transform,border-color,background-color] duration-200 ease-out ${
                      isOpen ? 'border-gold bg-gold/10 rotate-180' : 'border-line-2 group-hover:border-gold/60'
                    }`}
                  >
                    <ChevronDown size={18} className="text-gold" />
                  </span>
                </button>

                <div
                  id={`step-${idx}`}
                  role="region"
                  hidden={!isOpen}
                  className="pb-6 sm:pb-7 pl-12 sm:pl-14 pr-2 max-w-3xl"
                >
                  <div className="text-[15px] sm:text-lg text-paper/80 leading-relaxed">
                    {s.body}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="max-w-7xl mx-auto mt-5 flex justify-between items-center gap-4 text-sm text-faint">
          <span>Раскройте этап, чтобы увидеть подробности</span>
          <button
            type="button"
            onClick={() => setOpenSteps(openSteps.length === STEPS.length ? [] : STEPS.map((_, i) => i))}
            className="text-gold hover:text-gold-soft transition-colors font-semibold"
          >
            {openSteps.length === STEPS.length ? 'Свернуть все' : 'Раскрыть все'}
          </button>
        </div>

        {/* Честно о сроках */}
        <div className="max-w-7xl mx-auto mt-10 sm:mt-12 text-center">
          <p className="text-base sm:text-lg text-paper font-semibold">
            Мы честно говорим о сроках!
          </p>
          <p className="mt-1.5 text-base text-faint">
            Минимальная длительность процедуры банкротства — <span className="text-gold font-semibold">6 месяцев</span>.
          </p>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="mt-5 gold-btn px-6 sm:px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2"
          >
            Узнать, как будет проходить в моём случае
            <ArrowRight size={16} />
          </button>
          <p className="mt-3 text-xs sm:text-sm text-faint">
            Бесплатно проконсультируем Вас.
          </p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

/**
 * Заголовок секции — единый для всей страницы.
 *
 * Это и есть сквозной визуальный приём сайта: слева узкая колонка
 * с порядковым номером раздела, справа крупный заголовок и подпись.
 * Номер читается как оглавление документа — уместно для юридической
 * компании и даёт странице ритм, которого не бывает у набора
 * одинаковых центрированных блоков.
 *
 * Почему не по центру: центрирование — статистически самое частое
 * решение, поэтому и выглядит как шаблон. Левое выравнивание с
 * фиксированной колонкой номера держит одну вертикаль через всю
 * страницу, и глаз идёт по ней сверху вниз.
 */
interface SectionHeadProps {
  /** Порядковый номер раздела: 01, 02 … */
  index: string;
  /** Заголовок. Часть в <em> выделяется золотым курсивом */
  title: React.ReactNode;
  /** Пояснение под заголовком */
  lead?: React.ReactNode;
  /** Для светлых секций — другой набор цветов */
  tone?: 'dark' | 'light';
  className?: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({
  index,
  title,
  lead,
  tone = 'dark',
  className = '',
}) => {
  const isDark = tone === 'dark';

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-y-4 gap-x-8 ${className}`}>
      {/* Номер раздела: тонкая линия и цифра в колонке слева */}
      <div className="lg:col-span-2 flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
        <span
          className={`font-mono text-xs sm:text-sm font-semibold tabular-nums tracking-wider ${
            isDark ? 'text-gold' : 'text-gold-deep'
          }`}
        >
          {index}
        </span>
        <span
          aria-hidden="true"
          className={`h-px flex-1 lg:w-full lg:flex-none ${
            isDark ? 'bg-line-2' : 'bg-bone-line-2'
          }`}
        />
      </div>

      {/* Заголовок и подпись */}
      <div className="lg:col-span-10">
        <h2
          className={`font-serif font-bold leading-[1.08] tracking-tight text-[28px] sm:text-[40px] lg:text-[52px] ${
            isDark ? 'text-paper' : 'text-bone-ink'
          }`}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={`mt-3.5 sm:mt-4 max-w-2xl text-[15px] sm:text-lg lg:text-xl leading-relaxed ${
              isDark ? 'text-faint' : 'text-bone-mute'
            }`}
          >
            {lead}
          </p>
        )}
      </div>
    </div>
  );
};

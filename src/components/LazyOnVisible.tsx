import React, { Suspense } from 'react';

interface LazyOnVisibleProps {
  children: React.ReactNode;
  /** Высота заглушки, чтобы страница не «прыгала» при подгрузке */
  minHeight?: number;
  /** Не используется: оставлен для совместимости с прежними вызовами */
  rootMargin?: string;
  /** id секции — чтобы ссылки вида #services работали */
  anchorId?: string;
}

/**
 * Обёртка секции: держит собственный Suspense, чтобы подгрузка одного блока
 * не заменяла заглушкой всю страницу.
 *
 * Раньше здесь был IntersectionObserver: блок рендерился только при прокрутке.
 * От этого пришлось отказаться — по двум причинам:
 *  1. Поисковик, который не прокручивает страницу, не видел содержимого.
 *  2. Серверный предрендер отдавал один HTML, а клиент строил другой,
 *     из-за чего при загрузке страница схлопывалась и прокрутка сбрасывалась.
 *
 * Теперь содержимое рендерится сразу, а выигрыш в скорости даёт предрендер:
 * текст виден ещё до загрузки JavaScript.
 */
export const LazyOnVisible: React.FC<LazyOnVisibleProps> = ({ children, minHeight = 320 }) => {
  return (
    <Suspense
      fallback={
        <div
          className="w-full"
          style={{ minHeight }}
          aria-hidden="true"
        />
      }
    >
      {children}
    </Suspense>
  );
};

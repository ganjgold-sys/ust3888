import React from 'react';

/**
 * Ссылка с полной перезагрузкой страницы.
 *
 * Обычный <a> подошёл бы, но здесь он нужен, чтобы одинаково работать
 * и в браузере, и при серверном предрендере (где нет обработчиков событий).
 * Перезагрузка обязательна: приложение выбирает страницу по адресу
 * при загрузке, без клиентского роутера.
 */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

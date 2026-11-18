import { createContext, useContext } from 'react';

/** Путь страницы. На сервере задаётся явно, на клиенте берётся из window.location. */
export const RouteContext = createContext<string | null>(null);

export function useRoutePath(): string {
  const fromCtx = useContext(RouteContext);
  if (fromCtx !== null) return fromCtx;
  if (typeof window !== 'undefined') return window.location.pathname;
  return '/';
}

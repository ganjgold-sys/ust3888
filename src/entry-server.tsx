import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { RouteContext } from './routeContext';

/**
 * Рендер по адресу. Путь передаётся через контекст, а не подменой window:
 * подмена ломала motion и React, которые ожидают полноценный window.
 */
export function render(pathname = '/'): string {
  return renderToString(
    <RouteContext.Provider value={pathname}>
      <App />
    </RouteContext.Provider>
  );
}

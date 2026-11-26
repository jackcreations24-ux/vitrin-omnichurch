import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {ErrorBoundary} from './components/ErrorBoundary.tsx';
import {I18nProvider} from './i18n/I18nContext.tsx';
import './index.css';

const isDevEnv = Boolean((import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV);

if (isDevEnv && typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === 'string'
        ? reason
        : '';
    const stack = reason instanceof Error && reason.stack ? reason.stack : '';

    if (
      message.includes('WebSocket closed without opened') &&
      (stack.includes('@vite/client') || message === 'WebSocket closed without opened.')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>,
);

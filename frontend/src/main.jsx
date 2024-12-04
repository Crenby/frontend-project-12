import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './slices/index.js';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './rollbar/rollbarConfig.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const init =() => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

createRoot(document.getElementById('root')).render(init());

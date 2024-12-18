import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import App from './App.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';
import rollbarConfig from './rollbar/rollbarConfig.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { getMessages } from './slices/messagesSlice.js';
import { getChannels } from './slices/channelsSlice.js';
import chatApi from './chatApi.js';

const init = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const socket = io();

  function upDataChannels() {
    chatApi.getChannels()
      .then((response) => {
        store.dispatch(getChannels(response.data));
      });
  }

  socket.on('newMessage', () => {
    chatApi.getMessages()
      .then((response) => {
        store.dispatch(getMessages(response.data));
      });
  });

  socket.on('newChannel', () => {
    upDataChannels();
  });

  socket.on('removeChannel', () => {
    upDataChannels();
  });

  socket.on('renameChannel', () => {
    upDataChannels();
  });

  const root = createRoot(document.getElementById('root'));

  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

init();

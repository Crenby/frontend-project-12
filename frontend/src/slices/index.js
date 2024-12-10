import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './authorizationSlice.js';
import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';
import modalSlice from './modalsSlice.js';

export default configureStore({
  reducer: {
    authorization: authorizationSlice,
    channels: channelsSlice,
    messages: messagesSlice,
    modals: modalSlice,
  },
});

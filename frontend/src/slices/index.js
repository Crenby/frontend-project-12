import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './authorizationSlice.js';

export default configureStore({
  reducer: {
    authorization: authorizationSlice,
  },
});
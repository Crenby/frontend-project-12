import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: localStorage.getItem('userName'),
  userToken: localStorage.getItem('userToken'),
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    authorization: (state, { payload }) => ({
      userName: payload.name,
      userToken: payload.token,
    }),
  },
});

export const { authorization } = authorizationSlice.actions;

export default authorizationSlice.reducer;

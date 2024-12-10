import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  userToken: '',
  status: false,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    authorization: (state) => ({
        ...state,
        userName: localStorage.getItem('userName'),
        userToken: localStorage.getItem('userToken'),
    }),
    changeStatus: (state, { payload: status }) => ({ status }),
  },
});

export const { authorization, changeStatus } = authorizationSlice.actions;

export default authorizationSlice.reducer;

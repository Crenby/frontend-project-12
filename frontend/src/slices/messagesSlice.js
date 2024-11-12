import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, { payload: messages }) => {
      state.messages = messages;
    },
  },
});

export const { getMessages, setActiveChannel } = messagesSlice.actions;

export default messagesSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, { payload: messages }) => {
      /* state.messages = messages; */
      return { messages };
    },
    addMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { getMessages, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

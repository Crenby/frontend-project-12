import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannel: {
    name: 'general',
    channelId: '1',
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, { payload: channels }) => {
      state.channels = channels;
    },
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = { name: payload.name, channelId: payload.id };
    },
  },
});

export const { getChannels, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;

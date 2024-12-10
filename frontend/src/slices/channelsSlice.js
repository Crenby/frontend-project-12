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
    getChannels: (state, { payload: channels }) => ({
        ...state,
        'channels': channels,
    }),
    setActiveChannel: (state, { payload }) => {
      const newActiveChannel = { name: payload.name, channelId: payload.id };
      return {
        ...state,
        activeChannel: newActiveChannel,
      };
    },
  },
});

export const { getChannels, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;

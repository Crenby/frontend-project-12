import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addModal: false,
  renameModal: false,
  deleteModal: false
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setAddModalStatus: (state, { payload }) => ({ addModal: payload.status }),
    setRenameModalStatus: (state, { payload }) => ({ renameModal: payload.status }),
    setDeleteModalStatus: (state, { payload }) => ({ deleteModal: payload.status }),
  },
});

export const { setAddModalStatus, setRenameModalStatus, setDeleteModalStatus } = modalsSlice.actions;

export default modalsSlice.reducer;

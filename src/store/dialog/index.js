import { createSlice } from "@reduxjs/toolkit";
import { message } from 'message';

const initialState = {
  options: {
    title: message.title,
    content: '',
    closable: true,
    actions: [
      {
        label: 'NO',
        onClick: () => { }
      },
      {
        label: 'YES',
        onClick: () => { }
      }
    ]
  }
};

export const dialog = createSlice({
  name: "dialog",
  initialState: {
    ...initialState,
  },
  reducers: {
    openDialog: (state, { payload: config }) => {
      state.options = {
        ...state.options,
        ...config,
      };
    },
    closeDialog: (state) => {
      state.options = initialState.options;
    }
  }
});
export const { openDialog, closeDialog } = dialog.actions;
export const getDialog = state => state.dialog.options;
export default dialog.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: {
    title: '',
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
    openDialog: (state, { payload: options }) => {
      state.options = {
        ...state.options,
        ...options,
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
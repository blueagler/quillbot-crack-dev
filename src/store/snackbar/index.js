import { createSlice } from "@reduxjs/toolkit";

export const snackbar = createSlice({
  name: "snackbar",
  initialState: {
    notifications: [],
  },
  reducers: {
    enqueueSnackbar: (state, { payload: notification }) => {
      const key = notification.options && notification.options.key;
      state.notifications.push({
        key: key || new Date().getTime() + Math.random(),
        ...notification,
      })
    },
    closeSnackbar: (state, { payload: key }) => {
      state.notifications = state.notifications.map(notification => (
        (!key || notification.key === key)
          ? { ...notification, dismissed: true }
          : { ...notification }
      ));
    },
    removeSnackbar: (state, { payload: key }) => {
      state.notifications = state.notifications.filter(
        notification => notification.key !== key,
      )
    },
  }
});
export const { enqueueSnackbar, closeSnackbar, removeSnackbar } = snackbar.actions;
export const getNotifications = state => state.snackbar.notifications;
export default snackbar.reducer;
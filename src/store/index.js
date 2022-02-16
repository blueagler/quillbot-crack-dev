import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import { configureStore } from "@reduxjs/toolkit";

import announcement from './announcement';
import premium from './premium';
import dialog from './dialog';
import setting from './setting';
import snackbar from './snackbar';
import verify from './verify';
import userBanned from './userBanned';

const persist = (reducer, key, whiteList) => persistReducer({
  key,
  storage: storage('QuilBot-Premium-Ceack'),
  whitelist: whiteList ?? null,
}, reducer);

export const store = configureStore({
  reducer: {
    snackbar,
    dialog,
    userBanned: persist(userBanned, 'userBanned'),
    announcement: persist(announcement, 'announcement'),
    premium: persist(premium, 'premium'),
    setting: persist(setting, 'setting', ['disabled']),
    verify: persist(verify, 'verify'),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
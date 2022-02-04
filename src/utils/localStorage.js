
import { createLocalStorageStateHook } from 'use-local-storage-state';

const initialStorage = {
  settings: [
    {
      id: 'hook-premium',
      enabled: true,
      label: 'Hook Premium',
      description: 'Hook Premium',
    },
    {
      id: 'hook-premium-token',
      enabled: true,
      label: 'Unlock Paraphrase Modes (Testing)',
      description: 'Allow you to use premium paraphrase modes',
    },
    {
      id: 'full-editor',
      enabled: true,
      label: 'Full Editor',
      description: 'Full Editor',
    },
  ],
  announcement: {
    ignores: [],
  },

}

export const useStorage = createLocalStorageStateHook('QBC-storage', initialStorage);

export const getStorage = (key) => {
  let r;
  if (localStorage.getItem('QBC-storage')) {
    r = JSON.parse(localStorage.getItem('QBC-storage'));
    if (!r.hasOwnProperty(key)) {
      r[key] = initialStorage[key];
    }
  } else {
    r = initialStorage;
  }
  return [r[key], r];
}

export const getStorageEnable = (getId) => {

  const [settings, storage] = getStorage('settings');

  if (settings.find(({ id }) => id === getId)) {

    return settings.find(({ id }) => id === getId).enabled;

  } else {
    const newStorage = [
      ...settings,
      initialStorage.settings.find(({ id }) => id === getId)
    ];
    localStorage.setItem('QBC-storage', JSON.stringify({
      ...storage,
      settings: newStorage
    }));
    return newStorage.find(({ id }) => id === getId).enabled;

  }
}
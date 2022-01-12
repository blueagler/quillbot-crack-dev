
import { createLocalStorageStateHook } from 'use-local-storage-state';

const initialConfig = [
  {
    id: 'hook-premium',
    enabled: true,
    label: 'Hook Premium',
    description: 'Hook Premium',
  },
  {
    id: 'full-editor',
    enabled: true,
    label: 'Full Editor',
    description: 'Full Editor',
  },
];

export const useConfig = createLocalStorageStateHook('QBC-config', initialConfig);

export const getConfig = () => localStorage.getItem('QBC-config') ? JSON.parse(localStorage.getItem('QBC-config')) : initialConfig;
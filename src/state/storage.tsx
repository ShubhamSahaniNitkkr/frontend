import {MMKV} from 'react-native-mmkv';

export const tokenStorage = new MMKV({
  id: 'blinkIt-token-storage',
  encryptionKey: 'BLINKIT_TOKEN_STORAGE_KEY',
});

export const appStorage = new MMKV({
  id: 'blinkIt-app-storage',
  encryptionKey: 'BLINKIT_APP_STORAGE_KEY',
});

export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    appStorage.set(key, value);
  },
  getItem: (key: string) => {
    const value = appStorage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    appStorage.delete(key);
  },
};

import { useSyncExternalStore } from 'react';

// 1. Snapshot: Brauzerin cari vəziyyətini oxuyur
const getSnapshot = () => {
  return navigator.onLine;
};

// 2. Subscribe: Dəyişiklikləri dinləyir
const subscribe = (callback: () => void) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

export const useOnlineStatus = () => {
  return useSyncExternalStore(subscribe, getSnapshot);
};

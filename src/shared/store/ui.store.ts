import { APP } from '@shared/config/app.config.ts';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const storeName = `ui-storage-${APP.NAME}`;

interface UiState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,
        theme: 'light',
        toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: storeName,
        // partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
      },
    ),
  ),
);

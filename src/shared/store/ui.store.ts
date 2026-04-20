import { APP } from '@shared/config/app.config.ts';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const storeName = `ui-storage-${APP.NAME}`;

export type ThemePreference = 'light' | 'dark' | 'system';

interface UiState {
  isSidebarOpen: boolean;
  theme: ThemePreference;
  toggleSidebar: () => void;
  setTheme: (theme: ThemePreference) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,
        theme: 'system',
        toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: storeName,
        partialize: (state) => ({
          isSidebarOpen: state.isSidebarOpen,
          theme: state.theme,
        }),
      },
    ),
  ),
);

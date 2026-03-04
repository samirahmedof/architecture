import { APP } from '@shared/config/app.config.ts';
import type { UiState } from '@shared/store/store.types.ts';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const storeName = `ui-storage-${APP.NAME}`;

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

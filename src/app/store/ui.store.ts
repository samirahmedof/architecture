import type { UiState } from '@app/store/store';
import { APP } from '@core/config/app.config.ts';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const storeName = 'ui-storage-' + APP.NAME;

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
			}
		)
	)
);

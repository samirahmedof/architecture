import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'; // Persist: F5 verəndə yadda saxlayır

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
                isSidebarOpen: true, // Default açıq
                theme: 'light',

                toggleSidebar: () =>
                    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

                setTheme: (theme) => set({ theme }),
            }),
            {
                name: 'app-ui-storage', // localStorage-də bu adla düşəcək
                // isSidebarOpen-i yadda saxlamaq istəyirik, amma bəlkə theme-i yox?
                // partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
            }
        )
    )
);
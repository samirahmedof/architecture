import type { AuthState } from '@app/store/store';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    clearAuth: () => set({ accessToken: null }),
  })),
);

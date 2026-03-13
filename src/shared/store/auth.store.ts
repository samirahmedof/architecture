import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    clearAuth: () => set({ accessToken: null }),
  })),
);

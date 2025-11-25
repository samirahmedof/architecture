import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        isAuthenticated: false,

        login: (user) => set({ user, isAuthenticated: true }),

        // Logout olanda state-i təmizləyirik (Cookie-ni API siləcək)
        logout: () => set({ user: null, isAuthenticated: false }),
    }))
);
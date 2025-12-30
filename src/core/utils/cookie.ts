const TOKEN_KEY = 'sima_auth_token';

export const cookieUtils = {
    // Cookie-dən tokeni oxuyur
    getToken: (): string | null => {
        const match = document.cookie.match(new RegExp(`(^| )${TOKEN_KEY}=([^;]+)`));
        return match?.[2] ?? null;
    },

    // Tokeni cookie-yə yazır (Backend simulyasiyası üçün)
    setToken: (token: string) => {
        // path=/ vacibdir ki, bütün saytda görünsün
        document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Lax`;
    },

    // Cookie-ni silir (Logout)
    deleteToken: () => {
        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    },

    // Yoxlayır
    isAuthenticated: () => {
        return !!cookieUtils.getToken();
    },
};

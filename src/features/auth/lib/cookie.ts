const TOKEN_KEY = 'sima_auth_token';

export const cookieUtils = {
  getToken: (): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${TOKEN_KEY}=([^;]+)`));
    return match?.[2] ?? null;
  },

  setToken: (token: string) => {
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Lax`;
  },

  deleteToken: () => {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  },

  isAuthenticated: () => {
    return !!cookieUtils.getToken();
  },
};

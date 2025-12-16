export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  USERS: {
    LIST: '/users',
    BY_ID: (id: number | string) => `/users/${id}`,
    UPDATE_PASSWORD: (id: number | string) => `/users/${id}/password`,
  },
  POSTS: {
    LIST: '/posts',
    BY_ID: (id: number) => `/posts/${id}`,
  },
  // Upload kimi ümumi şeylər
  COMMON: {
    UPLOAD: '/media/upload',
  },
} as const;

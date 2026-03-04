export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  POSTS: {
    LIST: '/posts',
    BY_ID: (id: number) => `/posts/${id}`,
  },

  COMMON: {
    UPLOAD: '/media/upload',
  },
} as const;

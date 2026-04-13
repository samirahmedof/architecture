export const POST_ENDPOINTS = {
  LIST: '/posts',
  BY_ID: (id: number) => `/posts/${id}`,
} as const;

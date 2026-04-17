import { ENV } from '@shared/config/env.config.ts';
import { useAuthStore } from '@shared/store/auth.store.ts';
import ky from 'ky';
import { refreshTokenHook } from './refresh-token.ts';

export const api = ky.create({
  baseUrl: ENV.BASE_URL,
  timeout: 15000,
  credentials: 'include',
  retry: {
    limit: 1,
    statusCodes: [401],
    methods: ['get', 'post', 'put', 'patch', 'delete'],
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = useAuthStore.getState().accessToken;
        if (token) request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
    beforeRetry: [refreshTokenHook],
  },
});

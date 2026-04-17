import { ENDPOINTS } from '@shared/config/endpoints.config.ts';
import { ENV } from '@shared/config/env.config.ts';
import { useAuthStore } from '@shared/store/auth.store.ts';
import ky, { type BeforeRetryHook, isHTTPError } from 'ky';

let refreshPromise: Promise<string> | null = null;

const performRefresh = async (): Promise<string> => {
  const data = await ky
    .post(ENDPOINTS.AUTH.REFRESH, {
      baseUrl: ENV.BASE_URL,
      credentials: 'include',
      retry: { limit: 0 },
    })
    .json<{ accessToken: string }>();
  useAuthStore.getState().setAccessToken(data.accessToken);
  return data.accessToken;
};

export const refreshTokenHook: BeforeRetryHook = async ({ request, error, retryCount }) => {
  if (!isHTTPError(error) || error.response.status !== 401 || retryCount > 1) {
    return;
  }
  try {
    refreshPromise ??= performRefresh();
    const newToken = await refreshPromise;
    request.headers.set('Authorization', `Bearer ${newToken}`);
  } catch (refreshErr) {
    useAuthStore.getState().clearAuth();
    window.location.href = '/';
    throw refreshErr;
  } finally {
    refreshPromise = null;
  }
};

import { PATHS } from '@app/router/paths.router.ts';
import { useAuthStore } from '@app/store/auth.store';
import { ENDPOINTS } from '@core/config/endpoints.config.ts';
import { ENV } from '@core/config/env.config';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// make it dynamic
const refreshClient = axios.create({
  baseURL: ENV.BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token) prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const refreshTokenLogic = async (
  originalRequest: AxiosRequestConfig,
  instance: AxiosInstance,
) => {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instance(originalRequest);
      })
      .catch((err) => Promise.reject(err));
  }

  // @ts-expect-error
  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const { data } = await refreshClient.post(ENDPOINTS.AUTH.REFRESH);
    const newAccessToken = data.accessToken;

    useAuthStore.getState().setAccessToken(newAccessToken);

    processQueue(null, newAccessToken);

    if (!originalRequest.headers) originalRequest.headers = {};
    originalRequest.headers.Authorization = `Bearer {newAccessToken}`;

    return instance(originalRequest);
  } catch (error) {
    processQueue(error, null);
    useAuthStore.getState().clearAuth();

    window.location.href = PATHS.LOGIN;

    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};

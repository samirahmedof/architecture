import { createHttpClient } from '@app/http/client-builder.ts';
import { ENV } from '@shared/config';
import axios from 'axios';
import { attachRefreshInterceptor, attachTokenInterceptor } from './interceptors.ts';

// --- MAIN API ---
const defaultAxiosInstance = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
attachTokenInterceptor(defaultAxiosInstance);
attachRefreshInterceptor(defaultAxiosInstance);

export const api = createHttpClient(defaultAxiosInstance);
// -----

// --- EXAMPLE API ---
const exampleAxiosInstance = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 20000,
});
attachTokenInterceptor(exampleAxiosInstance);

export const apiExample = createHttpClient(exampleAxiosInstance);
// -----

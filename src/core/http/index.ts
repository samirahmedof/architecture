import { ENV } from '@core/config/env.config';
import axios from 'axios';
import {
  attachErrorInterceptor,
  attachRefreshInterceptor,
  attachTokenInterceptor,
} from './interceptors';

// --- MAIN API ---
export const api = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

attachTokenInterceptor(api);
attachRefreshInterceptor(api);
attachErrorInterceptor(api);

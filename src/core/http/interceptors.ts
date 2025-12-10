import { useAuthStore } from '@app/store/auth.store';
import type { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'sonner';
import { refreshTokenLogic } from './refresh-token.ts';

// Request
export const attachTokenInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.request.use((config) => {
		const token = useAuthStore.getState().accessToken;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});
};

// Refresh Logic
export const attachRefreshInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response?.status === 401 && !error.config._retry) {
				return refreshTokenLogic(error.config, instance);
			}
			return Promise.reject(error);
		}
	);
};

// Error Handling
export const attachErrorInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.response.use(
		(response) => response,
		(error: AxiosError<any>) => {
			if (!error.response) {
				toast.error('Connection to server lost. Please check your internet.');
				return Promise.reject(error);
			}

			const { status } = error.response;
			if (status !== 401 && status !== 422 && status !== 404) {
				const message =
					error.response.data?.message || 'An unexpected error occurred. Please try again.';
				toast.error(`Error (${status}): ${message}`);
			}

			return Promise.reject(error);
		}
	);
};

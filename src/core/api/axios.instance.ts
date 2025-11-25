import axios, {type AxiosError} from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {

        if (error.response?.status === 401) {
            console.error('Sessiya bitdi');
        }
        return Promise.reject(error);
    }
);
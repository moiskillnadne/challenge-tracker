import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { authService } from './auth.service';
import { EventEmitter } from '../lib/EventEmitter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestConfig = AxiosRequestConfig<any> & {
  retry?: boolean;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.withCredentials = true;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error?.config as RequestConfig;

    if (error.response?.status === 401 && !config?.retry) {
      config.retry = true;

      try {
        await authService.refreshToken();
      } catch (e) {
        console.error('User authentication failed');
        EventEmitter.emit('refreshTokenExpired');

        await Promise.reject(e);
      }

      return api(config);
    }

    return Promise.reject(error);
  },
);

import { api } from './api';

type LoginPayload = {
  email: string;
};

type ConfirmLogin = {
  email: string;
  code: string;
};

function createAuthService() {
  return {
    login: (payload: LoginPayload) => {
      return api.post('/auth/login', payload);
    },
    confirmLogin: (payload: ConfirmLogin) => {
      return api.post('/auth/confirm-login', payload);
    },
    logout: () => {
      return api.post('/auth/logout');
    },
    refreshToken: () => {
      return api.post('/auth/refresh-token');
    },
  };
}

export const authService = createAuthService();

import {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/types';
import { api } from './api';

type LoginPayload = {
  email: string;
};

type ConfirmLogin = {
  email: string;
  code: string;
};

type GenerateChallengeBody = {
  user: {
    id: string;
    email: string;
  };
};

export interface AuthVerifyRequest {
  email: string;
  rawId: number[];
  response: {
    clientDataJSON: string;
    authenticatorData: string;
    signature: string;
  };
}

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

    generateChallenge: (payload: GenerateChallengeBody) => {
      return api.post<PublicKeyCredentialCreationOptionsJSON>(
        '/protected/passkeys/register',
        payload,
      );
    },
    verifyChallenge: (payload: RegistrationResponseJSON) => {
      return api.post('/protected/passkeys/verify-registration', payload);
    },
    generateLoginChallenge: (email: string) => {
      return api.post('/webauth/login-challenge', { email });
    },
    verifyLoginChallenge: (payload: AuthVerifyRequest) => {
      return api.post('/webauth/login-verify', payload);
    },
  };
}

export const authService = createAuthService();

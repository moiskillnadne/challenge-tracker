import {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
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

export interface VerifyLoginChallenge {
  email: string;
  challengeResponse: AuthenticationResponseJSON;
}

export type GenerateLoginChallengeResponse = {
  success: boolean;
  data: PublicKeyCredentialRequestOptionsJSON;
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

    registerKeys: () => {
      return api.post<PublicKeyCredentialCreationOptionsJSON>(
        '/protected/passkeys/generate-registration-options',
      );
    },
    verifyRegistration: (payload: RegistrationResponseJSON) => {
      return api.post('/protected/passkeys/verify-registration', payload);
    },
    authenticateKeys: (email: string) => {
      return api.post<GenerateLoginChallengeResponse>(
        '/protected/passkeys/generate-authentication-options',
        { email },
      );
    },
    verifyAuthentication: (payload: VerifyLoginChallenge) => {
      return api.post('/protected/passkeys/verify-authentication', payload);
    },
  };
}

export const authService = createAuthService();

import { api } from './api';
import { SuccessResponse } from './types';

export type UserDTO = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
};

function createAccountService() {
  return {
    getAccountInfo: () => {
      return api.get<SuccessResponse<Record<'user', UserDTO>>>('/protected/user');
    },
  };
}

export const accountService = createAccountService();

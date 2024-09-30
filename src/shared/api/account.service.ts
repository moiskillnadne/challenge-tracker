import { api } from './api';

type SuccessResponse<T> = {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  type: string;
  details: T;
};

type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
};

function createAccountService() {
  return {
    getAccountInfo: () => {
      return api.get<SuccessResponse<Record<'user', User>>>('/protected/user');
    },
  };
}

export const accountService = createAccountService();

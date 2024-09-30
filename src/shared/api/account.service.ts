import { api } from './api';

type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
};

function createAccountService() {
  return {
    getAccountInfo: () => {
      return api.get<User>('/protected/user');
    },
  };
}

export const accountService = createAccountService();

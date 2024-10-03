import { useQuery } from '@tanstack/react-query';
import { accountService, UserDTO } from '../../../shared/api/account.service';
import { AxiosError } from 'axios';

type Return = {
  isLoading: boolean;
  isAuthenticated: boolean;

  user: UserDTO | null;
};

export const useAuthenticated = (): Return => {
  const query = useQuery({
    queryKey: ['/protected/me'],
    queryFn: accountService.getAccountInfo,
    select(data) {
      return data.data.details;
    },
    retry(failureCount, error) {
      console.log(error);

      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        return false;
      }

      return failureCount < 4;
    },
  });

  return {
    isLoading: query.isLoading,
    isAuthenticated: !!query.data?.user.email,

    user: query.data?.user ?? null,
  };
};

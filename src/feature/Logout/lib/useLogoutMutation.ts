import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../shared/api/auth.service';

type Params = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useLogoutMutation = (params?: Params) => {
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      console.info('[Logout:onSuccess]');

      if (params?.onSuccess) {
        params.onSuccess();
      }
    },
    onError: (error: Error) => {
      console.error('[Logout:onError]', error);

      if (params?.onError) {
        params.onError(error);
      }
    },
  });
};

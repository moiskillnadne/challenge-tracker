import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../shared/api/auth.service';

type Props = {
  onError?: (err: unknown) => void;
  onSuccess?: (data: unknown) => void;

  loginIfNoCredentials?: (email: string) => void;
};

export const useAuthenticateViaPasskeys = (props?: Props) => {
  // const verifyLoginChallenge = useMutation({
  //   mutationFn: authService.verifyAuthentication,
  //   onSuccess: (data) => {
  //     console.info('[VerifyLoginChallenge:onSuccess]', data);
  //   },
  //   onError: (err) => {
  //     console.info(`[VerifyLoginChallenge:onError]: ${JSON.stringify(err)}`);
  //   },
  // });

  return useMutation({
    mutationFn: authService.authenticateKeys,
    onSuccess: async () => {
      // console.info('[GenerateLoginChallenge:onSuccess]', resp);
      // const options = resp.data.options;
      // if (options.allowCredentials && options.allowCredentials.length < 1) {
      //   if (props?.loginIfNoCredentials) {
      //     props.loginIfNoCredentials(variables);
      //   }
      //   return;
      // }
      // try {
      //   console.log('Passkey options', options);
      //   const result = await startAuthentication({ optionsJSON: options });
      //   console.log(result);
      //   verifyLoginChallenge.mutate({
      //     email: variables,
      //     challengeResponse: result,
      //   });
      // } catch (error: unknown) {
      //   console.error(error);
      // }
    },
    onError: (err) => {
      console.error(`[GenerateLoginChallenge:onError]: ${JSON.stringify(err)}`);

      if (props?.onError) {
        props.onError(err);
      }
    },
  });
};

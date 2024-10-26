import { useMutation } from '@tanstack/react-query';
import { authService } from '../../shared/api/auth.service';
import { startAuthentication } from '@simplewebauthn/browser';
import { isPublicKeyCredentialSupported } from '../../shared/lib';

export const AuthorizePasskeys = () => {
  const verifyLoginChallenge = useMutation({
    mutationFn: authService.verifyAuthentication,
    onSuccess: (data) => {
      console.info('[VerifyLoginChallenge:onSuccess]', data);
    },
    onError: (err) => {
      console.info(`[VerifyLoginChallenge:onError]: ${JSON.stringify(err)}`);
    },
  });

  const generateLoginChallenge = useMutation({
    mutationFn: authService.authenticateKeys,
    onSuccess: async (resp, variables) => {
      console.info('[GenerateLoginChallenge:onSuccess]', resp);

      const options = resp.data.options;

      try {
        console.log('Passkey options', options);
        const result = await startAuthentication({ optionsJSON: options });

        console.log(result);
        verifyLoginChallenge.mutate({
          email: variables,
          challengeResponse: result,
        });
      } catch (error: unknown) {
        console.error(error);
      }
    },
    onError: (err) => {
      console.info(`[GenerateLoginChallenge:onError]: ${JSON.stringify(err)}`);
    },
  });

  const loginChallenge = async () => {
    const isSupported = await isPublicKeyCredentialSupported();

    if (!isSupported) {
      return console.error('WebAuthn is not supported');
    }

    generateLoginChallenge.mutate('vitya.ryabkov@gmail.com');
  };

  return (
    <button
      className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
      onClick={loginChallenge}
    >
      Login via passkey
    </button>
  );
};

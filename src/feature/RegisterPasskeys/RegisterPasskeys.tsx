import { useMutation } from '@tanstack/react-query';
import { authService } from '../../shared/api/auth.service';
import { startRegistration } from '@simplewebauthn/browser';
import { isPublicKeyCredentialSupported } from '../../shared/lib';

export const RegisterPasskeys = () => {
  const verifyChallenge = useMutation({
    mutationFn: authService.verifyRegistration,
    onSuccess: (data) => {
      console.info('[VerifyChallenge:onSuccess]', data);
    },
    onError: (err) => {
      console.info(`[VerifyChallenge:onError]: ${JSON.stringify(err)}`);
    },
  });

  const generateChallengeMutation = useMutation({
    mutationFn: authService.registerKeys,
    onSuccess: async (result) => {
      console.info('[GenerateChallenge:onSuccess]', result);

      const options = structuredClone(result.data);

      try {
        console.log(options);
        const attResult = await startRegistration({ optionsJSON: options });

        verifyChallenge.mutate(attResult);
      } catch (error: unknown) {
        console.error(error);
      }
    },
    onError: (err) => {
      console.info(`[GenerateChallenge:onError]: ${JSON.stringify(err)}`);
    },
  });

  const createChallenge = async () => {
    const isSupported = await isPublicKeyCredentialSupported();

    if (!isSupported) {
      return console.error('WebAuthn is not supported');
    }

    generateChallengeMutation.mutate();
  };

  return (
    <button
      className="duration-300 bg-blue-500 text-black/50 rounded-full h-full hover:text-black/75"
      onClick={createChallenge}
    >
      Create passkey
    </button>
  );
};

import { useMutation } from '@tanstack/react-query';
import { authService } from '../../shared/api/auth.service';
import { isPublicKeyCredentialSupported } from '../../shared/lib';
import { startRegistration } from '@simplewebauthn/browser';

export const PasskeysManager = () => {
  const verifyChallenge = useMutation({
    mutationFn: authService.verifyChallenge,
    onSuccess: (data) => {
      console.info('[VerifyChallenge:onSuccess]', data);
    },
    onError: (err) => {
      console.info(`[VerifyChallenge:onError]: ${JSON.stringify(err)}`);
    },
  });

  const generateChallengeMutation = useMutation({
    mutationFn: authService.generateChallenge,
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

  // const verifyLoginChallenge = useMutation({
  //   mutationFn: authService.verifyLoginChallenge,
  //   onSuccess: (data) => {
  //     console.info('[VerifyLoginChallenge:onSuccess]', data);
  //   },
  //   onError: (err) => {
  //     console.info(`[VerifyLoginChallenge:onError]: ${JSON.stringify(err)}`);
  //   },
  // });

  const generateLoginChallenge = useMutation({
    mutationFn: authService.generateLoginChallenge,
    onSuccess: async (data) => {
      console.info('[GenerateLoginChallenge:onSuccess]', data);
    },
    onError: (err) => {
      console.info(`[GenerateLoginChallenge:onError]: ${JSON.stringify(err)}`);
    },
  });

  const createChallenge = async () => {
    const isSupported = await isPublicKeyCredentialSupported();

    if (!isSupported) {
      return console.error('WebAuthn is not supported');
    }

    generateChallengeMutation.mutate({
      user: {
        id: '1',
        email: 'vitya.ryabkov@gmail.com',
      },
    });
  };

  const loginChallenge = async () => {
    const isSupported = await isPublicKeyCredentialSupported();

    if (!isSupported) {
      return console.error('WebAuthn is not supported');
    }

    generateLoginChallenge.mutate('vitya.ryabkov@gmail.com');
  };

  return (
    <div className="p-[12px]">
      <h1>Passkeys Manager</h1>
      <p>Manage your passkeys</p>

      <div className="flex flex-col gap-[12px]">
        <button
          className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
          onClick={createChallenge}
        >
          Create passkey
        </button>

        <button
          className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
          onClick={loginChallenge}
        >
          Login via passkey
        </button>
      </div>
    </div>
  );
};

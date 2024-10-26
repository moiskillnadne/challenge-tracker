import { isPublicKeyCredentialSupported } from '../../shared/lib';
import { useAuthenticateViaPasskeys } from './lib/useAuthenticateViaPasskeys';

export const AuthorizePasskeys = () => {
  const passkeysMutation = useAuthenticateViaPasskeys();

  const loginChallenge = async () => {
    const isSupported = await isPublicKeyCredentialSupported();

    if (!isSupported) {
      return console.error('WebAuthn is not supported');
    }

    passkeysMutation.mutate('vitya.ryabkov@gmail.com');
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

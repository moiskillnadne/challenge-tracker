import z from 'zod';
import { useState } from 'react';
import { useCustomTranslation } from '../../../feature/translation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../shared/api/auth.service';
import { RightArrow } from '../../../shared/ui';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../shared/constants';
import { useAuthenticateViaPasskeys } from '../../../feature/AuthorizePasskeys/lib/useAuthenticateViaPasskeys';
import { browserSupportsWebAuthn, startAuthentication } from '@simplewebauthn/browser';

const emailSchema = z.string().email();

const codeSchema = z.string().regex(/^\d{6}$/, { message: 'Код должен содержать ровно 6 цифр' });

export const LoginWidget = () => {
  const { t } = useCustomTranslation();

  const navigate = useNavigate();

  const codeInputVisibility = new Map([
    [true, '40px'],
    [false, '0px'],
  ]);

  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.info('[LoginMutation:onSuccess]', data);
    },
    onError: (err) => {
      console.error(`[LoginMutation:onError] ${JSON.stringify(err)}`);
    },
  });

  const verifyLoginChallenge = useMutation({
    mutationFn: authService.verifyAuthentication,
    onSuccess: (data) => {
      console.info('[VerifyLoginChallenge:onSuccess]', data);
    },
    onError: (err) => {
      console.info(`[VerifyLoginChallenge:onError]: ${JSON.stringify(err)}`);
    },
  });

  const codeMutation = useMutation({
    mutationFn: authService.confirmLogin,
    onSuccess: (data) => {
      console.info('[CodeMutation:onSuccess]', data);

      return navigate(Routes.HOME);
    },
    onError: (err) => {
      console.info(`[CodeMutation:onError]: ${JSON.stringify(err)}`);
    },
  });

  const passkeysMutation = useAuthenticateViaPasskeys({
    loginIfNoCredentials: (email: string) => {
      console.info(`[LoginWidget:passkeysMutation] No credentials for: ${email}`);
    },
  });

  const isEmailSent = loginMutation.isSuccess && !!loginMutation.data;

  const authenticateViaOTP = () => {
    const safeParse = emailSchema.safeParse(email);

    if (safeParse.error) {
      throw new Error(JSON.stringify(safeParse.error));
    }

    if (!browserSupportsWebAuthn()) {
      throw new Error('WebAuthn is not supported');
    }

    console.info(`[LoginWidget:authentication] User: ${safeParse.data}`);
    loginMutation.mutate({
      email: safeParse.data,
    });
  };

  const authenticateViaPasskeys = async () => {
    const safeParse = emailSchema.safeParse(email);

    if (safeParse.error) {
      throw new Error(JSON.stringify(safeParse.error));
    }

    if (!browserSupportsWebAuthn()) {
      throw new Error('WebAuthn is not supported');
    }

    const response = await passkeysMutation.mutateAsync(safeParse.data);

    console.log(`[LoginWidget:authenticateViaPasskeys] Response: ${JSON.stringify(response)}`);

    const challengeOpts = response.data.options;

    console.log(
      `[LoginWidget:authenticateViaPasskeys] Challenge options: ${JSON.stringify(challengeOpts)}`,
    );

    const isCredentialExist =
      challengeOpts.allowCredentials && challengeOpts.allowCredentials.length > 0;

    if (isCredentialExist) {
      const result = await startAuthentication({ optionsJSON: challengeOpts });

      console.log(`[LoginWidget:authenticateViaPasskeys] Result: ${JSON.stringify(result)}`);

      verifyLoginChallenge.mutate({
        email: safeParse.data,
        challengeResponse: result,
      });
    }
  };

  const confirmLogin = () => {
    if (!isEmailSent) {
      throw new Error('Email should be sent first');
    }

    const emailSafeParse = emailSchema.safeParse(email);

    if (emailSafeParse.error) {
      throw new Error(JSON.stringify(emailSafeParse.error));
    }

    const codeSafeParse = codeSchema.safeParse(code);

    if (codeSafeParse.error) {
      throw new Error(JSON.stringify(codeSafeParse.error));
    }

    codeMutation.mutate({ email, code });
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-[8px] mb-[64px]">
        <h2 className="text-white font-bold text-[32px]">{t('login')}</h2>

        <input
          type="email"
          name="email"
          id="input-email"
          placeholder="email"
          className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-white/50 border-b-2 border-black hover:border-white/20 focus:border-white/50 text-white w-[300px]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div
          className="overflow-hidden duration-300"
          style={{ height: `${codeInputVisibility.get(loginMutation.isSuccess)}` }}
        >
          <input
            type="text"
            name="code"
            id="input-code"
            placeholder="code"
            className={`bg-transparent focus:outline-none duration-300 h-[40px] placeholder-white/50 border-b-2 border-black hover:border-white/20 focus:border-white/50 text-white w-[300px]`}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="h-[40px] flex flex-col gap-[6px]">
          <button
            className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
            onClick={isEmailSent ? confirmLogin : authenticateViaOTP}
          >
            {loginMutation.isPending || codeMutation.isPending ? (
              <div className="animate-spin h-[32px] w-[32px] border-[2px] rounded-full border-white/50 border-t-white"></div>
            ) : (
              <span className="flex items-center">
                <p className="w-[150px]">{isEmailSent ? t('login') : t('sendCode')}</p>{' '}
                <div className="w-[32px] h-[32px]">
                  <RightArrow />
                </div>
              </span>
            )}
          </button>

          {browserSupportsWebAuthn() && localStorage.getItem('passkeys_debug') === 'enabled' && (
            <button
              className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
              onClick={authenticateViaPasskeys}
            >
              {passkeysMutation.isPending ? (
                <div className="animate-spin h-[32px] w-[32px] border-[2px] rounded-full border-white/50 border-t-white"></div>
              ) : (
                <span className="flex items-center">
                  <p className="w-[200px]">Login with passkeys</p>{' '}
                  <div className="w-[32px] h-[32px]">
                    <RightArrow />
                  </div>
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="w-[350px] px-[12px]">
        <p className="text-white/75 text-center">
          {isEmailSent ? t('enterCodeFromEmail') : t('enterEmailForCode')}
        </p>
      </div>
    </div>
  );
};

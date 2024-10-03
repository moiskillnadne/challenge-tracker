import z from 'zod';
import { useState } from 'react';
import { LanguageSwitcher, useCustomTranslation } from '../../../feature/translation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../shared/api/auth.service';
import { RightArrow } from '../../../shared/ui';
import { useNavigate } from 'react-router-dom';

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

  const codeMutation = useMutation({
    mutationFn: authService.confirmLogin,
    onSuccess: (data) => {
      console.info('[CodeMutation:onSuccess]', data);

      return navigate('/account');
    },
    onError: (err) => {
      console.info(`[CodeMutation:onError]: ${JSON.stringify(err)}`);
    },
  });

  const isEmailSent = loginMutation.isSuccess && !!loginMutation.data;

  const sendCodeForLogin = () => {
    const safeParse = emailSchema.safeParse(email);

    if (safeParse.error) {
      throw new Error(JSON.stringify(safeParse.error));
    }

    console.log(safeParse.data);

    loginMutation.mutate({
      email: safeParse.data,
    });
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
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="absolute top-0 right-0">
        <LanguageSwitcher />
      </div>

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

        <div className="h-[40px] flex gap-[6px]">
          <button
            className="duration-300 bg-blue-500 text-white/50 rounded-full h-full hover:text-white/75"
            onClick={isEmailSent ? confirmLogin : sendCodeForLogin}
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

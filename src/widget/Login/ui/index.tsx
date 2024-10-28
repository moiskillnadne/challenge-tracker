import { useCallback, useState } from 'react'

import { browserSupportsWebAuthn, startAuthentication } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import z from 'zod'

import { LoginButton } from './LoginButton'
import { LoginHeader } from './LoginHeader'

import { useAuthenticateViaPasskeys } from '~/feature/AuthorizePasskeys/lib/useAuthenticateViaPasskeys'
import { useCustomTranslation } from '~/feature/translation'
import { authService } from '~/shared/api/auth.service'
import { Routes } from '~/shared/constants'

const emailSchema = z.string().email()

const codeSchema = z.string().regex(/^\d{6}$/, { message: 'Код должен содержать ровно 6 цифр' })

export const LoginWidget = () => {
  const { t } = useCustomTranslation()

  const navigate = useNavigate()

  const codeInputVisibility = new Map([
    [true, '40px'],
    [false, '0px'],
  ])

  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [loginFlow, setLoginFlow] = useState<'otp' | 'passkeys' | null>(null)

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.info('[LoginMutation:onSuccess]', data)
    },
    onError: (err) => {
      console.error(`[LoginMutation:onError] ${JSON.stringify(err)}`)
    },
  })

  const verifyLoginChallenge = useMutation({
    mutationFn: authService.verifyAuthentication,
    onError: (err) => {
      console.info(`[VerifyLoginChallenge:onError]: ${JSON.stringify(err)}`)
    },
  })

  const codeMutation = useMutation({
    mutationFn: authService.confirmLogin,
    onSuccess: (data) => {
      console.info('[CodeMutation:onSuccess]', data)

      return navigate(Routes.HOME)
    },
    onError: (err) => {
      console.info(`[CodeMutation:onError]: ${JSON.stringify(err)}`)
    },
  })

  const passkeysMutation = useAuthenticateViaPasskeys({
    loginIfNoCredentials: (email: string) => {
      console.info(`[LoginWidget:passkeysMutation] No credentials for: ${email}`)
    },
  })

  const isEmailSent = loginMutation.isSuccess && !!loginMutation.data

  const confirmLogin = () => {
    if (!isEmailSent) {
      throw new Error('Email should be sent first')
    }

    const emailSafeParse = emailSchema.safeParse(email)

    if (emailSafeParse.error) {
      throw new Error(JSON.stringify(emailSafeParse.error))
    }

    const codeSafeParse = codeSchema.safeParse(code)

    if (codeSafeParse.error) {
      throw new Error(JSON.stringify(codeSafeParse.error))
    }

    codeMutation.mutate({ email, code })
  }

  const handleLogin = useCallback(async () => {
    const safeParse = emailSchema.safeParse(email)

    if (safeParse.error) {
      throw new Error(JSON.stringify(safeParse.error))
    }

    if (!browserSupportsWebAuthn()) {
      setLoginFlow('otp')
      return loginMutation.mutate({
        email: safeParse.data,
      })
    }

    const response = await passkeysMutation.mutateAsync(safeParse.data)

    const challengeOpts = response.data.options

    const isCredentialExist =
      challengeOpts.allowCredentials && challengeOpts.allowCredentials.length > 0

    if (!isCredentialExist) {
      setLoginFlow('otp')
      return loginMutation.mutate({
        email: safeParse.data,
      })
    }

    const result = await startAuthentication({ optionsJSON: challengeOpts })

    setLoginFlow('passkeys')
    const verifyResult = await verifyLoginChallenge.mutateAsync({
      email: safeParse.data,
      challengeResponse: result,
    })

    if (verifyResult.data.success) {
      return navigate(Routes.HOME)
    }
  }, [email, passkeysMutation, verifyLoginChallenge, loginMutation, navigate])

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-col items-center gap-[8px] mb-[64px]">
        <LoginHeader />

        <input
          type="email"
          name="email"
          id="input-email"
          placeholder="email"
          autoComplete="email"
          className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-black/50 border-b-2 border-black hover:border-black/20 focus:border-black/50 w-[300px]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div
          className="overflow-hidden duration-300"
          style={{ height: `${codeInputVisibility.get(loginFlow === 'otp')}` }}
        >
          <input
            type="text"
            name="code"
            id="input-code"
            placeholder="code"
            className={`bg-transparent focus:outline-none duration-300 h-[40px] placeholder-black/50 border-b-2 border-black hover:border-black/20 focus:border-black/50 w-[300px]`}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <LoginButton
          labelKey={'login'}
          onClick={isEmailSent ? confirmLogin : handleLogin}
          isLoading={
            passkeysMutation.isPending ||
            loginMutation.isPending ||
            verifyLoginChallenge.isPending ||
            codeMutation.isPending
          }
        />
      </div>

      <div className="w-[350px] px-[12px]">
        <p className="text-black/75 text-center">
          {isEmailSent ? t('enterCodeFromEmail') : t('enterEmailForCode')}
        </p>
      </div>
    </div>
  )
}

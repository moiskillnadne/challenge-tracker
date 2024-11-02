import { useCallback, useState } from 'react'

import { browserSupportsWebAuthn, startAuthentication } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import z from 'zod'

import { LoginButton } from './LoginButton'
import { LoginHeader } from './LoginHeader'

import { useAuthenticateViaPasskeys } from '~/feature/AuthorizePasskeys/'
import { useOTPLogin } from '~/feature/LoginOTP'
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

  const { tryLogin, confirmLogin, loadingState, mutationState } = useOTPLogin({
    onCodeSuccess: () => {
      return navigate(Routes.HOME)
    },
  })

  const verifyLoginChallenge = useMutation({
    mutationFn: authService.verifyAuthentication,
    onError: (err) => {
      console.info(`[VerifyLoginChallenge:onError]: ${JSON.stringify(err)}`)
    },
  })

  const passkeysMutation = useAuthenticateViaPasskeys({
    loginIfNoCredentials: (email: string) => {
      console.info(`[LoginWidget:passkeysMutation] No credentials for: ${email}`)
    },
  })

  const isEmailSent = mutationState.loginMutation.isSuccess && !!mutationState.loginMutation.data

  const processEmailValue = useCallback(() => {
    const safeParse = emailSchema.safeParse(email)

    if (safeParse.error) {
      throw new Error(JSON.stringify(safeParse.error))
    }

    return safeParse.data
  }, [email])

  const loginOTP = useCallback(async () => {
    const emailValue = processEmailValue()

    tryLogin(emailValue)
  }, [tryLogin, processEmailValue])

  const confirmLoginOTP = useCallback(() => {
    if (!isEmailSent) {
      throw new Error('Email should be sent first')
    }

    const emailValue = processEmailValue()

    const codeSafeParse = codeSchema.safeParse(code)

    if (codeSafeParse.error) {
      throw new Error(JSON.stringify(codeSafeParse.error))
    }

    confirmLogin(emailValue, codeSafeParse.data)
  }, [code, confirmLogin, isEmailSent, processEmailValue])

  const loginPasskeys = useCallback(async () => {
    const emailValue = processEmailValue()

    const response = await passkeysMutation.mutateAsync(emailValue)

    const challengeOpts = response.data.options

    const isCredentialExist =
      challengeOpts.allowCredentials && challengeOpts.allowCredentials.length > 0

    if (!isCredentialExist) {
      throw new Error('No credentials found')
    }

    const result = await startAuthentication({ optionsJSON: challengeOpts })

    const verifyResult = await verifyLoginChallenge.mutateAsync({
      email: emailValue,
      challengeResponse: result,
    })

    if (verifyResult.data.success) {
      return navigate(Routes.HOME)
    }
  }, [navigate, passkeysMutation, processEmailValue, verifyLoginChallenge])

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
          style={{ height: `${codeInputVisibility.get(mutationState.loginMutation.isSuccess)}` }}
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
          onClick={isEmailSent ? confirmLoginOTP : loginOTP}
          isDisabled={passkeysMutation.isPending || verifyLoginChallenge.isPending}
          isLoading={loadingState.isTryLoginLoading || loadingState.isConfirmLoginLoading}
        />

        {browserSupportsWebAuthn() && (
          <LoginButton
            labelKey={'fastLogin'}
            onClick={loginPasskeys}
            isDisabled={loadingState.isTryLoginLoading || loadingState.isConfirmLoginLoading}
            isLoading={passkeysMutation.isPending || verifyLoginChallenge.isPending}
          />
        )}
      </div>

      <div className="w-[350px] px-[12px]">
        <p className="text-black/75 text-center">
          {isEmailSent ? t('enterCodeFromEmail') : t('enterEmailForCode')}
        </p>
      </div>
    </div>
  )
}

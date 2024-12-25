import { useCallback, useRef, useState } from 'react'

import {
  browserSupportsWebAuthn,
  startAuthentication,
} from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { LoginButton } from './LoginButton'
import { LoginHeader } from './LoginHeader'

import { useAuthenticateViaPasskeys } from '~/feature/AuthorizePasskeys/'
import { useOTPLogin } from '~/feature/LoginOTP'
import { useCustomTranslation } from '~/feature/translation'
import { authService } from '~/shared/api/auth.service'
import { Routes } from '~/shared/constants'
import { useToast } from '~/shared/hooks'
import { Typography } from '~/shared/ui'
import { codeSchema, emailSchema } from '~/widget/Login/lib/schemas.ts'
import { FastLoginUnavailableWarning } from '~/widget/Login/ui/FastLoginUnavailableWarning.tsx'
import { LoginInput } from '~/widget/Login/ui/LoginInput.tsx'

export const LoginWidget = () => {
  const { t } = useCustomTranslation()

  const navigate = useNavigate()

  const hintRef = useRef(null)
  const fastLoginUnavailableWarningRef = useRef(null)

  const { showErrorToast, showInfoToast, showWarningToast, showSuccessToast } =
    useToast()

  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const { tryLogin, confirmLogin, loadingState, mutationState } = useOTPLogin({
    onLoginSuccess: () => {
      return showSuccessToast(t('emailSent'))
    },
    onCodeSuccess: () => {
      return navigate(Routes.HOME)
    },
    onCodeError(error) {
      if (error instanceof Error) {
        return showErrorToast(error.message)
      }
      return showErrorToast(t('oopsSomethingWentWrong'))
    },
    onLoginError(error) {
      if (error instanceof Error) {
        return showErrorToast(error.message)
      }
      return showErrorToast(t('oopsSomethingWentWrong'))
    },
  })

  const verifyLoginChallenge = useMutation({
    mutationFn: authService.verifyAuthentication,
    onError: (err) => {
      console.info(`[VerifyLoginChallenge:onError]: ${JSON.stringify(err)}`)
    },
  })

  const passkeysMutation = useAuthenticateViaPasskeys()

  const isFastLoginUnavailable =
    passkeysMutation.error instanceof AxiosError
      ? passkeysMutation.error.status === 400
      : false

  const isEmailSent =
    mutationState.loginMutation.isSuccess && !!mutationState.loginMutation.data

  const isEmailWasChangedSinceSending = mutationState.loginMutation.variables
    ?.email
    ? email !== mutationState.loginMutation.variables?.email
    : false

  const codeInputShouldBeShown = isEmailSent && !isEmailWasChangedSinceSending

  const processEmailValue = useCallback(() => {
    const safeParse = emailSchema.safeParse(email)

    if (safeParse.error) {
      showWarningToast(t(safeParse.error.errors[0].message))
      throw new Error(safeParse.error.errors[0].message)
    }

    return safeParse.data
  }, [email, showWarningToast, t])

  const loginOTP = useCallback(async () => {
    const safeEmail = processEmailValue()

    return tryLogin(safeEmail)
  }, [processEmailValue, tryLogin])

  const confirmLoginOTP = useCallback(() => {
    if (!isEmailSent) {
      throw new Error('Email should be sent first')
    }

    const emailValue = processEmailValue()

    const codeSafeParse = codeSchema.safeParse(code)

    if (codeSafeParse.error) {
      return showWarningToast(t(codeSafeParse.error.errors[0].message))
    }

    return confirmLogin(emailValue, codeSafeParse.data)
  }, [code, confirmLogin, isEmailSent, processEmailValue, showWarningToast, t])

  const loginPasskeys = useCallback(async () => {
    const emailValue = processEmailValue()

    const response = await passkeysMutation.mutateAsync(emailValue)

    const challengeOpts = response.data.options

    const isCredentialExist =
      challengeOpts.allowCredentials &&
      challengeOpts.allowCredentials.length > 0

    if (!isCredentialExist) {
      return showInfoToast(t('noAddedDeviceForFastLogin'))
    }

    const result = await startAuthentication({ optionsJSON: challengeOpts })

    const verifyResult = await verifyLoginChallenge.mutateAsync({
      email: emailValue,
      challengeResponse: result,
    })

    if (verifyResult.data.success) {
      return navigate(Routes.HOME)
    }
  }, [
    navigate,
    passkeysMutation,
    processEmailValue,
    showInfoToast,
    t,
    verifyLoginChallenge,
  ])

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-col items-center gap-S mb-64">
        <LoginHeader />

        <CSSTransition
          in={isFastLoginUnavailable && !isEmailSent}
          nodeRef={fastLoginUnavailableWarningRef}
          timeout={1000}
          classNames="node-opacity"
          unmountOnExit
        >
          <div ref={fastLoginUnavailableWarningRef}>
            <FastLoginUnavailableWarning />
          </div>
        </CSSTransition>

        <LoginInput
          type="email"
          name="email"
          id="input-email"
          placeholder="email"
          autoComplete="email"
          onChange={(value) => setEmail(value)}
        />

        <div
          className={`overflow-hidden duration-300 ${codeInputShouldBeShown ? 'h-10' : 'h-0'}`}
        >
          <LoginInput
            type="text"
            name="code"
            id="input-code"
            placeholder="code"
            autoComplete="code"
            onChange={(value) => setCode(value)}
          />
        </div>

        <LoginButton
          labelKey={codeInputShouldBeShown ? 'login' : 'loginWithCode'}
          onClick={codeInputShouldBeShown ? confirmLoginOTP : loginOTP}
          isDisabled={
            passkeysMutation.isPending || verifyLoginChallenge.isPending
          }
          isLoading={
            loadingState.isTryLoginLoading || loadingState.isConfirmLoginLoading
          }
          classNames="bg-violet20 border-violet"
        />

        {!codeInputShouldBeShown && browserSupportsWebAuthn() && (
          <LoginButton
            labelKey={'fastLogin'}
            onClick={loginPasskeys}
            isDisabled={
              loadingState.isTryLoginLoading ||
              loadingState.isConfirmLoginLoading
            }
            isLoading={
              passkeysMutation.isPending || verifyLoginChallenge.isPending
            }
            classNames="border-violet bg-white"
          />
        )}
      </div>

      <CSSTransition
        in={isEmailSent}
        nodeRef={hintRef}
        timeout={1000}
        classNames="node-opacity"
        unmountOnExit
      >
        <div ref={hintRef} className="w-[350px] px-12">
          <Typography classNames="text-black/75 text-center">
            {t('loginViaCodeHint')}
          </Typography>
        </div>
      </CSSTransition>
    </div>
  )
}

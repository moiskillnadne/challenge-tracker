import { useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'

import { authService } from '~/shared/api/auth.service'

type Props = {
  onLoginSuccess?: () => void
  onCodeSuccess?: () => void

  onLoginError?: (error: unknown) => void
  onCodeError?: (error: unknown) => void
}

export const useOTPLogin = (props?: Props) => {
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      console.info('[LoginMutation:onSuccess]')

      if (props?.onLoginSuccess) {
        props.onLoginSuccess()
      }
    },
    onError: (err) => {
      console.error(`[LoginMutation:onError] ${JSON.stringify(err)}`)

      if (props?.onLoginError) {
        props.onLoginError(err)
      }
    },
  })

  const codeMutation = useMutation({
    mutationFn: authService.confirmLogin,
    onSuccess: () => {
      console.info('[CodeMutation:onSuccess]')

      if (props?.onCodeSuccess) {
        props.onCodeSuccess()
      }
    },
    onError: (err) => {
      console.info(`[CodeMutation:onError]: ${JSON.stringify(err)}`)

      if (props?.onCodeError) {
        props.onCodeError(err)
      }
    },
  })

  const tryLogin = useCallback(
    (email: string) => {
      loginMutation.mutate({ email })
    },
    [loginMutation],
  )

  const tryLoginPromise = useCallback(
    async (email: string) => {
      return loginMutation.mutateAsync({ email })
    },
    [loginMutation],
  )

  const confirmLogin = useCallback(
    (email: string, code: string) => {
      codeMutation.mutate({ email, code })
    },
    [codeMutation],
  )

  const confirmLoginPromise = useCallback(
    async (email: string, code: string) => {
      return codeMutation.mutateAsync({ email, code })
    },
    [codeMutation],
  )

  return {
    tryLogin,
    tryLoginPromise,
    confirmLogin,
    confirmLoginPromise,
    loadingState: {
      isLoading: loginMutation.isPending || codeMutation.isPending,
      isTryLoginLoading: loginMutation.isPending,
      isConfirmLoginLoading: codeMutation.isPending,
    },
    errorState: {
      tryLoginError: loginMutation.error,
      confirmLoginError: codeMutation.error,
    },
    mutationState: {
      loginMutation,
      codeMutation,
    },
  }
}

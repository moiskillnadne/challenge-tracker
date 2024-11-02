import { useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'

import { authService } from '~/shared/api/auth.service'

type Props = {
  onLoginSuccess?: () => void
  onCodeSuccess?: () => void
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
    },
  })

  const tryLogin = useCallback(
    (email: string) => {
      loginMutation.mutate({ email })
    },
    [loginMutation],
  )

  const confirmLogin = useCallback(
    (email: string, code: string) => {
      codeMutation.mutate({ email, code })
    },
    [codeMutation],
  )

  return {
    tryLogin,
    confirmLogin,
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

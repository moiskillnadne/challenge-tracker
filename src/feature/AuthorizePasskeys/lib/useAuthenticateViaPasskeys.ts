import { useMutation } from '@tanstack/react-query'

import { authService } from '~/shared/api/auth.service'

type Props = {
  onError?: (err: unknown) => void
  onSuccess?: (data: unknown) => void

  loginIfNoCredentials?: (email: string) => void
}

export const useAuthenticateViaPasskeys = (props?: Props) => {
  return useMutation({
    mutationFn: authService.authenticateKeys,
    onError: (err) => {
      console.error(`[GenerateLoginChallenge:onError]: ${JSON.stringify(err)}`)

      if (props?.onError) {
        props.onError(err)
      }
    },
  })
}

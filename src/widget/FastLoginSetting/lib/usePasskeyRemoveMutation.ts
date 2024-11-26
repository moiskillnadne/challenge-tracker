import { useMutation } from '@tanstack/react-query'

import { authService } from '~/shared/api/auth.service.ts'

type Props = {
  onSuccess?: () => void
  onError?: () => void
}

export const usePasskeyRemoveMutation = (props?: Props) => {
  return useMutation({
    mutationFn: authService.removePasskeyById,
    onSuccess: () => {
      if (props?.onSuccess) props.onSuccess()
    },
    onError: () => {
      if (props?.onError) props.onError()
    },
  })
}

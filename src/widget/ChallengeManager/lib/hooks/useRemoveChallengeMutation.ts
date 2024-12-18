import { useMutation } from '@tanstack/react-query'

import { challengeService } from '~/shared/api/challenge.service.ts'

type Props = {
  onSuccess?: () => void
}

export const useRemoveChallengeMutation = (props?: Props) => {
  const mutation = useMutation({
    mutationFn: challengeService.deleteChallenge,
    onSuccess: () => {
      if (props?.onSuccess) {
        props.onSuccess()
      }
    },
  })

  return {
    data: mutation.data?.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    manager: mutation,
  }
}

import { useQuery } from '@tanstack/react-query'

import { authService } from '~/shared/api/auth.service.ts'

export const usePasskeysQuery = () => {
  return useQuery({
    queryKey: ['passkeys'],
    queryFn: authService.getPasskeyList,
  })
}

import { useQuery } from '@tanstack/react-query'

import { counterService } from '~/shared/api/counters.service.ts'

export const useCounterQuery = (counterId: string) => {
  return useQuery({
    queryKey: ['counter', counterId],
    queryFn: () => counterService.getCounterById(counterId),
  })
}

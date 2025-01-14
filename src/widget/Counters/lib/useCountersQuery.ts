import { useQuery } from '@tanstack/react-query'

import { counterService } from '~/shared/api/counters.service.ts'

export const useCountersQuery = () => {
  return useQuery({
    queryKey: ['counter'],
    queryFn: counterService.getCounters,
  })
}

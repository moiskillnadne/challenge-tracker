import { useQuery } from '@tanstack/react-query'

import {
  ChallengeListQueryParams,
  challengeService,
} from '~/shared/api/challenge.service.ts'

type Props = ChallengeListQueryParams

export const useChallengeListQuery = (props: Props) => {
  const query = useQuery({
    queryKey: ['/protected/challenge/', props.status, props.page, props.limit],
    queryFn: () => challengeService.getChallengeList(props),
    select: (data) => data.data.details,
  })

  return {
    challengeList: query?.data,
    isLoading: query.isPending,
    isError: query?.isError,
    manager: query,
  }
}

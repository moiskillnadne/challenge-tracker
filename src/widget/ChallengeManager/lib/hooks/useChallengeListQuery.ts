import { useInfiniteQuery } from '@tanstack/react-query'

import {
  ChallengeDTO,
  challengeService,
} from '~/shared/api/challenge.service.ts'

type Props = {
  status: 'ACTIVE' | 'COMPLETED'
}

export const useChallengeListQuery = (props: Props) => {
  const query = useInfiniteQuery({
    queryKey: ['/protected/challenge/', props.status],
    maxPages: 3,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      challengeService.getChallengeList({
        limit: 20,
        page: pageParam,
        status: props.status,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.details.meta.nextPage
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.data.details.meta.prevPage
    },
  })

  const currentPage = (query?.data?.pageParams as Array<number>) ?? [1]

  const pageIndex = currentPage[currentPage.length - 1] - 1

  const paginationMeta = query.data?.pages[pageIndex]?.data.details.meta

  return {
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchPreviousPage: query.fetchPreviousPage,
    isFetchingPreviousPage: query.isFetchingPreviousPage,
    challengeList: query?.data?.pages.reduce(
      (acc: Array<ChallengeDTO>, page) => {
        const currentList = page.data.details.data

        return acc.concat(currentList)
      },
      [],
    ),
    pagination: paginationMeta,
    isLoading: query.isLoading,
    isError: query?.isError,
    manager: query,
  }
}

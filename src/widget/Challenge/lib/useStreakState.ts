import { useCallback } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'

import { convertDate } from './convertDate'

import { queryClient } from '~/app/App'
import { challengeService } from '~/shared/api/challenge.service'

type Props = {
  challengeId: string
}

export const useStreakState = ({ challengeId }: Props) => {
  const challengeQuery = useQuery({
    queryKey: ['/challenge/', challengeId],
    queryFn: () => challengeService.getChallengeById(challengeId),
    select(data) {
      return data.data.details
    },
  })

  const progressMutation = useMutation({
    mutationFn: challengeService.checkin,
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ['/challenge/progress', challengeId] })
    },
    async onSuccess() {
      challengeQuery.refetch()
    },
  })

  const removeProgressMutation = useMutation({
    mutationFn: challengeService.removeCheckin,
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ['/challenge/progress', challengeId] })
    },
    async onSuccess() {
      challengeQuery.refetch()
    },
  })

  const addDayInStreak = useCallback(
    (day: number) => {
      progressMutation.mutate({ userChallengeId: challengeId, checkpointDate: convertDate(day) })
    },
    [challengeId, progressMutation],
  )

  const removeDayFromStreak = useCallback(
    (checkinId: string) => {
      removeProgressMutation.mutate(checkinId)
    },
    [removeProgressMutation],
  )

  return {
    isLoading: challengeQuery.isLoading,

    challenge: challengeQuery.data?.challenge ?? null,

    addDayInStreak,
    removeDayFromStreak,
  }
}

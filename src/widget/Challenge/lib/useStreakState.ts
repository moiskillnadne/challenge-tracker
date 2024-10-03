import { useMutation, useQuery } from '@tanstack/react-query';
import { challengeService } from '../../../shared/api/challenge.service';
import { queryClient } from '../../../app/App';
import { useCallback } from 'react';
import { convertDate } from './convertDate';

type Props = {
  challengeId: string;
};

export const useStreakState = ({ challengeId }: Props) => {
  const challengeQuery = useQuery({
    queryKey: ['/challenge/base-info', challengeId],
    queryFn: () => challengeService.getChallengeById(challengeId),
    select(data) {
      return data.data.details;
    },
  });

  const progressQuery = useQuery({
    queryKey: ['/challenge/progress', challengeId],
    queryFn: () => challengeService.getChallengeProgressById(challengeId),
    select(data) {
      return data.data.details;
    },
  });

  const progressMutation = useMutation({
    mutationFn: challengeService.checkin,
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ['/challenge/progress', challengeId] });
    },
    async onSuccess() {
      progressQuery.refetch();
      challengeQuery.refetch();
    },
  });

  const addDayInStreak = useCallback((day: number) => {
    progressMutation.mutate({ userChallengeId: challengeId, checkpointDate: convertDate(day) });
  }, []);

  return {
    isLoading: challengeQuery.isLoading || progressQuery.isLoading,

    challenge: challengeQuery.data?.challenge ?? null,
    challengeProgress: progressQuery.data?.challengeProgress ?? null,

    addDayInStreak,
  };
};

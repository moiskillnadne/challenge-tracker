import { useCallback } from 'react';
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import { challengeService } from '../../../shared/api/challenge.service';
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
    onSuccess() {
      const client = new QueryClient();

      client.invalidateQueries({
        queryKey: ['/challenge/progress', challengeId],
      });
    },
  });

  const addDayInStreak = useCallback((day: number) => {
    progressMutation.mutate({ userChallengeId: challengeId, checkpointDate: convertDate(day) });
  }, []);

  return {
    addDayInStreak,
    isLoading: challengeQuery.isLoading || progressQuery.isLoading,

    challenge: challengeQuery.data?.challenge ?? null,
    challengeProgress: progressQuery.data?.challengeProgress ?? null,
  };
};

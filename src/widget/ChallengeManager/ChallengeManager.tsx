import { useMutation, useQuery } from '@tanstack/react-query';
import { challengeService } from '../../shared/api/challenge.service';
import { ChallengeGridItem } from './ChallengeGridItem';
import { mapChallengeToItem } from '../Account/lib/mappers';
import { Loader } from '../../shared/ui/Loader';
import { CreateChallengeButton } from './CreateChallengeButton';
import { useNavigate } from 'react-router-dom';
import { useCustomTranslation } from '../../feature/translation';
import { useCallback } from 'react';

export const ChallengeManager = () => {
  const navigate = useNavigate();
  const { t } = useCustomTranslation();

  const query = useQuery({
    queryKey: ['/protected/challenge/'],
    queryFn: challengeService.getChallengeList,
    select: (data) => data.data.details,
  });

  const removeChallengeMutation = useMutation({
    mutationFn: challengeService.deleteChallenge,
    onSuccess(data, variables) {
      console.log(`Challenge with id: ${variables} has been removed`);
      query.refetch();
    },
  });

  const challenges = query.data?.challenges;

  const removeChallenge = useCallback((id: string) => {
    removeChallengeMutation.mutate(id);
  }, []);

  if (query.isPending) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="flex-1 mt-[36px] px-[12px]">
      <div className="flex justify-center mb-[16px] text-white font-bold text-[24px] cursor-default">
        {t('yourChallenges')}
      </div>

      <div className="flex gap-[8px] flex-wrap">
        {challenges &&
          challenges
            .map((item) => mapChallengeToItem(item))
            .map((item) => (
              <ChallengeGridItem
                key={item.id}
                goal={item.goal}
                isActive={item.isActive}
                daysLeft={item.daysLeft}
                onClick={() => {
                  return navigate(`/challenge/${item.id}`);
                }}
                onChallengeRemove={() => removeChallenge(item.id)}
              />
            ))}

        <CreateChallengeButton />
      </div>
    </div>
  );
};

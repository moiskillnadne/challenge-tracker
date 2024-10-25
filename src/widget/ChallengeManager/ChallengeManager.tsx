import { useQuery } from '@tanstack/react-query';
import { challengeService } from '../../shared/api/challenge.service';
import { ChallengeGridItem } from './ChallengeGridItem';
import { mapChallengeToItem } from '../Account/lib/mappers';
import { Loader } from '../../shared/ui/Loader';
import { CreateChallengeButton } from './CreateChallengeButton';
import { useNavigate } from 'react-router-dom';
import { useCustomTranslation } from '../../feature/translation';

export const ChallengeManager = () => {
  const navigate = useNavigate();
  const { t } = useCustomTranslation();

  const query = useQuery({
    queryKey: ['/protected/challenge/'],
    queryFn: challengeService.getChallengeList,
    select: (data) => data.data.details,
  });

  const challenges = query.data?.challenges;

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
              />
            ))}

        <CreateChallengeButton />
      </div>
    </div>
  );
};

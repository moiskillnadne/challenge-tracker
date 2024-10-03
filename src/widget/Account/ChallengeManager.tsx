import { useQuery } from '@tanstack/react-query';
import { challengeService } from '../../shared/api/challenge.service';
import { useCustomTranslation } from '../../feature/translation';
import { ChallengeGridItem } from './ChallengeGridItem';
import { mapChallengeToItem } from './lib/mappers';
import { Loader } from '../../shared/ui/Loader';
import { useNavigate } from 'react-router-dom';

export const ChallengeManager = () => {
  const { t } = useCustomTranslation();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['/protected/challenge/'],
    queryFn: challengeService.getChallengeList,
    select: (data) => data.data.details,
  });

  if (query.isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full px-[12px]">
      <div className="flex justify-center mb-[16px]">
        <button className="duration-300 text-white font-bold text-[26px] cursor-pointer border-2 rounded border-white/50 px-[16px] hover:border-white">
          {t('createNewChallenge')}
        </button>
      </div>

      {query.data?.challenges &&
        query.data?.challenges
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
    </div>
  );
};

import { useCallback, useMemo } from 'react';
import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';
import { useStreakState } from '../lib/useStreakState';
import { Timer } from './Timer';
import { useCustomTranslation } from '../../../feature/translation';
import { mapChallengeToItem } from '../../Account/lib/mappers';
import { convertDate } from '../lib/convertDate';
import { Loader } from '../../../shared/ui/Loader';

type Props = {
  challengeId: string;
};

export const ChallengeWidget = ({ challengeId }: Props) => {
  const { t } = useCustomTranslation();

  const { challenge, challengeProgress, addDayInStreak, isLoading } = useStreakState({
    challengeId,
  });

  const challengeInfo = challenge ? mapChallengeToItem(challenge) : null;

  const daysLeft = challengeInfo?.daysLeft ?? 99999;

  const streak = useMemo(() => {
    return challengeProgress?.map((el) => el.checkpointDate) ?? null;
  }, [challengeProgress]);

  const onDayClick = useCallback(
    (day: number) => {
      if (streak === null) {
        throw new Error(`[ChallengeWidget:onDayClick] Streak is null`);
      }

      const isDayAlreadyChecked = streak.includes(convertDate(day));

      if (!isDayAlreadyChecked) {
        addDayInStreak(day);
      }
    },
    [addDayInStreak],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center overflow-y-scroll">
      <div className="w-[500px] px-[16px]">
        <div className="flex justify-center items-center py-[18px] px-[24px]">
          <img className="w-[400px]" src={Logo} alt="" />
        </div>

        <div className="flex justify-between items-center">
          <MetaText leftLabel={`${t('goal')}: `} rightLabel={t('dailySport')} />
          <MetaText leftLabel={`${t('daysLeft')}: `} rightLabel={String(daysLeft)} />
        </div>

        <Calendar
          streak={streak ?? []}
          onDayClick={onDayClick}
          isCompleted={!challengeInfo?.isActive}
        />

        {challengeInfo?.isActive ?? <Timer streak={streak ?? []} />}
      </div>
    </div>
  );
};

import { useCallback } from 'react';
import { useCustomTranslation } from '../../../feature/translation';
import { ChallengeDTO, ChallengeProgressDTO } from '../../../shared/api/challenge.service';
import { MetaText } from './MetaText';
import { convertDate } from '../lib/convertDate';
import { Calendar } from './Calendar';
import { mapChallengeToItem } from '../../Account/lib/mappers';
import { Timer } from './Timer';

type Props = {
  challenge: ChallengeDTO;
  progress: Array<ChallengeProgressDTO>;

  addDayInStreak: (day: number) => void;
};

export const CalendarManager = ({ challenge, progress, addDayInStreak }: Props) => {
  const { t } = useCustomTranslation();

  const challengeBaseInfo = mapChallengeToItem(challenge);

  const onDayClick = useCallback(
    (day: number) => {
      const isDayAlreadyChecked = progress
        .map((el) => el.checkpointDate)
        .includes(convertDate(day));

      if (!isDayAlreadyChecked) {
        addDayInStreak(day);
      }
    },
    [addDayInStreak],
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <MetaText leftLabel={`${t('goal')}: `} rightLabel={t('dailySport')} />
        <MetaText
          leftLabel={`${t('daysLeft')}: `}
          rightLabel={String(challengeBaseInfo.daysLeft)}
        />
      </div>

      <Calendar
        streak={progress.map((el) => el.checkpointDate) ?? []}
        onDayClick={onDayClick}
        isCompleted={!challengeBaseInfo.isActive}
      />

      {challengeBaseInfo.isActive ?? (
        <Timer streak={progress.map((el) => el.checkpointDate) ?? []} />
      )}
    </div>
  );
};

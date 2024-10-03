import { useCallback } from 'react';
import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';
import { getDaysInMonth } from 'date-fns';
import { useStreakState } from '../lib/useStreakState';
import { Timer } from './Timer';
import { useCustomTranslation } from '../../../feature/translation';

export const ChallengeWidget = () => {
  const { t } = useCustomTranslation();

  const { streak, addDayInStreak, removeDayInStreak } = useStreakState();

  const daysLeft = getDaysInMonth(new Date()) - streak.length;

  const onDayClick = useCallback(
    (day: number) => {
      const isDayAlreadyChecked = streak.includes(day);

      if (!isDayAlreadyChecked) {
        addDayInStreak(day);
      }

      if (isDayAlreadyChecked) {
        removeDayInStreak(day);
      }
    },
    [streak, addDayInStreak, removeDayInStreak],
  );

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

        <Calendar streak={streak} onDayClick={onDayClick} />

        <Timer streak={streak} />
      </div>
    </div>
  );
};

import { useCallback, useEffect, useState } from 'react';
import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';
import { differenceInSeconds, endOfDay, getDate, getDaysInMonth } from 'date-fns';
import { useStreakState } from '../lib/useStreakState';
import { Timer } from './Timer';
import { useCustomTranslation } from '../../../feature/translation';

export const ChallengeWidget = () => {
  const { t } = useCustomTranslation();

  const [timeLeft, setTimeLeft] = useState<number>(0);
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

  // Format time left as HH:MM:SS
  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Calculate seconds remaining until the end of the day
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDayTime = endOfDay(now);
    return differenceInSeconds(endOfDayTime, now);
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

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

        <Timer
          time={formatTimeLeft(timeLeft)}
          isTodayCompleted={streak.includes(getDate(new Date()))}
        />
      </div>
    </div>
  );
};

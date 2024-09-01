import { useCallback } from 'react';
import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';
import { getDate, getDaysInMonth } from 'date-fns';
import { useStreakState } from '../lib/useStreakState';

export const ChallengeWidget = () => {
  const { streak, addDayInStreak, removeDayInStreak } = useStreakState();

  const daysLeft = getDaysInMonth(new Date()) - streak.length;

  const onDayClick = useCallback(
    (day: number) => {
      const todayDate = getDate(new Date());

      const isDayAlreadyChecked = streak.includes(day);

      if (todayDate === day && !isDayAlreadyChecked) {
        addDayInStreak(day);
      }

      if (todayDate === day && isDayAlreadyChecked) {
        removeDayInStreak(day);
      }
    },
    [streak, addDayInStreak, removeDayInStreak],
  );

  return (
    <div className="w-screen h-screen bg-black flex justify-center overflow-y-scroll">
      <div className="w-[500px] px-[16px]">
        <div className="flex justify-center items-center py-[28px] px-[24px]">
          <img className="w-[400px]" src={Logo} alt="" />
        </div>

        <div className="flex justify-between items-center">
          <MetaText leftLabel="goal: " rightLabel="daily sport" />
          <MetaText leftLabel="days left: " rightLabel={String(daysLeft)} />
        </div>

        <Calendar streak={streak} onDayClick={onDayClick} />
      </div>
    </div>
  );
};

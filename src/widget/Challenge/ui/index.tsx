import { useState } from 'react';
import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';
import { getDaysInMonth } from 'date-fns';

export const ChallengeWidget = () => {
  const [streak, setStreak] = useState<number[]>([]);

  const daysLeft = getDaysInMonth(new Date()) - streak.length;

  return (
    <div className="w-screen h-screen bg-black flex justify-center overflow-y-scroll">
      <div className="w-[500px]">
        <div className="flex justify-center items-center py-[28px] px-[24px]">
          <img className="w-[400px]" src={Logo} alt="" />
        </div>

        <div className="flex justify-between items-center">
          <MetaText leftLabel="goal: " rightLabel="daily sport" />
          <MetaText leftLabel="days left: " rightLabel={String(daysLeft)} />
        </div>

        <Calendar streak={streak} setStreak={setStreak} />
      </div>
    </div>
  );
};

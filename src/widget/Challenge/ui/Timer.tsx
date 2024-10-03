import { differenceInSeconds, endOfDay, getDate } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertDate } from '../lib/convertDate';

type Props = {
  streak: string[];
};

export const Timer = ({ streak }: Props) => {
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState<number>(0);

  const displayMap = {
    0: 'block',
    1: 'hidden',
  };

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

  const isTodayCompleted = streak.includes(convertDate(getDate(new Date())));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[65px] mb-[10px] text-center">
      <div className={`${displayMap[isTodayCompleted ? 1 : 0]}`}>
        <p className="text-green font-bold">
          {t('youStillHave')}{' '}
          <span className="font-bold text-[24px] text-red">{formatTimeLeft(timeLeft)}</span>
        </p>
        <p className="text-green font-bold">{t('toCompleteChallenge')}</p>
      </div>

      <div className={` ${displayMap[isTodayCompleted ? 0 : 1]}`}>
        <p className="text-green font-bold">
          {t('youCanRestFor')}{' '}
          <span className="text-blue font-bold text-[24px]">{formatTimeLeft(timeLeft)}</span>
        </p>
      </div>
    </div>
  );
};

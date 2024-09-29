import { useCallback, useEffect, useState } from 'react';
import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';
import { differenceInSeconds, endOfDay, getDate, getDaysInMonth } from 'date-fns';
import { useStreakState } from '../lib/useStreakState';
import { useTranslation } from 'react-i18next';
import { SupportableLanguage } from '../../../app/system/constant';
import { Timer } from './Timer';
import { useNavigate } from 'react-router-dom';

export const ChallengeWidget = () => {
  const { i18n, t } = useTranslation();
  const navigator = useNavigate();

  const [language, setLanguage] = useState<SupportableLanguage>(
    (i18n.language as SupportableLanguage) || SupportableLanguage.RU,
  );

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

  const onLanguageChange = useCallback(async () => {
    const lng =
      language === SupportableLanguage.RU ? SupportableLanguage.EN : SupportableLanguage.RU;

    setLanguage(lng);

    await i18n.changeLanguage(lng);
  }, [language]);

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

  const onLoginClick = () => {
    return navigator('/login');
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
    <div className="w-100 h-100 flex justify-center overflow-y-scroll">
      <button
        className="absolute top-0 left-0 text-white font-bold text-[26px] m-[16px] cursor-pointer"
        onClick={onLoginClick}
      >
        {t('login')}
      </button>

      <button
        className="absolute top-0 right-0 text-white font-bold text-[26px] m-[16px] cursor-pointer"
        onClick={onLanguageChange}
      >
        {language.toUpperCase()}
      </button>

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

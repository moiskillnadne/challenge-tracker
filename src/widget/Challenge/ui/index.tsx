import { useCallback, useState } from 'react';
import Logo from '../../../assets/logo1.png';
import { Calendar } from './Calendar';
import { MetaText } from './MetaText';
import { getDate, getDaysInMonth } from 'date-fns';
import { useStreakState } from '../lib/useStreakState';
import { useTranslation } from 'react-i18next';
import { SupportableLanguage } from '../../../app/system/constant';

export const ChallengeWidget = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState<SupportableLanguage>(
    (i18n.language as SupportableLanguage) || SupportableLanguage.RU,
  );
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

  const onLanguageChange = useCallback(async () => {
    setLanguage((prev) =>
      prev === SupportableLanguage.EN ? SupportableLanguage.RU : SupportableLanguage.EN,
    );
    await i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="w-screen h-screen bg-black flex justify-center overflow-y-scroll">
      <button
        className="absolute top-0 right-0 text-white font-bold text-[26px] p-[16px] cursor-pointer"
        onClick={onLanguageChange}
      >
        {language.toUpperCase()}
      </button>

      <div className="w-[500px] px-[16px]">
        <div className="flex justify-center items-center py-[28px] px-[24px]">
          <img className="w-[400px]" src={Logo} alt="" />
        </div>

        <div className="flex justify-between items-center">
          <MetaText leftLabel={`${t('goal')}: `} rightLabel={t('dailySport')} />
          <MetaText leftLabel={`${t('daysLeft')}: `} rightLabel={String(daysLeft)} />
        </div>

        <Calendar streak={streak} onDayClick={onDayClick} />
      </div>
    </div>
  );
};

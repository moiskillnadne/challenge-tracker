import { useTranslation } from 'react-i18next';

type Props = {
  time: string;
  isTodayCompleted: boolean;
};

export const Timer = ({ time, isTodayCompleted }: Props) => {
  const { t } = useTranslation();

  const displayMap = {
    0: 'block',
    1: 'hidden',
  };

  return (
    <div className="flex flex-col items-center justify-center h-[65px] mb-[10px] text-center">
      <div className={`${displayMap[isTodayCompleted ? 1 : 0]}`}>
        <p className="text-green font-bold">
          {t('youStillHave')} <span className="font-bold text-[24px] text-red">{time}</span>
        </p>
        <p className="text-green font-bold">{t('toCompleteChallenge')}</p>
      </div>

      <div className={` ${displayMap[isTodayCompleted ? 0 : 1]}`}>
        <p className="text-green font-bold">
          {t('youCanRestFor')} <span className="text-blue font-bold text-[24px]">{time}</span>
        </p>
      </div>
    </div>
  );
};

import { getDay, getDaysInMonth, startOfMonth } from 'date-fns';

import { CalendarDayItem } from './CalendarDayItem';
import { CalendarHeaderItem } from './CalendarHeaderItem';
import { useTranslation } from 'react-i18next';
type Props = {
  streak: number[];
  onDayClick: (day: number) => void;
};

export const Calendar = ({ streak, onDayClick }: Props) => {
  const { t } = useTranslation();

  const now = new Date();

  const daysInMonth = getDaysInMonth(now);

  const firstDayOfMonth = getDay(startOfMonth(now));

  console.log();

  const daysOffset: Record<number, number> = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
  };

  const offset = Array.from({ length: daysOffset[firstDayOfMonth] }, (_, index) => index + 1);
  const daysInMonthArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div className="py-[28px]">
      <div className="grid grid-cols-7 gap-2">
        <CalendarHeaderItem label={t('days.monday')} />
        <CalendarHeaderItem label={t('days.tuesday')} />
        <CalendarHeaderItem label={t('days.wednesday')} />
        <CalendarHeaderItem label={t('days.thursday')} />
        <CalendarHeaderItem label={t('days.friday')} />
        <CalendarHeaderItem label={t('days.saturday')} />
        <CalendarHeaderItem label={t('days.sunday')} />
      </div>

      <div className="grid grid-cols-7 gap-2 my-[24px]">
        {offset.map((index) => (
          <div key={index}></div>
        ))}

        {daysInMonthArray.map((index) => (
          <CalendarDayItem
            key={index}
            label={index.toString()}
            isChecked={streak.includes(index)}
            onClick={() => {
              onDayClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

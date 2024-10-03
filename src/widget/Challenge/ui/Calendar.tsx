import { getDay, getDaysInMonth, getMonth, startOfMonth } from 'date-fns';

import { CalendarDayItem } from './CalendarDayItem';
import { CalendarHeaderItem } from './CalendarHeaderItem';
import { useTranslation } from 'react-i18next';
import { convertDate } from '../lib/convertDate';

type Props = {
  streak: string[];
  isCompleted: boolean;
  onDayClick: (day: number) => void;
};

export const Calendar = ({ streak, onDayClick, isCompleted }: Props) => {
  const { t } = useTranslation();

  const now = new Date();

  const month = getMonth(isCompleted ? new Date(streak[0]) : now);

  console.log(month);

  const daysInMonth = getDaysInMonth(isCompleted ? new Date(streak[0]) : now);

  const firstDayOfMonth = getDay(startOfMonth(now));

  const daysOffset: Record<number, number> = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
  };

  console.log(streak);

  const offset = Array.from({ length: daysOffset[firstDayOfMonth] }, (_, index) => index + 1);
  const daysInMonthArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div className="pt-[20px] pb-[12px]">
      <div className="grid grid-cols-7 gap-2">
        <CalendarHeaderItem label={t('days.monday')} />
        <CalendarHeaderItem label={t('days.tuesday')} />
        <CalendarHeaderItem label={t('days.wednesday')} />
        <CalendarHeaderItem label={t('days.thursday')} />
        <CalendarHeaderItem label={t('days.friday')} />
        <CalendarHeaderItem label={t('days.saturday')} />
        <CalendarHeaderItem label={t('days.sunday')} />
      </div>

      <div className="grid grid-cols-7 gap-2 mt-[20px]">
        {offset.map((index) => (
          <div key={index}></div>
        ))}

        {daysInMonthArray.map((index) => (
          <CalendarDayItem
            key={index}
            label={index.toString()}
            isChecked={streak.includes(convertDate(index, month))}
            onClick={() => {
              onDayClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

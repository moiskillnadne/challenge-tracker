import { getDay, getDaysInMonth, startOfMonth, getDate } from 'date-fns';

import { CalendarDayItem } from './CalendarDayItem';
import { CalendarHeaderItem } from './CalendarHeaderItem';
import { Dispatch, SetStateAction } from 'react';
type Props = {
  streak: number[];
  setStreak: Dispatch<SetStateAction<number[]>>;
};

export const Calendar = ({ streak, setStreak }: Props) => {
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

  const onDayClick = (day: number) => {
    const todayDate = getDate(new Date());

    const isDayAlreadyChecked = streak.includes(day);

    if (todayDate === day && !isDayAlreadyChecked) {
      setStreak((prev) => [...prev, day]);
    }

    if (todayDate === day && isDayAlreadyChecked) {
      setStreak((prev) => prev.filter((item) => item !== day));
    }
  };

  return (
    <div className="py-[28px]">
      <div className="grid grid-cols-7 gap-2">
        <CalendarHeaderItem label="ПН" />
        <CalendarHeaderItem label="ВТ" />
        <CalendarHeaderItem label="СР" />
        <CalendarHeaderItem label="ЧТ" />
        <CalendarHeaderItem label="ПТ" />
        <CalendarHeaderItem label="СБ" />
        <CalendarHeaderItem label="ВС" />
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

import { useCallback, useState } from 'react';
import LocalStorage from '../../../shared/lib/LocalStorage';

export const useStreakState = () => {
  const storageKey = 'streak';

  const [streak, setStreak] = useState<number[]>(LocalStorage.getItem<number[]>(storageKey) ?? []);

  const addDayInStreak = useCallback(
    (day: number) => {
      LocalStorage.setItem(storageKey, [...streak, day]);
      setStreak((prev) => [...prev, day]);
    },
    [streak, setStreak],
  );

  const removeDayInStreak = useCallback(
    (day: number) => {
      LocalStorage.setItem(
        storageKey,
        streak.filter((item) => item !== day),
      );
      setStreak((prev) => prev.filter((item) => item !== day));
    },
    [streak, setStreak],
  );

  return { streak, addDayInStreak, removeDayInStreak };
};

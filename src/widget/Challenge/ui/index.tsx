import Logo from '../../../assets/logo1.png';
import { useStreakState } from '../lib/useStreakState';
import { Loader } from '../../../shared/ui/Loader';
import { CalendarManager } from './CalendarManager';

type Props = {
  challengeId: string;
};

export const ChallengeWidget = ({ challengeId }: Props) => {
  const { challenge, isLoading, addDayInStreak, removeDayFromStreak } = useStreakState({
    challengeId,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-scroll">
      <div className="w-[500px] px-[16px]">
        <div className="flex justify-center items-center py-[18px] px-[24px]">
          <img className="w-[400px]" src={Logo} alt="" />
        </div>

        {!!challenge && (
          <CalendarManager
            challenge={challenge}
            progress={challenge.progress}
            addDayInStreak={addDayInStreak}
            removeDayFromStreak={removeDayFromStreak}
          />
        )}
      </div>
    </div>
  );
};

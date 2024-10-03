import Logo from '../../../assets/logo1.png';
import { useStreakState } from '../lib/useStreakState';
import { Loader } from '../../../shared/ui/Loader';
import { CalendarManager } from './CalendarManager';

type Props = {
  challengeId: string;
};

export const ChallengeWidget = ({ challengeId }: Props) => {
  const { challenge, challengeProgress, isLoading, addDayInStreak } = useStreakState({
    challengeId,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center overflow-y-scroll">
      <div className="w-[500px] px-[16px]">
        <div className="flex justify-center items-center py-[18px] px-[24px]">
          <img className="w-[400px]" src={Logo} alt="" />
        </div>

        {!!challenge && !!challengeProgress && (
          <CalendarManager
            challenge={challenge}
            progress={challengeProgress}
            addDayInStreak={addDayInStreak}
          />
        )}
      </div>
    </div>
  );
};

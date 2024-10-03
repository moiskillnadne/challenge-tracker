type Props = {
  goal: string;
  isActive: boolean;
  daysLeft: number;
  onClick: () => void;
};

export const ChallengeGridItem = ({ goal, isActive, daysLeft, onClick }: Props) => {
  return (
    <div
      className="flex flex-col items-start w-[150px] border-2 border-dotted cursor-default px-[4px] py-[4px] hover:border-solid"
      onClick={onClick}
    >
      <div className="text-white font-bold text-[18px]">{goal}</div>
      <div className="text-white text-[14px] text-white/75">
        {isActive ? 'in progress' : 'completed'}
      </div>
      <div className="text-white/75 text-[14px]">
        Days left: <span className="font-bold">{daysLeft}</span>
      </div>
    </div>
  );
};

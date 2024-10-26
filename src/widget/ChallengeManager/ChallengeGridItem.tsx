type Props = {
  goal: string;
  isActive: boolean;
  daysLeft: number;
  onClick: () => void;
};

export const ChallengeGridItem = ({ goal, isActive, daysLeft, onClick }: Props) => {
  return (
    <div
      className={`duration-700  flex flex-col items-start w-[150px] border-2 border-dotted border-black cursor-default px-[4px] py-[4px] hover:border-solid select-none`}
      onClick={onClick}
    >
      <div className="font-bold text-[18px] cursor-default select-none">{goal}</div>
      <div className="text-[14px] text-black/75 cursor-default select-none">
        {isActive ? 'in progress' : 'completed'}
      </div>
      <div className="text-black/75 text-[14px] cursor-default select-none">
        Days left: <span className="font-bold">{daysLeft}</span>
      </div>
    </div>
  );
};

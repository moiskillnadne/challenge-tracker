type Props = {
  label: string;
  isChecked: boolean;
  onClick: () => void;
};

export const CalendarDayItem = ({ label, isChecked, onClick }: Props) => {
  return (
    <div
      className={`relative flex items-center justify-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full text-white text-center font-bold text-[16px]`}
      onClick={onClick}
    >
      <span className={`${isChecked ? '' : 'opacity-30'} transition-all duration-1000`}>
        {label}
      </span>

      <svg
        className="absolute transition-all duration-1000"
        width="50"
        height="50"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="transition-all duration-1000"
          cx="50"
          cy="50"
          r="45"
          stroke="#C1FF72"
          strokeWidth="6"
          fill="none"
          strokeDasharray={500}
          strokeDashoffset={isChecked ? 0 : 500}
        />
      </svg>
    </div>
  );
};

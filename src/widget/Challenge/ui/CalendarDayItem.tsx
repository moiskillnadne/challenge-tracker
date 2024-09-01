type Props = {
  label: string;
  isChecked: boolean;
  onClick: () => void;
};

export const CalendarDayItem = ({ label, isChecked, onClick }: Props) => {
  return (
    <div
      className={`relative flex items-center justify-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full text-white text-center font-bold text-[16px] ${isChecked ? '' : 'opacity-30'}`}
      onClick={onClick}
    >
      {label}
      <div className="absolute inset-0 rounded-full border-[6px] border-green"></div>
    </div>
  );
};

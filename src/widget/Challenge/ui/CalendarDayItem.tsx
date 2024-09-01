type Props = {
  label: string;
};

export const CalendarDayItem = ({ label }: Props) => {
  return (
    <div className="relative flex items-center justify-center w-[70px] h-[70px] rounded-full text-white text-center font-bold text-[16px]">
      {label}
      <div className="absolute inset-0 rounded-full border-[6px] border-lime-400"></div>
    </div>
  );
};
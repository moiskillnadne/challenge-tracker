type Props = {
  label: string;
};

export const CalendarHeaderItem = ({ label }: Props) => {
  return (
    <div className="relative flex items-center justify-center w-[70px] h-[70px] rounded-full text-white text-center font-bold text-[16px]">
      {label}
      <div className="absolute inset-0 rounded-full border-[6px] border-pink-500"></div>
      <div className="absolute inset-[5px] rounded-full border-[7px] border-lime-400"></div>
      <div className="absolute inset-[11px] rounded-full border-[6px] border-cyan-400 z-3"></div>
    </div>
  );
};

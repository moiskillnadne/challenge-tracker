type Props = {
  label: string;
};

export const CalendarHeaderItem = ({ label }: Props) => {
  return (
    <div className="relative flex items-center justify-center w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full text-white text-center font-bold text-[14px]">
      {label}
      <div className="absolute inset-0 rounded-full border-[4px] border-red"></div>
      <div className="absolute inset-[4px] rounded-full border-[5px] border-green"></div>
      <div className="absolute inset-[8px] rounded-full border-[4px] border-blue z-3"></div>
    </div>
  );
};

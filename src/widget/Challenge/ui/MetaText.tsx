type Props = {
  leftLabel: string;
  rightLabel: string;
};

export const MetaText = ({ leftLabel, rightLabel }: Props) => {
  return (
    <div className="text-[20px]">
      <span className="text-lime-400">{leftLabel}</span>
      <span className="text-pink-500">{rightLabel}</span>
    </div>
  );
};

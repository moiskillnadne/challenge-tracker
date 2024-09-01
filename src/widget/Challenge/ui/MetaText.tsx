type Props = {
  leftLabel: string;
  rightLabel: string;
};

export const MetaText = ({ leftLabel, rightLabel }: Props) => {
  return (
    <div className="text-[20px]">
      <span className="text-green">{leftLabel}</span>
      <span className="text-red">{rightLabel}</span>
    </div>
  );
};

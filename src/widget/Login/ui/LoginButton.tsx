import { useCustomTranslation } from '../../../feature/translation';

type Props = {
  labelKey: string;
  onClick: () => void;
  isLoading: boolean;
};

export const LoginButton = ({ onClick, isLoading, labelKey }: Props) => {
  const { t } = useCustomTranslation();

  return (
    <div className="w-[300px] h-[45px]">
      <button
        onClick={onClick}
        className="border-[1px] rounded-full bg-green border-black h-full w-full flex justify-center items-center"
      >
        {isLoading ? (
          <div className="animate-spin h-[25px] w-[25px] border-[2px] rounded-full border-black/50 border-t-black"></div>
        ) : (
          t(labelKey)
        )}
      </button>
    </div>
  );
};

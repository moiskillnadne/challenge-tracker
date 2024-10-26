import { useCustomTranslation } from '../../feature/translation';

export const ChallengeManagerHeader = () => {
  const { t } = useCustomTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="w-[100px] py-[18px] px-[24px]">
        <img className="w-[100px]" src="/web-app-manifest-512x512.png" alt="" />
      </div>
      <div className="flex justify-center mb-[16px] font-bold text-[24px] cursor-default">
        {t('yourChallenges')}
      </div>
    </div>
  );
};

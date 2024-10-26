import { useCustomTranslation } from '../../../feature/translation';

export const LoginHeader = () => {
  const { t } = useCustomTranslation();

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-[500px] px-[16px] flex flex-col items-center">
        <div className="w-[250px]py-[18px] px-[24px]">
          <img className="w-[250px]" src="/web-app-manifest-512x512.png" alt="" />
        </div>
        <h2 className="font-bold text-[32px] whitespace-pre-wrap text-center">
          {t('welcomeToChallengeLogger')}
        </h2>
      </div>
    </div>
  );
};

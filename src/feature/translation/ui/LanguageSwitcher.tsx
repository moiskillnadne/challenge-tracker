import { useCustomTranslation } from '../lib/useCustomTranslation';

export const LanguageSwitcher = () => {
  const { switchLanguage, language } = useCustomTranslation();

  return (
    <button
      className="text-white font-bold text-[26px] m-[16px] cursor-pointer"
      onClick={switchLanguage}
    >
      {language.toUpperCase()}
    </button>
  );
};

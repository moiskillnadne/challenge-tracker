import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SupportableLanguage } from '../../../app/system/constant';

export const useCustomTranslation = () => {
  const { i18n, t } = useTranslation();

  const [language, setLanguage] = useState<SupportableLanguage>(
    (i18n.language as SupportableLanguage) || SupportableLanguage.RU,
  );

  const switchLanguage = useCallback(async () => {
    const lng =
      language === SupportableLanguage.RU ? SupportableLanguage.EN : SupportableLanguage.RU;

    setLanguage(lng);

    await i18n.changeLanguage(lng);
  }, [language]);

  return {
    t,
    language,
    switchLanguage,
  };
};

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enResources from '../../i18n/en/translation.json';
import ruResources from '../../i18n/ru/translation.json';

const i18nManager = {
  async initialize() {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        resources: {
          en: enResources,
          ru: ruResources,
        },
        supportedLngs: ['en', 'ru'],
        interpolation: {
          escapeValue: false,
        },
        debug: import.meta.env.NODE_ENV !== 'production',
      });
  },

  addResources(language: string, namespace: string, resources: Record<string, string>) {
    i18n.addResources(language, namespace, resources);
  },
};

export default i18nManager;

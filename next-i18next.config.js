/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'fr'],
    localeDetection: false,
  },
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  ns: ['common', 'navbar', 'footer', 'buttons'],
  defaultNS: 'common',
  
  interpolation: {
    escapeValue: false,
  },
  
  react: {
    useSuspense: false,
  },
  
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
  },
};
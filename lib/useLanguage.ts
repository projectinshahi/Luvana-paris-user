import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation('common');
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  const languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w40/sa.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
  ];

  const changeLanguage = useCallback(async (langCode: string) => {
    try {
      await i18n.changeLanguage(langCode);
      setCurrentLanguage(langCode);
      
      if (typeof window !== 'undefined') {
        document.documentElement.lang = langCode;
        document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', langCode);
        
        // Update body class for RTL styling
        if (langCode === 'ar') {
          document.body.classList.add('rtl');
          document.body.classList.remove('ltr');
        } else {
          document.body.classList.add('ltr');
          document.body.classList.remove('rtl');
        }
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [i18n]);

  useEffect(() => {
    setCurrentLanguage(i18n.language || 'en');
  }, [i18n.language]);

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0];
  const isRTL = currentLanguage === 'ar';

  return {
    currentLanguage,
    currentLang,
    languages,
    changeLanguage,
    isRTL,
    t,
  };
};
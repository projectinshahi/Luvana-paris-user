"use client";

import { useLanguage } from '@/lib/useLanguage';

export default function LanguageExample() {
  const { t, currentLanguage, changeLanguage, languages, isRTL } = useLanguage();

  return (
    <div className={`p-6 bg-gray-100 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
      <h2 className="text-2xl font-bold mb-4">
        {t('home')} - Language Example
      </h2>
      
      <div className="space-y-4">
        <p>
          <strong>{t('search')}:</strong> {t('search')}
        </p>
        <p>
          <strong>{t('cartLabel')}:</strong> {t('cartLabel')}
        </p>
        <p>
          <strong>{t('wishlistLabel')}:</strong> {t('wishlistLabel')}
        </p>
        <p>
          <strong>{t('account')}:</strong> {t('account')}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Switch Language:</h3>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-4 py-2 rounded-md border ${
                currentLanguage === lang.code
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="w-4 h-4 inline-block mr-2"
              />
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Current Language: {currentLanguage}</p>
        <p>Is RTL: {isRTL ? 'Yes' : 'No'}</p>
        <p>Direction: {isRTL ? 'Right to Left' : 'Left to Right'}</p>
      </div>
    </div>
  );
}
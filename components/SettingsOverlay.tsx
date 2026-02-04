"use client";

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/useLanguage';
import { useCurrency } from '@/contexts/CurrencyContext';
import { COUNTRIES } from '@/lib/countries';

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsOverlay({ isOpen, onClose }: SettingsOverlayProps) {
  const { t } = useTranslation('common');
  const { isRTL, languages, changeLanguage, currentLang } = useLanguage();
  const { selectedCountry, setSelectedCountry } = useCurrency();
  
  const [showCountryList, setShowCountryList] = useState(false);
  const [showLanguageList, setShowLanguageList] = useState(false);

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setShowCountryList(false);
  };

  const handleLanguageSelect = (langCode: string) => {
    changeLanguage(langCode);
    setShowLanguageList(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Background */}
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div className={`fixed top-20 ${isRTL ? 'left-4' : 'right-4'} w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl z-50 overflow-hidden`}>
        
        {/* Country Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => setShowCountryList(!showCountryList)}
            className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span className={`text-gray-700 font-medium ${isRTL ? 'font-arabic' : ''}`}>Country</span>
            <ChevronRight 
              size={16} 
              className={`text-gray-400 transition-transform ${showCountryList ? 'rotate-90' : ''} ${isRTL ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {showCountryList && (
            <div className="bg-gray-50 max-h-48 overflow-y-auto">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full p-3 text-left hover:bg-white transition-colors border-b border-gray-100 last:border-b-0 ${
                    selectedCountry.code === country.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  } ${isRTL ? 'text-right font-arabic' : ''}`}
                >
                  {country.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Section */}
        <div>
          <button
            onClick={() => setShowLanguageList(!showLanguageList)}
            className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span className={`text-gray-700 font-medium ${isRTL ? 'font-arabic' : ''}`}>Language</span>
            <ChevronRight 
              size={16} 
              className={`text-gray-400 transition-transform ${showLanguageList ? 'rotate-90' : ''} ${isRTL ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {showLanguageList && (
            <div className="bg-gray-50 max-h-48 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full p-3 text-left hover:bg-white transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${
                    currentLang.code === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  } ${isRTL ? 'text-right flex-row-reverse font-arabic' : ''}`}
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
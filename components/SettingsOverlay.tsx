"use client";

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/useLanguage';
import { Country, useCurrency } from '@/contexts/CurrencyContext';
import { useRouter } from 'next/navigation';


interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsOverlay({ isOpen, onClose }: SettingsOverlayProps) {
  const { t } = useTranslation('common');
  const { isRTL, languages, changeLanguage, currentLang } = useLanguage();
  const { selectedCountry, setSelectedCountry,countries } = useCurrency();
  // const [countries, setCountries] = useState<Country[]>([]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [showLanguageList, setShowLanguageList] = useState(false);
  const router = useRouter();

  // const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
  // const handleCountrySelect = (country: Country) => {
  //   setSelectedCountry(country);
  //   setShowCountryList(false);
  // };
  const handleCountrySelect = (country: any) => {
  const formattedCountry = {
    _id: country._id,
    nameEnglish: country.nameEnglish,
    nameArabic: country.nameArabic,
    flagUrl: country.flagUrl,
    abbreviation: country.abbreviation,
    currencyValue: country.currencyValue
  };

  setSelectedCountry(formattedCountry);

  localStorage.setItem(
    "selectedCountry",
    JSON.stringify(formattedCountry)
  );

  setShowCountryList(false);
};
useEffect(() => {
  const saved = localStorage.getItem("selectedCountry");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      setSelectedCountry(parsed);
    } catch (error) {
      console.warn("Invalid selectedCountry in localStorage, clearing...");
      localStorage.removeItem("selectedCountry");
    }
  }
}, []);
// useEffect(() => {
//   const fetchCountries = async () => {
//     try {
//       const API_URL =
//         process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//       const res = await fetch(`${API_URL}/user/country`);
//       const data = await res.json();

//       setCountries(data.countries || []);
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };

//   fetchCountries();
// }, []);
// const handleClick = (key: string) => {
//   setSelectedItem(key);
//   setOpenMenu(null);

//   if (key === "new") {
//     router.push("/");
//   } else if (key === "brands") {
//     router.push("/brands");
//   } else {
//     // ✅ Correct format
//     router.push(`/brands?category=${key}`);
//   }
// };
  const handleLanguageSelect = (langCode: string) => {
    changeLanguage(langCode);
    setShowLanguageList(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Background */}
      <div
        className="fixed inset-0 bg-ink/40 z-40"
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div className="fixed top-16 right-4 w-80 bg-cream backdrop-blur-sm rounded-lg border border-line shadow-luxury-lg z-50 overflow-hidden" dir="ltr">
        
        {/* Country Section */}
        <div className="border-b border-line">
          <button
            onClick={() => setShowCountryList(!showCountryList)}
            className={`w-full p-4 flex items-center justify-between hover:bg-champagne transition-colors ${isRTL ? '' : ''}`}
          >
            <span className={`text-ink font-medium ${isRTL ? 'text-right' : 'text-left'}`}>Country</span>
            <ChevronRight
              size={16}
              className={`text-muted transition-transform shrink-0 ${showCountryList ? 'rotate-90' : ''} ${isRTL ? '-scale-x-100' : ''}`}
            />
          </button>
          
          {showCountryList && (
            <div className="bg-sand max-h-48 overflow-y-auto">
              {/* {COUNTRIES.map((country) => ( */}
              {countries.map((country) => (
                <button
                  key={country._id}
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full p-3 hover:bg-champagne transition-colors border-b border-line last:border-b-0 ${
                    selectedCountry?._id === country._id ? 'bg-champagne text-gold-dark' : 'text-ink'
                  } ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {/* {country.name} */}
                  {isRTL ? country.nameArabic : country.nameEnglish}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Section */}
        <div>
          <button
            onClick={() => setShowLanguageList(!showLanguageList)}
            className={`w-full p-4 flex items-center justify-between hover:bg-champagne transition-colors ${isRTL ? '' : ''}`}
          >
            <span className={`text-ink font-medium ${isRTL ? 'text-right' : 'text-left'}`}>Language</span>
            <ChevronRight
              size={16}
              className={`text-muted transition-transform shrink-0 ${showLanguageList ? 'rotate-90' : ''} ${isRTL ? '-scale-x-100' : ''}`}
            />
          </button>
          
          {showLanguageList && (
            <div className="bg-sand max-h-48 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full p-3 hover:bg-champagne transition-colors border-b border-line last:border-b-0 flex items-center gap-3 ${
                    currentLang.code === lang.code ? 'bg-champagne text-gold-dark' : 'text-ink'
                  } ${isRTL ? 'text-right' : 'text-left'}`}
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
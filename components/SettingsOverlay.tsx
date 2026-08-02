"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronRight, Check } from 'lucide-react';
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false); // drives enter/exit animation
  const [pos, setPos] = useState<{ top: number; right: number }>({ top: 56, right: 12 }); // anchored under the gear

  // Play exit animation, then let the parent unmount.
  const requestClose = useCallback(() => {
    setShow(false);
    setTimeout(onClose, 180);
  }, [onClose]);

  // Enter animation + Escape-to-close + focus the panel on open.
  useEffect(() => {
    if (!isOpen) return;
    // Fresh state each open — no stale expanded sub-list carried over (incl. after a language switch).
    setShowCountryList(false);
    setShowLanguageList(false);
    // Anchor directly under the gear icon (8px gap), right-aligned to it.
    const trigger = document.querySelector<HTMLElement>('button[aria-label="Settings"]');
    if (trigger) {
      const r = trigger.getBoundingClientRect();
      setPos({ top: Math.round(r.bottom + 8), right: Math.max(8, Math.round(window.innerWidth - r.right)) });
    }
    const raf = requestAnimationFrame(() => setShow(true));
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') requestClose(); };
    document.addEventListener('keydown', onKey);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('keydown', onKey); };
  }, [isOpen, requestClose]);

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

  requestClose();
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
    requestClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Background (click-outside to close) */}
      <div
        className={`fixed inset-0 bg-ink/40 z-40 transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}
        onClick={requestClose}
      />

      {/* Settings Panel — anchored just below the top-right settings icon; width capped so it never overflows small phones */}
      <div
        ref={panelRef}
        role="menu"
        aria-label="Settings"
        tabIndex={-1}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{ top: pos.top, right: pos.right }}
        className={`fixed w-72 max-w-[calc(100vw-1.5rem)] bg-cream backdrop-blur-sm rounded-xl border border-line shadow-luxury-lg z-50 overflow-hidden origin-top-right transition-all duration-200 ease-out focus:outline-none ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >

        {/* Country Section */}
        <div className="border-b border-line">
          <button
            onClick={() => setShowCountryList(!showCountryList)}
            aria-expanded={showCountryList}
            aria-controls="settings-country-list"
            className="w-full p-4 flex items-center justify-between gap-3 hover:bg-champagne transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
          >
            <span className="text-ink font-medium">{isRTL ? "الدولة" : "Country"}</span>
            <ChevronRight
              size={16}
              className={`text-muted transition-transform shrink-0 ${showCountryList ? 'rotate-90' : ''} ${isRTL ? '-scale-x-100' : ''}`}
            />
          </button>

          {showCountryList && (
            <div id="settings-country-list" className="bg-sand max-h-48 overflow-y-auto">
              {countries.map((country) => {
                const selected = selectedCountry?._id === country._id;
                return (
                  <button
                    key={country._id}
                    role="menuitem"
                    aria-current={selected ? "true" : undefined}
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full p-3 flex items-center gap-3 text-start hover:bg-champagne transition-colors border-b border-line last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset ${
                      selected ? 'bg-champagne text-gold-dark' : 'text-ink'
                    }`}
                  >
                    {country.flagUrl ? (
                      <img
                        src={country.flagUrl}
                        alt=""
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                        className="w-5 h-5 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-line shrink-0" aria-hidden />
                    )}
                    <span className="truncate">{isRTL ? country.nameArabic : country.nameEnglish}</span>
                    {selected && <Check size={16} className="ms-auto shrink-0 text-gold-dark" aria-hidden />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Language Section */}
        <div>
          <button
            onClick={() => setShowLanguageList(!showLanguageList)}
            aria-expanded={showLanguageList}
            aria-controls="settings-language-list"
            className="w-full p-4 flex items-center justify-between gap-3 hover:bg-champagne transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
          >
            <span className="text-ink font-medium">{isRTL ? "اللغة" : "Language"}</span>
            <ChevronRight
              size={16}
              className={`text-muted transition-transform shrink-0 ${showLanguageList ? 'rotate-90' : ''} ${isRTL ? '-scale-x-100' : ''}`}
            />
          </button>

          {showLanguageList && (
            <div id="settings-language-list" className="bg-sand max-h-48 overflow-y-auto">
              {languages.map((lang) => {
                const selected = currentLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    role="menuitem"
                    aria-current={selected ? "true" : undefined}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full p-3 flex items-center gap-3 text-start hover:bg-champagne transition-colors border-b border-line last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset ${
                      selected ? 'bg-champagne text-gold-dark' : 'text-ink'
                    }`}
                  >
                    {lang.flag ? (
                      <img
                        src={lang.flag}
                        alt=""
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                        className="w-5 h-5 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-line shrink-0" aria-hidden />
                    )}
                    <span className="truncate">{lang.name}</span>
                    {selected && <Check size={16} className="ms-auto shrink-0 text-gold-dark" aria-hidden />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
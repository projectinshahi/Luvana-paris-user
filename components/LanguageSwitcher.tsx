"use client";

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/useLanguage';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { currentLang, languages, changeLanguage } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Show default state during hydration
  if (!mounted) {
    return (
      <div className="relative">
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm">
          <img
            src="https://flagcdn.com/w40/gb.png"
            alt="English"
            className="w-4 h-4 rounded-full object-cover"
          />
          <span className="text-white">English</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
        aria-label="Change language"
      >
        <img
          src={currentLang.flag}
          alt={currentLang.name}
          className="w-4 h-4 rounded-full object-cover"
        />
        <span className="text-white">{currentLang.name}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-lg z-50 min-w-max border border-gray-700">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                currentLang.code === lang.code ? 'bg-gray-800' : ''
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="text-sm text-white">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
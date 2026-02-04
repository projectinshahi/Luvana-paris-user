"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';

export default function SimpleCountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  const handleCountryChange = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
        aria-label="Select country and currency"
      >
        <img
          src={selectedCountry.flag}
          alt={selectedCountry.name}
          className="w-4 h-4 rounded-full object-cover"
        />
        <span className="text-white">{selectedCountry.currencySymbol}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-lg z-50 min-w-max border border-gray-700 max-h-64 overflow-y-auto">
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountryChange(country)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                selectedCountry.code === country.code ? 'bg-gray-800' : ''
              }`}
            >
              <img
                src={country.flag}
                alt={country.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm text-white font-medium">{country.name}</span>
                <span className="text-xs text-gray-400">{country.currency} ({country.currencySymbol})</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
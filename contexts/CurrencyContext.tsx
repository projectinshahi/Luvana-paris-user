"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Country, COUNTRIES, convertCurrency, formatPrice as formatPriceUtil } from '@/lib/countries';

interface CurrencyContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  formatPrice: (price: number, baseCurrency?: string) => string;
  convertPrice: (price: number, fromCurrency?: string) => number;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(COUNTRIES[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved country from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedCountryCode = localStorage.getItem('selectedCountry');
        if (savedCountryCode) {
          const savedCountry = COUNTRIES.find(country => country.code === savedCountryCode);
          if (savedCountry) {
            setSelectedCountryState(savedCountry);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load saved country from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setSelectedCountry = (country: Country) => {
    setSelectedCountryState(country);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedCountry', country.code);
      }
    } catch (error) {
      console.warn('Failed to save country to localStorage:', error);
    }
  };

  const formatPrice = (price: number, baseCurrency: string = 'USD'): string => {
    const convertedPrice = convertPrice(price, baseCurrency);
    return formatPriceUtil(convertedPrice, selectedCountry.currency, selectedCountry.currencySymbol);
  };

  const convertPrice = (price: number, fromCurrency: string = 'USD'): number => {
    return convertCurrency(price, fromCurrency, selectedCountry.currency);
  };

  const value: CurrencyContextType = {
    selectedCountry,
    setSelectedCountry,
    formatPrice,
    convertPrice,
    isLoading,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider. Make sure your component is wrapped with CurrencyProvider.');
  }
  return context;
};
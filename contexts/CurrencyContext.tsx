// "use client";

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { Country, COUNTRIES, convertCurrency, formatPrice as formatPriceUtil } from '@/lib/countries';

// interface CurrencyContextType {
//   selectedCountry: Country;
//   setSelectedCountry: (country: Country) => void;
//   formatPrice: (price: number, baseCurrency?: string) => string;
//   convertPrice: (price: number, fromCurrency?: string) => number;
//   isLoading: boolean;
// }

// const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// interface CurrencyProviderProps {
//   children: ReactNode;
// }

// export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
//   const [selectedCountry, setSelectedCountryState] = useState<Country>(COUNTRIES[0]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Load saved country from localStorage on mount
//   useEffect(() => {
//     try {
//       if (typeof window !== 'undefined') {
//         const savedCountryCode = localStorage.getItem('selectedCountry');
//         if (savedCountryCode) {
//           const savedCountry = COUNTRIES.find(country => country.code === savedCountryCode);
//           if (savedCountry) {
//             setSelectedCountryState(savedCountry);
//           }
//         }
//       }
//     } catch (error) {
//       console.warn('Failed to load saved country from localStorage:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const setSelectedCountry = (country: Country) => {
//     setSelectedCountryState(country);
//     try {
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('selectedCountry', country.code);
//       }
//     } catch (error) {
//       console.warn('Failed to save country to localStorage:', error);
//     }
//   };

//   const formatPrice = (price: number, baseCurrency: string = 'USD'): string => {
//     const convertedPrice = convertPrice(price, baseCurrency);
//     return formatPriceUtil(convertedPrice, selectedCountry.currency, selectedCountry.currencySymbol);
//   };

//   const convertPrice = (price: number, fromCurrency: string = 'USD'): number => {
//     return convertCurrency(price, fromCurrency, selectedCountry.currency);
//   };

//   const value: CurrencyContextType = {
//     selectedCountry,
//     setSelectedCountry,
//     formatPrice,
//     convertPrice,
//     isLoading,
//   };

//   return (
//     <CurrencyContext.Provider value={value}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export const useCurrency = (): CurrencyContextType => {
//   const context = useContext(CurrencyContext);
//   if (context === undefined) {
//     throw new Error('useCurrency must be used within a CurrencyProvider. Make sure your component is wrapped with CurrencyProvider.');
//   }
//   return context;
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Country {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  flagUrl: string;
  currencyValue: string;
  abbreviation: string;
}

interface CurrencyContextType {
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
  formatPrice: (price: number | null | undefined) => string;
  convertPrice: (price: number | null | undefined) => number;
  isLoading: boolean;
  countries: Country[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryState, setSelectedCountryState] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH COUNTRIES FROM BACKEND
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/user/country`);
        const data = await res.json();

        if (data?.countries?.length) {
          setCountries(data.countries);

          const saved = localStorage.getItem("selectedCountry");
          
          let defaultCountry = data.countries.find((c: Country) => c.nameEnglish === "Kuwait");

          if (saved) {
            const savedCountry = data.countries.find((c: Country) => c.nameEnglish === saved);
            if (savedCountry) {
              defaultCountry = savedCountry;
            }
          }

          if (!defaultCountry) {
            defaultCountry = data.countries[0];
          }

          setSelectedCountryState(defaultCountry);
        }
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const setSelectedCountry = (country: Country) => {
    setSelectedCountryState(country);
    localStorage.setItem("selectedCountry", country.nameEnglish);
    // Dispatch event in case other non-React code needs to listen
    window.dispatchEvent(new Event("countryChanged"));
  };

  const convertPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return 0;
    if (!selectedCountryState) return price;
    return price * Number(selectedCountryState.currencyValue);
  };

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "";
    if (!selectedCountryState) return `KWD ${price.toFixed(2)}`;
    return `${selectedCountryState.abbreviation} ${convertPrice(price).toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry: selectedCountryState,
        setSelectedCountry,
        formatPrice,
        convertPrice,
        isLoading,
        countries,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }
  return context;
};
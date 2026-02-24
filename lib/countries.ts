export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  {
    code: "AE",
    name: "United Arab Emirates",
    currency: "AED",
    currencySymbol: "د.إ",
    flag: "https://flagcdn.com/w40/ae.png"
  },
  {
    code: "BH",
    name: "Bahrain",
    currency: "BHD",
    currencySymbol: "د.ب",
    flag: "https://flagcdn.com/w40/bh.png"
  },
  {
    code: "KW",
    name: "Kuwait",
    currency: "KWD",
    currencySymbol: "د.ك",
    flag: "https://flagcdn.com/w40/kw.png"
  },
  {
    code: "OM",
    name: "Oman",
    currency: "OMR",
    currencySymbol: "ر.ع.",
    flag: "https://flagcdn.com/w40/om.png"
  },
  {
    code: "QA",
    name: "Qatar",
    currency: "QAR",
    currencySymbol: "ر.ق",
    flag: "https://flagcdn.com/w40/qa.png"
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    currencySymbol: "ر.س",
    flag: "https://flagcdn.com/w40/sa.png"
  },
  {
    code: "US",
    name: "United States",
    currency: "USD",
    currencySymbol: "$",
    flag: "https://flagcdn.com/w40/us.png"
  },
  {
    code: "EU",
    name: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    flag: "https://flagcdn.com/w40/eu.png"
  }
];

// Exchange rates relative to USD (base currency)
export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,      // Base currency
  AED: 3.67,     // 1 USD = 3.67 AED
  BHD: 0.376,    // 1 USD = 0.376 BHD
  KWD: 0.307,    // 1 USD = 0.307 KWD
  OMR: 0.385,    // 1 USD = 0.385 OMR
  QAR: 3.64,     // 1 USD = 3.64 QAR
  SAR: 3.75,     // 1 USD = 3.75 SAR
  EUR: 0.92      // 1 USD = 0.92 EUR
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first (base currency)
  const usdAmount = fromCurrency === 'USD' ? amount : amount / EXCHANGE_RATES[fromCurrency];
  
  // Convert from USD to target currency
  const convertedAmount = toCurrency === 'USD' ? usdAmount : usdAmount * EXCHANGE_RATES[toCurrency];
  
  return Math.round(convertedAmount * 100) / 100;
};

// Format price with currency symbol
export const formatPrice = (amount: number, currency: string, currencySymbol: string): string => {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  // For Arabic currencies, symbol goes after the number
  if (['AED', 'BHD', 'KWD', 'OMR', 'QAR', 'SAR'].includes(currency)) {
    return `${formatted} ${currencySymbol}`;
  }
  
  // For USD and EUR, symbol goes before
  return `${currencySymbol}${formatted}`;
};

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
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
    code: "AE",
    name: "UAE",
    currency: "AED",
    currencySymbol: "د.إ",
    flag: "https://flagcdn.com/w40/ae.png"
  },
  {
    code: "IN",
    name: "India",
    currency: "INR",
    currencySymbol: "₹",
    flag: "https://flagcdn.com/w40/in.png"
  }
];

// Mock exchange rates (in production, fetch from API)
export const EXCHANGE_RATES: Record<string, number> = {
  BHD: 0.377,
  KWD: 0.307,
  OMR: 0.385,
  QAR: 3.64,
  SAR: 3.75,
  AED: 3.67,
  INR: 1
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to INR first (base currency)
  const inrAmount = fromCurrency === 'INR' ? amount : amount / EXCHANGE_RATES[fromCurrency];
  
  // Convert from INR to target currency
  const convertedAmount = toCurrency === 'INR' ? inrAmount : inrAmount * EXCHANGE_RATES[toCurrency];
  
  return Math.round(convertedAmount * 100) / 100;
};
"use client";

import { useCurrency } from '@/contexts/CurrencyContext';

export default function TestCurrency() {
  try {
    const { selectedCountry } = useCurrency();
    return (
      <div className="p-4 bg-green-100 text-green-800 rounded">
        ✅ CurrencyProvider working! Current country: {selectedCountry?.nameEnglish || 'Not selected'}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        ❌ CurrencyProvider error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
}
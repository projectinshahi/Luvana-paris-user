"use client";

import { useCurrency } from '@/contexts/CurrencyContext';

interface PriceDisplayProps {
  price: number;
  originalCurrency?: string;
  className?: string;
}

export default function PriceDisplay({ 
  price, 
  originalCurrency = 'INR', 
  className = '' 
}: PriceDisplayProps) {
  const { formatPrice, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <span className={`font-semibold ${className}`}>
        <span className="animate-pulse bg-gray-300 rounded w-16 h-4 inline-block"></span>
      </span>
    );
  }

  return (
    <span className={`font-semibold ${className}`}>
      {formatPrice(price, originalCurrency)}
    </span>
  );
}
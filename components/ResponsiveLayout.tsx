"use client";

import { ReactNode } from 'react';
import { useLanguage } from '@/lib/useLanguage';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const { isRTL } = useLanguage();

  return (
    <div className={`
      w-full min-h-screen bg-cream
      mobile-viewport-fix mobile-no-scroll
      prevent-layout-shift text-rendering-fix
      ${isRTL ? 'rtl font-arabic' : 'ltr'}
      ${className}
    `}>
      {children}
    </div>
  );
}
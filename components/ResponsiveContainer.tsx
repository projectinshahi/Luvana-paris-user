"use client";

import { ReactNode } from 'react';
import { useLanguage } from '@/lib/useLanguage';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function ResponsiveContainer({ 
  children, 
  className = '', 
  maxWidth = 'xl',
  padding = 'md'
}: ResponsiveContainerProps) {
  const { isRTL } = useLanguage();

  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md', 
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  };

  return (
    <div className={`
      w-full mx-auto
      ${maxWidthClasses[maxWidth]}
      ${paddingClasses[padding]}
      ${isRTL ? 'rtl' : 'ltr'}
      ${className}
    `}>
      {children}
    </div>
  );
}
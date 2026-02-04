"use client";

import { ReactNode } from 'react';
import { useLanguage } from '@/lib/useLanguage';

interface ResponsiveTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
}

export default function ResponsiveText({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'text-white',
  align = 'left',
  className = ''
}: ResponsiveTextProps) {
  const { isRTL } = useLanguage();

  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl md:text-5xl',
    '4xl': 'text-4xl sm:text-5xl md:text-6xl',
    '5xl': 'text-5xl sm:text-6xl md:text-7xl',
    '6xl': 'text-6xl sm:text-7xl md:text-8xl'
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const getTextAlign = () => {
    if (align === 'center') return 'text-center';
    if (align === 'justify') return 'text-justify';
    
    if (isRTL) {
      return align === 'left' ? 'text-right' : 'text-left';
    }
    
    return align === 'right' ? 'text-right' : 'text-left';
  };

  return (
    <Component className={`
      ${sizeClasses[size]}
      ${weightClasses[weight]}
      ${color}
      ${getTextAlign()}
      ${isRTL ? 'font-arabic' : ''}
      ${className}
    `}>
      {children}
    </Component>
  );
}
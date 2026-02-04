"use client";

import { ReactNode } from 'react';
import ResponsiveContainer from './ResponsiveContainer';

interface ResponsiveSectionProps {
  children: ReactNode;
  className?: string;
  background?: 'transparent' | 'black' | 'gray' | 'white';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export default function ResponsiveSection({
  children,
  className = '',
  background = 'transparent',
  padding = 'lg',
  maxWidth = 'xl'
}: ResponsiveSectionProps) {
  
  const backgroundClasses = {
    transparent: 'bg-transparent',
    black: 'bg-black',
    gray: 'bg-gray-900',
    white: 'bg-white'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20',
    xl: 'py-20 sm:py-24'
  };

  return (
    <section className={`
      w-full
      ${backgroundClasses[background]}
      ${paddingClasses[padding]}
      ${className}
    `}>
      <ResponsiveContainer maxWidth={maxWidth}>
        {children}
      </ResponsiveContainer>
    </section>
  );
}
"use client";

import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ResponsiveGrid({ 
  children, 
  className = '',
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md'
}: ResponsiveGridProps) {
  
  const gapClasses = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-10'
  };

  const getGridCols = () => {
    let classes = '';
    
    if (cols.default) classes += `grid-cols-${cols.default} `;
    if (cols.sm) classes += `sm:grid-cols-${cols.sm} `;
    if (cols.md) classes += `md:grid-cols-${cols.md} `;
    if (cols.lg) classes += `lg:grid-cols-${cols.lg} `;
    if (cols.xl) classes += `xl:grid-cols-${cols.xl} `;
    
    return classes.trim();
  };

  return (
    <div className={`
      grid
      ${getGridCols()}
      ${gapClasses[gap]}
      ${className}
    `}>
      {children}
    </div>
  );
}
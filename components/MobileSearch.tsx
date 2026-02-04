"use client";

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/useLanguage';

export default function MobileSearch() {
  const { t } = useTranslation('common');
  const { isRTL } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="sm:hidden fixed top-[55px] left-0 right-0 z-40 px-0 py-2 bg-black border-b border-gray-800">
        <div className="px-3">
          <div className="flex items-center gap-2.5 bg-gray-900 rounded-md px-3 py-2.5 border border-gray-700/50">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-white placeholder-gray-500 text-sm"
              dir="ltr"
              style={{
                fontSize: '14px',
                lineHeight: '1.4',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:hidden fixed top-[55px] left-0 right-0 z-40 bg-black border-b border-gray-800">
      <div className="px-3 py-2">
        <div className={`flex items-center gap-2.5 bg-gray-900 rounded-md px-3 py-2.5 border border-gray-700/50`}>
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder={t("search") || "Search"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`
              bg-transparent 
              outline-none 
              w-full 
              text-white 
              placeholder-gray-500 
              text-sm
              ${isRTL ? 'text-right' : 'text-left'}
            `}
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{
              fontSize: '14px',
              lineHeight: '1.4',
              WebkitAppearance: 'none',
              appearance: 'none',
              textAlign: isRTL ? 'right' : 'left'
            }}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="p-1 hover:bg-gray-800 rounded transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
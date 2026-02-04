"use client";

import { useLanguage } from '@/lib/useLanguage';

export default function LayoutTest() {
  const { currentLanguage, isRTL } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50">
      <div className="space-y-1">
        <div>Language: <span className="font-bold">{currentLanguage.toUpperCase()}</span></div>
        <div>Direction: <span className="font-bold">{isRTL ? 'RTL' : 'LTR'}</span></div>
        <div className="text-green-400">
          Layout: <span className="font-bold">FIXED</span>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Logo → Search → Icons → Country → Language
        </div>
      </div>
    </div>
  );
}
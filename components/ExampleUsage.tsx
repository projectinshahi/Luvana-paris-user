"use client";

import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/useLanguage';
import { useCurrency } from '@/contexts/CurrencyContext';
import PriceDisplay from './PriceDisplay';

export default function ExampleUsage() {
  const { t } = useTranslation('common');
  const { isRTL } = useLanguage();
  const { selectedCountry } = useCurrency();

  return (
    <div className={`p-6 max-w-4xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {t('exploreMore.title')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('exploreMore.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Product Example 1 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="bg-gray-200 h-32 rounded mb-3"></div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t('products.niacinamideSerum')}
            </h3>
            <div className="flex justify-between items-center">
              <PriceDisplay price={999} className="text-lg text-blue-600" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                {t('products.addToCart')}
              </button>
            </div>
          </div>

          {/* Product Example 2 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="bg-gray-200 h-32 rounded mb-3"></div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t('products.wildCherry')}
            </h3>
            <div className="flex justify-between items-center">
              <PriceDisplay price={1299} className="text-lg text-blue-600" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                {t('products.addToCart')}
              </button>
            </div>
          </div>

          {/* Product Example 3 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="bg-gray-200 h-32 rounded mb-3"></div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t('products.confidence')}
            </h3>
            <div className="flex justify-between items-center">
              <PriceDisplay price={2499} className="text-lg text-blue-600" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                {t('products.addToCart')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Current Country:</span>
            <br />
            <span className="text-gray-600">{selectedCountry.name} ({selectedCountry.currency})</span>
          </div>
          <div>
            <span className="font-medium">Text Direction:</span>
            <br />
            <span className="text-gray-600">{isRTL ? 'RTL (Arabic)' : 'LTR'}</span>
          </div>
          <div>
            <span className="font-medium">Currency Symbol:</span>
            <br />
            <span className="text-gray-600">{selectedCountry.currencySymbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
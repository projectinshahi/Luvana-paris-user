"use client";

import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/useLanguage';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation('common');
  const { isRTL } = useLanguage();
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const menuCategories = [
    {
      name: t('categories.new'),
      key: 'new',
      hasSubItems: false
    },
    {
      name: t('categories.brands'),
      key: 'brands',
      hasSubItems: true,
      subItems: [
        "L'Oréal",
        "Estée Lauder", 
        "MAC",
        "Maybelline",
        "Clinique",
        "Fenty Beauty"
      ]
    },
    {
      name: t('categories.makeup'),
      key: 'makeup',
      hasSubItems: false
    },
    {
      name: t('categories.skincare'),
      key: 'skincare', 
      hasSubItems: false
    },
    {
      name: t('categories.fragrance'),
      key: 'fragrance',
      hasSubItems: false
    },
    {
      name: t('categories.haircare'),
      key: 'haircare',
      hasSubItems: false
    }
  ];

  const handleCategoryClick = (categoryKey: string) => {
    if (expandedCategory === categoryKey) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryKey);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Main Menu Slide */}
      <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-80 bg-black text-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}`}>
        
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className={`text-lg font-medium ${isRTL ? 'font-arabic' : ''}`}>Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          {menuCategories.map((category) => (
            <div key={category.key} className="border-b border-gray-800">
              <button
                onClick={() => handleCategoryClick(category.key)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors text-left ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <span className={`${category.key === 'brands' ? 'text-[#C9A24D]' : 'text-white'}`}>
                  {category.name}
                </span>
                {category.hasSubItems && (
                  expandedCategory === category.key ? 
                    <ChevronUp size={16} className="text-[#C9A24D]" /> : 
                    <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>
              
              {/* Sub Items */}
              {category.hasSubItems && expandedCategory === category.key && (
                <div className="bg-gray-900">
                  {category.subItems?.map((subItem) => (
                    <button
                      key={subItem}
                      className={`w-full p-4 pl-8 text-left hover:bg-gray-800 transition-colors text-[#C9A24D] ${isRTL ? 'pr-8 pl-4 text-right font-arabic' : ''}`}
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
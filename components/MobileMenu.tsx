"use client";

import { useEffect, useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/useLanguage';
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
type Category = {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  status: string;
};

type Brand = {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  status: string;
};
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation('common');
  const { isRTL } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
const [brands, setBrands] = useState<Brand[]>([]);
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const router = useRouter();

  // const menuCategories = [
  //   {
  //     name: t('categories.new'),
  //     key: 'new',
  //     hasSubItems: false
  //   },
  //   {
  //     name: t('categories.brands'),
  //     key: 'brands',
  //     hasSubItems: true,
  //     subItems: [
  //       "L'Oréal",
  //       "Estée Lauder", 
  //       "MAC",
  //       "Maybelline",
  //       "Clinique",
  //       "Fenty Beauty"
  //     ]
  //   },
  //   {
  //     name: t('categories.makeup'),
  //     key: 'makeup',
  //     hasSubItems: false
  //   },
  //   {
  //     name: t('categories.skincare'),
  //     key: 'skincare', 
  //     hasSubItems: false
  //   },
  //   {
  //     name: t('categories.fragrance'),
  //     key: 'fragrance',
  //     hasSubItems: false
  //   },
  //   {
  //     name: t('categories.haircare'),
  //     key: 'haircare',
  //     hasSubItems: false
  //   }
  // ];
  useEffect(() => {
  const fetchHomeData = async () => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const res = await fetch(`${API_URL}/user/home`);
      const data = await res.json();

      const activeCategories = data.categories.filter(
        (cat: Category) => cat.status === "active"
      );

      const activeBrands = data.brands.filter(
        (brand: Brand) => brand.status === "active"
      );

      setCategories(activeCategories);
      setBrands(activeBrands);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  fetchHomeData();
}, []);

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

  {/* NEW */}
  <button
    onClick={() => {
      router.push("/");
      onClose();
    }}
    className={`w-full p-4 text-left hover:bg-gray-900 ${
      isRTL ? "text-right font-arabic" : ""
    }`}
  >
    {t("categories.new")}
  </button>


  {/* BRANDS */}
  <div className="border-b border-gray-800">
    <button
      onClick={() => handleCategoryClick("brands")}
      className={`w-full flex items-center justify-between p-4 hover:bg-gray-900 ${
        isRTL ? "flex-row-reverse font-arabic" : ""
      }`}
    >
      <span className="text-[#C9A24D]">
        {t("categories.brands")}
      </span>

      {expandedCategory === "brands" ? (
        <ChevronUp size={16} className="text-[#C9A24D]" />
      ) : (
        <ChevronDown size={16} className="text-gray-400" />
      )}
    </button>

    {expandedCategory === "brands" && (
      <div className="bg-gray-900">
        {brands.map((brand) => (
          <button
            key={brand._id}
            onClick={() => {
              router.push(`/brands?brand=${brand._id}`);
              onClose();
            }}
            className={`w-full p-4 pl-8 text-left hover:bg-gray-800 text-[#C9A24D] ${
              isRTL ? "pr-8 pl-4 text-right font-arabic" : ""
            }`}
          >
            {isRTL ? brand.nameArabic : brand.nameEnglish}
          </button>
        ))}
      </div>
    )}
  </div>


  {/* CATEGORIES */}
  {categories.map((cat) => (
    <button
      key={cat._id}
      onClick={() => {
        router.push(`/brands?category=${cat._id}`);
        onClose();
      }}
      className={`w-full p-4 text-left hover:bg-gray-900 ${
        isRTL ? "text-right font-arabic" : ""
      }`}
    >
      {isRTL ? cat.nameArabic : cat.nameEnglish}
    </button>
  ))}

</div>
      </div>
    </>
  );
}
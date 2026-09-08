"use client";

import { useEffect, useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/useLanguage';
import { useRouter } from "next/navigation";
import { getHome } from "@/lib/homeData";
import { useDrawer } from "@/lib/useDrawer";

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
  useDrawer(isOpen, onClose); // scroll-lock + Escape (full-height menu → topOffset unused)

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
        process.env.NEXT_PUBLIC_API_URL || "https://api.luvanaparis.com";

      const data = await getHome();

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

  return (
    <>
      {/* Overlay — fades in/out (kept mounted so the menu can animate) */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Main Menu Slide */}
      <div
        inert={!isOpen}
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-cream text-ink border-e border-line shadow-luxury-lg z-50 flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-line">
          <h2 className={`eyebrow text-gold-dark ${isRTL ? 'font-arabic' : ''}`}>Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-ink hover:bg-champagne rounded-lg transition-colors"
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
    className={`w-full p-4 text-left text-ink hover:text-gold-dark hover:bg-champagne border-b border-line transition-colors ${
      isRTL ? "text-right font-arabic" : ""
    }`}
  >
    {t("categories.new")}
  </button>


  {/* BRANDS */}
  <div className="border-b border-line">
    <button
      onClick={() => handleCategoryClick("brands")}
      className={`w-full flex items-center justify-between p-4 hover:bg-champagne transition-colors ${
        isRTL ? "font-arabic" : ""
      }`}
    >
      <span className="text-gold-dark">
        {t("categories.brands")}
      </span>

      {expandedCategory === "brands" ? (
        <ChevronUp size={16} className="text-gold-dark" />
      ) : (
        <ChevronDown size={16} className="text-muted" />
      )}
    </button>

    {expandedCategory === "brands" && (
      <div className="bg-champagne">
        {brands.map((brand) => (
          <button
            key={brand._id}
            onClick={() => {
              router.push(`/brands?brand=${brand._id}`);
              onClose();
            }}
            className={`w-full p-4 pl-8 text-left hover:bg-sand text-gold-dark transition-colors ${
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
      className={`w-full p-4 text-left text-ink hover:text-gold-dark hover:bg-champagne border-b border-line transition-colors ${
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
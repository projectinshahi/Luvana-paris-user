"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

type Product = {
  id: number;
  nameKey: string;
  image: string;
  price: string;
};

export default function BestSellers() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const products: Product[] = [
    {
      id: 1,
      nameKey: "products.niacinamideSerum",
      image: "/images/1.jpg",
      price: "KWD 4.92  €13.79",
    },
    {
      id: 2,
      nameKey: "products.wildCherry",
      image: "/images/2.jpg",
      price: "KWD 3.66  €9.97",
    },
    {
      id: 3,
      nameKey: "products.cherryBomb",
      image: "/images/3.jpg",
      price: "KWD 5.26  €14.54",
    },
    {
      id: 4,
      nameKey: "products.confidence",
      image: "/images/4.jpg",
      price: "KWD 4.92  €13.79",
    },
  ];

  return (
    <section className="w-full bg-black text-white py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className={`flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1 h-px bg-white/30" />

          <div className="px-4">
            <h2 className={`text-[#C5A059] text-[20px] sm:text-[24px] lg:text-[28px] leading-none text-center whitespace-nowrap ${isRTL ? 'font-arabic' : ''}`}>
              {t('bestSellers')}
            </h2>
          </div>

          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* PRODUCTS - Responsive grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full bg-[#111] rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
       
              <div className="group relative w-full aspect-[3/4] bg-gradient-to-b from-[#E3C6A8] to-[#5F4D2B] p-0.5 sm:p-1">

                <div className="relative w-full h-full bg-[#D9D9D9] overflow-hidden rounded-sm">
                  <button className={`absolute top-2 sm:top-3 ${isRTL ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] border border-[#8C6B1F] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out scale-90 group-hover:scale-100`}>
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  </button>

                  <Image
                    src={product.image}
                    alt={t(product.nameKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />

                  {/* Add to cart button - Mobile optimized */}
                  <button className={`absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-full max-w-60 h-8 sm:h-10 md:h-12 rounded-[8px] sm:rounded-[12px] bg-gradient-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black text-[10px] sm:text-xs md:text-sm font-medium border border-[#8C6B1F] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0 shadow-[inset_0_1px_0_#ffffff80] ${isRTL ? 'font-arabic' : ''}`}>
                    {t('products.addToCart')}
                  </button>

                </div>
              </div>

              {/* TEXT - Mobile optimized */}
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className={`text-[10px] sm:text-xs md:text-sm line-clamp-2 mb-1 sm:mb-2 leading-tight ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                  {t(product.nameKey)}
                </h3>
                <p className={`text-[#C9A24D] text-[10px] sm:text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

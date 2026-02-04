"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ExploreMoreSection() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const categories = [
    {
      titleKey: "categories.makeup",
      descKey: "exploreMore.makeupDesc",
      img: "/images/t1.png",
    },
    {
      titleKey: "categories.skincare",
      descKey: "exploreMore.skincareDesc",
      img: "/images/t2.jpg",
    },
    {
      titleKey: "categories.fragrance",
      descKey: "exploreMore.fragranceDesc",
      img: "/images/t3.png",
    },
    {
      titleKey: "categories.haircare",
      descKey: "exploreMore.haircareDesc",
      img: "/images/t4.jpg",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cactus+Classical+Serif&display=swap');
        .cactus-serif {
          font-family: 'Cactus Classical Serif', serif;
        }
      `}</style>
      
      <section className="relative w-full py-24 overflow-hidden bg-black">
        {/* GOLDEN BACKGROUND IMAGE */}
        <Image
          src="/images/golden.jpg"
          alt="Golden background"
          fill
          className="object-cover"
          priority
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/70 to-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* TITLE SECTION */}
          <div className={`text-center mb-16 ${isRTL ? 'font-arabic' : ''}`}>
            {/* TOP LINE */}
            <div className={`flex items-center justify-center gap-6 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-32 h-px bg-linear-to-r from-transparent to-[#C5A059]"></div>
              <h2 className="cactus-serif text-[#C5A059] text-4xl md:text-5xl font-normal tracking-wide whitespace-nowrap">
                {t('exploreMore.title')}
              </h2>
            </div>
            
            <p className="cactus-serif text-[#D4AF37] text-base md:text-lg tracking-wider font-normal">
              {t('exploreMore.subtitle')}
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((item, i) => (
              <div key={i} className="group">
                {/* IMAGE CARD */}
                <div className="relative w-full h-80 overflow-hidden border-2 border-[#C5A059]/60 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer">
                  <Image
                    src={item.img}
                    alt={t(item.titleKey)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* TEXT */}
                <h3 className={`mt-6 text-[#D4AF37] text-lg md:text-xl font-medium tracking-wide ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                  {t(item.titleKey)}
                </h3>
                <p className={`mt-3 text-[#B8956A] text-sm md:text-base leading-relaxed font-light ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

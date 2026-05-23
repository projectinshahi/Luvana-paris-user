"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

type CategoryFromBackend = {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  descriptionEnglish: string;
  descriptionArabic: string;
  imageUrlEnglish: string;
  imageUrlArabic: string;
  status: string;
};

export default function ExploreMoreSection() {
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";
  const [categories, setCategories] = useState<CategoryFromBackend[]>([]);
  const router = useRouter();

  /* ================= FETCH CATEGORIES (once) ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/user/home`);
        const data = await res.json();

        if (data?.categories) {
          setCategories(
            data.categories.filter(
              (cat: CategoryFromBackend) => cat.status === "active"
            )
          );
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (categories.length === 0) return null;

  // Duplicate so the CSS animation can loop seamlessly (translateX -50%)
  const doubled = [...categories, ...categories];

  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      <style>{`
        @keyframes explore-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .explore-track {
          display: flex;
          /* width is set by content — must NOT have a fixed width */
          animation: explore-scroll 30s linear infinite;
          will-change: transform;
        }
        .explore-wrapper:hover .explore-track {
          animation-play-state: paused;
        }
        /* Each card has right margin instead of gap so CSS animation works */
        .explore-card {
          flex-shrink: 0;
          width: 320px;
          margin-right: 24px;
        }
      `}</style>

      <Image
        src="/images/golden.jpg"
        alt="Golden background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* TITLE */}
        <div className={`text-center mb-16 ${isRTL ? "font-arabic" : ""}`}>
          <div className={`flex items-center justify-center gap-6 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />
            <h2
              className="text-[#C5A059] text-4xl md:text-5xl font-normal tracking-wide whitespace-nowrap"
              style={{ fontFamily: "'Cactus Classical Serif', serif" }}
            >
              {t("exploreMore.title")}
            </h2>
          </div>
          <p
            className="text-[#D4AF37] text-base md:text-lg tracking-wider font-normal"
            style={{ fontFamily: "'Cactus Classical Serif', serif" }}
          >
            {t("exploreMore.subtitle")}
          </p>
        </div>

        {/* CAROUSEL — always LTR so scroll direction is consistent */}
        <div className="explore-wrapper w-full overflow-hidden" dir="ltr">
          <div className="explore-track">
            {doubled.map((item, index) => {
              const title = isRTL
                ? item.nameArabic || item.nameEnglish
                : item.nameEnglish || item.nameArabic;
              const description = isRTL
                ? item.descriptionArabic || item.descriptionEnglish
                : item.descriptionEnglish || item.descriptionArabic;
              const img = isRTL
                ? item.imageUrlArabic || item.imageUrlEnglish
                : item.imageUrlEnglish || item.imageUrlArabic;

              return (
                <div
                  key={`${item._id}-${index}`}
                  className="explore-card group cursor-pointer"
                  onClick={() => router.push(`/brands?category=${item._id}`)}
                >
                  <div className="relative w-full h-80 overflow-hidden border-2 border-[#C5A059]/60 hover:border-[#D4AF37] transition-all duration-300">
                    {img && (
                      <Image
                        src={img}
                        alt={title || ""}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    )}
                  </div>

                  <h3
                    className={`mt-6 text-[#D4AF37] text-lg md:text-xl font-medium tracking-wide ${
                      isRTL ? "text-right font-arabic" : "text-left"
                    }`}
                  >
                    {title}
                  </h3>

                  <p
                    className={`mt-3 text-[#B8956A] text-sm md:text-base leading-relaxed font-light ${
                      isRTL ? "text-right font-arabic" : "text-left"
                    }`}
                  >
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

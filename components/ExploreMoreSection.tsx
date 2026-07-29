"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
  const swiperRef = useRef<any>(null);

  // Intelligent duplication so the loop is ALWAYS full — no empty space ever.
  // 1 → 1 1 1 …, 2 → 1 2 1 2 …, 3 → 1 2 3 1 2 3 …; 5+ tiles seamlessly.
  const carouselCategories = useMemo(() => {
    if (!categories.length) return [];
    const MIN_SLIDES = 12; // covers up to 5-per-view with a full buffer
    const repeat = Math.max(3, Math.ceil(MIN_SLIDES / categories.length));
    return Array.from({ length: repeat }).flatMap(() => categories);
  }, [categories]);

  /* ================= FETCH CATEGORIES (once) ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.luvanaparis.com";
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

  return (
    <>
      <style>{`
        /* Pagination dots (scoped to this section) */
        .explore-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #E8DED2;
          opacity: 1;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 4px;
        }
        .explore-pagination-custom .swiper-pagination-bullet-active {
          background: #8B5E3C;
          width: 26px;
        }

        /* Equal card heights across all slides */
        .swiper-slide { height: auto; }
        .swiper-slide > * { height: 100%; }

        /* Continuous marquee — constant-speed, seamless infinite scroll */
        .swiper-marquee .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>

      <section className="relative w-full py-24 overflow-hidden bg-cream">
        <Image
          src="/images/golden.jpg"
          alt="Golden background"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-b from-cream/80 via-champagne/85 to-cream/80" />

        <div className="relative z-10">
          {/* TITLE — constrained to the site container */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`text-center mb-16 ${isRTL ? "font-arabic" : ""}`}>
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="w-32 h-px bg-linear-to-r from-transparent to-gold" />
                <h2
                  className="text-gold-dark text-4xl md:text-5xl font-normal tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "'Cactus Classical Serif', serif" }}
                >
                  {t("exploreMore.title")}
                </h2>
              </div>
              <p
                className="text-muted text-base md:text-lg tracking-wider font-normal"
                style={{ fontFamily: "'Cactus Classical Serif', serif" }}
              >
                {t("exploreMore.subtitle")}
              </p>
            </div>
          </div>

          {/* CAROUSEL — identical behaviour to Best Sellers (seamless infinite) */}
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 min-[1920px]:px-16">
            <div
              className="relative"
              onMouseEnter={() => { const s = swiperRef.current; if (!s) return; s.autoplay?.stop(); s.setTransition(0); s.setTranslate(s.getTranslate()); }}
              onMouseLeave={() => { const s = swiperRef.current; if (!s) return; s.animating = false; /* freeze cancels the transition (no transitionend) → animating stays true → loop's slideNext bails; reset it so autoplay can advance */ s.setTransition(s.params.speed); s.autoplay?.start(); }}
            >
              {/* Prev — circular, vertically centered, on the carousel's left edge */}
              <button
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev(700)}
                className="hidden sm:flex absolute start-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-card/95 backdrop-blur border border-line shadow-luxury items-center justify-center text-ink-soft hover:text-cream hover:bg-gold hover:border-gold hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>

              <Swiper
                onSwiper={(s) => (swiperRef.current = s)}
                modules={[Autoplay, Pagination, Keyboard, A11y]}
                spaceBetween={12}
                slidesPerView={2}
                loop={true}
                loopAdditionalSlides={5}
                speed={4000}
                grabCursor={true}
                allowTouchMove={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false, // manual onMouseEnter/Leave own pause+resume; Swiper's own gate desyncs with them
                }}
                keyboard={{ enabled: true }}
                a11y={{
                  enabled: true,
                  prevSlideMessage: "Previous slide",
                  nextSlideMessage: "Next slide",
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  el: ".explore-pagination-custom",
                }}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 16 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 24 },
                  1280: { slidesPerView: 5, spaceBetween: 24 },
                }}
                className="swiper-marquee w-full"
                dir="ltr"
              >
                {carouselCategories.map((item, index) => {
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
                    <SwiperSlide key={`${item._id}-${index}`} className="h-auto">
                      <div
                        className="group cursor-pointer h-full flex flex-col transition-transform duration-300 hover:-translate-y-1"
                        onClick={() => router.push(`/brands?category=${item._id}`)}
                      >
                        <div className="relative w-full h-80 overflow-hidden rounded-xl border border-gold/40 hover:border-gold-dark shadow-luxury hover:shadow-luxury-lg transition-all duration-300">
                          {img && (
                            <Image
                              src={img}
                              alt={title || ""}
                              fill
                              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              unoptimized
                            />
                          )}
                        </div>

                        <h3
                          className={`mt-6 text-gold-dark text-lg md:text-xl font-medium tracking-wide ${
                            isRTL ? "text-right font-arabic" : "text-left"
                          }`}
                        >
                          {title}
                        </h3>

                        <p
                          className={`mt-3 text-ink-soft text-sm md:text-base leading-relaxed font-light ${
                            isRTL ? "text-right font-arabic" : "text-left"
                          }`}
                        >
                          {description}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Next — circular, vertically centered, on the carousel's right edge */}
              <button
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext(700)}
                className="hidden sm:flex absolute end-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-card/95 backdrop-blur border border-line shadow-luxury items-center justify-center text-ink-soft hover:text-cream hover:bg-gold hover:border-gold hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>

              {/* Pagination — always centered */}
              <div className="explore-pagination-custom mt-8 flex gap-2 justify-center items-center"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

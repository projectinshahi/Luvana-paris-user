
// "use client";

// import Image from "next/image";
// import { Libre_Bodoni, Charm } from "next/font/google";

// const libreBodoni = Libre_Bodoni({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// const charm = Charm({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">

//       <Image
//         src="/images/Rectangle 2.png"
//         alt="Luxury Glow"
//         fill
//         priority

// export default function ImageSection() {
//   const { t, i18n } = useTranslation("common");
//   const [current, setCurrent] = useState(0);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const isRTL = i18n.language === "ar";

//   const slides = [
//     {
//       image: "/images/Rectangle 2.png",
//       title: t("hero.chooseGlow"),
//       subtitle: t("hero.luxuryLifestyle"),
//       align: "left",
//     },
//     {
//       image: "/images/herosectionimg.png",
//       title: t("hero.shineHere"),
//       subtitle: t("hero.luxuryLifestyle"),
//       align: "center",
//     },
//     {
//       image:
//         "https://www.shutterstock.com/image-photo/portrait-beautiful-brazilian-woman-after-600nw-2651672513.jpg",
//       title: t("hero.shineConfidence"),
//       subtitle: t("hero.luxuryDefines"),
//       align: "left",
//     },
//     {
//       image:
//         "https://img.freepik.com/premium-photo/stylish-portrait-beautiful-woman-model-confident-elegant-stance_171965-74429.jpg?w=1080",
//       title: t("hero.feelGlamour"),
//       subtitle: t("hero.styleBeauty"),
//       align: "left",
//     },
//   ];

//   // 🔥 Auto Slide
//   useEffect(() => {
//     startAutoSlide();
//     return () => stopAutoSlide();
//   }, []);

//   const startAutoSlide = () => {
//     intervalRef.current = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 4000);
//   };

//   const stopAutoSlide = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//   };

//   // 🔥 Manual Dot Click
//   const handleDotClick = (index: number) => {
//     stopAutoSlide();
//     setCurrent(index);
//     startAutoSlide();
//   };

//   return (
//     <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[95vh] overflow-hidden">

//       {/* Slides */}
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//             current === index ? "opacity-100 z-20" : "opacity-0 z-10"
//           }`}
//         >
//           <Image
//             src={slide.image}
//             alt="Hero Slide"
//             fill
//             priority={index === 0}
//             className="object-cover object-center"
//             sizes="100vw"
//           />

//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-black/50" />

//           {/* Text */}
//           <div
//             className={`relative z-30 h-full flex items-center px-5 sm:px-8 md:px-16 lg:px-24
//             ${
//               slide.align === "center"
//                 ? "justify-center text-center"
//                 : isRTL
//                 ? "justify-end text-right"
//                 : "justify-start text-left"
//             }`}
//           >
//             <div className="max-w-5xl">

//               <h1
//                 className={`${libreBodoni.className}
//                   text-[24px] sm:text-[34px] md:text-[48px] lg:text-[60px] xl:text-[72px]
//                   leading-tight text-[#E3C6A8] mb-3
//                   ${isRTL ? "font-arabic" : ""}
//                 `}
//                 suppressHydrationWarning
//               >
//                 {slide.title}
//               </h1>

//               <p
//                 className={`${charm.className}
//                   text-[16px] sm:text-[20px] md:text-[26px] lg:text-[34px]
//                   text-[#C5A059]
//                   ${isRTL ? "font-arabic" : ""}
//                 `}
//                 suppressHydrationWarning
//               >
//                 {slide.subtitle}
//               </p>

//             </div>
//           </div>
//         </div>
//       ))}

//       {/* 🔥 Dots Navigation - visible on desktop/tablet */}
//       <div className="hidden md:flex absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-40">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`transition-all duration-300 rounded-full ${
//               current === index
//                 ? "w-4 h-4 bg-white"
//                 : "w-3 h-3 bg-white/50 hover:bg-white/80"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Libre_Bodoni, Charm } from "next/font/google";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/lib/useIsMobile";
import { getHome } from "@/lib/homeData";

const libreBodoni = Libre_Bodoni({ subsets: ["latin"], weight: ["400"] });
const charm = Charm({ subsets: ["latin"], weight: ["400"] });

interface Banner {
  _id: string;
  titleEnglish: string;
  titleArabic: string;
  descriptionEnglish: string;
  descriptionArabic: string;
  imageUrlEnglish: string;
  imageUrlArabic: string;
  imageMobileUrlEnglish?: string;
  imageMobileUrlArabic?: string;
  sortOrder: number;
  status: string;
}

export default function ImageSection() {
  const { i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";
  const isMobile = useIsMobile();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // Real aspect ratio (w/h) of each banner image, measured on load and keyed by
  // its URL, so the container can match the displayed image exactly — full width,
  // full height, no side gaps and no cropping, whatever size was uploaded.
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch banners
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await getHome();

        if (data) {
          const activeBanners = data.banners
            .filter((banner: Banner) => banner.status === "active")
            .sort((a: Banner, b: Banner) => a.sortOrder - b.sortOrder);

          setBanners(activeBanners);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
        setIsLoading(false);
      }
    };

    fetchHome();
  }, []);

  // Auto slide with smooth transitions
  const startAutoSlide = useCallback(() => {
    // Respect reduced-motion: no auto-advancing.
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
  }, [banners.length]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [banners.length, startAutoSlide, stopAutoSlide]);

  const handleDotClick = useCallback((index: number) => {
    stopAutoSlide();
    setCurrent(index);
    startAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  // Prev/Next + keyboard — always reset the timer (no rapid-click interruption: crossfade is CSS)
  const goDelta = useCallback((d: number) => {
    stopAutoSlide();
    setCurrent((p) => (p + d + banners.length) % banners.length);
    startAutoSlide();
  }, [banners.length, startAutoSlide, stopAutoSlide]);

  // Pause autoplay when the tab is hidden; resume when visible
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) stopAutoSlide();
      else if (banners.length > 1) startAutoSlide();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [banners.length, startAutoSlide, stopAutoSlide]);

  // Which asset a banner shows at the current breakpoint. Used by both the
  // container sizing below and the render, so the two can never disagree.
  const srcFor = useCallback(
    (banner: Banner) => {
      const desktop = isRTL ? banner.imageUrlArabic : banner.imageUrlEnglish;
      const mobile = isRTL ? banner.imageMobileUrlArabic : banner.imageMobileUrlEnglish;
      return (isMobile && mobile) || desktop;
    },
    [isMobile, isRTL]
  );

  // Hero box: ONE ratio for the whole visit, set in CSS, so the hero never resizes —
  // and never pushes the page — while banners load or rotate. Slides whose art
  // matches it fill it edge to edge; any other slide is shown whole (object-contain)
  // rather than cropped. Its value is the ratio measured on this device's previous
  // visit (applied before first paint by app/layout.tsx), otherwise the defaults
  // below, which follow the banner formats in use: portrait mobile assets and 2:1
  // desktop banners. ponytail: change HERO_DEFAULT_RATIO (and the CSS fallbacks in
  // sizeClass) if the house banner format changes; returning visitors adapt anyway.
  const HERO_DEFAULT_RATIO = { mobile: 9 / 16, desktop: 2 };
  const sizeClass = "aspect-[var(--hero-ratio-m,9/16)] md:aspect-[var(--hero-ratio-d,2/1)]";
  const sizeStyle = undefined;
  const boxRatio = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const fromLastVisit = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(isMobile ? "--hero-ratio-m" : "--hero-ratio-d")
    );
    return fromLastVisit > 0 ? fromLastVisit : isMobile ? HERO_DEFAULT_RATIO.mobile : HERO_DEFAULT_RATIO.desktop;
  }, [isMobile]);

  // The best ratio for this device, saved for the next visit (never applied mid-visit).
  // On phones, banners that ship a mobile asset decide it, and portrait ones win over
  // a landscape file put in the mobile slot. Otherwise the most common ratio wins; a
  // tie goes to the banner shown first. Deterministic — not "whichever loaded first".
  const bestRatio = useMemo(() => {
    const authored = isMobile
      ? banners.filter((b) => (isRTL ? b.imageMobileUrlArabic : b.imageMobileUrlEnglish))
      : banners;
    const pool = authored.length ? authored : banners;
    const groups: { ratio: number; count: number; first: number }[] = [];
    pool.forEach((banner, order) => {
      const r = ratios[srcFor(banner)];
      if (!r) return;
      const g = groups.find((x) => Math.abs(x.ratio - r) / x.ratio < 0.02);
      if (g) g.count += 1;
      else groups.push({ ratio: r, count: 1, first: order });
    });
    const candidates = isMobile && groups.some((g) => g.ratio < 1) ? groups.filter((g) => g.ratio < 1) : groups;
    candidates.sort((x, y) => y.count - x.count || x.first - y.first);
    return candidates[0]?.ratio;
  }, [banners, ratios, srcFor, isMobile, isRTL]);

  useEffect(() => {
    if (!bestRatio) return;
    try {
      localStorage.setItem(isMobile ? "heroRatio-m" : "heroRatio-d", String(bestRatio));
    } catch {}
  }, [bestRatio, isMobile]);

  // A slide whose art matches the box fills it edge to edge; any other is shown whole
  // on the backdrop instead of having its edges cut off. Until an image reports its
  // size it is contained too — identical to cover when it does match, never a crop.
  const fitFor = (src: string) => {
    const r = ratios[src];
    if (!r || !boxRatio) return "object-contain";
    return Math.abs(r - boxRatio) / boxRatio < 0.02 ? "object-cover" : "object-contain";
  };

  // Loading state
  if (isLoading || !banners.length) {
    return (
      <section className={`relative w-full overflow-hidden bg-champagne ${sizeClass}`} style={sizeStyle}>
        <div className="absolute inset-0 skeleton-luxury" />
      </section>
    );
  }

  return (
    <section
      className={`relative w-full overflow-hidden bg-champagne ${sizeClass}`}
      style={sizeStyle}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "ArrowRight") goDelta(1); else if (e.key === "ArrowLeft") goDelta(-1); }}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={() => { if (banners.length > 1) startAutoSlide(); }}
    >
      {banners.map((banner, index) => {
        // Mobile viewport uses the mobile image when present, else falls back to desktop.
        const image = srcFor(banner);
        const title = isRTL ? banner.titleArabic : banner.titleEnglish;
        const description = isRTL
          ? banner.descriptionArabic
          : banner.descriptionEnglish;

        const isActive = current === index;
        const isPrev = current === (index + 1) % banners.length;

        return (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isActive
              ? "opacity-100 z-20 scale-100"
              : isPrev
                ? "opacity-0 z-10 scale-105"
                : "opacity-0 z-0 scale-95"
              }`}
            style={{
              transitionProperty: "opacity, transform",
              willChange: isActive || isPrev ? "opacity, transform" : "auto",
            }}
          >
            <Image
              src={image}
              alt={title || "Promotional banner"}
              fill
              priority={index === 0}
              className={`${fitFor(image)} object-center`}
              // The hero is full-bleed at every breakpoint, so the candidate
              // width is always the viewport width — capping it made wide
              // displays upscale a 1600px file and look soft.
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
              onLoad={(e) => {
                // Every slide reports its own ratio; the container follows
                // whichever one is currently visible.
                const img = e.currentTarget;
                if (!img.naturalWidth || !img.naturalHeight) return;
                const r = img.naturalWidth / img.naturalHeight;
                setRatios((prev) => (prev[image] === r ? prev : { ...prev, [image]: r }));
              }}
            />

            {/* Scrim and caption only where there is caption text to carry.
                Banners with their wording baked into the artwork get neither,
                so the image is not needlessly darkened — and a contained image
                keeps a clean backdrop instead of dark bands. */}
            {(title || description) && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />

                <div
                  className={`relative z-30 h-full flex items-end px-4 pb-5 sm:px-8 sm:pb-8 md:px-14 md:pb-10 lg:px-16 lg:pb-12 transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${isRTL ? "justify-end text-right" : "justify-start text-left"}`}
                >
                  <div className="w-full max-w-[32rem] sm:max-w-[36rem] lg:max-w-[42rem] px-1 sm:px-0 pb-2 sm:pb-0">
                    <h1
                      className={`${libreBodoni.className}
                    text-[24px] sm:text-[28px] md:text-[36px] lg:text-[44px] xl:text-[52px]
                    leading-tight text-[#E3C6A8] mb-2 sm:mb-3
                    transition-all duration-700 delay-100
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                >
                  {title}
                </h1>

                <p
                  className={`${charm.className}
                    text-[15px] sm:text-[16px] md:text-[20px] lg:text-[24px]
                    text-[#C5A059]
                    transition-all duration-700 delay-200
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                >
                  {description}
                </p>
              </div>
            </div>
            </>
            )}
          </div>
        );
      })}

      {/* Prev / Next */}
      {banners.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => goDelta(-1)}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur text-white items-center justify-center transition focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goDelta(1)}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur text-white items-center justify-center transition focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {banners.length > 1 && (
        <div className="hidden md:flex absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              // className={`transition-all duration-500 rounded-full ${current === index
              //   ? "w-8 h-3 bg-white"
              //   : "w-3 h-3 bg-white/50 hover:bg-white/80 hover:scale-110"
              //   }`}
              //               className={`transition-all duration-300 rounded-full ${
              //   current === index
              //     ? "w-8 h-1.5 bg-white"
              //     : "w-2 h-2 bg-white/50"
              // }`}
              // className={`transition-all duration-300 rounded-full ${current === index
              //     ? "w-6 h-1.5 sm:w-8 sm:h-3 bg-white"
              //     : "w-2 h-2 sm:w-3 sm:h-3 bg-white/50"
              //   }`}
              className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-white focus:outline-none ${
  current === index
    ? "w-[30px] h-[6px] bg-gold"
    : "w-[6px] h-[6px] bg-white/40 hover:bg-white/70"
}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// "use client";

// import Image from "next/image";
// import { useEffect, useState, useRef } from "react";
// import { Charm } from "next/font/google";
// import { useTranslation } from "react-i18next";

// const charm = Charm({ subsets: ["latin"], weight: "400" });

// export default function ExploreBrandsSection() {
//   const { t, i18n } = useTranslation("common");
//   const isRTL = i18n.language === "ar";

//   const [current, setCurrent] = useState(0);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   const slides = [
//     {
//       type: "image",
//       src: "/images/brand.jpg",
//     },
//     {
//       type: "image",
//       src: "/images/aj.jpg",
//     },
//     {
//       type: "image",
//       src: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1470&q=80",
//     },
//     {
//       type: "video",
//       src: "https://www.youtube.com/embed/nqHq-T7anLA?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=nqHq-T7anLA&fs=0&iv_load_policy=3",
//       title: "Video Slide",
//     },
//   ];

//   useEffect(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     const slideDuration = currentSlide.type === "video" ? 10000 : 5000;
//     let startTime = Date.now();

//     if (currentSlide.type === "video" && !isVideoLoaded) {
//       const loadBuffer = setTimeout(() => {
//         setIsVideoLoaded(true);
//         startTime = Date.now();
//       }, 3000);
//       return () => clearTimeout(loadBuffer);
//     }

//     intervalRef.current = setInterval(() => {
//       const elapsed = Date.now() - startTime;
//       if (elapsed >= slideDuration) {
//         setCurrent((prev) => (prev + 1) % slides.length);
//         if (currentSlide.type === "video") {
//           setIsVideoLoaded(false);
//         }
//       }
//     }, 100);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [current, isVideoLoaded]);

//   const currentSlide = slides[current];

//   const handleVideoLoad = () => {
//     if (currentSlide.type === "video" && !isVideoLoaded) {
//       setIsVideoLoaded(true);
//     }
//   };

//   return (
//     <section
//       className="relative w-full overflow-hidden bg-black"
//       style={{ height: "682px" }}
//     >
//       {currentSlide.type === "image" ? (
//         <Image
//           key={current}
//           src={currentSlide.src}
//           alt="Explore Brands Background"
//           fill
//           className="object-cover transition-opacity duration-1000 ease-in-out"
//           priority={current === 0}
//         />
//       ) : (
//         <div className="absolute inset-0 w-full h-full overflow-hidden">
//           {/* Video wrapper with forced aspect ratio and cover scaling */}
//           <div
//             className="relative w-full h-full"
//             style={{
//               position: "relative",
//               paddingBottom: "56.25%", // 16:9 default for YouTube – adjust if video is different
//               height: 0,
//               overflow: "hidden",
//             }}
//           >
//             <iframe
//               src={currentSlide.src}
//               title={currentSlide.title || "Video"}
//               onLoad={handleVideoLoad}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="absolute top-0 left-0 w-full h-full border-0"
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 transform: "scale(1.01)", // Tiny scale to prevent edge gaps
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/40 pointer-events-none" />

//       {/* TOP TEXT */}
//       <div
//         className={`absolute top-10 z-20 ${
//           isRTL ? "left-10 text-left" : "right-10 text-right"
//         }`}
//         style={{ maxWidth: "475px" }}
//       >
//         <h2
//           className={`font-normal text-[#C5A059] text-[50px] leading-none tracking-[0] mb-2 font-['Cactus_Classical_Serif',serif] ${
//             isRTL ? "font-arabic" : ""
//           }`}
//         >
//           {t("exploreBrands")}
//         </h2>
//         <p
//           className={`${charm.className} font-normal text-[#C5A059] text-[32px] leading-none tracking-[0] ${
//             isRTL ? "font-arabic" : ""
//           }`}
//         >
//           {t("brands.luxuryFavorites")}
//         </p>
//       </div>

//       {/* BOTTOM BUTTON */}
//       <div className={`absolute bottom-10 z-20 ${isRTL ? "left-10" : "right-10"}`}>
//         <button
//           className={`rounded-[25px] bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 ${
//             isRTL ? "font-arabic" : ""
//           }`}
//           style={{ width: "185px", height: "69px" }}
//         >
//           {t("brands.shopNow")}
//         </button>
//       </div>

//       {/* Dots navigation */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               current === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/lib/useIsMobile";
import { getHome } from "@/lib/homeData";

type BrandFromBackend = {
  _id: string;
  brandImageEnglish: string;
  brandImageArabic: string;
  brandMobileImageEnglish?: string;
  brandMobileImageArabic?: string;
  status: string;
};

type Slide = {
  _id: string;
  src: string;
  srcMobile?: string;
  nameEnglish: string;
  nameArabic: string;
};

export default function ExploreBrandsSection() {
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";
  const isMobile = useIsMobile();

  const brandsSubheading = isRTL
    ? "أرقى المختارات."
    : "More Luxury Brand Style.";

  const [slides, setSlides] = useState<Slide[]>([]);
  // Track index over the extended array [ ...slides, clone-of-slide-0 ].
  // pos may reach slides.length (the trailing clone) so the track keeps moving
  // RIGHT past the last brand into the first, then silently snaps back.
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  // Real aspect ratio (w/h) of the mobile brand image, measured on load, so the mobile
  // container can match it exactly — full-width, no side gaps, no cropping.
  const [mobileRatio, setMobileRatio] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
const router = useRouter();
  const SLIDE_DURATION = 5000;
  const PROGRESS_UPDATE_INTERVAL = 50;
  const SLIDE_MS = 700;

  // Display index (0..N-1) derived from the track position. The trailing clone
  // (pos === slides.length) maps back to 0, so dots/progress/Shop-Now stay correct.
  const current = slides.length ? pos % slides.length : 0;

  // ✅ FETCH BRANDS FROM BACKEND
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getHome();

        if (data?.brands) {
          const activeBrands = data.brands
            .filter((brand: BrandFromBackend) => brand.status === "active")
            .map((brand: any) => ({
              _id: brand._id,
              src:
                i18n.language === "ar"
                  ? brand.brandImageArabic
                  : brand.brandImageEnglish,
              srcMobile:
                i18n.language === "ar"
                  ? brand.brandMobileImageArabic
                  : brand.brandMobileImageEnglish,
                   nameEnglish: brand.nameEnglish,
                   nameArabic: brand.nameArabic,
            }));

          setSlides(activeBrands);
        }
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, [i18n.language]);

  // ✅ SMOOTH SLIDE TRANSITION
  // const goToSlide = useCallback((index: number) => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   setCurrent(index);
  //   setProgress(0);
  //   setTimeout(() => setIsTransitioning(false), 300);
  // }, [isTransitioning]);
  // Jump straight to a real slide (dots). Animates directly from wherever we are.
  const goToSlide = useCallback((index: number) => {
    setPos(index);
    setProgress(0);
  }, []);

  // Forward: step the track right by one. From the last real slide this lands on
  // the trailing clone (slide 0 arriving from the right); onTransitionEnd then
  // snaps to the real slide 0 with animation off — invisible, no rewind.
  const goNext = useCallback(() => {
    if (!slides.length) return;
    setProgress(0);
    setPos((p) => (p >= slides.length ? 1 : p + 1));
  }, [slides.length]);

  // Backward: from the first slide, hop to the trailing clone with no animation,
  // then slide left to the last real slide — seamless in both directions.
  const goPrev = useCallback(() => {
    if (!slides.length) return;
    setProgress(0);
    if (pos % slides.length !== 0) {
      setPos((p) => p - 1);
      return;
    }
    setAnimate(false);
    setPos(slides.length); // land on the clone first (identical to slide 0)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setPos(slides.length - 1);
      })
    );
  }, [pos, slides.length]);

  // Re-enable transitions one frame after a silent snap (forward wrap / prev hop).
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  // ✅ AUTO SLIDER WITH PROGRESS BAR
  useEffect(() => {
    if (slides.length <= 1 || !isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    // Reset progress
    setProgress(0);

    // Progress bar animation
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);
    }, PROGRESS_UPDATE_INTERVAL);

    // Auto advance slide
    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [slides.length, isPlaying, current, goNext]);

  // ✅ KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const currentSlide = slides[current];

  // ── Premium section heading (lives ABOVE the slider, in the container). ──────
  // Mirrors naturally for RTL via inherited dir; no layout branching needed.
  const heading = (
    <div className="w-full bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-20 pb-10 md:pb-12">
        {/* TITLE — matches BestSellers / ExploreMore section headings */}
        <header className={`text-center ${isRTL ? "font-arabic" : ""}`}>
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
            {/* decorative — equal flex-1 (capped) lines on BOTH sides keep the heading the true center */}
            <span aria-hidden className="flex-1 max-w-32 h-px bg-linear-to-r from-transparent to-gold" />
            <h2
              className="text-gold-dark text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide break-words"
              style={{ fontFamily: "'Cactus Classical Serif', serif" }}
            >
              {t("exploreBrands")}
            </h2>
            <span aria-hidden className="flex-1 max-w-32 h-px bg-linear-to-r from-gold to-transparent" />
          </div>
          <p
            className="text-muted text-base md:text-lg tracking-wider font-normal"
            style={{ fontFamily: "'Cactus Classical Serif', serif" }}
          >
            {brandsSubheading}
          </p>
        </header>
      </div>
    </div>
  );

  // Container sizing.
  //  • Desktop: unchanged fixed 682px.
  //  • Mobile: match the measured mobile-image ratio → full-width, gap-free, crop-free.
  //    Until measured, fall back to ~70svh. Rails keep freak ratios from going extreme.
  const sizeClass = isMobile ? (mobileRatio ? "min-h-[58svh] max-h-[86svh]" : "h-[70svh]") : "";
  const sizeStyle = isMobile
    ? mobileRatio
      ? { aspectRatio: String(mobileRatio) }
      : undefined
    : { height: "682px" };

  if (!slides.length) {
    return (
      <>
        {heading}
        <section
          className={`relative w-full overflow-hidden bg-champagne animate-pulse ${sizeClass}`}
          style={sizeStyle}
        >
          <div className="absolute inset-0 skeleton-luxury" />
        </section>
      </>
    );
  }

  return (
    <>
      {heading}
      <section
        className={`relative w-full overflow-hidden bg-cream group ${sizeClass}`}
        style={sizeStyle}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) (dx < 0 ? goNext : goPrev)();
        }}
      >
      {/* BACKGROUND — HORIZONTAL SWIPE TRACK.
          All slides sit in one flex row; the track slides by 100% per step.
          Forced dir="ltr" so the translate math is language-independent. */}
      <div
        dir="ltr"
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${pos * 100}%)`,
          transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none",
          willChange: "transform",
        }}
        onTransitionEnd={() => {
          // Reached the trailing clone → silently snap to the real first slide.
          if (pos === slides.length) {
            setAnimate(false);
            setPos(0);
          }
        }}
      >
        {[...slides, slides[0]].map((slide, idx) => {
          // Mobile viewport uses the mobile image when present, else falls back to desktop.
          const src = isMobile && slide.srcMobile ? slide.srcMobile : slide.src;
          return (
            <div key={`${slide._id}-${idx}`} className="relative w-full h-full shrink-0">
              <Image
                src={src}
                alt={slide?.nameEnglish || "Brand"}
                fill
                sizes="100vw"
                priority={idx === 0}
                draggable={false}
                onLoad={(e) => {
                  // Only a real mobile asset drives the mobile container ratio.
                  if (isMobile && slide.srcMobile) {
                    const img = e.currentTarget;
                    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                      const r = img.naturalWidth / img.naturalHeight;
                      setMobileRatio((prev) => (prev === r ? prev : r));
                    }
                  }
                }}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* DARK OVERLAY */}
      {/* <div className="absolute inset-0 bg-linear-to-t from-cream/80 via-cream/30 to-transparent pointer-events-none" /> */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Heading + subheading now live ABOVE the slider (see `heading`). */}

      {/* NAVIGATION ARROWS - VISIBLE ON HOVER */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card/70 backdrop-blur-sm border border-line shadow-luxury flex items-center justify-center text-ink hover:bg-gold hover:border-gold transition-all duration-400 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="rtl:rotate-180" />
          </button>
          <button
            onClick={goNext}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card/70 backdrop-blur-sm border border-line shadow-luxury flex items-center justify-center text-ink hover:bg-gold hover:border-gold transition-all duration-400 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="rtl:rotate-180" />
          </button>
        </>
      )}

      {/* PLAY/PAUSE BUTTON */}
      {/* {slides.length > 1 && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#C9A24D] hover:border-[#C9A24D] transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
      )} */}

      {/* SHOP NOW BUTTON WITH ANIMATION */}
      <div
        className={`absolute bottom-6 sm:bottom-10 z-20 transition-all duration-800 ease-out ${
          isRTL ? "left-6 sm:left-10" : "right-6 sm:right-10"
        } ${isTransitioning ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
      >
        <button
          onClick={() => {
            router.push(`/brands?brand=${currentSlide._id}`);
          }}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 sm:px-10 py-2.5 sm:py-3.5 text-sm sm:text-base bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-ink font-semibold shadow-luxury hover:shadow-[0_0_30px_rgba(200,168,106,0.45)] hover:scale-105 transition-all duration-500 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none ${
            isRTL ? "font-arabic" : ""
          }`}
        >
          {t("brands.shopNow")}
        </button>
      </div>

      {/* DOTS NAVIGATION WITH PROGRESS BARS */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group/dot transition-transform duration-300 ease-out hover:scale-110"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress bar background */}
              <div className={`rounded-full overflow-hidden transition-all duration-400 ease-out bg-ink/20 group-hover/dot:bg-ink/40 ${
                current === index ? "w-16 h-1.5" : "w-12 h-1"
              }`}>
                {/* Active progress fill */}
                {current === index && isPlaying && (
                  <div
                    className="h-full bg-gold rounded-full transition-[width]"
                    style={{
                      width: `${progress}%`,
                      transitionDuration: "75ms",
                      transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    }}
                  />
                )}
                {/* Static fill for current slide when paused */}
                {current === index && !isPlaying && (
                  <div className="h-full bg-gold rounded-full w-full transition-all duration-300" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* SLIDE COUNTER */}
      <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-card/70 backdrop-blur-sm border border-line shadow-luxury text-ink text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out">
        {current + 1} / {slides.length}
      </div>
      </section>
    </>
  );
}
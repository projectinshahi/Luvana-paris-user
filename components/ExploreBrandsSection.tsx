
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
import { Charm } from "next/font/google";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";

const charm = Charm({ subsets: ["latin"], weight: "400" });

type BrandFromBackend = {
  _id: string;
  brandImageEnglish: string;
  brandImageArabic: string;
  status: string;
};

type Slide = {
  _id: string;
  src: string;
  nameEnglish: string;
  nameArabic: string;
};

export default function ExploreBrandsSection() {
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";

  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
const router = useRouter();
  const SLIDE_DURATION = 5000;
  const PROGRESS_UPDATE_INTERVAL = 50;

  // ✅ FETCH BRANDS FROM BACKEND
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${API_URL}/user/home`);
        const data = await res.json();

        if (data?.brands) {
          const activeBrands = data.brands
            .filter((brand: BrandFromBackend) => brand.status === "active")
            .map((brand: any) => ({
              _id: brand._id,
              src:
                i18n.language === "ar"
                  ? brand.brandImageArabic
                  : brand.brandImageEnglish,
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
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const goNext = useCallback(() => {
    if (!slides.length) return;
    goToSlide((current + 1) % slides.length);
  }, [current, slides.length, goToSlide]);

  const goPrev = useCallback(() => {
    if (!slides.length) return;
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goToSlide]);

  // ✅ AUTO SLIDER WITH PROGRESS BAR
  useEffect(() => {
    if (!slides.length || !isPlaying) {
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

  if (!slides.length) {
    return (
      <section
        className="relative w-full overflow-hidden bg-black animate-pulse"
        style={{ height: "682px" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black" />
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-black group"
      style={{ height: "682px" }}
    >
      {/* BACKGROUND IMAGE WITH SMOOTH TRANSITION */}
      <div className="absolute inset-0">
        <Image
          key={currentSlide._id}
          src={currentSlide.src}
          alt="Brand"
          fill
          className={`object-cover transition-opacity duration-800 ease-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          priority={current === 0}
          unoptimized
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

      {/* TOP TEXT WITH FADE-IN ANIMATION */}
      <div
        className={`absolute top-10 z-20 transition-all duration-800 ease-out ${
          isRTL ? "left-10 text-left" : "right-10 text-right"
        } ${isTransitioning ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
        style={{ maxWidth: "475px" }}
      >
        <h2
          className={`font-normal text-[#C5A059] text-[50px] leading-none mb-2 transition-all duration-900 ease-out ${
            isRTL ? "font-arabic" : ""
          } ${isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          {t("exploreBrands")}
        </h2>

        <p
          className={`${charm.className} font-normal text-[#C5A059] text-[32px] transition-all duration-1000 ease-out ${
            isRTL ? "font-arabic" : ""
          } ${isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          {t("brands.luxuryFavorites")}
        </p>
      </div>

      {/* NAVIGATION ARROWS - VISIBLE ON HOVER */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#C9A24D] hover:border-[#C9A24D] transition-all duration-400 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#C9A24D] hover:border-[#C9A24D] transition-all duration-400 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
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
        className={`absolute bottom-10 z-20 transition-all duration-800 ease-out ${
          isRTL ? "left-10" : "right-10"
        } ${isTransitioning ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
      >
        <button
          onClick={() => {
            router.push(`/brands?brand=${currentSlide._id}`);
          }}
          className={`rounded-[25px] bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 transition-all duration-500 ease-out active:scale-95 ${
            isRTL ? "font-arabic" : ""
          }`}
          style={{ width: "185px", height: "69px" }}
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
              <div className={`rounded-full overflow-hidden transition-all duration-400 ease-out bg-white/30 group-hover/dot:bg-white/50 ${
                current === index ? "w-16 h-1.5" : "w-12 h-1"
              }`}>
                {/* Active progress fill */}
                {current === index && isPlaying && (
                  <div
                    className="h-full bg-white rounded-full transition-[width]"
                    style={{
                      width: `${progress}%`,
                      transitionDuration: "75ms",
                      transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    }}
                  />
                )}
                {/* Static fill for current slide when paused */}
                {current === index && !isPlaying && (
                  <div className="h-full bg-white rounded-full w-full transition-all duration-300" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* SLIDE COUNTER */}
      <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out">
        {current + 1} / {slides.length}
      </div>
    </section>
  );
}
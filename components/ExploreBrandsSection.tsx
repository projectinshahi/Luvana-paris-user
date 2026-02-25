
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
import { useEffect, useState, useRef } from "react";
import { Charm } from "next/font/google";
import { useTranslation } from "react-i18next";

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
};

export default function ExploreBrandsSection() {
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";

  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ FETCH BRANDS FROM BACKEND
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/home");
        const data = await res.json();

        if (data?.brands) {
          const activeBrands = data.brands
            .filter((brand: BrandFromBackend) => brand.status === "active")
            .map((brand: BrandFromBackend) => ({
              _id: brand._id,
              src:
                i18n.language === "ar"
                  ? brand.brandImageArabic
                  : brand.brandImageEnglish,
            }));

          setSlides(activeBrands);
        }
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, [i18n.language]);

  // ✅ AUTO SLIDER
  useEffect(() => {
    if (!slides.length) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides]);

  const currentSlide = slides[current];

  if (!slides.length) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "682px" }}
    >
      {/* BACKGROUND IMAGE */}
      <Image
        key={currentSlide._id}
        src={currentSlide.src}
        alt="Brand"
        fill
        className="object-cover transition-opacity duration-1000 ease-in-out"
        priority={current === 0}
        unoptimized
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* TOP TEXT */}
      <div
        className={`absolute top-10 z-20 ${
          isRTL ? "left-10 text-left" : "right-10 text-right"
        }`}
        style={{ maxWidth: "475px" }}
      >
        <h2
          className={`font-normal text-[#C5A059] text-[50px] leading-none mb-2 ${
            isRTL ? "font-arabic" : ""
          }`}
        >
          {t("exploreBrands")}
        </h2>

        <p
          className={`${charm.className} font-normal text-[#C5A059] text-[32px] ${
            isRTL ? "font-arabic" : ""
          }`}
        >
          {t("brands.luxuryFavorites")}
        </p>
      </div>

      {/* BUTTON */}
      <div
        className={`absolute bottom-10 z-20 ${
          isRTL ? "left-10" : "right-10"
        }`}
      >
        <button
          className={`rounded-[25px] bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 ${
            isRTL ? "font-arabic" : ""
          }`}
          style={{ width: "185px", height: "69px" }}
        >
          {t("brands.shopNow")}
        </button>
      </div>

      {/* DOTS NAVIGATION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

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
//         className="object-cover"
//       />

//       <div className="absolute inset-0 bg-black/40" />

//       <div className="relative z-10 h-full flex items-center px-6 md:px-20">
//         <div className="max-w-700px text-left">
          
//           {/* HEADING */}
//           <h1
//             className={`
//               ${libreBodoni.className}
//               text-[28px]
//               md:text-[44px]
//               lg:text-[66px]
//               leading-none
//               text-[#E3C6A8]
//             `}
//           >
//             CHOOSE YOUR OWN <br /> GLOW
//           </h1>

//           {/* SUBTITLE */}
//           <p
//             className={`
//               ${charm.className}
//               mt-2
//               text-[16px]
//               md:text-[10px]
//               lg:text-[25px]
//               leading-none
//               text-[#C5A059]
//             `}
//           >
//             Luxury made for her lifestyle
//           </p>

//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Libre_Bodoni, Charm } from "next/font/google";

// const libreBodoni = Libre_Bodoni({ subsets: ["latin"], weight: ["400"] });
// const charm = Charm({ subsets: ["latin"], weight: ["400"] });

// const slides = [
//   {
//     image: "/images/Rectangle 2.png",
//     title: "CHOOSE YOUR OWN GLOW",
//     subtitle: "Luxury made for her lifestyle",
//   },
//   {
//     image: "/images/herosectionimg.png",
//     title: "JUST OUT HERE TO SHINE",
//     subtitle: "Luxury made for her lifestyle",
//   },
//   {
//     image: "/images/Rectangle4.png",
//     title: "SHINE WITH CONFIDENCE",
//     subtitle: "Because luxury defines you",
//   },
//   {
//     image: "/images/Rectangle5.png",
//     title: "FEEL THE GLAMOUR",
//     subtitle: "Style that speaks beauty",
//   },
// ];

// export default function HeroSection() {
//   const [current, setCurrent] = useState(0);

//   // Auto slide every 3s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      
//       {/* IMAGE */}
//       <Image
//         src={slides[current].image}
//         alt="Hero Slide"
//         fill
//         priority
//         className="object-cover transition-opacity duration-700"
//       />

//       <div className="absolute inset-0 bg-black/40" />

//       {/* TEXT */}
//       <div className="relative z-10 h-full flex items-center px-6 md:px-20">
//         <div className="max-w-700px">
          
//           <h1
//             className={`
//               ${libreBodoni.className}
//               text-[28px]
//               md:text-[44px]
//               lg:text-[66px]
//               leading-none
//               text-[#E3C6A8]
//             `}
//           >
//             {slides[current].title.split(" ").slice(0, 3).join(" ")} <br />
//             {slides[current].title.split(" ").slice(3).join(" ")}
//           </h1>

//           <p
//             className={`
//               ${charm.className}
//               mt-2
//               text-[16px]
//               md:text-[24px]
//               lg:text-[36px]
//               leading-none
//               text-[#C5A059]
//             `}
//           >
//             {slides[current].subtitle}
//           </p>

//         </div>
//       </div>

//       {/* DOTS */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full transition ${
//               current === index ? "bg-white" : "bg-white/40"
//             }`}
//           />
//         ))}
//       </div>

//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Libre_Bodoni, Charm } from "next/font/google";
// import { useTranslation } from "react-i18next";

// const libreBodoni = Libre_Bodoni({ subsets: ["latin"], weight: ["400"] });
// const charm = Charm({ subsets: ["latin"], weight: ["400"] });

// export default function ImageSection() {
//   const { t, i18n } = useTranslation('common');
//   const [current, setCurrent] = useState(0);
//   const isRTL = i18n.language === 'ar';

//   const slides = [
//     {
//       image: "/images/Rectangle 2.png",
//       title: t('hero.chooseGlow'),
//       subtitle: t('hero.luxuryLifestyle'),
//       align: "left",
//     },
//     {
//       image: "/images/herosectionimg.png",
//       title: t('hero.shineHere'),
//       subtitle: t('hero.luxuryLifestyle'),
//       align: "center",
//     },
//     {
//       image: "https://www.shutterstock.com/image-photo/portrait-beautiful-brazilian-woman-after-600nw-2651672513.jpg",
//       title: t('hero.shineConfidence'),
//       subtitle: t('hero.luxuryDefines'),
//       align: "left",
//     },
//     {
//       image: "https://img.freepik.com/premium-photo/stylish-portrait-beautiful-woman-model-confident-elegant-stance_171965-74429.jpg?w=360",
//       title: t('hero.feelGlamour'),
//       subtitle: t('hero.styleBeauty'),
//       align: "left",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const currentSlide = slides[current];

//   return (
//     <section className="relative w-full h-screen sm:h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
//       {/* IMAGE */}
//       <Image
//         src={currentSlide.image}
//         alt="Hero Slide"
//         fill
//         priority
//         className="object-cover object-center"
//         sizes="100vw"
//       />

//       <div className="absolute inset-0 bg-black/50" />

//       {/* TEXT WRAPPER - Mobile optimized positioning */}
//       <div
//         className={`relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20
//           ${currentSlide.align === "center" ? "justify-center text-center" : 
//             isRTL ? "justify-end text-right" : "justify-start text-left"}
//         `}
//       >
//         <div className="w-full max-w-[95%] sm:max-w-[85%] md:max-w-175">
//           <h1
//             className={`
//               ${libreBodoni.className}
//               text-[24px] sm:text-[32px] md:text-[40px] lg:text-[52px] xl:text-[66px]
//               leading-[1.1] sm:leading-tight
//               text-[#E3C6A8]
//               mb-2 sm:mb-3 md:mb-4
//               ${isRTL ? 'font-arabic' : ''}
//             `}
//             suppressHydrationWarning
//           >
//             {currentSlide.title}
//           </h1>

//           <p
//             className={`
//               ${charm.className}
//               text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] xl:text-[36px]
//               leading-[1.2] sm:leading-tight
//               text-[#C5A059]
//               ${isRTL ? 'font-arabic' : ''}
//             `}
//             suppressHydrationWarning
//           >
//             {currentSlide.subtitle}
//           </p>
//         </div>
//       </div>

//       {/* DOTS - Mobile positioned */}
//       <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
//               current === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import { useEffect, useState, useRef } from "react";
// import { Libre_Bodoni, Charm } from "next/font/google";
// import { useTranslation } from "react-i18next";

// const libreBodoni = Libre_Bodoni({ subsets: ["latin"], weight: ["400"] });
// const charm = Charm({ subsets: ["latin"], weight: ["400"] });

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

//       {/* 🔥 Dots Navigation */}
//       <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-40">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`transition-all duration-300 rounded-full ${
//               current === index
//                 ? "w-4 h-4 bg-white scale-110"
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
import { useEffect, useState, useRef, useCallback } from "react";
import { Libre_Bodoni, Charm } from "next/font/google";
import { useTranslation } from "react-i18next";

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
  sortOrder: number;
  status: string;
}

export default function ImageSection() {
  const { i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";

  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch banners
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/user/home`);
        const data = await res.json();

        if (res.ok) {
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

  // Loading state
  if (isLoading || !banners.length) {
    return (
      <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[95vh] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 shimmer-dark" />
      </section>
    );
  }

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[95vh] overflow-hidden bg-black">
      {banners.map((banner, index) => {
        const image = isRTL ? banner.imageUrlArabic : banner.imageUrlEnglish;
        const title = isRTL ? banner.titleArabic : banner.titleEnglish;
        const description = isRTL
          ? banner.descriptionArabic
          : banner.descriptionEnglish;

        const isActive = current === index;
        const isPrev = current === (index + 1) % banners.length;

        return (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isActive 
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
              alt={title}
              fill
              priority={index === 0}
              quality={90}
              className="object-cover object-center"
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
            />

            <div className="absolute inset-0 blinear-to-b from-black/40 via-black/30 to-black/60" />

            <div
              className={`relative z-30 h-full flex items-center px-5 sm:px-8 md:px-16 lg:px-24 transition-all duration-700 ${
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${isRTL ? "justify-end text-right" : "justify-start text-left"}`}
            >
              <div className="max-w-5xl">
                <h1
                  className={`${libreBodoni.className}
                    text-[24px] sm:text-[34px] md:text-[48px] lg:text-[60px] xl:text-[72px]
                    leading-tight text-[#E3C6A8] mb-3
                    transition-all duration-700 delay-100
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                >
                  {title}
                </h1>

                <p
                  className={`${charm.className}
                    text-[16px] sm:text-[20px] md:text-[26px] lg:text-[34px]
                    text-[#C5A059]
                    transition-all duration-700 delay-200
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-40">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-500 rounded-full ${
                current === index
                  ? "w-8 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white/80 hover:scale-110"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
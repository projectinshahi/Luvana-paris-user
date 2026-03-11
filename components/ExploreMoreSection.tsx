// "use client";

// import Image from "next/image";
// import { useEffect, useState, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";

// type CategoryFromBackend = {
//   _id: string;
//   nameEnglish: string;
//   nameArabic: string;
//   descriptionEnglish: string;
//   descriptionArabic: string;
//   imageUrlEnglish: string;
//   imageUrlArabic: string;
//   status: string;
// };

// export default function ExploreMoreSection() {
//   const { t, i18n } = useTranslation("common");
//   const isRTL = i18n.language === "ar";
//   const [categories, setCategories] = useState<any[]>([]);
//   const router = useRouter();

//   // Refs for smooth infinite scroll
//   const trackRef = useRef<HTMLDivElement>(null);
//   const animationRef = useRef<number | null>(null);
//   const positionRef = useRef(0);
//   const isPausedRef = useRef(false);

//   // ✅ FETCH FROM BACKEND
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
//         const res = await fetch(`${API_URL}/user/home`);
//         const data = await res.json();

//         if (data?.categories) {
//           const activeCategories = data.categories
//             .filter((cat: CategoryFromBackend) => cat.status === "active")
//             .map((cat: CategoryFromBackend) => ({
//               _id: cat._id,
//               title:
//                 i18n.language === "ar"
//                   ? cat.nameArabic
//                   : cat.nameEnglish,
//               description:
//                 i18n.language === "ar"
//                   ? cat.descriptionArabic
//                   : cat.descriptionEnglish,
//               img:
//                 i18n.language === "ar"
//                   ? cat.imageUrlArabic
//                   : cat.imageUrlEnglish,
//             }));

//           setCategories(activeCategories);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     fetchCategories();
//   }, [i18n.language]);

//   // ✅ Smooth infinite scroll with requestAnimationFrame
//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track || categories.length === 0) return;

//     const speed = 0.4; // pixels per frame (slightly slower for larger cards)

//     const animate = () => {
//       if (!isPausedRef.current && track) {
//         positionRef.current += speed;

//         // Get the width of one set of categories (50% of total width)
//         const halfWidth = track.scrollWidth / 2;

//         // Reset position seamlessly when we've scrolled through one full set
//         if (positionRef.current >= halfWidth) {
//           positionRef.current = 0;
//         }

//         // Apply transform
//         track.style.transform = `translateX(-${positionRef.current}px)`;
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [categories]);

//   // Handle pause on hover
//   const handleMouseEnter = () => {
//     isPausedRef.current = true;
//   };

//   const handleMouseLeave = () => {
//     isPausedRef.current = false;
//   };

//   if (categories.length === 0) return null;

//   return (
//     <section className="relative w-full py-24 overflow-hidden bg-black">
//       <Image
//         src="/images/golden.jpg"
//         alt="Golden background"
//         fill
//         className="object-cover"
//         priority
//       />

//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/60" />

//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

//         {/* TITLE SECTION */}
//         <div className={`text-center mb-16 ${isRTL ? "font-arabic" : ""}`}>
//           <div
//             className={`flex items-center justify-center gap-6 mb-6 ${
//               isRTL ? "flex-row-reverse" : ""
//             }`}
//           >
//             <div className="w-32 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />
//             <h2 
//               className="text-[#C5A059] text-4xl md:text-5xl font-normal tracking-wide whitespace-nowrap"
//               style={{ fontFamily: "'Cactus Classical Serif', serif" }}
//             >
//               {t("exploreMore.title")}
//             </h2>
//           </div>

//           <p 
//             className="text-[#D4AF37] text-base md:text-lg tracking-wider font-normal"
//             style={{ fontFamily: "'Cactus Classical Serif', serif" }}
//           >
//             {t("exploreMore.subtitle")}
//           </p>
//         </div>

//         {/* CAROUSEL */}
//         <div 
//           className="relative w-full overflow-hidden"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div 
//             ref={trackRef}
//             className="flex gap-6"
//             style={{ width: 'max-content' }}
//           >
//             {[...categories, ...categories].map((item, i) => (
//               <div
//                 key={`${item._id}-${i}`}
//                 onClick={() => router.push(`/brands?category=${item._id}`)}
//                 className="flex-shrink-0 w-[320px] group cursor-pointer"
//               >
//                 {/* IMAGE CARD */}
//                 <div className="relative w-full h-80 overflow-hidden border-2 border-[#C5A059]/60 hover:border-[#D4AF37] transition-all duration-300">
//                   <Image
//                     src={item.img}
//                     alt={item.title}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-500"
//                     unoptimized
//                   />
//                 </div>

//                 {/* TEXT */}
//                 <h3
//                   className={`mt-6 text-[#D4AF37] text-lg md:text-xl font-medium tracking-wide ${
//                     isRTL ? "text-right font-arabic" : "text-left"
//                   }`}
//                 >
//                   {item.title}
//                 </h3>

//                 <p
//                   className={`mt-3 text-[#B8956A] text-sm md:text-base leading-relaxed font-light ${
//                     isRTL ? "text-right font-arabic" : "text-left"
//                   }`}
//                 >
//                   {item.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  // Refs for smooth infinite scroll
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${API_URL}/user/home`);
        const data = await res.json();

        if (data?.categories) {
          const activeCategories = data.categories
            .filter((cat: CategoryFromBackend) => cat.status === "active")
            .map((cat: CategoryFromBackend) => ({
              _id: cat._id,
              title:
                i18n.language === "ar"
                  ? cat.nameArabic
                  : cat.nameEnglish,
              description:
                i18n.language === "ar"
                  ? cat.descriptionArabic
                  : cat.descriptionEnglish,
              img:
                i18n.language === "ar"
                  ? cat.imageUrlArabic
                  : cat.imageUrlEnglish,
            }));

          setCategories(activeCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [i18n.language]);

  // ✅ Smooth infinite scroll with requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track || categories.length === 0) return;

    const speed = 1; // pixels per frame (slightly slower for larger cards)

    const animate = () => {
      if (!isPausedRef.current && track) {
        positionRef.current += speed;

        // Get the width of one set of categories (50% of total width)
        const halfWidth = track.scrollWidth / 2;

        // Reset position seamlessly when we've scrolled through one full set
        if (positionRef.current >= halfWidth) {
          positionRef.current = 0;
        }

        // Apply transform
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [categories]);

  // Handle pause on hover
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  if (categories.length === 0) return null;

  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      <Image
        src="/images/golden.jpg"
        alt="Golden background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/70 to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* TITLE SECTION */}
        <div className={`text-center mb-16 ${isRTL ? "font-arabic" : ""}`}>
          <div
            className={`flex items-center justify-center gap-6 mb-6 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-32 h-px bg-linear-to-r from-transparent to-[#C5A059]" />
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

        {/* CAROUSEL */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={trackRef}
            className="flex gap-6"
            style={{ width: 'max-content' }}
          >
            {[...categories, ...categories].map((item, i) => (
              <div
                key={`${item._id}-${i}`}
                onClick={() => router.push(`/brands?category=${item._id}`)}
                className="shrink-0 w-[320px] group cursor-pointer"
              >
                {/* IMAGE CARD */}
                <div className="relative w-full h-80 overflow-hidden border-2 border-[#C5A059]/60 hover:border-[#D4AF37] transition-all duration-300">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>

                {/* TEXT */}
                <h3
                  className={`mt-6 text-[#D4AF37] text-lg md:text-xl font-medium tracking-wide ${
                    isRTL ? "text-right font-arabic" : "text-left"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`mt-3 text-[#B8956A] text-sm md:text-base leading-relaxed font-light ${
                    isRTL ? "text-right font-arabic" : "text-left"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

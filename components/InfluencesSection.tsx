// import Image from "next/image";

// export default function InfluencersSection() {
//   return (
//     <section className="relative w-full py-24 bg-black">
//       <div className="max-w-[1500px] mx-auto px-10">

//         {/* HEADER */}
//         <div className="flex items-center justify-center mb-16">
//           <div className="flex items-center gap-10">
//             <div className={`text-center ${cactus.className}`}>
//               <h2 className="text-[#C5A059] text-[28px] leading-[1]">
//                 Influencers
//               </h2>
//               <p className="text-[#C5A059]/80 text-[14px] mt-1">
//                 Scrolls
//               </p>
//             </div>

//             {/* LINE */}
//             <div className="h-[1px] w-[360px] bg-[#C5A059]/60" />
//           </div>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//           {/* CARD 1 */}
//           <div className="text-center">
//             <div className="relative w-full h-[520px] overflow-hidden">
//               <Image
//                 src="/images/v1.jpg"
//                 alt="Influencer 1"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="mt-6 text-[#C5A059] text-sm">
//               From simple skincare to spa-level luxury <br />
//               explore brands you trust
//             </p>
//           </div>

//           {/* CARD 2 */}
//           <div className="text-center">
//             <div className="relative w-full h-[520px] overflow-hidden">
//               <Image
//                 src="/images/v2.jpg"
//                 alt="Influencer 2"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="mt-6 text-[#C5A059] text-sm">
//               explore hair care from brands you love <br />
//               Discover the best in hair care
//             </p>
//           </div>

//           {/* CARD 3 */}
//           <div className="text-center">
//             <div className="relative w-full h-[520px] overflow-hidden">
//               <Image
//                 src="/images/v3.jpg"
//                 alt="Influencer 3"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="mt-6 text-[#C5A059] text-sm">
//               Quality fragrances at every price point
//             </p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// import Image from "next/image";

// const influencers = [
//   {
//     img: "/images/v1.jpg",
//     text: "From simple skincare to spa-level luxury explore brands you trust",
//   },
//   {
//     img: "/images/v2.jpg",
//     text: "explore hair care from brands you love Discover the best in hair care",
//   },
//   {
//     img: "/images/v3.png",
//     text: "Quality fragrances at every price point",
//   },
// ];

// export default function InfluencersSection() {
//   return (
//     <section className="relative w-full py-24 bg-black">
//       <div className="max-w-[1500px] mx-auto px-10">

//         {/* HEADER */}
//         <div className="flex items-center justify-center mb-16">
//           <div className="flex items-center gap-10">
//             {/* TEXT */}
//             <div className="text-center [font-family:'Cactus_Classical_Serif',serif]">
//               <h2 className="text-[#C5A059] text-[28px] leading-[1]">
//                 Influencers
//               </h2>
//               <p className="text-[#C5A059]/80 text-[14px] mt-1">
//                 Scrolls
//               </p>
//             </div>

//             {/* LINE */}
//             <div className="h-[1px] w-[360px] bg-[#C5A059]/60" />
//           </div>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {influencers.map((item, i) => (
//             <div key={i} className="text-center">
//               <div className="relative w-full h-[520px] overflow-hidden">
//                 <Image
//                   src={item.img}
//                   alt={`Influencer ${i + 1}`}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <p className="mt-6 text-[#C5A059] text-sm leading-relaxed max-w-[320px] mx-auto">
//                 {item.text}
//               </p>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import { useTranslation } from "react-i18next";

// export default function InfluencersSection() {
//   const { t, i18n } = useTranslation('common');
//   const isRTL = i18n.language === 'ar';

//   const influencers = [
//     {
//       img: "/images/v1.jpg",
//       textKey: "influencers.skincare",
//     },
//     {
//       img: "/images/v2.jpg",
//       textKey: "influencers.haircare",
//     },
//     {
//       img: "/images/v3.png",
//       textKey: "influencers.fragrance",
//     },
//     {
//       img: "/images/inf4.jpg",
//       textKey: "influencers.fragrance",
//     },
//   ];

//   return (
//     <section className="relative w-full py-16 md:py-24 bg-black">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

//         {/* HEADER */}
//         <div className={`flex justify-center mb-12 md:mb-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
//           <div className={`flex items-center gap-6 md:gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
//             <div className={`text-center [font-family:var(--font-cactus-serif)] ${isRTL ? 'font-arabic' : ''}`}>
//               <h2 className="text-[#C5A059] text-2xl md:text-3xl leading-tight">
//                 {t('influencers.title')}
//               </h2>
//               <p className="text-[#C5A059]/80 text-xs md:text-sm mt-1">
//                 {t('influencers.subtitle')}
//               </p>
//             </div>

//             <div className="h-px w-20 md:w-64 bg-linear-to-r from-[#C5A059]/60 to-transparent" />
//           </div>
//         </div>

//         {/* IMAGES ROW */}
//         <div className={`flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 lg:gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
//           {influencers.map((item, i) => (
//             <div key={i} className="text-center flex flex-col items-center">
//               {/* RESPONSIVE IMAGE */}
//               <div className="relative w-full md:w-64 lg:w-80 aspect-[3/4.8] overflow-hidden rounded-sm border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors duration-300">
//                 <Image
//                   src={item.img}
//                   alt={`Influencer ${i + 1}`}
//                   fill
//                   className="object-cover hover:scale-105 transition-transform duration-500"
//                 />
//               </div>

//               {/* TEXT */}
//               <p className={`mt-4 md:mt-6 text-[#C5A059] text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
//                 {t(item.textKey)}
//               </p>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import { useTranslation } from "react-i18next";

// export default function InfluencersSection() {
//   const { t, i18n } = useTranslation("common");
//   const isRTL = i18n.language === "ar";

//   const influencers = [
//     { img: "/images/v1.jpg", textKey: "influencers.skincare" },
//     { img: "/images/v2.jpg", textKey: "influencers.haircare" },
//     { img: "/images/v3.png", textKey: "influencers.fragrance" },
//     { img: "/images/inf4.jpg", textKey: "influencers.fragrance" },
//   ];

//   return (
//     <>
//       {/* ✅ INLINE CSS – GUARANTEED ANIMATION */}
//       <style>{`
//         @keyframes influencer-scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }

//         @keyframes influencer-scroll-reverse {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }

//         .influencer-scroll {
//           animation: influencer-scroll 30s linear infinite;
//         }

//         .influencer-scroll-reverse {
//           animation: influencer-scroll-reverse 30s linear infinite;
//         }

//         .pause-on-hover:hover .influencer-scroll,
//         .pause-on-hover:hover .influencer-scroll-reverse {
//           animation-play-state: paused;
//         }
//       `}</style>

//       <section className="relative w-full py-16 md:py-24 bg-black overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

//           {/* HEADER */}
//           <div
//             className={`flex justify-center mb-12 md:mb-16 ${
//               isRTL ? "flex-row-reverse" : ""
//             }`}
//           >
//             <div
//               className={`flex items-center gap-6 md:gap-10 ${
//                 isRTL ? "flex-row-reverse" : ""
//               }`}
//             >
//               <div
//                 className={`text-center [font-family:var(--font-cactus-serif)] ${
//                   isRTL ? "font-arabic" : ""
//                 }`}
//               >
//                 <h2 className="text-[#C5A059] text-2xl md:text-3xl leading-tight">
//                   {t("influencers.title")}
//                 </h2>
//                 <p className="text-[#C5A059]/80 text-xs md:text-sm mt-1">
//                   {t("influencers.subtitle")}
//                 </p>
//               </div>

//               <div className="h-px w-20 md:w-64 bg-linear-to-r from-[#C5A059]/60 to-transparent" />
//             </div>
//           </div>

//           {/* ✅ AUTO MOVING CAROUSEL */}
//           <div className="relative w-full overflow-hidden pause-on-hover">
//             <div
//               className={`flex w-max gap-6 md:gap-8 lg:gap-12 ${
//                 isRTL ? "influencer-scroll-reverse" : "influencer-scroll"
//               }`}
//             >
//               {[...influencers, ...influencers].map((item, i) => (
//                 <div
//                   key={i}
//                   className="shrink-0 text-center flex flex-col items-center w-55 md:w-65 lg:w-[320px]"
//                 >
//                   {/* IMAGE */}
//                   <div className="relative w-full aspect-[3/4.8] overflow-hidden rounded-sm border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors duration-300">
//                     <Image
//                       src={item.img}
//                       alt={`Influencer ${i + 1}`}
//                       fill
//                       className="object-cover hover:scale-105 transition-transform duration-500"
//                     />
//                   </div>

//                   {/* TEXT */}
//                   <p
//                     className={`mt-4 md:mt-6 text-[#C5A059] text-xs md:text-sm leading-relaxed max-w-xs ${
//                       isRTL ? "text-right font-arabic" : "text-left"
//                     }`}
//                   >
//                     {t(item.textKey)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function InfluencersSection() {
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";

  const influencers = [
    { img: "/images/v1.jpg", textKey: "influencers.skincare" },
    { img: "/images/v2.jpg", textKey: "influencers.haircare" },
    { img: "/images/v3.png", textKey: "influencers.fragrance" },
    { img: "/images/inf4.jpg", textKey: "influencers.fragrance" },
  ];

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          99.99% {
            transform: translateX(calc(-50% - 0.75rem));
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-50% - 0.75rem));
          }
          99.99% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        .carousel-track {
          display: flex;
          gap: 1.5rem;
          animation: ${isRTL ? "scroll-right" : "scroll-left"} 50s linear infinite;
          will-change: transform;
        }

        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }

        @media (min-width: 768px) {
          .carousel-track {
            gap: 2rem;
            animation: ${isRTL ? "scroll-right" : "scroll-left"} 55s linear infinite;
          }
        }

        @media (min-width: 1024px) {
          .carousel-track {
            gap: 3rem;
            animation: ${isRTL ? "scroll-right" : "scroll-left"} 60s linear infinite;
          }
        }
      `}</style>

      <section className="relative w-full py-16 md:py-24 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

          {/* ✅ PERFECT CENTERED HEADER */}
          <div
            className={`flex items-center justify-center gap-6 md:gap-10 mb-12 md:mb-16 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* Left Line */}
            <div className="h-px flex-1 max-w-32 md:max-w-64 bg-linear-to-r from-transparent via-[#C5A059]/70 to-[#C5A059]/70" />

            {/* Title */}
            <div
              className={`text-center [font-family:var(--font-cactus-serif)] ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              <h2 className="text-[#C5A059] text-2xl md:text-3xl leading-tight whitespace-nowrap">
                {t("influencers.title")}
              </h2>
              <p className="text-[#C5A059]/80 text-xs md:text-sm mt-1">
                {t("influencers.subtitle")}
              </p>
            </div>

            {/* Right Line */}
            <div className="h-px flex-1 max-w-32 md:max-w-64 bg-linear-to-l from-transparent via-[#C5A059]/70 to-[#C5A059]/70" />
          </div>

          {/* ✅ INFINITE CAROUSEL WITH SEAMLESS LOOP */}
          <div className="relative w-full overflow-hidden carousel-container">
            <div className="carousel-track">
              {/* Render items twice for seamless loop */}
              {[...influencers, ...influencers].map((item, i) => (
                <div
                  key={i}
                  className="shrink-0 text-center flex flex-col items-center w-48 sm:w-56 md:w-64 lg:w-80"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[3/4.8] overflow-hidden rounded-sm border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors duration-300">
                    <Image
                      src={item.img}
                      alt={`Influencer ${(i % influencers.length) + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority={i < 2}
                      sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                    />
                  </div>

                  {/* Text */}
                  <p
                    className={`mt-4 md:mt-6 text-[#C5A059] text-xs md:text-sm leading-relaxed ${
                      isRTL ? "text-right font-arabic" : "text-left"
                    }`}
                  >
                    {t(item.textKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

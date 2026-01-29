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

import Image from "next/image";

const influencers = [
  {
    img: "/images/v1.jpg",
    text: "From simple skincare to spa-level luxury explore brands you trust",
  },
  {
    img: "/images/v2.jpg",
    text: "explore hair care from brands you love Discover the best in hair care",
  },
  {
    img: "/images/v3.png",
    text: "Quality fragrances at every price point",
  },
];

export default function InfluencersSection() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

        {/* HEADER */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="flex items-center gap-6 md:gap-10">
            <div className="text-center [font-family:var(--font-cactus-serif)]">
              <h2 className="text-[#C5A059] text-2xl md:text-3xl leading-tight">
                Influencers
              </h2>
              <p className="text-[#C5A059]/80 text-xs md:text-sm mt-1">
                Scrolls
              </p>
            </div>

            <div className="h-px w-20 md:w-64 bg-linear-to-r from-[#C5A059]/60 to-transparent" />
          </div>
        </div>

        {/* IMAGES ROW */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 lg:gap-12">
          {influencers.map((item, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              {/* RESPONSIVE IMAGE */}
              <div className="relative w-full md:w-64 lg:w-80 aspect-[3/4.8] overflow-hidden rounded-sm border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors duration-300">
                <Image
                  src={item.img}
                  alt={`Influencer ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* TEXT */}
              <p className="mt-4 md:mt-6 text-[#C5A059] text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

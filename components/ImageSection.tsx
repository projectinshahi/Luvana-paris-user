
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

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Libre_Bodoni, Charm } from "next/font/google";

const libreBodoni = Libre_Bodoni({ subsets: ["latin"], weight: ["400"] });
const charm = Charm({ subsets: ["latin"], weight: ["400"] });

const slides = [
  {
    image: "/images/Rectangle 2.png",
    title: "CHOOSE YOUR OWN GLOW",
    subtitle: "Luxury made for her lifestyle",
    align: "left",
  },
  {
    image: "/images/herosectionimg.png",
    title: "JUST OUT HERE TO SHINE",
    subtitle: "Luxury made for her lifestyle",
    align: "center",
  },
  {
    image: "https://www.shutterstock.com/image-photo/portrait-beautiful-brazilian-woman-after-600nw-2651672513.jpg",
    title: "SHINE WITH CONFIDENCE",
    subtitle: "Because luxury defines you",
    align: "left",
  },
  {
    image: "https://img.freepik.com/premium-photo/stylish-portrait-beautiful-woman-model-confident-elegant-stance_171965-74429.jpg?w=360",
    title: "FEEL THE GLAMOUR",
    subtitle: "Style that speaks beauty",
    align: "left",
  },
];

export default function ImageSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[current];

  return (
    // <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
    <section className="relative w-full aspect-[1728/682] overflow-hidden">

      
      {/* IMAGE */}
      <Image
        src={currentSlide.image}
        alt="Hero Slide"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      {/* TEXT WRAPPER */}
      <div
        className={`relative z-10 h-full flex items-center px-6 md:px-20
          ${currentSlide.align === "center" ? "justify-center text-center" : "justify-start text-left"}
        `}
      >
        <div className="max-w-[700px]">
          
          <h1
            className={`
              ${libreBodoni.className}
              text-[28px]
              md:text-[44px]
              lg:text-[66px]
              leading-none
              text-[#E3C6A8]
            `}
          >
            {currentSlide.title}
          </h1>

          <p
            className={`
              ${charm.className}
              mt-2
              text-[16px]
              md:text-[24px]
              lg:text-[36px]
              leading-none
              text-[#C5A059]
            `}
          >
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// "use client";

// import Image from "next/image";

// export default function ExploreBrandsSection() {
//   return (
//     <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
//       {/* BACKGROUND IMAGE */}
//       <Image
//         src="/images/brand.jpg" // <-- put your image path here
//         alt="Explore Brands"
//         fill
//         className="object-cover"
//         priority
//       />

//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/50" />

//       {/* CONTENT */}
//       <div className="relative z-10 h-full flex items-center justify-end px-6 md:px-20">
//         <div className="max-w-[500px] text-right">
//           <h2 className="text-[#C9A24D] text-2xl md:text-4xl font-semibold tracking-wide">
//             EXPLORE BRANDS
//           </h2>

//           <p className="text-[#C9A24D] italic mt-2 text-sm md:text-lg">
//             luxury favorites
//           </p>

//           <button
//             className="
//               mt-6
//               w-[150px] h-[45px]
//               rounded-full
//               bg-gradient-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F]
//               text-black font-medium
//               transition-all duration-300 ease-out
//               hover:scale-105
//             "
//           >
//             Shop now
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// import Image from "next/image";

// export default function ExploreBrandsSection() {
//   return (
//     <section className="relative w-full h-96 md:h-[600px] overflow-hidden bg-black">
//       {/* BACKGROUND IMAGE */}
//       <Image
//         src="/images/brand.jpg"
//         alt="Explore Brands"
//         fill
//         className="object-cover opacity-90"
//         priority
//       />

//       {/* SUBTLE OVERLAY */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/20" />

//       {/* CONTENT */}
//       <div className="relative z-10 h-full flex items-center justify-end px-8 md:px-16 lg:px-32">
//         <div className="max-w-lg text-right">
//           <h2 className="text-[#D4AF37] text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-3 leading-none">
//             EXPLORE
//             <br />
//             BRANDS
//           </h2>

//           <p className="text-[#C9A24D] italic text-lg md:text-2xl mb-10 font-light tracking-wide">
//             luxury favorites
//           </p>

//           <button className="inline-block px-12 py-4 rounded-full bg-gradient-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black font-bold text-lg hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
//             Shop now
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import { Charm } from "next/font/google";

const charm = Charm({
  subsets: ["latin"],
  weight: "400",
});

export default function ExploreBrandsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '682px' }}>
      {/* BACKGROUND IMAGE */}
      <Image
        src="/images/brand.jpg"
        alt="Explore Brands"
        fill
        className="object-cover"
        priority
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* TOP RIGHT TEXT */}
      <div className="absolute top-10 right-10 text-right" style={{ maxWidth: '475px' }}>
        <h2 className="font-normal text-[#C5A059] text-[50px] leading-none tracking-[0] mb-2 font-['Cactus_Classical_Serif',serif]">
          EXPLORE BRANDS
        </h2>

        <p
          className={`${charm.className} font-normal text-[#C5A059] text-[32px] leading-none tracking-[0]`}
        >
          luxury favorites
        </p>
      </div>

      {/* BOTTOM RIGHT BUTTON */}
      <div className="absolute bottom-10 right-10">
        <button className="rounded-[25px] bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95" style={{ width: '185px', height: '69px' }}>
          Shop now
        </button>
      </div>

    </section>
  );
}

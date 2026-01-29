"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "The Ordinary Niacinamide Serum + Salicylic Acid Combo",
    image: "/images/1.jpg",
    price: "KWD 4.92  €13.79",
  },
  {
    id: 2,
    name: "Wild Cherry - Luxe Matte Lipstick, Cherry Pink",
    image: "/images/2.jpg",
    price: "KWD 3.66  €9.97",
  },
  {
    id: 3,
    name: "Cherry Bomb - Luxe Matte Lipstick, Red",
    image: "/images/3.jpg",
    price: "KWD 5.26  €14.54",
  },
  {
    id: 4,
    name: "Confidence by Lush - EDT Perfume for Women",
    image: "/images/4.jpg",
    price: "KWD 4.92  €13.79",
  },
];

export default function BestSellers() {
  return (
    <section className="bg-black text-white py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
       <div className="flex items-center justify-center gap-6 mb-10">
  <div className="flex-1 h-px bg-white/30" />

  <div className="w-52 h-11 flex items-center justify-center">
    <h2 className="text-[#C5A059] text-[28px] leading-none">
      Best Sellers
    </h2>
  </div>

  <div className="flex-1 h-px bg-white/30" />
</div>


        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#111] p-4 rounded shadow hover:scale-[1.02] transition"
            >
       
              <div className="group relative w-full max-w-96 aspect-383/478 bg-linear-to-b from-[#E3C6A8] to-[#5F4D2B] p-0.75">

  <div className="relative w-full h-full bg-[#D9D9D9] overflow-hidden">
    <button className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] border border-[#8C6B1F] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out scale-90 group-hover:scale-100">
      <Heart className="w-5 h-5 text-black" />
    </button>

    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-cover"
    />

    {/* Add to cart button */}
    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-60 h-14 rounded-[15px] bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black font-medium border border-[#8C6B1F] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0 shadow-[inset_0_1px_0_#ffffff80]">
      Add to cart
    </button>

  </div>
</div>


              {/* TEXT */}
              <h3 className="mt-4 text-sm line-clamp-2">{product.name}</h3>
              <p className="mt-2 text-[#C9A24D] text-sm">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

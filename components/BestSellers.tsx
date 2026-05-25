
"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// interface Product {
//   _id: string;
//   nameEnglish: string;
//   nameArabic: string;
//   imageUrlEnglish: { imageUrl: string }[];
//   imageUrlArabic: { imageUrl: string }[];
//   minPrice: number | null;
//   variants?: { _id: string }[];
// }
interface Variant {
  _id: string;
  price?: number;
  mrp?: number;
  imageUrlEnglish?: { imageUrl: string }[];
  currency?: {
    country: string;
    price: number;
    mrp: number;
  }[];
}

interface Product {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  imageUrlEnglish: { imageUrl: string }[];
  imageUrlArabic: { imageUrl: string }[];
  minPrice: number | null;
  maxPrice?: number | null;
  variants?: Variant[];
}

export default function BestSellers() {
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";
  const { formatPrice, selectedCountry } = useCurrency();

  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const variantId = product.variants?.[0]?._id;
      if (!variantId) {
        toast.error("No variant available");
        return;
      }

      const response = await api.post("/user/cart", {
        variant: variantId,
        quantity: 1,
      });

      console.log("✅ Cart Response:", response.data);
      toast.success("✅ Added to cart!");
    } catch (error: any) {
      console.error("❌ Cart error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    }
  };


  /* ================= ADD TO WISHLIST ================= */
  const handleAddToWishlist = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const variantId = product.variants?.[0]?._id;
      if (!variantId) {
        toast.error("No variant available");
        return;
      }

      const response = await api.post("/user/wishlist", {
        variant: variantId,
      });

      console.log("✅ Wishlist Response:", response.data);
      toast.success("❤️ Added to wishlist!");
    } catch (error: any) {
      console.error("❌ Wishlist error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to add to wishlist");
    }
  };
  // useEffect(() => {
  //   // const handleCountryChange = () => {
  //   //   const savedCountry = localStorage.getItem("selectedCountry");
  //   //   if (savedCountry) {
  //   //     const parsed = JSON.parse(savedCountry);
  //   //     setCountry(parsed.name);
  //   //   }
  //   // };
  //   const handleCountryChange = () => {
  //     const savedCountry = localStorage.getItem("selectedCountry");
  //     if (!savedCountry) return;

  //     const parsed = JSON.parse(savedCountry);

  //     setCountry((prev) => {
  //       if (prev === parsed.name) return prev;
  //       return parsed.name;
  //     });
  //   };
  //   window.addEventListener("countryChanged", handleCountryChange);

  //   return () => {
  //     window.removeEventListener("countryChanged", handleCountryChange);
  //   };
  // }, []);
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.luvanaparis.com";
        const res = await fetch(`${API_URL}/user/home`);
        const data = await res.json();

        if (res.ok) {
          setProducts(data.featuredProducts || []);
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    fetchHome();
  }, []);


  if (!products.length) return null;
  return (
    <>
      <style>{`
        /* Swiper custom styles for premium aesthetic */
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #444;
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 4px;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #C5A059;
          width: 24px;
        }
        
        /* Entrance animation */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .product-card-hover {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .product-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(197, 160, 89, 0.1);
        }
      `}</style>

      <section
        key={i18n.language}
        className="w-full bg-black text-white py-16 overflow-hidden animate-fade-in-up"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div
            className={`flex items-center justify-center gap-6 mb-12 ${isRTL ? "flex-row-reverse" : ""
              }`}
          >
            <div className="flex-1 h-px bg-white/10" />
            <h2
              className={`text-[#C5A059] text-2xl lg:text-3xl font-light tracking-wide whitespace-nowrap ${isRTL ? "font-arabic" : ""
                }`}
            >
              {t("bestSellers")}
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* CAROUSEL */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1.2}
              loop={true}
              speed={800}
              autoplay={{ 
                delay: 2000, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ 
                clickable: true, 
                el: '.swiper-pagination-custom',
              }}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="w-full pb-8"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {products.map((product, index) => {
                const variant = product?.variants?.length ? product.variants[0] : null;
                const price = variant?.price ?? product?.minPrice ?? null;
                const image =
                  product?.variants?.[0]?.imageUrlEnglish?.[0]?.imageUrl ||
                  product?.imageUrlEnglish?.[0]?.imageUrl ||
                  "/no-product.png";
                const name = isRTL ? product.nameArabic : product.nameEnglish;

                return (
                  <SwiperSlide key={`${product._id}-${index}`} className="h-auto">
                    <div
                      className="bg-[#0a0a0a] rounded-xl overflow-hidden product-card-hover flex flex-col w-full h-full cursor-pointer border border-white/5"
                      onClick={() => router.push(`/brands/${product._id}`)}
                    >
                      {/* IMAGE */}
                      <div className="group relative w-full aspect-[3/4] bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a]">
                        <div className="relative w-full h-full overflow-hidden">
                          {/* Wishlist */}
                          <button
                            onClick={(e) => handleAddToWishlist(product, e)}
                            className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-10 w-9 h-9 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C5A059] hover:text-black text-white`}
                          >
                            <Heart className="w-4 h-4" />
                          </button>

                          {image && (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )}

                          {/* Add to Cart Overlay */}
                          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 to-transparent">
                            <button
                              onClick={(e) => handleAddToCart(product, e)}
                              className={`w-full py-3 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-black text-sm font-medium transition-colors ${isRTL ? "font-arabic" : ""}`}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* TEXT */}
                      <div className="p-5 flex flex-col grow justify-between">
                        <h3 className={`text-sm mb-3 text-gray-200 line-clamp-2 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                          {name}
                        </h3>
                        <p className={`text-[#C5A059] font-medium text-base ${isRTL ? "text-right" : "text-left"}`}>
                          {price ? formatPrice(price) : "—"}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Custom Navigation & Pagination */}
            <div className="flex justify-between items-center mt-8 px-2">
              <button className="swiper-button-prev-custom w-10 h-10 rounded-full border border-white/20 flex justify-center items-center text-white/50 hover:border-[#C5A059] hover:text-[#C5A059] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              
              <div className="swiper-pagination-custom flex gap-2 justify-center items-center"></div>
              
              <button className="swiper-button-next-custom w-10 h-10 rounded-full border border-white/20 flex justify-center items-center text-white/50 hover:border-[#C5A059] hover:text-[#C5A059] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
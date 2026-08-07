
"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect, useState, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
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
  const swiperRef = useRef<any>(null);

  // Intelligent duplication so the loop is ALWAYS full — no empty space ever.
  // 1 → 1 1 1 …, 2 → 1 2 1 2 …, 3 → 1 2 3 1 2 3 …; 5+ tiles seamlessly.
  const carouselProducts = useMemo(() => {
    if (!products.length) return [];
    const MIN_SLIDES = 12; // covers up to 5-per-view with a full buffer
    const repeat = Math.max(3, Math.ceil(MIN_SLIDES / products.length));
    return Array.from({ length: repeat }).flatMap(() => products);
  }, [products]);
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
          background: #E8DED2;
          opacity: 1;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 4px;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #8B5E3C;
          width: 26px;
        }

        /* Equal card heights across all slides */
        .swiper-slide { height: auto; }
        .swiper-slide > * { height: 100%; }

        /* Continuous marquee — constant-speed, seamless infinite scroll */
        .swiper-marquee .swiper-wrapper {
          transition-timing-function: linear !important;
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
          box-shadow: 0 20px 40px rgba(31,31,31,0.12), 0 0 20px rgba(200, 168, 106, 0.18);
        }
      `}</style>

      <section
        key={i18n.language}
        className="w-full bg-cream text-ink py-10 sm:py-12 md:py-14 overflow-hidden animate-fade-in-up"
      >
        <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 min-[1920px]:px-16">

          {/* HEADER */}
          <div
            className={`flex items-center justify-center gap-6 mb-8 sm:mb-10 ${isRTL ? "" : ""
              }`}
          >
            <div className="flex-1 h-px bg-line" />
            <h2
              className={`text-gold-dark text-2xl lg:text-3xl font-light tracking-wide whitespace-nowrap ${isRTL ? "font-arabic" : ""
                }`}
            >
              {t("bestSellers")}
            </h2>
            <div className="flex-1 h-px bg-line" />
          </div>

          {/* CAROUSEL */}
          <div
            className="relative"
            onPointerEnter={(e) => { if (e.pointerType !== "mouse") return; const s = swiperRef.current; if (!s) return; s.autoplay?.stop(); s.setTransition(0); s.setTranslate(s.getTranslate()); }}
            onPointerLeave={(e) => { if (e.pointerType !== "mouse") return; const s = swiperRef.current; if (!s) return; s.animating = false; /* freeze cancels the transition (no transitionend) → animating stays true → loop's slideNext bails; reset it so autoplay can advance */ s.setTransition(s.params.speed); s.autoplay?.start(); }}
          >
            {/* Prev — circular, vertically centered, on the carousel's left edge */}
            <button
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev(700)}
              className="hidden sm:flex absolute start-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-card/95 backdrop-blur border border-line shadow-luxury items-center justify-center text-ink-soft hover:text-cream hover:bg-gold hover:border-gold hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <Swiper
              onSwiper={(s) => (swiperRef.current = s)}
              modules={[Autoplay, Pagination, Keyboard, A11y]}
              spaceBetween={12}
              slidesPerView={2}
              loop={true}
              loopAdditionalSlides={5}
              speed={4000}
              grabCursor={true}
              allowTouchMove={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false, // manual onMouseEnter/Leave own pause+resume; Swiper's own gate desyncs with them
              }}
              keyboard={{ enabled: true }}
              a11y={{
                enabled: true,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                el: ".swiper-pagination-custom",
              }}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 24 },
              }}
              className="swiper-marquee w-full"
              dir="ltr"
            >
              {carouselProducts.map((product, index) => {
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
                      className="bg-card rounded-xl overflow-hidden product-card-hover flex flex-col w-full h-full cursor-pointer border border-line shadow-luxury"
                      onClick={() => router.push(`/brands/${product._id}`)}
                    >
                      {/* IMAGE */}
                      <div className="group relative w-full aspect-[3/4] bg-linear-to-b from-champagne to-sand">
                        <div className="relative w-full h-full overflow-hidden">
                          {/* Wishlist */}
                          <button
                            onClick={(e) => handleAddToWishlist(product, e)}
                            aria-label="Add to wishlist"
                            className="absolute top-4 end-4 z-10 w-9 h-9 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-champagne hover:text-gold text-ink-soft focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
                          >
                            <Heart className="w-4 h-4" />
                          </button>

                          {image && (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )}

                          {/* Add to Cart Overlay */}
                          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-cream/90 to-transparent">
                            <button
                              onClick={(e) => handleAddToCart(product, e)}
                              className={`w-full py-3 rounded-lg bg-gold hover:bg-gold-dark text-cream text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ink focus:outline-none ${isRTL ? "font-arabic" : ""}`}
                            >
                              {isRTL ? "أضف إلى السلة" : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* TEXT */}
                      <div className="p-5 flex flex-col grow justify-between">
                        <h3 className={`text-sm mb-3 text-ink font-medium line-clamp-2 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                          {name}
                        </h3>
                        <p className={`text-ink font-semibold text-base ${isRTL ? "text-right" : "text-left"}`}>
                          {price ? formatPrice(price) : "—"}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Next — circular, vertically centered, on the carousel's right edge */}
            <button
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext(700)}
              className="hidden sm:flex absolute end-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-card/95 backdrop-blur border border-line shadow-luxury items-center justify-center text-ink-soft hover:text-cream hover:bg-gold hover:border-gold hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            {/* Pagination — always centered */}
            <div className="swiper-pagination-custom mt-8 flex gap-2 justify-center items-center"></div>
          </div>

        </div>
      </section>
    </>
  );
}
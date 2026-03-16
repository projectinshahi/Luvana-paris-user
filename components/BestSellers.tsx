
"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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

  const [scrollWidth, setScrollWidth] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const animationRef = useRef<number | null>(null);
  const router = useRouter();
  // const [country, setCountry] = useState<string>(() => {
  //   if (typeof window === "undefined") return "UAE";

  //   try {
  //     const saved = localStorage.getItem("selectedCountry");

  //     if (!saved) return "UAE";

  //     const parsed = JSON.parse(saved);

  //     return parsed?.name || "UAE";
  //   } catch (error) {
  //     console.error("Invalid country in localStorage:", error);
  //     return "UAE";
  //   }
  // });

  // useEffect(() => {
  //   const savedCountry = localStorage.getItem("selectedCountry");

  //   if (savedCountry) {
  //     const parsedCountry = JSON.parse(savedCountry);
  //     setCountry(parsedCountry.name); // Kuwait / UAE / KSA
  //   }
  // }, []);
// useEffect(() => {
//   const savedCountry = localStorage.getItem("selectedCountry");

//   if (!savedCountry) return;

//   try {
//     const parsedCountry = JSON.parse(savedCountry);
//     setCountry(parsedCountry?.name || "UAE");
//   } catch (error) {
//     console.error("Invalid country JSON:", savedCountry);
//     setCountry(savedCountry); // fallback if it was stored as plain string
//   }
// }, []);


  useEffect(() => {

    const track = trackRef.current;
    if (!track) return;

    let animationId: number;

    const scroll = () => {
      const speed = 1;

      if (!isPaused.current) {
        track.scrollLeft += speed;
      }


      const firstCard = track.children[0] as HTMLElement;

      if (firstCard && track.scrollLeft >= firstCard.offsetWidth + 24) {
        track.appendChild(firstCard);
        track.scrollLeft -= firstCard.offsetWidth + 24;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [products, i18n.language]);
  /* ================= ADD TO CART ================= */
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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
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
        @keyframes infiniteScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
          /* Hide scrollbar */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE & Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

        .scroll-track {
          display: flex;
          width: max-content;
          animation: infiniteScroll  linear infinite;
          will-change: transform;
        }

               .pause-on-hover:hover .scroll-track {
          animation-play-state: paused;
        }

        .slider-wrapper {
          direction: ltr;
          overflow: hidden;
          width: 100%;
        }
      `}</style>

      <section
        key={i18n.language}
        className="w-full bg-black text-white py-12 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div
            className={`flex items-center justify-center gap-6 mb-12 ${isRTL ? "flex-row-reverse" : ""
              }`}
          >
            <div className="flex-1 h-px bg-white/30" />
            <h2
              className={`text-[#C5A059] text-2xl lg:text-3xl whitespace-nowrap ${isRTL ? "font-arabic" : ""
                }`}
            >
              {t("bestSellers")}
            </h2>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* CAROUSEL */}
          <div className="slider-wrapper pause-on-hover">
            <div ref={trackRef} className="flex overflow-x-hidden whitespace-nowrap hide-scrollbar" onMouseEnter={() => (isPaused.current = true)}
              onMouseLeave={() => (isPaused.current = false)} >

              {[...products, ...products].map((product, index) => {
                // const image =
                //   isRTL
                //     ? product.imageUrlArabic?.[0]?.imageUrl
                //               const variant = product.variants?.[0];

                // const countryPrice = variant?.currency?.find(
                //   (c: any) => c.country === country
                // );

                // const price = countryPrice?.price || product.minPrice;
                // const mrp = countryPrice?.mrp || product.minPrice;
                const variant = product?.variants?.length ? product.variants[0] : null;

                // const countryPrice = variant?.currency?.find(
                //   (c: any) => c.country?.toLowerCase().trim() === country?.toLowerCase().trim()
                // );
                const price = variant?.price ?? product?.minPrice ?? null;

                const mrp = variant?.mrp ?? product?.maxPrice ?? null;
                const image =
                  product?.variants?.[0]?.imageUrlEnglish?.[0]?.imageUrl ||
                  product?.imageUrlEnglish?.[0]?.imageUrl ||
                  "/no-product.png";

                const name =
                  isRTL ? product.nameArabic : product.nameEnglish;

                return (
                  <div
                    key={`${product._id}-${index}`}
                    className="shrink-0 w-65 mr-6 flex cursor-pointer"
                    onClick={() => router.push(`/brands/${product._id}`)}
                  >
                    <div className="bg-[#111] rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col w-full">

                      {/* IMAGE */}
                      <div className="group relative w-full aspect-3/4 bg-linear-to-b from-[#E3C6A8] to-[#5F4D2B] p-1">
                        <div className="relative w-full h-full bg-[#D9D9D9] rounded-sm overflow-hidden">

                          {/* Wishlist */}
                          <button
                            onClick={(e) => handleAddToWishlist(product, e)}
                            className={`absolute top-3 ${isRTL ? "left-3" : "right-3"
                              } z-10 w-8 h-8 rounded-full bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition`}
                          >
                            <Heart className="w-4 h-4 text-black" />
                          </button>

                          {image && (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              className="object-cover"
                            />
                          )}

                          {/* Add to Cart */}
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-9 rounded-lg bg-linear-to-b from-[#F7E7B4] via-[#D4AF37] to-[#8C6B1F] text-black text-xs opacity-0 group-hover:opacity-100 transition ${isRTL ? "font-arabic" : ""
                              }`}
                          >
                            Add to Cart
                          </button>

                        </div>
                      </div>

                      {/* TEXT */}
                      <div className="p-3 flex flex-col justify-between grow">
                        <h3
                          className={`text-sm mb-2 ${isRTL ? "text-right font-arabic" : "text-left"
                            }`}
                        >
                          {name}
                        </h3>

                        {/* <p
                          className={`text-[#C9A24D] text-sm ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {product.minPrice
                            ? formatPrice(product.minPrice)
                            : "—"}
                        </p> */}
                        <p
                          className={`text-[#C9A24D] text-sm ${isRTL ? "text-right" : "text-left"
                            }`}
                        >
                          {price ? formatPrice(price) : "—"}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
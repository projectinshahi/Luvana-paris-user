"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getHome } from "@/lib/homeData";
import { X, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/axios";

interface Variant {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  color: string;
  price: number;
  mrp: number;
  imageUrlEnglish?: { imageUrl: string }[];
  imageUrlArabic?: { imageUrl: string }[];
}

interface Product {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  imageUrlEnglish?: { imageUrl: string }[];
  imageUrlArabic?: { imageUrl: string }[];
}

interface Influencer {
  _id: string;
  titleEnglish: string;
  titleArabic: string;
  videoUrl?: string;
  product?: Product;
  variant?: Variant;
}

export default function InfluencersSection() {
  const { i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";
  const router = useRouter();

  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = { data: await getHome() };

        if (res.data?.influencers && res.data.influencers.length > 0) {
          console.log("✅ Influencers loaded:", res.data.influencers);
          setInfluencers(res.data.influencers);
        } else {
          console.log("⚠️ No influencers found in API response");
        }
      } catch (error) {
        console.error("❌ Error fetching influencers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const handleVideoClick = (influencer: Influencer) => {
    if (influencer.product && influencer.variant) {
      setSelectedInfluencer(influencer);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedInfluencer?.variant?._id) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        setSelectedInfluencer(null);
        return;
      }

      setAddingToCart(true);
      await api.post("/user/cart", {
        variant: selectedInfluencer.variant._id,
        quantity: 1,
      });

      toast.success("✅ Added to cart!");
      setSelectedInfluencer(null);
    } catch (error: any) {
      console.error("❌ Cart error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleViewProduct = () => {
    if (selectedInfluencer?.product?._id) {
      router.push(`/brands/${selectedInfluencer.product._id}`);
      setSelectedInfluencer(null);
    }
  };

  if (loading) {
    return (
      <section className="relative w-full py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#C9A24D]/50">Loading influencers...</p>
        </div>
      </section>
    );
  }

  if (!influencers.length) {
    console.log("⚠️ No influencers to display");
    return null;
  }

  const getProductImage = (influencer: Influencer): string | undefined => {
    if (isRTL) {
      return influencer.variant?.imageUrlArabic?.[0]?.imageUrl ||
             influencer.variant?.imageUrlEnglish?.[0]?.imageUrl ||
             influencer.product?.imageUrlArabic?.[0]?.imageUrl ||
             influencer.product?.imageUrlEnglish?.[0]?.imageUrl;
    }
    return influencer.variant?.imageUrlEnglish?.[0]?.imageUrl ||
           influencer.variant?.imageUrlArabic?.[0]?.imageUrl ||
           influencer.product?.imageUrlEnglish?.[0]?.imageUrl ||
           influencer.product?.imageUrlArabic?.[0]?.imageUrl;
  };

  const getProductName = (influencer: Influencer): string => {
    if (isRTL) {
      return influencer.product?.nameArabic || influencer.product?.nameEnglish || "Product";
    }
    return influencer.product?.nameEnglish || influencer.product?.nameArabic || "Product";
  };

  const getVariantName = (influencer: Influencer): string => {
    if (isRTL) {
      return influencer.variant?.nameArabic || influencer.variant?.nameEnglish || "";
    }
    return influencer.variant?.nameEnglish || influencer.variant?.nameArabic || "";
  };

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 2rem)); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 2rem)); }
          100% { transform: translateX(0); }
        }

        .carousel-track {
          display: flex;
          gap: 2rem;
          animation: ${isRTL ? "scroll-right" : "scroll-left"} 60s linear infinite;
        }

        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative w-full py-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-[#C9A24D] text-3xl font-light tracking-widest uppercase">
              {isRTL ? "المؤثرون" : "Influencers"}
            </h2>
            <p className="text-[#C9A24D]/60 text-sm mt-2">
              {isRTL ? "اكتشف منتجاتنا المميزة" : "Discover Our Featured Products"}
            </p>
          </div>

          {/* Reel Carousel */}
          <div className="relative w-full overflow-hidden carousel-container">
            <div className="carousel-track">

              {[...influencers, ...influencers].map((item, i) => {
                const title = isRTL
                  ? (item.titleArabic || item.titleEnglish)
                  : (item.titleEnglish || item.titleArabic);

                return (
                  <div
                    key={`${item._id}-${i}`}
                    className="shrink-0 w-60 md:w-70 lg:w-[320px] cursor-pointer"
                    onClick={() => handleVideoClick(item)}
                  >
                    {/* Fixed height container with specific dimensions */}
                    <div className="relative w-full h-106.75 md:h-124.5 lg:h-142.25 overflow-hidden rounded-lg border-2 border-[#C9A24D]/30 hover:border-[#C9A24D] transition-all duration-500 bg-[#1a1a1a]">

                      {/* VIDEO OR YOUTUBE EMBED */}
                      {item.videoUrl ? (
                        (() => {
                          const isYouTube = item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be');
                          
                          if (isYouTube) {
                            let videoId = '';
                            
                            if (item.videoUrl.includes('youtube.com/shorts/')) {
                              videoId = item.videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
                            } else if (item.videoUrl.includes('youtube.com/watch?v=')) {
                              videoId = item.videoUrl.split('v=')[1]?.split('&')[0];
                            } else if (item.videoUrl.includes('youtu.be/')) {
                              videoId = item.videoUrl.split('youtu.be/')[1]?.split('?')[0];
                            }

                            if (videoId) {
                              return (
                                <div className="absolute inset-0 w-full h-full">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                                    className="absolute"
                                    style={{
                                      position: 'absolute',
                                      top: '50%',
                                      left: '50%',
                                      transform: 'translate(-50%, -50%)',
                                      width: '177.78%',
                                      height: '177.78%',
                                      minWidth: '177.78%',
                                      minHeight: '177.78%',
                                      border: 'none',
                                      pointerEvents: 'none'
                                    }}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title={title || 'Influencer video'}
                                  />
                                </div>
                              );
                            }
                          }

                          return (
                            <video
                              key={`video-${item._id}-${i}`}
                              src={item.videoUrl}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                              className="absolute"
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100%',
                                height: '100%',
                                minWidth: '100%',
                                minHeight: '100%',
                                objectFit: 'cover'
                              }}
                              onLoadStart={() => console.log(`🎬 Loading video: ${item.videoUrl}`)}
                              onCanPlay={() => console.log(`✅ Video ready: ${item.videoUrl}`)}
                              onError={(e) => {
                                console.error("❌ Video load error:", item.videoUrl, e);
                              }}
                            >
                              <source src={item.videoUrl} type="video/mp4" />
                            </video>
                          );
                        })()
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6">
                          <div className="text-[#C9A24D]/30 text-6xl mb-4">📹</div>
                          <p className="text-[#C9A24D]/50 text-sm text-center">
                            {isRTL ? "لا يوجد فيديو" : "No video available"}
                          </p>
                        </div>
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/80 to-transparent pointer-events-none z-10" />

                      {/* Tap to view indicator */}
                      {item.product && item.variant && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full z-10">
                          <p className="text-white text-xs">
                            {isRTL ? "انقر للعرض" : "Tap to view"}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Title */}
                    <p
                      className={`mt-5 text-[#C9A24D] text-sm tracking-wide leading-relaxed ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {title || (isRTL ? "بدون عنوان" : "Untitled")}
                    </p>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* Product Modal - Carousel Style */}
      {selectedInfluencer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 z-100"
            onClick={() => setSelectedInfluencer(null)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-101">
            
            {/* Close Button - Top Right */}
            <button
              onClick={() => setSelectedInfluencer(null)}
              className="absolute top-4 right-4 z-102 p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = influencers.findIndex(inf => inf._id === selectedInfluencer._id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : influencers.length - 1;
                setSelectedInfluencer(influencers[prevIndex]);
              }}
              className="absolute left-4 z-102 p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = influencers.findIndex(inf => inf._id === selectedInfluencer._id);
                const nextIndex = currentIndex < influencers.length - 1 ? currentIndex + 1 : 0;
                setSelectedInfluencer(influencers[nextIndex]);
              }}
              className="absolute right-4 z-102 p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Main Content */}
            <div className="relative w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
              
              {/* Video Container */}
              <div className="relative w-full h-150 bg-black rounded-lg overflow-hidden">
                {selectedInfluencer.videoUrl ? (
                  (() => {
                    const isYouTube = selectedInfluencer.videoUrl.includes('youtube.com') || selectedInfluencer.videoUrl.includes('youtu.be');
                    
                    if (isYouTube) {
                      let videoId = '';
                      
                      if (selectedInfluencer.videoUrl.includes('youtube.com/shorts/')) {
                        videoId = selectedInfluencer.videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
                      } else if (selectedInfluencer.videoUrl.includes('youtube.com/watch?v=')) {
                        videoId = selectedInfluencer.videoUrl.split('v=')[1]?.split('&')[0];
                      } else if (selectedInfluencer.videoUrl.includes('youtu.be/')) {
                        videoId = selectedInfluencer.videoUrl.split('youtu.be/')[1]?.split('?')[0];
                      }

                      if (videoId) {
                        return (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0`}
                            className="w-full h-full"
                            style={{ border: 'none' }}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Influencer video"
                          />
                        );
                      }
                    }

                    return (
                      <video
                        src={selectedInfluencer.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                      />
                    );
                  })()
                ) : null}

                {/* Product Card Overlay - Bottom */}
                {selectedInfluencer.product && selectedInfluencer.variant && (
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/95 to-transparent p-6">
                    
                    {/* Product Info Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={getProductImage(selectedInfluencer) || "/placeholder.png"}
                            alt={getProductName(selectedInfluencer)}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {getProductName(selectedInfluencer)}
                          </h3>
                          <p className="text-xs text-gray-600 truncate">
                            {getVariantName(selectedInfluencer)}
                          </p>
                          
                          {/* Price */}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-base font-bold text-gray-900">
                              ₹{selectedInfluencer.variant.price.toFixed(2)}
                            </span>
                            {selectedInfluencer.variant.mrp > selectedInfluencer.variant.price && (
                              <span className="text-xs text-gray-500 line-through">
                                ₹{selectedInfluencer.variant.mrp.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="w-full bg-[#C9A24D] hover:bg-[#B8934C] text-black font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {addingToCart ? (
                        "Adding..."
                      ) : (
                        <>
                          <ShoppingCart size={20} />
                          {isRTL ? "أضف إلى السلة" : "Add to Cart"}
                        </>
                      )}
                    </button>

                    {/* Powered by text */}
                    <p className="text-center text-white/60 text-xs mt-3">
                      powered by Tozoh
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}

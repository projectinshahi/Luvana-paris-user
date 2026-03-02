"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";
import { X, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/axios";

// ============= INTERFACES =============
interface Variant {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
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

// ============= MAIN COMPONENT =============
export default function InfluencersReelsSection() {
  const { i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";
  const router = useRouter();

  // State
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Refs
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ============= FETCH DATA =============
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await axios.get(`${API_URL}/user/home`);

        if (res.data?.influencers && Array.isArray(res.data.influencers)) {
          const validInfluencers = res.data.influencers.filter(
            (inf: Influencer) => inf.videoUrl && inf.videoUrl.trim() !== ""
          );
          setInfluencers(validInfluencers);
        }
      } catch (error) {
        console.error("❌ Error fetching influencers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  // ============= INTERSECTION OBSERVER =============
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // ============= VIDEO REF CALLBACK =============
  const setVideoRef = useCallback((id: string, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current.set(id, element);
      observerRef.current?.observe(element);
    } else {
      const video = videoRefs.current.get(id);
      if (video) {
        observerRef.current?.unobserve(video);
        videoRefs.current.delete(id);
      }
    }
  }, []);

  // ============= HANDLERS =============
  const handleVideoHover = (id: string, isPaused: boolean) => {
    const video = videoRefs.current.get(id);
    if (video) {
      if (isPaused) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    }
  };

  const handleCardClick = (influencer: Influencer) => {
    const index = influencers.findIndex(inf => inf._id === influencer._id);
    if (index !== -1 && influencer.product && influencer.variant) {
      setSelectedIndex(index);
    }
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : influencers.length - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex < influencers.length - 1 ? selectedIndex + 1 : 0);
    }
  };

  const handleAddToCart = async () => {
    if (selectedIndex === null) return;
    const selectedInfluencer = influencers[selectedIndex];
    if (!selectedInfluencer?.variant?._id) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      setAddingToCart(true);
      await api.post("/user/cart", {
        variant: selectedInfluencer.variant._id,
        quantity: 1,
      });

      toast.success("✅ Added to cart!");
      handleCloseModal();
    } catch (error: any) {
      console.error("❌ Cart error:", error);
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleProductClick = () => {
    if (selectedIndex === null) return;
    const selectedInfluencer = influencers[selectedIndex];
    if (!selectedInfluencer?.product?._id) return;
    
    router.push(`/brands/${selectedInfluencer.product._id}`);
  };

  // ============= ESC KEY HANDLER =============
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ============= HELPERS =============
  const getProductName = (inf: Influencer) => {
    return isRTL
      ? inf.product?.nameArabic || inf.product?.nameEnglish || ""
      : inf.product?.nameEnglish || inf.product?.nameArabic || "";
  };

  const getTitle = (inf: Influencer) => {
    return isRTL
      ? inf.titleArabic || inf.titleEnglish
      : inf.titleEnglish || inf.titleArabic;
  };

  const getProductImage = (inf: Influencer) => {
    return isRTL
      ? inf.variant?.imageUrlArabic?.[0]?.imageUrl ||
          inf.variant?.imageUrlEnglish?.[0]?.imageUrl ||
          inf.product?.imageUrlArabic?.[0]?.imageUrl ||
          inf.product?.imageUrlEnglish?.[0]?.imageUrl
      : inf.variant?.imageUrlEnglish?.[0]?.imageUrl ||
          inf.variant?.imageUrlArabic?.[0]?.imageUrl ||
          inf.product?.imageUrlEnglish?.[0]?.imageUrl ||
          inf.product?.imageUrlArabic?.[0]?.imageUrl;
  };

  // ============= RENDER =============
  if (loading || !influencers.length) return null;

  const duplicatedInfluencers = [...influencers, ...influencers];

  return (
    <>
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1.5rem));
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-50% - 1.5rem));
          }
          100% {
            transform: translateX(0);
          }
        }

        .carousel-track {
          animation: ${isRTL ? "scroll-right" : "scroll-left"} 60s linear infinite;
        }

        .carousel-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative w-full py-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#C9A24D]/50 to-[#C9A24D]" />
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[#C9A24D] text-2xl md:text-3xl font-light tracking-widest uppercase whitespace-nowrap">
                {isRTL ? "المؤثرون" : "Influencers"}
              </h2>
              <span className="text-[#C9A24D]/60 text-sm mt-1">
                {isRTL ? "الريلز" : "Scrolls"}
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-[#C9A24D] via-[#C9A24D]/50 to-transparent" />
          </div>

          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            <div className={`flex gap-6 carousel-track ${isCarouselHovered ? "paused" : ""}`}>
              {duplicatedInfluencers.map((influencer, index) => {
                const uniqueId = `${influencer._id}-${index}`;
                const isYouTube = influencer.videoUrl?.includes("youtube.com") || influencer.videoUrl?.includes("youtu.be");

                return (
                  <div
                    key={uniqueId}
                    className="shrink-0 w-75 group"
                    onClick={() => handleCardClick(influencer)}
                  >
                    <div className="relative w-75 h-133.25 rounded-xl overflow-hidden shadow-2xl border border-[rgba(197,160,89,0.3)] hover:border-[#C5A059] transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]">
                      {isYouTube ? (
                        (() => {
                          let videoId = '';
                          if (influencer.videoUrl?.includes('youtube.com/shorts/')) {
                            videoId = influencer.videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
                          } else if (influencer.videoUrl?.includes('youtube.com/watch?v=')) {
                            videoId = influencer.videoUrl.split('v=')[1]?.split('&')[0];
                          } else if (influencer.videoUrl?.includes('youtu.be/')) {
                            videoId = influencer.videoUrl.split('youtu.be/')[1]?.split('?')[0];
                          }

                          if (videoId) {
                            return (
                              <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <iframe
                                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                                  className="absolute"
                                  style={{
                                    border: 'none',
                                    pointerEvents: 'none',
                                    width: '100%',
                                    height: '100%',
                                    minWidth: '100%',
                                    minHeight: '100%',
                                    maxWidth: 'none',
                                    maxHeight: 'none',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%) scale(1.5)',
                                    objectFit: 'cover'
                                  }}
                                  allow="autoplay; encrypted-media"
                                  title={getTitle(influencer)}
                                />
                              </div>
                            );
                          }
                          return null;
                        })()
                      ) : (
                        <video
                          ref={(el) => setVideoRef(uniqueId, el)}
                          src={influencer.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute"
                          style={{
                            width: '100%',
                            height: '100%',
                            minWidth: '100%',
                            minHeight: '100%',
                            maxWidth: 'none',
                            maxHeight: 'none',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            objectFit: 'cover',
                            objectPosition: 'center center'
                          }}
                          onMouseEnter={() => handleVideoHover(uniqueId, true)}
                          onMouseLeave={() => handleVideoHover(uniqueId, false)}
                        />
                      )}

                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-500" />

                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/80 to-transparent p-6">
                        {influencer.product && influencer.variant && (
                          <div className="space-y-3">
                            <h3 className="text-white text-sm font-medium line-clamp-2">
                              {getProductName(influencer)}
                            </h3>

                            <div className="flex items-center gap-2">
                              <span className="text-[#C5A059] text-xl font-bold">
                                KWD {influencer.variant.price.toFixed(2)}
                              </span>
                              {influencer.variant.mrp > influencer.variant.price && (
                                <span className="text-gray-400 text-sm line-through">
                                  KWD {influencer.variant.mrp.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(influencer);
                              }}
                              className="w-full bg-[#C5A059] hover:bg-[#B8934C] text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center gap-2"
                            >
                              <ShoppingCart size={16} />
                              {isRTL ? "أضف إلى السلة" : "Add to Cart"}
                            </button> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-100 bg-black flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X size={24} className="text-white" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center gap-4 px-4">
            {(() => {
              const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : influencers.length - 1;
              const prevInfluencer = influencers[prevIndex];
              const isYouTube = prevInfluencer.videoUrl?.includes("youtube.com") || prevInfluencer.videoUrl?.includes("youtu.be");

              return (
                <div
                  className="hidden md:block w-75 h-133.25 shrink-0 opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-900">
                    {isYouTube ? (
                      (() => {
                        let videoId = '';
                        if (prevInfluencer.videoUrl?.includes('youtube.com/shorts/')) {
                          videoId = prevInfluencer.videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
                        } else if (prevInfluencer.videoUrl?.includes('youtube.com/watch?v=')) {
                          videoId = prevInfluencer.videoUrl.split('v=')[1]?.split('&')[0];
                        } else if (prevInfluencer.videoUrl?.includes('youtu.be/')) {
                          videoId = prevInfluencer.videoUrl.split('youtu.be/')[1]?.split('?')[0];
                        }

                        if (videoId) {
                          return (
                            <img
                              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                              alt="Previous"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          );
                        }
                        return null;
                      })()
                    ) : (
                      <video
                        src={prevInfluencer.videoUrl}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })()}

            {(() => {
              const currentInfluencer = influencers[selectedIndex];
              const isYouTube = currentInfluencer.videoUrl?.includes("youtube.com") || currentInfluencer.videoUrl?.includes("youtu.be");

              return (
                <div
                  className="relative w-100 h-177.75 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-2xl">
                    {isYouTube ? (
                      (() => {
                        let videoId = '';
                        if (currentInfluencer.videoUrl?.includes('youtube.com/shorts/')) {
                          videoId = currentInfluencer.videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
                        } else if (currentInfluencer.videoUrl?.includes('youtube.com/watch?v=')) {
                          videoId = currentInfluencer.videoUrl.split('v=')[1]?.split('&')[0];
                        } else if (currentInfluencer.videoUrl?.includes('youtu.be/')) {
                          videoId = currentInfluencer.videoUrl.split('youtu.be/')[1]?.split('?')[0];
                        }

                        if (videoId) {
                          return (
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`}
                                className="absolute inset-0 w-full h-full"
                                style={{
                                  border: 'none',
                                  width: '100%',
                                  height: '100%',
                                  minWidth: '100%',
                                  minHeight: '100%',
                                  objectFit: 'cover',
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)'
                                }}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                              />
                            </div>
                          );
                        }
                        return null;
                      })()
                    ) : (
                      <video
                        src={currentInfluencer.videoUrl}
                        autoPlay
                        loop
                        controls
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    {currentInfluencer.product && currentInfluencer.variant && (
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/95 to-transparent p-6">
                        <div 
                          onClick={handleProductClick}
                          className="bg-white rounded-2xl p-4 mb-3 shadow-xl cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                        >
                          <div className="flex gap-3">
                            <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                              <img
                                src={getProductImage(currentInfluencer) || "/placeholder.png"}
                                alt={getProductName(currentInfluencer)}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                                {getProductName(currentInfluencer)}
                              </h3>
                              
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-lg font-bold text-gray-900">
                                  KWD {currentInfluencer.variant.price.toFixed(2)}
                                </span>
                                {currentInfluencer.variant.mrp > currentInfluencer.variant.price && (
                                  <>
                                    <span className="text-sm text-gray-500 line-through">
                                      KWD {currentInfluencer.variant.mrp.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-semibold text-green-600">
                                      {Math.round(
                                        ((currentInfluencer.variant.mrp - currentInfluencer.variant.price) /
                                          currentInfluencer.variant.mrp) *
                                          100
                                      )}% OFF
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                          }}
                          disabled={addingToCart}
                          className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-4 px-6 rounded-full transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                        >
                          <ShoppingCart size={20} />
                          {addingToCart ? "Adding..." : (isRTL ? "أضف إلى السلة" : "Add to Bag")}
                        </button>

                        <p className="text-center text-white/50 text-xs mt-3">
                          powered by Tozoh
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {(() => {
              const nextIndex = selectedIndex < influencers.length - 1 ? selectedIndex + 1 : 0;
              const nextInfluencer = influencers[nextIndex];
              const isYouTube = nextInfluencer.videoUrl?.includes("youtube.com") || nextInfluencer.videoUrl?.includes("youtu.be");

              return (
                <div
                  className="hidden md:block w-75 h-133.25 shrink-0 opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-900">
                    {isYouTube ? (
                      (() => {
                        let videoId = '';
                        if (nextInfluencer.videoUrl?.includes('youtube.com/shorts/')) {
                          videoId = nextInfluencer.videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
                        } else if (nextInfluencer.videoUrl?.includes('youtube.com/watch?v=')) {
                          videoId = nextInfluencer.videoUrl.split('v=')[1]?.split('&')[0];
                        } else if (nextInfluencer.videoUrl?.includes('youtu.be/')) {
                          videoId = nextInfluencer.videoUrl.split('youtu.be/')[1]?.split('?')[0];
                        }

                        if (videoId) {
                          return (
                            <img
                              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                              alt="Next"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          );
                        }
                        return null;
                      })()
                    ) : (
                      <video
                        src={nextInfluencer.videoUrl}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

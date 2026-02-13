"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import Navbar from "@/components/Navbar";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  const params = useParams();
  const { t, ready, i18n } = useTranslation("common");
  const { isRTL, currentLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Force re-render when language changes
  useEffect(() => {
    if (mounted && ready) {
      // Force component to re-render with new translations
      setQuantity(prev => prev);
    }
  }, [currentLanguage, i18n.language, mounted, ready]);

  // Product data - using translations
  const product = {
    id: 1,
    name: t("productDetail.product.name"),
    subtitle: t("productDetail.product.subtitle"),
    brand: t("productDetail.product.brand"),
    description: t("productDetail.product.description"),
    price: 899,
    originalPrice: 1299,
    rating: 4,
    reviews: 12,
    images: [
      "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
      "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
      "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
    ],
    colors: [
      { name: "Berry Pink", hex: "#C41E3A" },
      { name: "Rose", hex: "#8B4789" },
      { name: "Hot Pink", hex: "#FF1493" },
      { name: "Magenta", hex: "#C71585" },
      { name: "Deep Pink", hex: "#FF69B4" },
    ],
    details: [
      t("productDetail.product.detail1"),
      t("productDetail.product.detail2"),
      t("productDetail.product.detail3"),
      t("productDetail.product.detail4"),
      t("productDetail.product.detail5"),
    ],
    ingredients: t("productDetail.product.ingredients"),
    howToUse: t("productDetail.product.howToUse"),
  };

  const relatedProducts = [
    {
      id: 2,
      name: t("productDetail.product.related1"),
      price: 899,
      originalPrice: 1299,
      image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
    },
    {
      id: 3,
      name: t("productDetail.product.related2"),
      price: 2199,
      originalPrice: 2999,
      image: "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
    },
    {
      id: 4,
      name: t("productDetail.product.related3"),
      price: 899,
      originalPrice: 1299,
      image: "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
    },
    {
      id: 5,
      name: t("productDetail.product.related4"),
      price: 699,
      originalPrice: 999,
      image: "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  if (!mounted || !ready) {
    return (
      <>
        <Navbar />
        <ResponsiveLayout>
          <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse">
                <div className="h-96 bg-gray-800 rounded-lg mb-8" />
                <div className="h-8 bg-gray-800 rounded w-1/2 mb-4" />
                <div className="h-4 bg-gray-800 rounded w-3/4" />
              </div>
            </div>
          </div>
        </ResponsiveLayout>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ResponsiveLayout>
        <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Product Detail Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
              {/* Left: Image Gallery - ALWAYS ON LEFT */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-[#1A1A1A] rounded-lg overflow-hidden aspect-square">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition">
                    <Heart size={20} />
                  </button>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === idx ? 'border-[#C9A24D]' : 'border-[#2A2A2A]'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Product Info - ALWAYS ON RIGHT, text alignment changes for RTL */}
              <div className="space-y-6">
                {/* Brand & Title */}
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-sm text-gray-400 mb-2">{product.brand}</p>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
                  <p className="text-lg text-gray-300">{product.subtitle}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < product.rating ? 'fill-[#C9A24D] text-[#C9A24D]' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews} {t("productDetail.reviews")})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-[#C9A24D]">₹{product.price}</span>
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="px-3 py-1 bg-[#C9A24D] text-black text-sm font-semibold rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% {t("productDetail.off")}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-gray-400 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {product.description}
                </p>

                {/* Colors */}
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h3 className="text-lg font-semibold mb-3">{t("productDetail.colors")}</h3>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`w-10 h-10 rounded-full border-2 transition ${
                          selectedColor === idx ? 'border-[#C9A24D] scale-110' : 'border-[#2A2A2A]'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#2A2A2A] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-[#1A1A1A] transition"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-[#2A2A2A]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-[#1A1A1A] transition"
                    >
                      +
                    </button>
                  </div>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#C9A24D] hover:bg-[#B8934C] text-black py-3 rounded-lg font-semibold transition">
                    <ShoppingCart size={20} />
                    {t("productDetail.addToCart")}
                  </button>
                </div>

                {/* Product Details */}
                <div className="border-t border-[#2A2A2A] pt-6">
                  <h3 className={`text-lg font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t("productDetail.productDetails")}
                  </h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <span className="text-[#C9A24D] mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ingredients */}
                <div className="border-t border-[#2A2A2A] pt-6">
                  <h3 className={`text-lg font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t("productDetail.ingredients")}
                  </h3>
                  <p className={`text-gray-400 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                    {product.ingredients}
                  </p>
                </div>

                {/* How to Use */}
                <div className="border-t border-[#2A2A2A] pt-6">
                  <h3 className={`text-lg font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t("productDetail.howToUse")}
                  </h3>
                  <p className={`text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {product.howToUse}
                  </p>
                </div>
              </div>
            </div>

            {/* You May Also Like */}
            <div className="border-t border-[#2A2A2A] pt-12">
              <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t("productDetail.youMayAlsoLike")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(201,162,77,0.15)] transition cursor-pointer"
                  >
                    <div className="relative aspect-square bg-[#0D0D0D]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold text-sm sm:text-base mb-2 line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C9A24D] font-bold">₹{item.price}</span>
                        <span className="text-gray-500 text-sm line-through">₹{item.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </ResponsiveLayout>
    </>
  );
}

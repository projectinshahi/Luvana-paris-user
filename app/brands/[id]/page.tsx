

// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useParams } from "next/navigation";
// import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";
// import Navbar from "@/components/Navbar";
// import ResponsiveLayout from "@/components/ResponsiveLayout";
// import Footer from "@/components/Footer";

// // ─── Lightbox Component ────────────────────────────────────────────────────────
// function Lightbox({ images, initialIndex, onClose }) {
//   const [activeIndex, setActiveIndex] = useState(initialIndex);
//   const [zoom, setZoom] = useState(1);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [panStart, setPanStart] = useState({ x: 0, y: 0 });
//   const imgRef = useRef(null);
//   const containerRef = useRef(null);

//   // Touch pinch-zoom state
//   const lastTouchDist = useRef(null);
//   const lastTouchCenter = useRef(null);

//   const resetZoom = () => {
//     setZoom(1);
//     setPan({ x: 0, y: 0 });
//   };

//   const goNext = useCallback(() => {
//     resetZoom();
//     setActiveIndex((p) => (p + 1) % images.length);
//   }, [images.length]);

//   const goPrev = useCallback(() => {
//     resetZoom();
//     setActiveIndex((p) => (p - 1 + images.length) % images.length);
//   }, [images.length]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowRight") goNext();
//       if (e.key === "ArrowLeft") goPrev();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [goNext, goPrev, onClose]);

//   // Prevent body scroll while lightbox is open
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);

//   // ── Mouse zoom (double-click) ──────────────────────────────────────────────
//   const handleDoubleClick = (e) => {
//     const rect = containerRef.current.getBoundingClientRect();
//     if (zoom === 1) {
//       const cx = e.clientX - rect.left - rect.width / 2;
//       const cy = e.clientY - rect.top - rect.height / 2;
//       setZoom(2.5);
//       setPan({ x: -cx * 1.5, y: -cy * 1.5 });
//     } else {
//       resetZoom();
//     }
//   };

//   // ── Mouse wheel zoom ───────────────────────────────────────────────────────
//   const handleWheel = (e) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? -0.3 : 0.3;
//     setZoom((z) => Math.min(5, Math.max(1, z + delta)));
//     if (zoom + delta <= 1) setPan({ x: 0, y: 0 });
//   };

//   // ── Mouse drag (pan when zoomed) ───────────────────────────────────────────
//   const handleMouseDown = (e) => {
//     if (zoom <= 1) return;
//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart({ x: e.clientX, y: e.clientY });
//     setPanStart({ ...pan });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     setPan({
//       x: panStart.x + (e.clientX - dragStart.x),
//       y: panStart.y + (e.clientY - dragStart.y),
//     });
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   // ── Touch events ────────────────────────────────────────────────────────────
//   const getTouchDist = (touches) => {
//     const dx = touches[0].clientX - touches[1].clientX;
//     const dy = touches[0].clientY - touches[1].clientY;
//     return Math.hypot(dx, dy);
//   };

//   const getTouchCenter = (touches) => ({
//     x: (touches[0].clientX + touches[1].clientX) / 2,
//     y: (touches[0].clientY + touches[1].clientY) / 2,
//   });

//   const handleTouchStart = (e) => {
//     if (e.touches.length === 2) {
//       lastTouchDist.current = getTouchDist(e.touches);
//       lastTouchCenter.current = getTouchCenter(e.touches);
//     } else if (e.touches.length === 1 && zoom > 1) {
//       setIsDragging(true);
//       setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
//       setPanStart({ ...pan });
//     }
//   };

//   const handleTouchMove = (e) => {
//     e.preventDefault();
//     if (e.touches.length === 2) {
//       const dist = getTouchDist(e.touches);
//       const scale = dist / lastTouchDist.current;
//       lastTouchDist.current = dist;
//       setZoom((z) => Math.min(5, Math.max(1, z * scale)));
//     } else if (e.touches.length === 1 && isDragging) {
//       setPan({
//         x: panStart.x + (e.touches[0].clientX - dragStart.x),
//         y: panStart.y + (e.touches[0].clientY - dragStart.y),
//       });
//     }
//   };

//   const handleTouchEnd = (e) => {
//     if (e.touches.length < 2) lastTouchDist.current = null;
//     if (e.touches.length === 0) setIsDragging(false);
//   };

//   // Swipe to navigate (only when not zoomed)
//   const swipeStart = useRef(null);
//   const handleSwipeStart = (e) => {
//     if (zoom > 1) return;
//     swipeStart.current = e.touches[0].clientX;
//   };
//   const handleSwipeEnd = (e) => {
//     if (zoom > 1 || swipeStart.current === null) return;
//     const diff = swipeStart.current - e.changedTouches[0].clientX;
//     if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
//     swipeStart.current = null;
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Image lightbox"
//     >
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//         aria-label="Close lightbox"
//       >
//         <X size={20} />
//       </button>

//       {/* Zoom indicator */}
//       {zoom > 1 && (
//         <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white/10 rounded-full text-white text-xs font-mono">
//           {Math.round(zoom * 100)}%
//         </div>
//       )}

//       {/* Reset zoom button */}
//       {zoom > 1 && (
//         <button
//           onClick={resetZoom}
//           className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//           aria-label="Reset zoom"
//         >
//           <Maximize2 size={18} />
//         </button>
//       )}

//       {/* Prev / Next arrows */}
//       {images.length > 1 && (
//         <>
//           <button
//             onClick={goPrev}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//             aria-label="Previous image"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={goNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//             aria-label="Next image"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </>
//       )}

//       {/* Main image container */}
//       <div
//         ref={containerRef}
//         className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
//         onDoubleClick={handleDoubleClick}
//         onWheel={handleWheel}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={(e) => { handleSwipeStart(e); handleTouchStart(e); }}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={(e) => { handleSwipeEnd(e); handleTouchEnd(e); }}
//         style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
//       >
//         <img
//           ref={imgRef}
//           src={images[activeIndex]}
//           alt={`Product view ${activeIndex + 1}`}
//           draggable={false}
//           className="max-w-[90vw] max-h-[85vh] object-contain transition-transform duration-100 pointer-events-none"
//           style={{
//             transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
//             transformOrigin: "center center",
//           }}
//         />
//       </div>

//       {/* Thumbnail strip */}
//       {images.length > 1 && (
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
//           {images.map((img, idx) => (
//             <button
//               key={idx}
//               onClick={() => { resetZoom(); setActiveIndex(idx); }}
//               className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
//                 activeIndex === idx ? "border-[#C9A24D] scale-110" : "border-white/20 opacity-60 hover:opacity-100"
//               }`}
//               aria-label={`View image ${idx + 1}`}
//             >
//               <img src={img} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Hint text (shown once) */}
//       <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/30 text-xs whitespace-nowrap pointer-events-none">
//         Double-tap to zoom · Scroll to zoom · Drag to pan · Swipe to navigate
//       </p>
//     </div>
//   );
// }

// // ─── Main Product Detail Page ──────────────────────────────────────────────────
// export default function ProductDetailPage() {
//   const params = useParams();
//   const { t, ready, i18n } = useTranslation("common");
//   const { isRTL, currentLanguage } = useLanguage();
//   const [mounted, setMounted] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   // Lightbox state
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxIndex, setLightboxIndex] = useState(0);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Force re-render when language changes
//   useEffect(() => {
//     if (mounted && ready) {
//       setQuantity((prev) => prev);
//     }
//   }, [currentLanguage, i18n.language, mounted, ready]);

//   const openLightbox = (idx) => {
//     setLightboxIndex(idx);
//     setLightboxOpen(true);
//   };

//   // Product data
//   const product = {
//     id: 1,
//     name: t("productDetail.product.name"),
//     subtitle: t("productDetail.product.subtitle"),
//     brand: t("productDetail.product.brand"),
//     description: t("productDetail.product.description"),
//     price: 899,
//     originalPrice: 1299,
//     rating: 4,
//     reviews: 12,
//     images: [
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//     ],
//     colors: [
//       { name: "Berry Pink", hex: "#C41E3A" },
//       { name: "Rose", hex: "#8B4789" },
//       { name: "Hot Pink", hex: "#FF1493" },
//       { name: "Magenta", hex: "#C71585" },
//       { name: "Deep Pink", hex: "#FF69B4" },
//     ],
//     details: [
//       t("productDetail.product.detail1"),
//       t("productDetail.product.detail2"),
//       t("productDetail.product.detail3"),
//       t("productDetail.product.detail4"),
//       t("productDetail.product.detail5"),
//     ],
//     ingredients: t("productDetail.product.ingredients"),
//     howToUse: t("productDetail.product.howToUse"),
//   };

//   const relatedProducts = [
//     {
//       id: 2,
//       name: t("productDetail.product.related1"),
//       price: 899,
//       originalPrice: 1299,
//       image:
//         "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
//     },
//     {
//       id: 3,
//       name: t("productDetail.product.related2"),
//       price: 2199,
//       originalPrice: 2999,
//       image: "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
//     },
//     {
//       id: 4,
//       name: t("productDetail.product.related3"),
//       price: 899,
//       originalPrice: 1299,
//       image: "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
//     },
//     {
//       id: 5,
//       name: t("productDetail.product.related4"),
//       price: 699,
//       originalPrice: 999,
//       image: "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
//     },
//   ];

//   if (!mounted || !ready) {
//     return (
//       <>
//         <Navbar />
//         <ResponsiveLayout>
//           <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//             <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="animate-pulse">
//                 <div className="h-96 bg-gray-800 rounded-lg mb-8" />
//                 <div className="h-8 bg-gray-800 rounded w-1/2 mb-4" />
//                 <div className="h-4 bg-gray-800 rounded w-3/4" />
//               </div>
//             </div>
//           </div>
//         </ResponsiveLayout>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <ResponsiveLayout>
//         <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//             {/* Product Detail Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

//               {/* Left: Image Gallery */}
//               <div className="space-y-4">
//                 {/* Main Image */}
//                 <div className="relative bg-[#1A1A1A] rounded-lg overflow-hidden aspect-square group">
//                   <img
//                     src={product.images[selectedImage]}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />

//                   {/* Zoom / expand overlay on hover */}
//                   <button
//                     onClick={() => openLightbox(selectedImage)}
//                     className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20"
//                     aria-label="Open image in lightbox"
//                   >
//                     <span className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full">
//                       <ZoomIn size={16} />
//                       {/* "Click to zoom" label — graceful fallback if translation key missing */}
//                       Zoom
//                     </span>
//                   </button>

//                   {/* Wishlist */}
//                   <button className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-10">
//                     <Heart size={20} />
//                   </button>

//                   {/* Navigation arrows */}
//                   <button
//                     onClick={() =>
//                       setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))
//                     }
//                     className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-10"
//                     aria-label="Previous image"
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))
//                     }
//                     className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-10"
//                     aria-label="Next image"
//                   >
//                     <ChevronRight size={20} />
//                   </button>

//                   {/* Dot indicators (mobile-friendly) */}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
//                     {product.images.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setSelectedImage(idx)}
//                         className={`rounded-full transition-all ${
//                           selectedImage === idx
//                             ? "w-5 h-2 bg-[#C9A24D]"
//                             : "w-2 h-2 bg-white/40"
//                         }`}
//                         aria-label={`Go to image ${idx + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Thumbnail strip */}
//                 <div className="grid grid-cols-3 gap-4">
//                   {product.images.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setSelectedImage(idx)}
//                       onDoubleClick={() => openLightbox(idx)}
//                       className={`relative aspect-square rounded-lg overflow-hidden border-2 transition group ${
//                         selectedImage === idx ? "border-[#C9A24D]" : "border-[#2A2A2A]"
//                       }`}
//                       aria-label={`Select image ${idx + 1}`}
//                     >
//                       <img
//                         src={img}
//                         alt={`View ${idx + 1}`}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                       />
//                       {/* Zoom icon on thumbnail hover */}
//                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
//                         <ZoomIn size={16} className="text-white" />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Right: Product Info */}
//               <div className="space-y-6">
//                 {/* Brand & Title */}
//                 <div className={isRTL ? "text-right" : "text-left"}>
//                   <p className="text-sm text-gray-400 mb-2">{product.brand}</p>
//                   <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
//                   <p className="text-lg text-gray-300">{product.subtitle}</p>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={18}
//                         className={i < product.rating ? "fill-[#C9A24D] text-[#C9A24D]" : "text-gray-600"}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-400">
//                     ({product.reviews} {t("productDetail.reviews")})
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center gap-4">
//                   <span className="text-3xl font-bold text-[#C9A24D]">₹{product.price}</span>
//                   <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
//                   <span className="px-3 py-1 bg-[#C9A24D] text-black text-sm font-semibold rounded">
//                     {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%{" "}
//                     {t("productDetail.off")}
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className={`text-gray-400 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
//                   {product.description}
//                 </p>

//                 {/* Colors */}
//                 <div className={isRTL ? "text-right" : "text-left"}>
//                   <h3 className="text-lg font-semibold mb-3">{t("productDetail.colors")}</h3>
//                   <div className="flex items-center gap-3">
//                     {product.colors.map((color, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setSelectedColor(idx)}
//                         className={`w-10 h-10 rounded-full border-2 transition ${
//                           selectedColor === idx ? "border-[#C9A24D] scale-110" : "border-[#2A2A2A]"
//                         }`}
//                         style={{ backgroundColor: color.hex }}
//                         title={color.name}
//                         aria-label={color.name}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quantity & Add to Cart */}
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center border border-[#2A2A2A] rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-4 py-2 hover:bg-[#1A1A1A] transition"
//                       aria-label="Decrease quantity"
//                     >
//                       -
//                     </button>
//                     <span className="px-6 py-2 border-x border-[#2A2A2A]">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-4 py-2 hover:bg-[#1A1A1A] transition"
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button className="flex-1 flex items-center justify-center gap-2 bg-[#C9A24D] hover:bg-[#B8934C] text-black py-3 rounded-lg font-semibold transition">
//                     <ShoppingCart size={20} />
//                     {t("productDetail.addToCart")}
//                   </button>
//                 </div>

//                 {/* Product Details */}
//                 <div className="border-t border-[#2A2A2A] pt-6">
//                   <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
//                     {t("productDetail.productDetails")}
//                   </h3>
//                   <ul className="space-y-2">
//                     {product.details.map((detail, idx) => (
//                       <li
//                         key={idx}
//                         className={`flex items-start gap-2 text-gray-400 ${isRTL ? "text-right" : "text-left"}`}
//                       >
//                         <span className="text-[#C9A24D] mt-1">•</span>
//                         <span>{detail}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Ingredients */}
//                 <div className="border-t border-[#2A2A2A] pt-6">
//                   <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
//                     {t("productDetail.ingredients")}
//                   </h3>
//                   <p className={`text-gray-400 text-sm ${isRTL ? "text-right" : "text-left"}`}>
//                     {product.ingredients}
//                   </p>
//                 </div>

//                 {/* How to Use */}
//                 <div className="border-t border-[#2A2A2A] pt-6">
//                   <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
//                     {t("productDetail.howToUse")}
//                   </h3>
//                   <p className={`text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
//                     {product.howToUse}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* You May Also Like */}
//             <div className="border-t border-[#2A2A2A] pt-12">
//               <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${isRTL ? "text-right" : "text-left"}`}>
//                 {t("productDetail.youMayAlsoLike")}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//                 {relatedProducts.map((item) => (
//                   <div
//                     key={item.id}
//                     className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(201,162,77,0.15)] transition cursor-pointer"
//                   >
//                     <div className="relative aspect-square bg-[#0D0D0D] group">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <h3
//                         className={`font-semibold text-sm sm:text-base mb-2 line-clamp-2 ${
//                           isRTL ? "text-right" : "text-left"
//                         }`}
//                       >
//                         {item.name}
//                       </h3>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[#C9A24D] font-bold">₹{item.price}</span>
//                         <span className="text-gray-500 text-sm line-through">₹{item.originalPrice}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </ResponsiveLayout>

//       {/* Lightbox — rendered outside main flow to avoid stacking context issues */}
//       {lightboxOpen && (
//         <Lightbox
//           images={product.images}
//           initialIndex={lightboxIndex}
//           onClose={() => setLightboxOpen(false)}
//         />
//       )}
//     </>
//   );
// }
// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useParams } from "next/navigation";
// import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, X, ZoomIn, Maximize2, Search } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";
// import Navbar from "@/components/Navbar";
// import ResponsiveLayout from "@/components/ResponsiveLayout";
// import Footer from "@/components/Footer";

// // ─── Hover Zoom Preview Component ─────────────────────────────────────────────
// function ZoomPreview({ src, alt }) {
//   const containerRef = useRef(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
//   const [previewBg, setPreviewBg] = useState({ x: 0, y: 0 });
//   const [isMobile, setIsMobile] = useState(false);

//   // Zoom magnification factor
//   const ZOOM = 2.8;
//   // Preview box size (px)
//   const PREVIEW_W = 380;
//   const PREVIEW_H = 380;
//   // Lens size (px)
//   const LENS_W = Math.round(PREVIEW_W / ZOOM);
//   const LENS_H = Math.round(PREVIEW_H / ZOOM);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 1024);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const handleMouseMove = (e) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();

//     // Cursor position relative to image
//     let x = e.clientX - rect.left;
//     let y = e.clientY - rect.top;

//     // Clamp lens center so it stays inside image
//     x = Math.max(LENS_W / 2, Math.min(rect.width - LENS_W / 2, x));
//     y = Math.max(LENS_H / 2, Math.min(rect.height - LENS_H / 2, y));

//     // Lens top-left position
//     setLensPos({ x: x - LENS_W / 2, y: y - LENS_H / 2 });

//     // Background-position for preview panel (offset = lens position * zoom ratio)
//     const bgX = -((x - LENS_W / 2) * ZOOM);
//     const bgY = -((y - LENS_H / 2) * ZOOM);
//     setPreviewBg({ x: bgX, y: bgY });
//   };

//   return (
//     <div className="relative w-full aspect-square" ref={containerRef}>
//       {/* ── Image + lens overlay ─────────────────────────────── */}
//       <div
//         className="relative w-full h-full rounded-lg overflow-hidden bg-[#1A1A1A] cursor-crosshair select-none"
//         onMouseEnter={() => !isMobile && setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//         onMouseMove={handleMouseMove}
//       >
//         <img
//           src={src}
//           alt={alt}
//           draggable={false}
//           className="w-full h-full object-cover pointer-events-none"
//         />

//         {/* Lens rectangle */}
//         {isHovering && (
//           <div
//             className="absolute border-2 border-[#C9A24D] bg-white/10 backdrop-blur-[1px] pointer-events-none rounded"
//             style={{
//               left: lensPos.x,
//               top: lensPos.y,
//               width: LENS_W,
//               height: LENS_H,
//               boxShadow: "0 0 0 9999px rgba(0,0,0,0.25)",
//             }}
//           />
//         )}

//         {/* Zoom hint badge */}
//         {!isHovering && (
//           <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none">
//             <Search size={12} />
//             Zoom Preview
//           </div>
//         )}
//       </div>

//       {/* ── Floating preview panel (desktop only, right side) ── */}
//       {isHovering && !isMobile && (
//         <div
//           className="absolute top-0 z-50 rounded-xl overflow-hidden border border-[#C9A24D]/40 shadow-2xl shadow-black/60"
//           style={{
//             left: "calc(100% + 16px)",
//             width: PREVIEW_W,
//             height: PREVIEW_H,
//             backgroundImage: `url(${src})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: `${PREVIEW_W * ZOOM}px ${PREVIEW_H * ZOOM}px`,
//             backgroundPosition: `${previewBg.x}px ${previewBg.y}px`,
//           }}
//         >
//           {/* "Zoom Preview" label inside panel */}
//           <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
//             <Search size={11} />
//             Zoom Preview
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Lightbox Component ────────────────────────────────────────────────────────
// function Lightbox({ images, initialIndex, onClose }) {
//   const [activeIndex, setActiveIndex] = useState(initialIndex);
//   const [zoom, setZoom] = useState(1);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [panStart, setPanStart] = useState({ x: 0, y: 0 });
//   const imgRef = useRef(null);
//   const containerRef = useRef(null);

//   // Touch pinch-zoom state
//   const lastTouchDist = useRef(null);
//   const lastTouchCenter = useRef(null);

//   const resetZoom = () => {
//     setZoom(1);
//     setPan({ x: 0, y: 0 });
//   };

//   const goNext = useCallback(() => {
//     resetZoom();
//     setActiveIndex((p) => (p + 1) % images.length);
//   }, [images.length]);

//   const goPrev = useCallback(() => {
//     resetZoom();
//     setActiveIndex((p) => (p - 1 + images.length) % images.length);
//   }, [images.length]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowRight") goNext();
//       if (e.key === "ArrowLeft") goPrev();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [goNext, goPrev, onClose]);

//   // Prevent body scroll while lightbox is open
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);

//   // ── Mouse zoom (double-click) ──────────────────────────────────────────────
//   const handleDoubleClick = (e) => {
//     const rect = containerRef.current.getBoundingClientRect();
//     if (zoom === 1) {
//       const cx = e.clientX - rect.left - rect.width / 2;
//       const cy = e.clientY - rect.top - rect.height / 2;
//       setZoom(2.5);
//       setPan({ x: -cx * 1.5, y: -cy * 1.5 });
//     } else {
//       resetZoom();
//     }
//   };

//   // ── Mouse wheel zoom ───────────────────────────────────────────────────────
//   const handleWheel = (e) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? -0.3 : 0.3;
//     setZoom((z) => Math.min(5, Math.max(1, z + delta)));
//     if (zoom + delta <= 1) setPan({ x: 0, y: 0 });
//   };

//   // ── Mouse drag (pan when zoomed) ───────────────────────────────────────────
//   const handleMouseDown = (e) => {
//     if (zoom <= 1) return;
//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart({ x: e.clientX, y: e.clientY });
//     setPanStart({ ...pan });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     setPan({
//       x: panStart.x + (e.clientX - dragStart.x),
//       y: panStart.y + (e.clientY - dragStart.y),
//     });
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   // ── Touch events ────────────────────────────────────────────────────────────
//   const getTouchDist = (touches) => {
//     const dx = touches[0].clientX - touches[1].clientX;
//     const dy = touches[0].clientY - touches[1].clientY;
//     return Math.hypot(dx, dy);
//   };

//   const getTouchCenter = (touches) => ({
//     x: (touches[0].clientX + touches[1].clientX) / 2,
//     y: (touches[0].clientY + touches[1].clientY) / 2,
//   });

//   const handleTouchStart = (e) => {
//     if (e.touches.length === 2) {
//       lastTouchDist.current = getTouchDist(e.touches);
//       lastTouchCenter.current = getTouchCenter(e.touches);
//     } else if (e.touches.length === 1 && zoom > 1) {
//       setIsDragging(true);
//       setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
//       setPanStart({ ...pan });
//     }
//   };

//   const handleTouchMove = (e) => {
//     e.preventDefault();
//     if (e.touches.length === 2) {
//       const dist = getTouchDist(e.touches);
//       const scale = dist / lastTouchDist.current;
//       lastTouchDist.current = dist;
//       setZoom((z) => Math.min(5, Math.max(1, z * scale)));
//     } else if (e.touches.length === 1 && isDragging) {
//       setPan({
//         x: panStart.x + (e.touches[0].clientX - dragStart.x),
//         y: panStart.y + (e.touches[0].clientY - dragStart.y),
//       });
//     }
//   };

//   const handleTouchEnd = (e) => {
//     if (e.touches.length < 2) lastTouchDist.current = null;
//     if (e.touches.length === 0) setIsDragging(false);
//   };

//   // Swipe to navigate (only when not zoomed)
//   const swipeStart = useRef(null);
//   const handleSwipeStart = (e) => {
//     if (zoom > 1) return;
//     swipeStart.current = e.touches[0].clientX;
//   };
//   const handleSwipeEnd = (e) => {
//     if (zoom > 1 || swipeStart.current === null) return;
//     const diff = swipeStart.current - e.changedTouches[0].clientX;
//     if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
//     swipeStart.current = null;
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Image lightbox"
//     >
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//         aria-label="Close lightbox"
//       >
//         <X size={20} />
//       </button>

//       {/* Zoom indicator */}
//       {zoom > 1 && (
//         <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white/10 rounded-full text-white text-xs font-mono">
//           {Math.round(zoom * 100)}%
//         </div>
//       )}

//       {/* Reset zoom button */}
//       {zoom > 1 && (
//         <button
//           onClick={resetZoom}
//           className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//           aria-label="Reset zoom"
//         >
//           <Maximize2 size={18} />
//         </button>
//       )}

//       {/* Prev / Next arrows */}
//       {images.length > 1 && (
//         <>
//           <button
//             onClick={goPrev}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//             aria-label="Previous image"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={goNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//             aria-label="Next image"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </>
//       )}

//       {/* Main image container */}
//       <div
//         ref={containerRef}
//         className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
//         onDoubleClick={handleDoubleClick}
//         onWheel={handleWheel}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={(e) => { handleSwipeStart(e); handleTouchStart(e); }}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={(e) => { handleSwipeEnd(e); handleTouchEnd(e); }}
//         style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
//       >
//         <img
//           ref={imgRef}
//           src={images[activeIndex]}
//           alt={`Product view ${activeIndex + 1}`}
//           draggable={false}
//           className="max-w-[90vw] max-h-[85vh] object-contain transition-transform duration-100 pointer-events-none"
//           style={{
//             transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
//             transformOrigin: "center center",
//           }}
//         />
//       </div>

//       {/* Thumbnail strip */}
//       {images.length > 1 && (
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
//           {images.map((img, idx) => (
//             <button
//               key={idx}
//               onClick={() => { resetZoom(); setActiveIndex(idx); }}
//               className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
//                 activeIndex === idx ? "border-[#C9A24D] scale-110" : "border-white/20 opacity-60 hover:opacity-100"
//               }`}
//               aria-label={`View image ${idx + 1}`}
//             >
//               <img src={img} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Hint text (shown once) */}
//       <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/30 text-xs whitespace-nowrap pointer-events-none">
//         Double-tap to zoom · Scroll to zoom · Drag to pan · Swipe to navigate
//       </p>
//     </div>
//   );
// }

// // ─── Main Product Detail Page ──────────────────────────────────────────────────
// export default function ProductDetailPage() {
//   const params = useParams();
//   const { t, ready, i18n } = useTranslation("common");
//   const { isRTL, currentLanguage } = useLanguage();
//   const [mounted, setMounted] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   // Lightbox state
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxIndex, setLightboxIndex] = useState(0);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Force re-render when language changes
//   useEffect(() => {
//     if (mounted && ready) {
//       setQuantity((prev) => prev);
//     }
//   }, [currentLanguage, i18n.language, mounted, ready]);

//   const openLightbox = (idx) => {
//     setLightboxIndex(idx);
//     setLightboxOpen(true);
//   };

//   // Product data
//   const product = {
//     id: 1,
//     name: t("productDetail.product.name"),
//     subtitle: t("productDetail.product.subtitle"),
//     brand: t("productDetail.product.brand"),
//     description: t("productDetail.product.description"),
//     price: 899,
//     originalPrice: 1299,
//     rating: 4,
//     reviews: 12,
//     images: [
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//     ],
//     colors: [
//       { name: "Berry Pink", hex: "#C41E3A" },
//       { name: "Rose", hex: "#8B4789" },
//       { name: "Hot Pink", hex: "#FF1493" },
//       { name: "Magenta", hex: "#C71585" },
//       { name: "Deep Pink", hex: "#FF69B4" },
//     ],
//     details: [
//       t("productDetail.product.detail1"),
//       t("productDetail.product.detail2"),
//       t("productDetail.product.detail3"),
//       t("productDetail.product.detail4"),
//       t("productDetail.product.detail5"),
//     ],
//     ingredients: t("productDetail.product.ingredients"),
//     howToUse: t("productDetail.product.howToUse"),
//   };

//   const relatedProducts = [
//     {
//       id: 2,
//       name: t("productDetail.product.related1"),
//       price: 899,
//       originalPrice: 1299,
//       image:
//         "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
//     },
//     {
//       id: 3,
//       name: t("productDetail.product.related2"),
//       price: 2199,
//       originalPrice: 2999,
//       image: "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
//     },
//     {
//       id: 4,
//       name: t("productDetail.product.related3"),
//       price: 899,
//       originalPrice: 1299,
//       image: "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
//     },
//     {
//       id: 5,
//       name: t("productDetail.product.related4"),
//       price: 699,
//       originalPrice: 999,
//       image: "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
//     },
//   ];

//   if (!mounted || !ready) {
//     return (
//       <>
//         <Navbar />
//         <ResponsiveLayout>
//           <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//             <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="animate-pulse">
//                 <div className="h-96 bg-gray-800 rounded-lg mb-8" />
//                 <div className="h-8 bg-gray-800 rounded w-1/2 mb-4" />
//                 <div className="h-4 bg-gray-800 rounded w-3/4" />
//               </div>
//             </div>
//           </div>
//         </ResponsiveLayout>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <ResponsiveLayout>
//         <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//             {/* Product Detail Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

//               {/* Left: Image Gallery */}
//               <div className="space-y-4">
//                 {/* Main Image */}
//                 <div className="relative bg-[#1A1A1A] rounded-lg overflow-hidden aspect-square group">
//                   <img
//                     src={product.images[selectedImage]}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />

//                   {/* Zoom / expand overlay on hover */}
//                   <button
//                     onClick={() => openLightbox(selectedImage)}
//                     className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20"
//                     aria-label="Open image in lightbox"
//                   >
//                     <span className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full">
//                       <ZoomIn size={16} />
//                       {/* "Click to zoom" label — graceful fallback if translation key missing */}
//                       Zoom
//                     </span>
//                   </button>

//                   {/* Wishlist */}
//                   <button className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-10">
//                     <Heart size={20} />
//                   </button>

//                   {/* Navigation arrows */}
//                   <button
//                     onClick={() =>
//                       setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))
//                     }
//                     className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-10"
//                     aria-label="Previous image"
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))
//                     }
//                     className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-10"
//                     aria-label="Next image"
//                   >
//                     <ChevronRight size={20} />
//                   </button>

//                   {/* Dot indicators (mobile-friendly) */}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
//                     {product.images.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setSelectedImage(idx)}
//                         className={`rounded-full transition-all ${
//                           selectedImage === idx
//                             ? "w-5 h-2 bg-[#C9A24D]"
//                             : "w-2 h-2 bg-white/40"
//                         }`}
//                         aria-label={`Go to image ${idx + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Thumbnail strip */}
//                 <div className="grid grid-cols-3 gap-4">
//                   {product.images.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setSelectedImage(idx)}
//                       onDoubleClick={() => openLightbox(idx)}
//                       className={`relative aspect-square rounded-lg overflow-hidden border-2 transition group ${
//                         selectedImage === idx ? "border-[#C9A24D]" : "border-[#2A2A2A]"
//                       }`}
//                       aria-label={`Select image ${idx + 1}`}
//                     >
//                       <img
//                         src={img}
//                         alt={`View ${idx + 1}`}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                       />
//                       {/* Zoom icon on thumbnail hover */}
//                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
//                         <ZoomIn size={16} className="text-white" />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Right: Product Info */}
//               <div className="space-y-6">
//                 {/* Brand & Title */}
//                 <div className={isRTL ? "text-right" : "text-left"}>
//                   <p className="text-sm text-gray-400 mb-2">{product.brand}</p>
//                   <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
//                   <p className="text-lg text-gray-300">{product.subtitle}</p>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={18}
//                         className={i < product.rating ? "fill-[#C9A24D] text-[#C9A24D]" : "text-gray-600"}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-400">
//                     ({product.reviews} {t("productDetail.reviews")})
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center gap-4">
//                   <span className="text-3xl font-bold text-[#C9A24D]">₹{product.price}</span>
//                   <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
//                   <span className="px-3 py-1 bg-[#C9A24D] text-black text-sm font-semibold rounded">
//                     {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%{" "}
//                     {t("productDetail.off")}
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className={`text-gray-400 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
//                   {product.description}
//                 </p>

//                 {/* Colors */}
//                 <div className={isRTL ? "text-right" : "text-left"}>
//                   <h3 className="text-lg font-semibold mb-3">{t("productDetail.colors")}</h3>
//                   <div className="flex items-center gap-3">
//                     {product.colors.map((color, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setSelectedColor(idx)}
//                         className={`w-10 h-10 rounded-full border-2 transition ${
//                           selectedColor === idx ? "border-[#C9A24D] scale-110" : "border-[#2A2A2A]"
//                         }`}
//                         style={{ backgroundColor: color.hex }}
//                         title={color.name}
//                         aria-label={color.name}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quantity & Add to Cart */}
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center border border-[#2A2A2A] rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-4 py-2 hover:bg-[#1A1A1A] transition"
//                       aria-label="Decrease quantity"
//                     >
//                       -
//                     </button>
//                     <span className="px-6 py-2 border-x border-[#2A2A2A]">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-4 py-2 hover:bg-[#1A1A1A] transition"
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button className="flex-1 flex items-center justify-center gap-2 bg-[#C9A24D] hover:bg-[#B8934C] text-black py-3 rounded-lg font-semibold transition">
//                     <ShoppingCart size={20} />
//                     {t("productDetail.addToCart")}
//                   </button>
//                 </div>

//                 {/* Product Details */}
//                 <div className="border-t border-[#2A2A2A] pt-6">
//                   <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
//                     {t("productDetail.productDetails")}
//                   </h3>
//                   <ul className="space-y-2">
//                     {product.details.map((detail, idx) => (
//                       <li
//                         key={idx}
//                         className={`flex items-start gap-2 text-gray-400 ${isRTL ? "text-right" : "text-left"}`}
//                       >
//                         <span className="text-[#C9A24D] mt-1">•</span>
//                         <span>{detail}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Ingredients */}
//                 <div className="border-t border-[#2A2A2A] pt-6">
//                   <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
//                     {t("productDetail.ingredients")}
//                   </h3>
//                   <p className={`text-gray-400 text-sm ${isRTL ? "text-right" : "text-left"}`}>
//                     {product.ingredients}
//                   </p>
//                 </div>

//                 {/* How to Use */}
//                 <div className="border-t border-[#2A2A2A] pt-6">
//                   <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
//                     {t("productDetail.howToUse")}
//                   </h3>
//                   <p className={`text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
//                     {product.howToUse}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* You May Also Like */}
//             <div className="border-t border-[#2A2A2A] pt-12">
//               <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${isRTL ? "text-right" : "text-left"}`}>
//                 {t("productDetail.youMayAlsoLike")}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//                 {relatedProducts.map((item) => (
//                   <div
//                     key={item.id}
//                     className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(201,162,77,0.15)] transition cursor-pointer"
//                   >
//                     <div className="relative aspect-square bg-[#0D0D0D] group">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <h3
//                         className={`font-semibold text-sm sm:text-base mb-2 line-clamp-2 ${
//                           isRTL ? "text-right" : "text-left"
//                         }`}
//                       >
//                         {item.name}
//                       </h3>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[#C9A24D] font-bold">₹{item.price}</span>
//                         <span className="text-gray-500 text-sm line-through">₹{item.originalPrice}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </ResponsiveLayout>

//       {/* Lightbox — rendered outside main flow to avoid stacking context issues */}
//       {lightboxOpen && (
//         <Lightbox
//           images={product.images}
//           initialIndex={lightboxIndex}
//           onClose={() => setLightboxOpen(false)}
//         />
//       )}
//     </>
//   );
// }
// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useParams } from "next/navigation";
// import {
//   ShoppingCart, Heart, Star, ChevronLeft, ChevronRight,
//   X, Maximize2, Search,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";
// import Navbar from "@/components/Navbar";
// import ResponsiveLayout from "@/components/ResponsiveLayout";
// import Footer from "@/components/Footer";

// // ─── Lightbox Component ────────────────────────────────────────────────────────
// function Lightbox({ images, initialIndex, onClose }) {
//   const [activeIndex, setActiveIndex] = useState(initialIndex);
//   const [zoom, setZoom] = useState(1);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [panStart, setPanStart] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);
//   const lastTouchDist = useRef(null);
//   const swipeStart = useRef(null);

//   const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
//   const goNext = useCallback(() => { resetZoom(); setActiveIndex((p) => (p + 1) % images.length); }, [images.length]);
//   const goPrev = useCallback(() => { resetZoom(); setActiveIndex((p) => (p - 1 + images.length) % images.length); }, [images.length]);

//   useEffect(() => {
//     const h = (e) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowRight") goNext();
//       if (e.key === "ArrowLeft") goPrev();
//     };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [goNext, goPrev, onClose]);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);

//   const handleDoubleClick = (e) => {
//     const rect = containerRef.current.getBoundingClientRect();
//     if (zoom === 1) {
//       const cx = e.clientX - rect.left - rect.width / 2;
//       const cy = e.clientY - rect.top - rect.height / 2;
//       setZoom(2.5); setPan({ x: -cx * 1.5, y: -cy * 1.5 });
//     } else { resetZoom(); }
//   };

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const d = e.deltaY > 0 ? -0.3 : 0.3;
//     setZoom((z) => Math.min(5, Math.max(1, z + d)));
//     if (zoom + d <= 1) setPan({ x: 0, y: 0 });
//   };

//   const handleMouseDown = (e) => {
//     if (zoom <= 1) return;
//     e.preventDefault(); setIsDragging(true);
//     setDragStart({ x: e.clientX, y: e.clientY }); setPanStart({ ...pan });
//   };
//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     setPan({ x: panStart.x + (e.clientX - dragStart.x), y: panStart.y + (e.clientY - dragStart.y) });
//   };
//   const handleMouseUp = () => setIsDragging(false);

//   const getTouchDist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

//   const handleTouchStart = (e) => {
//     if (e.touches.length === 2) { lastTouchDist.current = getTouchDist(e.touches); }
//     else if (e.touches.length === 1 && zoom > 1) {
//       setIsDragging(true);
//       setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY }); setPanStart({ ...pan });
//     }
//     if (zoom <= 1 && e.touches.length === 1) swipeStart.current = e.touches[0].clientX;
//   };
//   const handleTouchMove = (e) => {
//     e.preventDefault();
//     if (e.touches.length === 2 && lastTouchDist.current) {
//       const d = getTouchDist(e.touches);
//       setZoom((z) => Math.min(5, Math.max(1, z * (d / lastTouchDist.current))));
//       lastTouchDist.current = d;
//     } else if (e.touches.length === 1 && isDragging) {
//       setPan({ x: panStart.x + (e.touches[0].clientX - dragStart.x), y: panStart.y + (e.touches[0].clientY - dragStart.y) });
//     }
//   };
//   const handleTouchEnd = (e) => {
//     if (e.touches.length < 2) lastTouchDist.current = null;
//     if (e.touches.length === 0) {
//       setIsDragging(false);
//       if (swipeStart.current !== null && zoom <= 1) {
//         const diff = swipeStart.current - e.changedTouches[0].clientX;
//         if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
//         swipeStart.current = null;
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm" role="dialog" aria-modal="true">
//       <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"><X size={20} /></button>
//       {zoom > 1 && <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white/10 rounded-full text-white text-xs font-mono">{Math.round(zoom * 100)}%</div>}
//       {zoom > 1 && <button onClick={resetZoom} className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"><Maximize2 size={18} /></button>}
//       {images.length > 1 && <>
//         <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"><ChevronLeft size={24} /></button>
//         <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"><ChevronRight size={24} /></button>
//       </>}
//       <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
//         onDoubleClick={handleDoubleClick} onWheel={handleWheel}
//         onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
//         onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
//         style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}>
//         <img src={images[activeIndex]} alt={`Product view ${activeIndex + 1}`} draggable={false}
//           className="max-w-[90vw] max-h-[85vh] object-contain transition-transform duration-100 pointer-events-none"
//           style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }} />
//       </div>
//       {images.length > 1 && (
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
//           {images.map((img, idx) => (
//             <button key={idx} onClick={() => { resetZoom(); setActiveIndex(idx); }}
//               className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${activeIndex === idx ? "border-[#C9A24D] scale-110" : "border-white/20 opacity-60 hover:opacity-100"}`}>
//               <img src={img} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}
//       <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/30 text-xs whitespace-nowrap pointer-events-none">
//         Double-tap to zoom · Scroll to zoom · Drag to pan · Swipe to navigate
//       </p>
//     </div>
//   );
// }

// // ─── Main Product Detail Page ──────────────────────────────────────────────────
// export default function ProductDetailPage() {
//   const params = useParams();
//   const { t, ready, i18n } = useTranslation("common");
//   const { isRTL, currentLanguage } = useLanguage();
//   const [mounted, setMounted] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxIndex, setLightboxIndex] = useState(0);

//   // ── Zoom state ───────────────────────────────────────────────────────────────
//   // isZooming: whether the mouse is over the product image on desktop
//   // zoomBg: background-position values for the preview panel (in px)
//   // lensPos: top-left of the lens square on the image (in px)
//   const [isZooming, setIsZooming] = useState(false);
//   const [zoomBg, setZoomBg] = useState({ x: 0, y: 0 });
//   const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
//   const [lensSizePx, setLensSizePx] = useState({ w: 0, h: 0 });
//   const imgRef = useRef(null);

//   // How much to magnify in the preview panel
//   const ZOOM_FACTOR = 3;

//   useEffect(() => { setMounted(true); }, []);
//   useEffect(() => {
//     if (mounted && ready) setQuantity((p) => p);
//   }, [currentLanguage, i18n.language, mounted, ready]);

//   const openLightbox = (idx) => { setLightboxIndex(idx); setLightboxOpen(true); };

//   // ── Mouse move on the main image ─────────────────────────────────────────────
//   const handleImageMouseMove = useCallback((e) => {
//     const el = imgRef.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();

//     // Lens covers 1/ZOOM_FACTOR of the rendered image dimensions
//     const lensW = rect.width / ZOOM_FACTOR;
//     const lensH = rect.height / ZOOM_FACTOR;

//     // Cursor position relative to image top-left
//     let cx = e.clientX - rect.left;
//     let cy = e.clientY - rect.top;

//     // Clamp so the lens doesn't spill outside the image
//     cx = Math.max(lensW / 2, Math.min(rect.width  - lensW / 2, cx));
//     cy = Math.max(lensH / 2, Math.min(rect.height - lensH / 2, cy));

//     setLensPos({ x: cx - lensW / 2, y: cy - lensH / 2 });
//     setLensSizePx({ w: lensW, h: lensH });

//     // Background-position = -(lensTopLeft * ZOOM_FACTOR)
//     setZoomBg({
//       x: -(cx - lensW / 2) * ZOOM_FACTOR,
//       y: -(cy - lensH / 2) * ZOOM_FACTOR,
//     });
//   }, [ZOOM_FACTOR]);

//   // Product data
//   const product = {
//     id: 1,
//     name: t("productDetail.product.name"),
//     subtitle: t("productDetail.product.subtitle"),
//     brand: t("productDetail.product.brand"),
//     description: t("productDetail.product.description"),
//     price: 899,
//     originalPrice: 1299,
//     rating: 4,
//     reviews: 12,
//     images: [
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//     ],
//     colors: [
//       { name: "Berry Pink", hex: "#C41E3A" },
//       { name: "Rose", hex: "#8B4789" },
//       { name: "Hot Pink", hex: "#FF1493" },
//       { name: "Magenta", hex: "#C71585" },
//       { name: "Deep Pink", hex: "#FF69B4" },
//     ],
//     details: [
//       t("productDetail.product.detail1"),
//       t("productDetail.product.detail2"),
//       t("productDetail.product.detail3"),
//       t("productDetail.product.detail4"),
//       t("productDetail.product.detail5"),
//     ],
//     ingredients: t("productDetail.product.ingredients"),
//     howToUse: t("productDetail.product.howToUse"),
//   };

//   const relatedProducts = [
//     { id: 2, name: t("productDetail.product.related1"), price: 899, originalPrice: 1299, image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg" },
//     { id: 3, name: t("productDetail.product.related2"), price: 2199, originalPrice: 2999, image: "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445" },
//     { id: 4, name: t("productDetail.product.related3"), price: 899, originalPrice: 1299, image: "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572" },
//     { id: 5, name: t("productDetail.product.related4"), price: 699, originalPrice: 999, image: "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg" },
//   ];

//   if (!mounted || !ready) {
//     return (
//       <>
//         <Navbar />
//         <ResponsiveLayout>
//           <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//             <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="animate-pulse">
//                 <div className="h-96 bg-gray-800 rounded-lg mb-8" />
//                 <div className="h-8 bg-gray-800 rounded w-1/2 mb-4" />
//                 <div className="h-4 bg-gray-800 rounded w-3/4" />
//               </div>
//             </div>
//           </div>
//         </ResponsiveLayout>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <ResponsiveLayout>
//         <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//             {/* ── Product Detail Section ─────────────────────────────────────── */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

//               {/* ── LEFT: Image Gallery ──────────────────────────────────────── */}
//               <div className="space-y-4">

//                 {/* Main image */}
//                 <div className="relative bg-[#1A1A1A] rounded-xl overflow-hidden aspect-square select-none">
//                   {/* Actual image element — we attach the ref here for getBoundingClientRect */}
//                   <img
//                     ref={imgRef}
//                     src={product.images[selectedImage]}
//                     alt={product.name}
//                     draggable={false}
//                     className="w-full h-full object-cover"
//                   />

//                   {/* Full-coverage hover capture layer — sits on top of image, below buttons */}
//                   <div
//                     className="absolute inset-0"
//                     style={{ cursor: "crosshair" }}
//                     onMouseEnter={() => setIsZooming(true)}
//                     onMouseLeave={() => setIsZooming(false)}
//                     onMouseMove={handleImageMouseMove}
//                   />

//                   {/* Lens rectangle — tracks cursor, dims the rest of the image */}
//                   {isZooming && lensSizePx.w > 0 && (
//                     <div
//                       className="absolute pointer-events-none rounded border-2 border-[#C9A24D]"
//                       style={{
//                         left: lensPos.x,
//                         top: lensPos.y,
//                         width: lensSizePx.w,
//                         height: lensSizePx.h,
//                         boxShadow: "0 0 0 9999px rgba(0,0,0,0.38)",
//                         background: "rgba(201,162,77,0.06)",
//                       }}
//                     />
//                   )}

//                   {/* "Zoom Preview" hint badge — only when not hovering */}
//                   {!isZooming && (
//                     <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/80 text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none">
//                       <Search size={12} />
//                       Zoom Preview
//                     </div>
//                   )}

//                   {/* Wishlist — stop zoom while over button */}
//                   <button
//                     className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     aria-label="Add to wishlist"
//                     onMouseEnter={() => setIsZooming(false)}
//                   >
//                     <Heart size={20} />
//                   </button>

//                   {/* Prev / Next arrows */}
//                   <button
//                     onClick={() => setSelectedImage((p) => (p > 0 ? p - 1 : product.images.length - 1))}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     onMouseEnter={() => setIsZooming(false)}
//                     aria-label="Previous image"
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button
//                     onClick={() => setSelectedImage((p) => (p < product.images.length - 1 ? p + 1 : 0))}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     onMouseEnter={() => setIsZooming(false)}
//                     aria-label="Next image"
//                   >
//                     <ChevronRight size={20} />
//                   </button>

//                   {/* Dot indicators */}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
//                     {product.images.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setSelectedImage(idx)}
//                         onMouseEnter={() => setIsZooming(false)}
//                         className={`rounded-full transition-all ${selectedImage === idx ? "w-5 h-2 bg-[#C9A24D]" : "w-2 h-2 bg-white/40"}`}
//                         aria-label={`Go to image ${idx + 1}`}
//                       />
//                     ))}
//                   </div>

//                   {/* Fullscreen button */}
//                   <button
//                     onClick={() => openLightbox(selectedImage)}
//                     onMouseEnter={() => setIsZooming(false)}
//                     className="absolute bottom-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     aria-label="Open fullscreen"
//                   >
//                     <Maximize2 size={15} />
//                   </button>
//                 </div>

//                 {/* Thumbnail strip */}
//                 <div className="grid grid-cols-3 gap-4">
//                   {product.images.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => { setSelectedImage(idx); setIsZooming(false); }}
//                       className={`relative aspect-square rounded-lg overflow-hidden border-2 transition group ${
//                         selectedImage === idx ? "border-[#C9A24D]" : "border-[#2A2A2A] hover:border-[#C9A24D]/50"
//                       }`}
//                       aria-label={`Select image ${idx + 1}`}
//                     >
//                       <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* ── RIGHT: Product Info + Zoom Preview overlay ───────────────── */}
//               {/*
//                 Key design:
//                   - This column is `relative` so the zoom preview can be
//                     `absolute inset-0` and fill the entire right column.
//                   - On desktop (lg+): zoom preview is shown as an overlay.
//                   - On mobile / tablet: zoom preview is hidden (`hidden lg:block`).
//               */}
//               <div className="relative min-h-0">

//                 {/* ── ZOOM PREVIEW PANEL ──────────────────────────────────────── */}
//                 {/*
//                   Appears over the product info when user hovers the image.
//                   Uses background-image trick: the same product image is rendered
//                   at ZOOM_FACTOR × size, positioned so the hovered region fills
//                   the entire panel.
//                 */}
//                 {isZooming && (
//                   <div
//                     className="hidden lg:flex absolute inset-0 z-30 rounded-xl overflow-hidden flex-col"
//                     style={{
//                       backgroundImage: `url(${product.images[selectedImage]})`,
//                       backgroundRepeat: "no-repeat",
//                       // Image is rendered at ZOOM_FACTOR × the panel's own size
//                       // Panel fills the right column so we use a large fixed size
//                       backgroundSize: `${100 * ZOOM_FACTOR}% ${100 * ZOOM_FACTOR}%`,
//                       backgroundPosition: `${zoomBg.x}px ${zoomBg.y}px`,
//                     }}
//                   >
//                     {/* "Zoom Preview" label */}
//                     <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
//                       <Search size={12} />
//                       Zoom Preview
//                     </div>

//                     {/* Golden inner border glow */}
//                     <div className="absolute inset-0 rounded-xl ring-2 ring-inset ring-[#C9A24D]/40 pointer-events-none" />
//                   </div>
//                 )}

//                 {/* ── Product info (always in DOM; visually hidden behind overlay) ── */}
//                 <div className="space-y-6">

//                   {/* Brand & Title */}
//                   <div className={isRTL ? "text-right" : "text-left"}>
//                     <p className="text-sm text-gray-400 mb-2">{product.brand}</p>
//                     <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
//                     <p className="text-lg text-gray-300">{product.subtitle}</p>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} size={18} className={i < product.rating ? "fill-[#C9A24D] text-[#C9A24D]" : "text-gray-600"} />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-400">({product.reviews} {t("productDetail.reviews")})</span>
//                   </div>

//                   {/* Price */}
//                   <div className="flex items-center gap-4">
//                     <span className="text-3xl font-bold text-[#C9A24D]">₹{product.price}</span>
//                     <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
//                     <span className="px-3 py-1 bg-[#C9A24D] text-black text-sm font-semibold rounded">
//                       {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% {t("productDetail.off")}
//                     </span>
//                   </div>

//                   {/* Description */}
//                   <p className={`text-gray-400 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
//                     {product.description}
//                   </p>

//                   {/* Colors */}
//                   <div className={isRTL ? "text-right" : "text-left"}>
//                     <h3 className="text-lg font-semibold mb-3">{t("productDetail.colors")}</h3>
//                     <div className="flex items-center gap-3">
//                       {product.colors.map((color, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setSelectedColor(idx)}
//                           className={`w-10 h-10 rounded-full border-2 transition ${selectedColor === idx ? "border-[#C9A24D] scale-110" : "border-[#2A2A2A]"}`}
//                           style={{ backgroundColor: color.hex }}
//                           title={color.name}
//                           aria-label={color.name}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   {/* Quantity & Add to Cart */}
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center border border-[#2A2A2A] rounded-lg">
//                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-[#1A1A1A] transition" aria-label="Decrease quantity">-</button>
//                       <span className="px-6 py-2 border-x border-[#2A2A2A]">{quantity}</span>
//                       <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-[#1A1A1A] transition" aria-label="Increase quantity">+</button>
//                     </div>
//                     <button className="flex-1 flex items-center justify-center gap-2 bg-[#C9A24D] hover:bg-[#B8934C] text-black py-3 rounded-lg font-semibold transition">
//                       <ShoppingCart size={20} />
//                       {t("productDetail.addToCart")}
//                     </button>
//                   </div>

//                   {/* Product Details */}
//                   <div className="border-t border-[#2A2A2A] pt-6">
//                     <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>{t("productDetail.productDetails")}</h3>
//                     <ul className="space-y-2">
//                       {product.details.map((detail, idx) => (
//                         <li key={idx} className={`flex items-start gap-2 text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
//                           <span className="text-[#C9A24D] mt-1">•</span>
//                           <span>{detail}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Ingredients */}
//                   <div className="border-t border-[#2A2A2A] pt-6">
//                     <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>{t("productDetail.ingredients")}</h3>
//                     <p className={`text-gray-400 text-sm ${isRTL ? "text-right" : "text-left"}`}>{product.ingredients}</p>
//                   </div>

//                   {/* How to Use */}
//                   <div className="border-t border-[#2A2A2A] pt-6">
//                     <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>{t("productDetail.howToUse")}</h3>
//                     <p className={`text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>{product.howToUse}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ── You May Also Like ────────────────────────────────────────────── */}
//             <div className="border-t border-[#2A2A2A] pt-12">
//               <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${isRTL ? "text-right" : "text-left"}`}>
//                 {t("productDetail.youMayAlsoLike")}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//                 {relatedProducts.map((item) => (
//                   <div key={item.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(201,162,77,0.15)] transition cursor-pointer">
//                     <div className="relative aspect-square bg-[#0D0D0D] group">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                     </div>
//                     <div className="p-4">
//                       <h3 className={`font-semibold text-sm sm:text-base mb-2 line-clamp-2 ${isRTL ? "text-right" : "text-left"}`}>{item.name}</h3>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[#C9A24D] font-bold">₹{item.price}</span>
//                         <span className="text-gray-500 text-sm line-through">₹{item.originalPrice}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//         <Footer />
//       </ResponsiveLayout>

//       {/* Lightbox */}
//       {lightboxOpen && (
//         <Lightbox images={product.images} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
//       )}
//     </>
//   );
// }

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Search,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import Navbar from "@/components/Navbar";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import Footer from "@/components/Footer";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchDist = useRef<number | null>(null);
  const swipeStart = useRef<number | null>(null);

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const goNext = useCallback(() => {
    resetZoom();
    setActiveIndex((p) => (p + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    resetZoom();
    setActiveIndex((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (zoom === 1) {
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      setZoom(2.5);
      setPan({ x: -cx * 1.5, y: -cy * 1.5 });
    } else {
      resetZoom();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const d = e.deltaY > 0 ? -0.3 : 0.3;
    setZoom((z) => Math.min(5, Math.max(1, z + d)));
    if (zoom + d <= 1) setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setPanStart({ ...pan });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: panStart.x + (e.clientX - dragStart.x),
      y: panStart.y + (e.clientY - dragStart.y),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const getTouchDist = (t: React.TouchList) =>
    Math.hypot(
      t[0].clientX - t[1].clientX,
      t[0].clientY - t[1].clientY
    );

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastTouchDist.current = getTouchDist(e.touches);
    } else if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setPanStart({ ...pan });
    }
    if (zoom <= 1 && e.touches.length === 1)
      swipeStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && lastTouchDist.current) {
      const d = getTouchDist(e.touches);
      setZoom((z) =>
        Math.min(5, Math.max(1, z * (d / lastTouchDist.current!)))
      );
      lastTouchDist.current = d;
    } else if (e.touches.length === 1 && isDragging) {
      setPan({
        x: panStart.x + (e.touches[0].clientX - dragStart.x),
        y: panStart.y + (e.touches[0].clientY - dragStart.y),
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) lastTouchDist.current = null;
    if (e.touches.length === 0) {
      setIsDragging(false);
      if (swipeStart.current !== null && zoom <= 1) {
        const diff = swipeStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
        swipeStart.current = null;
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
      >
        <X size={20} />
      </button>

      {zoom > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white/10 rounded-full text-white text-xs font-mono">
          {Math.round(zoom * 100)}%
        </div>
      )}

      {zoom > 1 && (
        <button
          onClick={resetZoom}
          className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
        >
          <Maximize2 size={18} />
        </button>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
        }}
      >
        <img
          src={images[activeIndex]}
          alt={`Product view ${activeIndex + 1}`}
          draggable={false}
          className="max-w-[90vw] max-h-[85vh] object-contain transition-transform duration-100 pointer-events-none"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${
              pan.y / zoom
            }px)`,
          }}
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                resetZoom();
                setActiveIndex(idx);
              }}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                activeIndex === idx
                  ? "border-[#C9A24D] scale-110"
                  : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/30 text-xs whitespace-nowrap pointer-events-none">
        Double-tap to zoom · Scroll to zoom · Drag to pan · Swipe to navigate
      </p>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const { t, ready, i18n } = useTranslation("common");
  const { isRTL, currentLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [isZooming, setIsZooming] = useState(false);
  const [zoomBg, setZoomBg] = useState({ x: 0, y: 0 });
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [lensSizePx, setLensSizePx] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const ZOOM_FACTOR = 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && ready) setQuantity((p) => p);
  }, [currentLanguage, i18n.language, mounted, ready]);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const lensW = rect.width / ZOOM_FACTOR;
      const lensH = rect.height / ZOOM_FACTOR;
      let cx = e.clientX - rect.left;
      let cy = e.clientY - rect.top;
      cx = Math.max(lensW / 2, Math.min(rect.width - lensW / 2, cx));
      cy = Math.max(lensH / 2, Math.min(rect.height - lensH / 2, cy));
      setLensPos({ x: cx - lensW / 2, y: cy - lensH / 2 });
      setLensSizePx({ w: lensW, h: lensH });
      setZoomBg({
        x: -(cx - lensW / 2) * ZOOM_FACTOR,
        y: -(cy - lensH / 2) * ZOOM_FACTOR,
      });
    },
    [ZOOM_FACTOR]
  );

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
      image:
        "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
    },
    {
      id: 3,
      name: t("productDetail.product.related2"),
      price: 2199,
      originalPrice: 2999,
      image:
        "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
    },
    {
      id: 4,
      name: t("productDetail.product.related3"),
      price: 899,
      originalPrice: 1299,
      image:
        "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
    },
    {
      id: 5,
      name: t("productDetail.product.related4"),
      price: 699,
      originalPrice: 999,
      image:
        "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
              <div className="space-y-4">
                <div className="relative bg-[#1A1A1A] rounded-xl overflow-hidden aspect-square select-none">
                  <img
                    ref={imgRef}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    draggable={false}
                    className="w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0"
                    style={{ cursor: "crosshair" }}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onMouseMove={handleImageMouseMove}
                  />

                  {isZooming && lensSizePx.w > 0 && (
                    <div
                      className="absolute pointer-events-none rounded border-2 border-[#C9A24D]"
                      style={{
                        left: lensPos.x,
                        top: lensPos.y,
                        width: lensSizePx.w,
                        height: lensSizePx.h,
                        boxShadow: "0 0 0 9999px rgba(0,0,0,0.38)",
                        background: "rgba(201,162,77,0.06)",
                      }}
                    />
                  )}

                  {!isZooming && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/80 text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none">
                      <Search size={12} />
                      Zoom Preview
                    </div>
                  )}

                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
                    aria-label="Add to wishlist"
                    onMouseEnter={() => setIsZooming(false)}
                  >
                    <Heart size={20} />
                  </button>

                  <button
                    onClick={() =>
                      setSelectedImage((p) =>
                        p > 0 ? p - 1 : product.images.length - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
                    onMouseEnter={() => setIsZooming(false)}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((p) =>
                        p < product.images.length - 1 ? p + 1 : 0
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
                    onMouseEnter={() => setIsZooming(false)}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        onMouseEnter={() => setIsZooming(false)}
                        className={`rounded-full transition-all ${
                          selectedImage === idx
                            ? "w-5 h-2 bg-[#C9A24D]"
                            : "w-2 h-2 bg-white/40"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => openLightbox(selectedImage)}
                    onMouseEnter={() => setIsZooming(false)}
                    className="absolute bottom-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
                    aria-label="Open fullscreen"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImage(idx);
                        setIsZooming(false);
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition group ${
                        selectedImage === idx
                          ? "border-[#C9A24D]"
                          : "border-[#2A2A2A] hover:border-[#C9A24D]/50"
                      }`}
                      aria-label={`Select image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative min-h-0">
                {isZooming && (
                  <div
                    className="hidden lg:flex absolute inset-0 z-30 rounded-xl overflow-hidden flex-col"
                    style={{
                      backgroundImage: `url(${product.images[selectedImage]})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: `${100 * ZOOM_FACTOR}% ${
                        100 * ZOOM_FACTOR
                      }%`,
                      backgroundPosition: `${zoomBg.x}px ${zoomBg.y}px`,
                    }}
                  >
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Search size={12} />
                      Zoom Preview
                    </div>
                    <div className="absolute inset-0 rounded-xl ring-2 ring-inset ring-[#C9A24D]/40 pointer-events-none" />
                  </div>
                )}

                <div className="space-y-6">
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <p className="text-sm text-gray-400 mb-2">
                      {product.brand}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                      {product.name}
                    </h1>
                    <p className="text-lg text-gray-300">{product.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < product.rating
                              ? "fill-[#C9A24D] text-[#C9A24D]"
                              : "text-gray-600"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      ({product.reviews} {t("productDetail.reviews")})
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-[#C9A24D]">
                      ₹{product.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="px-3 py-1 bg-[#C9A24D] text-black text-sm font-semibold rounded">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % {t("productDetail.off")}
                    </span>
                  </div>

                  <p
                    className={`text-gray-400 leading-relaxed ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {product.description}
                  </p>

                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className="text-lg font-semibold mb-3">
                      {t("productDetail.colors")}
                    </h3>
                    <div className="flex items-center gap-3">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(idx)}
                          className={`w-10 h-10 rounded-full border-2 transition ${
                            selectedColor === idx
                              ? "border-[#C9A24D] scale-110"
                              : "border-[#2A2A2A]"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#2A2A2A] rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-[#1A1A1A] transition"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 border-x border-[#2A2A2A]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-[#1A1A1A] transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#C9A24D] hover:bg-[#B8934C] text-black py-3 rounded-lg font-semibold transition">
                      <ShoppingCart size={20} />
                      {t("productDetail.addToCart")}
                    </button>
                  </div>

                  <div className="border-t border-[#2A2A2A] pt-6">
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {t("productDetail.productDetails")}
                    </h3>
                    <ul className="space-y-2">
                      {product.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 text-gray-400 ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          <span className="text-[#C9A24D] mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#2A2A2A] pt-6">
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {t("productDetail.ingredients")}
                    </h3>
                    <p
                      className={`text-gray-400 text-sm ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {product.ingredients}
                    </p>
                  </div>

                  <div className="border-t border-[#2A2A2A] pt-6">
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {t("productDetail.howToUse")}
                    </h3>
                    <p
                      className={`text-gray-400 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {product.howToUse}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#2A2A2A] pt-12">
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-8 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("productDetail.youMayAlsoLike")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(201,162,77,0.15)] transition cursor-pointer"
                  >
                    <div className="relative aspect-square bg-[#0D0D0D] group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className={`font-semibold text-sm sm:text-base mb-2 line-clamp-2 ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[#C9A24D] font-bold">
                          ₹{item.price}
                        </span>
                        <span className="text-gray-500 text-sm line-through">
                          ₹{item.originalPrice}
                        </span>
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

      {lightboxOpen && (
        <Lightbox
          images={product.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

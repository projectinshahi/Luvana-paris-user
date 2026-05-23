
// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useParams } from "next/navigation";
// import {
//   ShoppingCart,
//   Heart,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Maximize2,
//   Search,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";


// interface LightboxProps {
//   images: string[];
//   initialIndex: number;
//   onClose: () => void;
// }

// function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
//   const [activeIndex, setActiveIndex] = useState(initialIndex);
//   const [zoom, setZoom] = useState(1);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [panStart, setPanStart] = useState({ x: 0, y: 0 });
//   const containerRef = useRef<HTMLDivElement>(null);
//   const lastTouchDist = useRef<number | null>(null);
//   const swipeStart = useRef<number | null>(null);

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

//   useEffect(() => {
//     const h = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowRight") goNext();
//       if (e.key === "ArrowLeft") goPrev();
//     };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [goNext, goPrev, onClose]);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   const handleDoubleClick = (e: React.MouseEvent) => {
//     if (!containerRef.current) return;
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

//   const handleWheel = (e: React.WheelEvent) => {
//     e.preventDefault();
//     const d = e.deltaY > 0 ? -0.3 : 0.3;
//     setZoom((z) => Math.min(5, Math.max(1, z + d)));
//     if (zoom + d <= 1) setPan({ x: 0, y: 0 });
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (zoom <= 1) return;
//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart({ x: e.clientX, y: e.clientY });
//     setPanStart({ ...pan });
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;
//     setPan({
//       x: panStart.x + (e.clientX - dragStart.x),
//       y: panStart.y + (e.clientY - dragStart.y),
//     });
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   const getTouchDist = (t: React.TouchList) =>
//     Math.hypot(
//       t[0].clientX - t[1].clientX,
//       t[0].clientY - t[1].clientY
//     );

//   const handleTouchStart = (e: React.TouchEvent) => {
//     if (e.touches.length === 2) {
//       lastTouchDist.current = getTouchDist(e.touches);
//     } else if (e.touches.length === 1 && zoom > 1) {
//       setIsDragging(true);
//       setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
//       setPanStart({ ...pan });
//     }
//     if (zoom <= 1 && e.touches.length === 1)
//       swipeStart.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     e.preventDefault();
//     if (e.touches.length === 2 && lastTouchDist.current) {
//       const d = getTouchDist(e.touches);
//       setZoom((z) =>
//         Math.min(5, Math.max(1, z * (d / lastTouchDist.current!)))
//       );
//       lastTouchDist.current = d;
//     } else if (e.touches.length === 1 && isDragging) {
//       setPan({
//         x: panStart.x + (e.touches[0].clientX - dragStart.x),
//         y: panStart.y + (e.touches[0].clientY - dragStart.y),
//       });
//     }
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
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
//     <div
//       className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-sm"
//       role="dialog"
//       aria-modal="true"
//     >
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//       >
//         <X size={20} />
//       </button>

//       {zoom > 1 && (
//         <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white/10 rounded-full text-white text-xs font-mono">
//           {Math.round(zoom * 100)}%
//         </div>
//       )}

//       {zoom > 1 && (
//         <button
//           onClick={resetZoom}
//           className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//         >
//           <Maximize2 size={18} />
//         </button>
//       )}

//       {images.length > 1 && (
//         <>
//           <button
//             onClick={goPrev}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={goNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A24D] transition text-white"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </>
//       )}

//       <div
//         ref={containerRef}
//         className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
//         onDoubleClick={handleDoubleClick}
//         onWheel={handleWheel}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//         style={{
//           cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
//         }}
//       >
//         <img
//           src={images[activeIndex]}
//           alt={`Product view ${activeIndex + 1}`}
//           draggable={false}
//           className="max-w-[90vw] max-h-[85vh] object-contain transition-transform duration-100 pointer-events-none"
//           style={{
//             transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${
//               pan.y / zoom
//             }px)`,
//           }}
//         />
//       </div>

//       {images.length > 1 && (
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
//           {images.map((img, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 resetZoom();
//                 setActiveIndex(idx);
//               }}
//               className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
//                 activeIndex === idx
//                   ? "border-[#C9A24D] scale-110"
//                   : "border-white/20 opacity-60 hover:opacity-100"
//               }`}
//             >
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

//   const [isZooming, setIsZooming] = useState(false);
//   const [zoomBg, setZoomBg] = useState({ x: 0, y: 0 });
//   const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
//   const [lensSizePx, setLensSizePx] = useState({ w: 0, h: 0 });
//   const imgRef = useRef<HTMLImageElement>(null);

//   const ZOOM_FACTOR = 3;

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (mounted && ready) setQuantity((p) => p);
//   }, [currentLanguage, i18n.language, mounted, ready]);

//   const openLightbox = (idx: number) => {
//     setLightboxIndex(idx);
//     setLightboxOpen(true);
//   };


// const handleImageMouseMove = useCallback(
//   (e: React.MouseEvent) => {
//     const el = imgRef.current;
//     if (!el) return;

//     const rect = el.getBoundingClientRect();

//     const cx = e.clientX - rect.left;
//     const cy = e.clientY - rect.top;

//     const percentX = (cx / rect.width) * 100;
//     const percentY = (cy / rect.height) * 100;

//     setZoomBg({
//       x: percentX,
//       y: percentY,
//     });
//   },
//   []
// );

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
//       image:
//         "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
//     },
//     {
//       id: 4,
//       name: t("productDetail.product.related3"),
//       price: 899,
//       originalPrice: 1299,
//       image:
//         "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
//     },
//     {
//       id: 5,
//       name: t("productDetail.product.related4"),
//       price: 699,
//       originalPrice: 999,
//       image:
//         "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
//     },
//   ];

//   if (!mounted || !ready) {
//     return (
//       <>
        
//           <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//             <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="animate-pulse">
//                 <div className="h-96 bg-gray-800 rounded-lg mb-8" />
//                 <div className="h-8 bg-gray-800 rounded w-1/2 mb-4" />
//                 <div className="h-4 bg-gray-800 rounded w-3/4" />
//               </div>
//             </div>
//           </div>
      
//       </>
//     );
//   }

//   return (
//     <>
     
//         <div className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//               <div className="space-y-4">
//                 <div className="relative bg-[#1A1A1A] rounded-xl overflow-hidden aspect-square select-none">
//                   <img
//                     ref={imgRef}
//                     src={product.images[selectedImage]}
//                     alt={product.name}
//                     draggable={false}
//                     className="w-full h-full object-cover"
//                   />

//                   <div
//                     className="absolute inset-0"
//                     style={{ cursor: "crosshair" }}
//                     onMouseEnter={() => setIsZooming(true)}
//                     onMouseLeave={() => setIsZooming(false)}
//                     onMouseMove={handleImageMouseMove}
//                   />

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

//                   {!isZooming && (
//                     <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/80 text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none">
//                       <Search size={12} />
//                       Zoom Preview
//                     </div>
//                   )}

//                   <button
//                     className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     aria-label="Add to wishlist"
//                     onMouseEnter={() => setIsZooming(false)}
//                   >
//                     <Heart size={20} />
//                   </button>

//                   <button
//                     onClick={() =>
//                       setSelectedImage((p) =>
//                         p > 0 ? p - 1 : product.images.length - 1
//                       )
//                     }
//                     className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     onMouseEnter={() => setIsZooming(false)}
//                     aria-label="Previous image"
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setSelectedImage((p) =>
//                         p < product.images.length - 1 ? p + 1 : 0
//                       )
//                     }
//                     className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     onMouseEnter={() => setIsZooming(false)}
//                     aria-label="Next image"
//                   >
//                     <ChevronRight size={20} />
//                   </button>

//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
//                     {product.images.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setSelectedImage(idx)}
//                         onMouseEnter={() => setIsZooming(false)}
//                         className={`rounded-full transition-all ${
//                           selectedImage === idx
//                             ? "w-5 h-2 bg-[#C9A24D]"
//                             : "w-2 h-2 bg-white/40"
//                         }`}
//                         aria-label={`Go to image ${idx + 1}`}
//                       />
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => openLightbox(selectedImage)}
//                     onMouseEnter={() => setIsZooming(false)}
//                     className="absolute bottom-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A24D] transition z-20"
//                     aria-label="Open fullscreen"
//                   >
//                     <Maximize2 size={15} />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   {product.images.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         setSelectedImage(idx);
//                         setIsZooming(false);
//                       }}
//                       className={`relative aspect-square rounded-lg overflow-hidden border-2 transition group ${
//                         selectedImage === idx
//                           ? "border-[#C9A24D]"
//                           : "border-[#2A2A2A] hover:border-[#C9A24D]/50"
//                       }`}
//                       aria-label={`Select image ${idx + 1}`}
//                     >
//                       <img
//                         src={img}
//                         alt={`View ${idx + 1}`}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

     
// <div className="relative min-h-125">

//   {isZooming && (
//     <div
//       className="hidden lg:flex sticky top-32 
//       w-105 h-105  bg-center
//       z-30 rounded-xl overflow-hidden flex-col shadow-2xl"
//       style={{
//         backgroundImage: `url(${product.images[selectedImage]})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: `${ZOOM_FACTOR * 100}%`,
//         backgroundPosition: `${zoomBg.x}% ${zoomBg.y}%`,
//       }}
//     >
//       <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
//         <Search size={12} />
//         Zoom Preview
//       </div>

//       <div className="absolute inset-0 rounded-xl ring-2 ring-inset ring-[#C9A24D]/40 pointer-events-none" />
//     </div>
//   )}

//     {/* <div className="space-y-6"> */}
//     <div className="space-y-6 w-full">

//                   <div className={isRTL ? "text-right" : "text-left"}>
//                     {/* <p className="text-sm text-gray-400 mb-2"> */}
//                     {/* <p className="text-sm text-gray-400 mb-2 break-words w-full">

//                       {product.brand}
//                     </p> */}
//                     <h1 className="text-3xl sm:text-4xl font-bold mb-2">
//                       {product.name}
//                     </h1>
//                     <p className="text-lg text-gray-300">{product.subtitle}</p>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={18}
//                           className={
//                             i < product.rating
//                               ? "fill-[#C9A24D] text-[#C9A24D]"
//                               : "text-gray-600"
//                           }
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-400">
//                       ({product.reviews} {t("productDetail.reviews")})
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <span className="text-3xl font-bold text-[#C9A24D]">
//                       ₹{product.price}
//                     </span>
//                     <span className="text-xl text-gray-500 line-through">
//                       ₹{product.originalPrice}
//                     </span>
//                     <span className="px-3 py-1 bg-[#C9A24D] text-black text-sm font-semibold rounded">
//                       {Math.round(
//                         ((product.originalPrice - product.price) /
//                           product.originalPrice) *
//                           100
//                       )}
//                       % {t("productDetail.off")}
//                     </span>
//                   </div>

//                   <p
//                     className={`text-gray-400 leading-relaxed ${
//                       isRTL ? "text-right" : "text-left"
//                     }`}
//                   >
//                     {product.description}
//                   </p>

//                   <div className={isRTL ? "text-right" : "text-left"}>
//                     <h3 className="text-lg font-semibold mb-3">
//                       {t("productDetail.colors")}
//                     </h3>
//                     <div className="flex items-center gap-3">
//                       {product.colors.map((color, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setSelectedColor(idx)}
//                           className={`w-10 h-10 rounded-full border-2 transition ${
//                             selectedColor === idx
//                               ? "border-[#C9A24D] scale-110"
//                               : "border-[#2A2A2A]"
//                           }`}
//                           style={{ backgroundColor: color.hex }}
//                           title={color.name}
//                           aria-label={color.name}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center border border-[#2A2A2A] rounded-lg">
//                       <button
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="px-4 py-2 hover:bg-[#1A1A1A] transition"
//                         aria-label="Decrease quantity"
//                       >
//                         -
//                       </button>
//                       <span className="px-6 py-2 border-x border-[#2A2A2A]">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         className="px-4 py-2 hover:bg-[#1A1A1A] transition"
//                         aria-label="Increase quantity"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button className="flex-1 flex items-center justify-center gap-2 bg-[#C9A24D] hover:bg-[#B8934C] text-black py-3 rounded-lg font-semibold transition">
//                       <ShoppingCart size={20} />
//                       {t("productDetail.addToCart")}
//                     </button>
//                   </div>

//                   <div className="border-t border-[#2A2A2A] pt-6">
//                     <h3
//                       className={`text-lg font-semibold mb-3 ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {t("productDetail.productDetails")}
//                     </h3>
//                     <ul className="space-y-2">
//                       {product.details.map((detail, idx) => (
//                         <li
//                           key={idx}
//                           className={`flex items-start gap-2 text-gray-400 ${
//                             isRTL ? "text-right" : "text-left"
//                           }`}
//                         >
//                           <span className="text-[#C9A24D] mt-1">•</span>
//                           <span>{detail}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="border-t border-[#2A2A2A] pt-6">
//                     <h3
//                       className={`text-lg font-semibold mb-3 ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {t("productDetail.ingredients")}
//                     </h3>
//                     <p
//                       className={`text-gray-400 text-sm ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {product.ingredients}
//                     </p>
//                   </div>

//                   <div className="border-t border-[#2A2A2A] pt-6">
//                     <h3
//                       className={`text-lg font-semibold mb-3 ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {t("productDetail.howToUse")}
//                     </h3>
//                     <p
//                       className={`text-gray-400 ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {product.howToUse}
//                     </p>
//                   </div>
//                 </div>
//   </div>

// </div>

//             <div className="border-t border-[#2A2A2A] pt-12">
//               <h2
//                 className={`text-2xl sm:text-3xl font-bold mb-8 ${
//                   isRTL ? "text-right" : "text-left"
//                 }`}
//               >
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
//                         <span className="text-[#C9A24D] font-bold">
//                           ₹{item.price}
//                         </span>
//                         <span className="text-gray-500 text-sm line-through">
//                           ₹{item.originalPrice}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
      
      

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

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Search,
} from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toast } from "react-toastify";

// ================= LIGHTBOX COMPONENT =================
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStart.current = e.touches[0].clientX;
    if (e.touches.length === 2) {
      lastTouchDist.current = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist.current) {
      const dist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      const delta = (dist - lastTouchDist.current) / 100;
      setZoom((z) => Math.min(5, Math.max(1, z + delta)));
      lastTouchDist.current = dist;
    }
  };

  const handleTouchEnd = () => {
    if (swipeStart.current !== null) {
      const diff = swipeStart.current - (lastTouchDist.current || swipeStart.current);
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
      swipeStart.current = null;
    }
    lastTouchDist.current = null;
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full z-50 transition"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-50 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-50 transition"
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
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
          ))}        </div>
      )}

      <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/30 text-xs whitespace-nowrap pointer-events-none">
        Double-tap to zoom · Scroll to zoom · Drag to pan · Swipe to navigate
      </p>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const { currentLanguage, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();

  const productId = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const [isZooming, setIsZooming] = useState(false);
const [zoomBg, setZoomBg] = useState({ x: 0, y: 0 });
const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
const [lensSizePx, setLensSizePx] = useState({ w: 0, h: 0 });

const ZOOM_FACTOR = 3;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const imgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();

// const handleAddToCart = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Please login first");
//       router.push("/login");
//       return;
//     }

//     const API_URL =
//       process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//     const res = await fetch(`${API_URL}/user/cart`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         variant: product.variants[selectedVariant]._id,
//         quantity: quantity,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to add to cart");
//     }

//     toast.success("Product added to cart!");
//   } catch (error: any) {
//     console.error("Add to cart error:", error);
//     toast.error(error.message || "Something went wrong");
//   }
// };
const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    // If user is NOT logged in
    if (!token) {
      toast.info(" Please login for add to cart");
      return; 
    }

    const API_URL =
      process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_URL}/user/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        variant: product.variants[selectedVariant]._id,
        quantity: quantity,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add to cart");
    }

    toast.success("Product added to cart!");
  } catch (error: any) {
    console.error("Add to cart error:", error);
    toast.error(error.message || "Something went wrong");
  }
};
  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

const handleImageMouseMove = useCallback(
  (e: React.MouseEvent) => {
    const el = imgRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const percentX = (cx / rect.width) * 100;
    const percentY = (cy / rect.height) * 100;

    setZoomBg({
      x: percentX,
      y: percentY,
    });
  },
  []
);
  // ================= FETCH PRODUCT =================
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${API_URL}/user/product/${productId}`
        );

        const data = await res.json();

        setProduct(data.product);
        setSimilarProducts(data.similarProducts || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Reset selected image when variant changes
  useEffect(() => {
    setSelectedImage(0);
    // console.log("Variant changed to:", selectedVariant);
    // console.log("Variant data:", product?.variants?.[selectedVariant]);
  }, [selectedVariant, product]);

  // Log product images when they change
  useEffect(() => {
    if (product) {
      const variantData = product.variants?.[selectedVariant];
      // console.log("Current variant images:", {
      //   variantIndex: selectedVariant,
      //   variantName: variantData?.nameEnglish || variantData?.nameArabic,
      //   englishImages: variantData?.imageUrlEnglish,
      //   arabicImages: variantData?.imageUrlArabic,
      //   currentLanguage,
      // });
    }
  }, [selectedVariant, product, currentLanguage]);

  if (loading || !product) {
    return (
      <div className="pt-20 min-h-screen bg-[#0D0D0D] text-white flex justify-center items-center">
        Loading Product...
      </div>
    );
  }

  // ================= LANGUAGE BASED DATA =================

  const productName =
    currentLanguage === "ar"
      ? product.nameArabic
      : product.nameEnglish;

  const brandName =
    currentLanguage === "ar"
      ? product.brand?.nameArabic
      : product.brand?.nameEnglish;

  const shortDescription =
    currentLanguage === "ar"
      ? product.shortDescriptionArabic
      : product.shortDescriptionEnglish;

  const selectedVariantData = product.variants?.[selectedVariant];

  // Get images based on selected variant or fallback to product images
  const productImages = (() => {
    if (selectedVariantData) {
      const variantImages =
        currentLanguage === "ar"
          ? selectedVariantData.imageUrlArabic?.map((img: any) => img.imageUrl)
          : selectedVariantData.imageUrlEnglish?.map((img: any) => img.imageUrl);
      
      // If variant has images, use them; otherwise fallback to product images
      if (variantImages && variantImages.length > 0) {
        return variantImages;
      }
    }
    
    // Fallback to product images
    return currentLanguage === "ar"
      ? product.imageUrlArabic?.map((img: any) => img.imageUrl)
      : product.imageUrlEnglish?.map((img: any) => img.imageUrl);
  })();

  // ================= UI =================

  return (
    <div dir="ltr" className="pt-20 pb-16 min-h-screen bg-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= MAIN SECTION ================= */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 relative">
          {/* ================= IMAGES ================= */}
          <div className="relative">
        
<div className="relative bg-[#1A1A1A] rounded-xl overflow-visible aspect-square select-none group">

  <img
    key={`${selectedVariant}-${selectedImage}`}
    ref={imgRef}
    src={productImages?.[selectedImage]}
    alt={productName}
    className="w-full h-full object-cover"
    onError={(e) => {
      console.error("Image failed to load:", productImages?.[selectedImage]);
      e.currentTarget.src = "/placeholder.png";
    }}
  />

{/* Hover Layer */}
<div
  className="absolute inset-0"
  style={{ cursor: "crosshair" }}
  onMouseEnter={() => setIsZooming(true)}
  onMouseLeave={() => setIsZooming(false)}
  onMouseMove={handleImageMouseMove}
/>


{/* Zoom Preview Label */}
{/* {!isZooming && (
  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/80 text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none">
    <Search size={12} />
    Zoom Preview
  </div>
)} */}

{/* {isZooming && (
    <div 
      className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full ml-100 h-100 rounded-lg overflow-hidden shadow-2xl z-40 border-2 border-[#C9A24D]/50"
      style={{
        backgroundImage: `url(${productImages?.[selectedImage]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${ZOOM_FACTOR * 100}%`,
        backgroundPosition: `${zoomBg.x}% ${zoomBg.y}%`,
      }}
    >
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-[#C9A24D]/30 pointer-events-none" />
    </div>
  )} */}
  {isZooming && (
  <div 
    className="absolute top-1/2 -translate-y-1/2 left-full ml-8 
    w-105 h-105 
    bg-center rounded-lg overflow-hidden shadow-2xl z-9999 border-2 border-[#C9A24D]/50"
    style={{
      backgroundImage: `url(${productImages?.[selectedImage]})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${ZOOM_FACTOR * 100}%`,
      backgroundPosition: `${zoomBg.x}% ${zoomBg.y}%`,
    }}
  >
    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-[#C9A24D]/30 pointer-events-none" />
  </div>
)}
  {/* LEFT CHEVRON */}
  <button
    onClick={() =>
      setSelectedImage((prev) =>
        prev > 0 ? prev - 1 : productImages.length - 1
      )
    }
    className="absolute left-4 top-1/2 -translate-y-1/2 
    bg-black/60 hover:bg-[#C9A24D] 
    w-10 h-10 rounded-full flex items-center justify-center 
    transition z-30"
  >
    <ChevronLeft size={20} />
  </button>

  {/* RIGHT CHEVRON */}
  <button
    onClick={() =>
      setSelectedImage((prev) =>
        prev < productImages.length - 1 ? prev + 1 : 0)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 
    bg-black/60 hover:bg-[#C9A24D] 
    w-10 h-10 rounded-full flex items-center justify-center 
    transition z-30"
  >
    <ChevronRight size={20} />
  </button>

  {/* Maximize */}
  {/* <button
    onClick={() => openLightbox(selectedImage)}
    className="absolute top-4 right-4 
    bg-black/60 hover:bg-[#C9A24D] 
    p-2.5 rounded-full transition z-30"
  >
    <Maximize2 size={18} />
  </button> */}

</div>


            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {productImages?.map((img: string, idx: number) => (
                <button
                  key={`${selectedVariant}-thumb-${idx}`}
                  onClick={() => setSelectedImage(idx)}
                  onDoubleClick={() => openLightbox(idx)}
                  className={`rounded-lg overflow-hidden border-2 transition aspect-square ${
                    selectedImage === idx
                      ? "border-[#C9A24D]"
                      : "border-[#2A2A2A] hover:border-[#C9A24D]/50"
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className={isRTL ? "text-right" : "text-left"}>

            <p className="text-sm text-gray-400 mb-2">{brandName}</p>

            <h1 className="text-3xl font-bold mb-2">{productName}</h1>

            <p className="text-gray-400 mb-4">{shortDescription}</p>

            {/* Rating */}
            {/* <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-[#C9A24D]" />
              ))}
            </div> */}

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[#C9A24D]">
                {formatPrice(selectedVariantData?.price || product.minPrice)}
              </span>
              <span className="line-through text-gray-500">
                {product.maxPrice ? formatPrice(selectedVariantData?.mrp || product.maxPrice) : ""}
              </span>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">
                  {isRTL ? "الألوان" : "Colors"}
                  {selectedVariantData && (
                    <span className="text-sm text-gray-400 font-normal ml-2">
                      - {currentLanguage === "ar" 
                        ? selectedVariantData.nameArabic || selectedVariantData.nameEnglish
                        : selectedVariantData.nameEnglish || selectedVariantData.nameArabic}
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant: any, idx: number) => {
                    // Get variant image for preview
                    const variantPreviewImage = currentLanguage === "ar"
                      ? variant.imageUrlArabic?.[0]?.imageUrl || variant.imageUrlEnglish?.[0]?.imageUrl
                      : variant.imageUrlEnglish?.[0]?.imageUrl || variant.imageUrlArabic?.[0]?.imageUrl;
                    
                    const variantName = currentLanguage === "ar"
                      ? variant.nameArabic || variant.nameEnglish
                      : variant.nameEnglish || variant.nameArabic;

                    return (
                      <button
                        key={variant._id}
                        onClick={() => setSelectedVariant(idx)}
                        title={variantName}
                        className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                          selectedVariant === idx
                            ? "border-[#C9A24D] scale-110 shadow-lg shadow-[#C9A24D]/30"
                            : "border-[#2A2A2A] hover:border-[#C9A24D]/50"
                        }`}
                      >
                        {variantPreviewImage ? (
                          <img 
                            src={variantPreviewImage} 
                            alt={variantName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full"
                            style={{ backgroundColor: variant.color || "#666" }}
                          />
                        )}
                        {selectedVariant === idx && (
                          <div className="absolute inset-0 bg-[#C9A24D]/20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-[#C9A24D] border-2 border-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + Cart */}
            <div className="flex items-center gap-4">
              <div className="flex border border-[#2A2A2A] rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-[#2A2A2A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2"
                >
                  +
                </button>
              </div>

              <button
               onClick={handleAddToCart}
              className="flex-1 bg-[#C9A24D] text-black py-3 rounded-lg flex justify-center items-center gap-2">
                <ShoppingCart size={18} />
                Add To Cart
              </button>
            </div>

            {/* Description Sections */}
            <div className="border-t border-[#2A2A2A] mt-8 pt-6">
              {product.description?.map((section: any) => (
                <div key={section._id} className="mb-6">
                  <h3 className="font-semibold mb-2">
                    {currentLanguage === "ar"
                      ? section.titleArabic
                      : section.titleEnglish}
                  </h3>

                  <ul className="space-y-2 text-gray-400">
                    {(currentLanguage === "ar"
                      ? section.descriptionArabic
                      : section.descriptionEnglish
                    )?.map((item: any) => (
                      <li key={item._id}>• {item.description}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SIMILAR PRODUCTS ================= */}
        <div className="border-t border-[#2A2A2A] pt-10">
          <h2 className="text-2xl font-bold mb-6">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => {
              const simImage =
                currentLanguage === "ar"
                  ? item.imageUrlArabic?.[0]?.imageUrl
                  : item.imageUrlEnglish?.[0]?.imageUrl;

              return (
                <div
                  key={item._id}
                //   className="bg-[#1A1A1A] rounded-lg overflow-hidden"
                //  key={productId}
                //       onClick={() => router.push(`/brands/${productId}`)}
                  className="bg-[#1A1A1A] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-[#C9A24D]/30 transition"
                  onClick={() => router.push(`/brands/${item._id}`)}
                >
                  <img
                    src={simImage}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2">
                      {currentLanguage === "ar"
                        ? item.nameArabic
                        : item.nameEnglish}
                    </h3>
                    <p className="text-[#C9A24D] font-bold">
                      {formatPrice(item.minPrice)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= LIGHTBOX ================= */}
        {lightboxOpen && (
          <Lightbox
            images={productImages || []}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
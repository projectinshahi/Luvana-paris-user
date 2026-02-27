// "use client";

// import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";
// import { useState } from "react";

// interface WishlistItem {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   originalPrice: number;
//   discount: number;
//   image: string;
//   inStock: boolean;
// }

// interface WishlistSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddToCart?: (item: WishlistItem) => void;
// }

// export default function WishlistSidebar({
//   isOpen,
//   onClose,
//   onAddToCart,
// }: WishlistSidebarProps) {
//   const { t } = useTranslation("common");
//   const { isRTL } = useLanguage();

//   const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
//     {
//       id: 1,
//       name: "Retinol Advanced Night Repair Cream",
//       brand: "THE BRAND NAME",
//       price: 18.45,
//       originalPrice: 26.36,
//       discount: 30,
//       image:
//         "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       inStock: true,
//     },
//     {
//       id: 2,
//       name: "Hyaluronic Acid Moisture Surge Gel",
//       brand: "THE BRAND NAME",
//       price: 9.99,
//       originalPrice: 19.98,
//       discount: 50,
//       image:
//         "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
//       inStock: true,
//     },
//     {
//       id: 3,
//       name: "SPF 50 UV Shield Matte Sunscreen",
//       brand: "THE BRAND NAME",
//       price: 14.60,
//       originalPrice: 20.86,
//       discount: 30,
//       image:
//         "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       inStock: false,
//     },
//   ]);

//   const removeItem = (id: number) => {
//     setWishlistItems((items) => items.filter((item) => item.id !== id));
//   };

//   const handleAddToCart = (item: WishlistItem) => {
//     onAddToCart?.(item);
//     removeItem(item.id);
//   };

//   const handleMoveAllToCart = () => {
//     const inStockItems = wishlistItems.filter((item) => item.inStock);
//     inStockItems.forEach((item) => onAddToCart?.(item));
//     setWishlistItems((items) => items.filter((item) => !item.inStock));
//   };

//   const totalSavings = wishlistItems.reduce(
//     (sum, item) => sum + (item.originalPrice - item.price),
//     0
//   );
//   const inStockCount = wishlistItems.filter((item) => item.inStock).length;

//   return (
//     <>
//       {/* Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-[#24232380] backdrop-blur-sm z-70 top-16 sm:top-14"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-16 sm:top-14 bottom-0 ${
//           isRTL ? "left-0" : "right-0"
//         } w-full sm:w-100 bg-[#1A1A1A] text-white z-80 transform transition-transform duration-300 ease-in-out ${
//           isOpen
//             ? "translate-x-0"
//             : isRTL
//             ? "-translate-x-full"
//             : "translate-x-full"
//         } flex flex-col`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
//           <div className="flex items-center gap-2">
//             <Heart size={20} className="text-[#C9A24D] fill-[#C9A24D]" />
//             <h2 className="text-xl font-semibold text-gray-300">
//               {t("wishlistLabel")}
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-[#2A2A2A] rounded-full transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Sub-header */}
//         <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center justify-between">
//           <p className="text-sm text-gray-400">
//             {t(" Total wishlist")} ({wishlistItems.length}{" "}
//             {/* {t("wishlist")}) */}
//           </p>
//           {inStockCount > 0 && (
//             <button
//               onClick={handleMoveAllToCart}
//               className="text-xs text-[#C9A24D] hover:text-[#B8934C] font-medium transition"
//             >
//               {/* {t("wishlist.moveAllToCart")} */}
//             </button>
//           )}
//         </div>

//         {/* Wishlist Items — Scrollable */}
//         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
//           {wishlistItems.length === 0 ? (
//             /* Empty State */
//             <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
//               <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center">
//                 <Heart size={28} className="text-gray-600" />
//               </div>
//               <p className="text-gray-400 text-sm text-center">
//                 {t("empty wishlist")}
//               </p>
//             </div>
//           ) : (
//             wishlistItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex gap-3 bg-[#0D0D0D] rounded-lg p-3 border border-[#2A2A2A]"
//               >
//                 {/* Product Image */}
//                 <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-[#2A2A2A] relative">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className={`w-full h-full object-cover ${
//                       !item.inStock ? "opacity-50" : ""
//                     }`}
//                   />
//                   {!item.inStock && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span className="text-[10px] font-semibold text-white bg-black/70 px-2 py-0.5 rounded-full">
//                         {t("outOfStock")}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Product Info */}
//                 <div className="flex-1 flex flex-col justify-between">
//                   <div>
//                     <p className="text-xs text-gray-400 mb-1">{item.brand}</p>
//                     <h3 className="text-sm font-medium mb-2 line-clamp-2">
//                       {item.name}
//                     </h3>
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-sm font-bold text-white">
//                         KWD {item.price.toFixed(2)}
//                       </span>
//                       <span className="text-xs text-gray-500 line-through">
//                         {item.originalPrice.toFixed(2)}
//                       </span>
//                       <span className="text-xs text-green-500 font-semibold">
//                         {item.discount}% {t("cart.off")}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center justify-between">
//                     <button
//                       onClick={() => handleAddToCart(item)}
//                       disabled={!item.inStock}
//                       className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition ${
//                         item.inStock
//                           ? "bg-[#C9A24D] hover:bg-[#B8934C] text-black"
//                           : "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
//                       }`}
//                     >
//                       <ShoppingCart size={12} />
//                       {t("addToCart")}
//                     </button>

//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-[#2A2A2A] rounded-full transition"
//                       aria-label="Remove from wishlist"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer Summary */}
//         {wishlistItems.length > 0 && (
//           <div className="border-t border-[#2A2A2A] bg-[#0D0D0D]">
//             <div className="px-4 py-3 space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 {/* <span className="text-gray-400">{t("wishlist.summary")}</span> */}
//                 <span className="text-gray-400">
//                   {t("Total product")} ({wishlistItems.length})
//                 </span>
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-gray-400">
//                   {t("Total price")}
//                 </span>
//                 <span className="text-green-500 font-medium">
//                   KWD {totalSavings.toFixed(2)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-gray-400">
//                   {t("Total in Stock")}
//                 </span>
//                 <span className="text-white font-medium">
//                   {inStockCount} / {wishlistItems.length}
//                 </span>
//               </div>

//               {/* CTA */}
//               <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
//                 <button
//                   onClick={() => removeItem(wishlistItems[0]?.id)}
//                   className="text-xs text-red-500 hover:text-red-400 transition"
//                 >
//                   {t("ClearAll")}
//                 </button>
//                 <button
//                   onClick={handleMoveAllToCart}
//                   disabled={inStockCount === 0}
//                   className={`px-8 py-3 rounded-lg font-semibold transition ${
//                     inStockCount > 0
//                       ? "bg-[#C9A24D] hover:bg-[#B8934C] text-black"
//                       : "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   {t("Move All To Cart")}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// "use client";

// import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface WishlistItem {
//   _id: string;
//   variant: {
//     _id: string;
//     price: number;
//     mrp: number;
//     product: {
//       _id: string;
//       nameEnglish: string;
//       brand?: { nameEnglish: string };
//       imageUrlEnglish?: { imageUrl: string }[];
//     };
//   };
// }

// interface WishlistSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function WishlistSidebar({
//   isOpen,
//   onClose,
// }: WishlistSidebarProps) {
//   const { t } = useTranslation("common");
//   const { isRTL } = useLanguage();

//   const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH WISHLIST ================= */
//   const fetchWishlist = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:8000/user/wishlist",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setWishlistItems(res.data.wishlist || []);
//     } catch (error) {
//       console.error("Wishlist fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       fetchWishlist();
//     }
//   }, [isOpen]);

//   /* ================= REMOVE ITEM ================= */
//   const removeItem = async (wishlistId: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(
//         `http://localhost:8000/user/wishlist/${wishlistId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setWishlistItems((prev) =>
//         prev.filter((item) => item._id !== wishlistId)
//       );
//     } catch (error) {
//       console.error("Remove wishlist error:", error);
//     }
//   };

//   /* ================= MOVE TO CART ================= */
//   const moveToCart = async (item: WishlistItem) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:8000/user/cart",
//         {
//           variant: item.variant._id,
//           quantity: 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       await removeItem(item._id);
//     } catch (error) {
//       console.error("Move to cart error:", error);
//     }
//   };

//   const totalSavings = wishlistItems.reduce(
//     (sum, item) =>
//       sum + (item.variant.mrp - item.variant.price),
//     0
//   );

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-[#24232380] backdrop-blur-sm z-70 top-16 sm:top-14"
//           onClick={onClose}
//         />
//       )}

//       <div
//         className={`fixed top-16 sm:top-14 bottom-0 ${
//           isRTL ? "left-0" : "right-0"
//         } w-full sm:w-100 bg-[#1A1A1A] text-white z-80 transform transition-transform duration-300 ${
//           isOpen
//             ? "translate-x-0"
//             : isRTL
//             ? "-translate-x-full"
//             : "translate-x-full"
//         } flex flex-col`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
//           <div className="flex items-center gap-2">
//             <Heart size={20} className="text-[#C9A24D] fill-[#C9A24D]" />
//             <h2 className="text-xl font-semibold text-gray-300">
//               {t("wishlistLabel")}
//             </h2>
//           </div>
//           <button onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
//           {loading ? (
//             <p className="text-center text-gray-400">
//               Loading...
//             </p>
//           ) : wishlistItems.length === 0 ? (
//             <p className="text-center text-gray-400">
//               {t("empty wishlist")}
//             </p>
//           ) : (
//             wishlistItems.map((item) => {
//               const product = item.variant.product;

//               return (
//                 <div
//                   key={item._id}
//                   className="flex gap-3 bg-[#0D0D0D] rounded-lg p-3 border border-[#2A2A2A]"
//                 >
//                   <img
//                     src={
//                       product.imageUrlEnglish?.[0]?.imageUrl ||
//                       "/placeholder.png"
//                     }
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />

//                   <div className="flex-1">
//                     <p className="text-xs text-gray-400">
//                       {product.brand?.nameEnglish}
//                     </p>
//                     <h3 className="text-sm font-medium">
//                       {product.nameEnglish}
//                     </h3>

//                     <div className="flex items-center gap-2 mt-2">
//                       <span className="font-bold text-white">
//                         ₹{item.variant.price}
//                       </span>
//                       <span className="line-through text-gray-500 text-xs">
//                         ₹{item.variant.mrp}
//                       </span>
//                     </div>

//                     <div className="flex justify-between mt-3">
//                       <button
//                         onClick={() => moveToCart(item)}
//                         className="bg-[#C9A24D] text-black px-3 py-1 rounded-full text-xs"
//                       >
//                         <ShoppingCart size={12} />
//                       </button>

//                       <button
//                         onClick={() => removeItem(item._id)}
//                         className="text-red-500"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Footer */}
//         {wishlistItems.length > 0 && (
//           <div className="border-t border-[#2A2A2A] p-4">
//             <div className="flex justify-between text-sm">
//               <span>Total Savings</span>
//               <span className="text-green-500">
//                 ₹{totalSavings}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
"use client";

import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import { useEffect, useState } from "react";
import api from "@/lib/axios";


interface WishlistItem {
  _id: string;
  variant: {
    _id: string;
    price: number;
    mrp: number;
    product: {
      _id: string;
      nameEnglish: string;
      brand?: { nameEnglish: string };
      imageUrlEnglish?: { imageUrl: string }[];
    };
  };
}

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistSidebar({
  isOpen,
  onClose,
}: WishlistSidebarProps) {
  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/wishlist");
      setWishlistItems(res.data.list || []);
    } catch (error: any) {
      console.error("Wishlist fetch error:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWishlist();
    }
  }, [isOpen]);

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (wishlistId: string) => {
    try {
      await api.delete(`/user/wishlist/${wishlistId}`);
      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== wishlistId)
      );
    } catch (error: any) {
      console.error("Remove wishlist error:", error?.response?.data);
    }
  };

  /* ================= MOVE TO CART ================= */
  const moveToCart = async (item: WishlistItem) => {
    try {
      await api.post("/user/cart", {
        variant: item.variant._id,
        quantity: 1,
      });

      await removeItem(item._id);
    } catch (error: any) {
      console.error("Move to cart error:", error?.response?.data);
    }
  };

  const totalSavings = wishlistItems.reduce(
    (sum, item) =>
      sum + (item.variant.mrp - item.variant.price),
    0
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 bottom-0 ${
          isRTL ? "left-0" : "right-0"
        } w-80 sm:w-96 bg-[#1A1A1A] text-white z-50 transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : isRTL
            ? "-translate-x-full"
            : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#C9A24D] fill-[#C9A24D]" />
            <h2 className="text-lg font-semibold">
              {t("wishlistLabel")}
            </h2>
          </div>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : wishlistItems.length === 0 ? (
            <p className="text-center text-gray-400">
              {t("empty wishlist")}
            </p>
          ) : (
            wishlistItems.map((item) => {
              const product = item.variant.product;

              return (
                <div
                  key={item._id}
                  className="flex gap-3 bg-[#0D0D0D] p-3 rounded-lg border border-[#2A2A2A]"
                >
                  <img
                    src={
                      product.imageUrlEnglish?.[0]?.imageUrl ||
                      "/placeholder.png"
                    }
                    alt={product.nameEnglish}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-xs text-gray-400">
                      {product.brand?.nameEnglish}
                    </p>

                    <h3 className="text-sm font-medium line-clamp-2">
                      {product.nameEnglish}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold">
                        ₹{item.variant.price}
                      </span>
                      <span className="text-xs line-through text-gray-500">
                        ₹{item.variant.mrp}
                      </span>
                    </div>

                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => moveToCart(item)}
                        className="bg-[#C9A24D] text-black px-3 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        <ShoppingCart size={12} />
                        {t("addToCart")}
                      </button>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-[#2A2A2A] p-4 text-sm">
            <div className="flex justify-between">
              <span>{t("Total Savings")}</span>
              <span className="text-green-500">
                ₹{totalSavings}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
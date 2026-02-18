"use client";

import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import { useState } from "react";

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  inStock: boolean;
}

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: WishlistItem) => void;
}

export default function WishlistSidebar({
  isOpen,
  onClose,
  onAddToCart,
}: WishlistSidebarProps) {
  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Retinol Advanced Night Repair Cream",
      brand: "THE BRAND NAME",
      price: 18.45,
      originalPrice: 26.36,
      discount: 30,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Hyaluronic Acid Moisture Surge Gel",
      brand: "THE BRAND NAME",
      price: 9.99,
      originalPrice: 19.98,
      discount: 50,
      image:
        "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "SPF 50 UV Shield Matte Sunscreen",
      brand: "THE BRAND NAME",
      price: 14.60,
      originalPrice: 20.86,
      discount: 30,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
      inStock: false,
    },
  ]);

  const removeItem = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: WishlistItem) => {
    onAddToCart?.(item);
    removeItem(item.id);
  };

  const handleMoveAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock);
    inStockItems.forEach((item) => onAddToCart?.(item));
    setWishlistItems((items) => items.filter((item) => !item.inStock));
  };

  const totalSavings = wishlistItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price),
    0
  );
  const inStockCount = wishlistItems.filter((item) => item.inStock).length;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#24232380] backdrop-blur-sm z-70 top-16 sm:top-14"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 sm:top-14 bottom-0 ${
          isRTL ? "left-0" : "right-0"
        } w-full sm:w-100 bg-[#1A1A1A] text-white z-80 transform transition-transform duration-300 ease-in-out ${
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
            <h2 className="text-xl font-semibold text-gray-300">
              {t("wishlistLabel")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2A2A] rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sub-header */}
        <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center justify-between">
          <p className="text-sm text-gray-400">
            {t(" Total wishlist")} ({wishlistItems.length}{" "}
            {/* {t("wishlist")}) */}
          </p>
          {inStockCount > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="text-xs text-[#C9A24D] hover:text-[#B8934C] font-medium transition"
            >
              {/* {t("wishlist.moveAllToCart")} */}
            </button>
          )}
        </div>

        {/* Wishlist Items — Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {wishlistItems.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <Heart size={28} className="text-gray-600" />
              </div>
              <p className="text-gray-400 text-sm text-center">
                {t("empty wishlist")}
              </p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-[#0D0D0D] rounded-lg p-3 border border-[#2A2A2A]"
              >
                {/* Product Image */}
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-[#2A2A2A] relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover ${
                      !item.inStock ? "opacity-50" : ""
                    }`}
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-white bg-black/70 px-2 py-0.5 rounded-full">
                        {t("outOfStock")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{item.brand}</p>
                    <h3 className="text-sm font-medium mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-white">
                        KWD {item.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {item.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-green-500 font-semibold">
                        {item.discount}% {t("cart.off")}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                        item.inStock
                          ? "bg-[#C9A24D] hover:bg-[#B8934C] text-black"
                          : "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={12} />
                      {t("addToCart")}
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-[#2A2A2A] rounded-full transition"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-[#2A2A2A] bg-[#0D0D0D]">
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                {/* <span className="text-gray-400">{t("wishlist.summary")}</span> */}
                <span className="text-gray-400">
                  {t("Total product")} ({wishlistItems.length})
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {t("Total price")}
                </span>
                <span className="text-green-500 font-medium">
                  KWD {totalSavings.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {t("Total in Stock")}
                </span>
                <span className="text-white font-medium">
                  {inStockCount} / {wishlistItems.length}
                </span>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                <button
                  onClick={() => removeItem(wishlistItems[0]?.id)}
                  className="text-xs text-red-500 hover:text-red-400 transition"
                >
                  {t("ClearAll")}
                </button>
                <button
                  onClick={handleMoveAllToCart}
                  disabled={inStockCount === 0}
                  className={`px-8 py-3 rounded-lg font-semibold transition ${
                    inStockCount > 0
                      ? "bg-[#C9A24D] hover:bg-[#B8934C] text-black"
                      : "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {t("Move All To Cart")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
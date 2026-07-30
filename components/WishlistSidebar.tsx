"use client";

import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useCurrency } from "@/contexts/CurrencyContext";
import Image from "next/image";

interface WishlistItem {
  _id: string;
  product?: {
    _id: string;
    nameEnglish: string;
    nameArabic?: string;
    imageUrlEnglish?: { imageUrl: string }[];
    imageUrlArabic?: { imageUrl: string }[];
  };
  variant?: {
    _id: string;
    nameEnglish: string;
    nameArabic?: string;
    color?: string;
    price: number;
    mrp: number;
    stock: number;
    imageUrlEnglish?: { imageUrl: string }[];
    imageUrlArabic?: { imageUrl: string }[];
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
  const { formatPrice } = useCurrency();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/wishlist");
      console.log("✅ Wishlist API Response:", res.data);
      console.log("✅ Items count:", res.data.items?.length || 0);
      setWishlistItems(res.data.items || []);
    } catch (error: any) {
      console.error("❌ Wishlist fetch error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when sidebar opens
  useEffect(() => {
    if (isOpen) {
      console.log("🔄 Fetching wishlist...");
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
      const variantId = item.variant?._id;
      if (!variantId) {
        console.error("No variant ID found");
        return;
      }

      await api.post("/user/cart", {
        variant: variantId,
        quantity: 1,
      });

      await removeItem(item._id);
    } catch (error: any) {
      console.error("Move to cart error:", error?.response?.data);
    }
  };

  const totalSavings = wishlistItems.reduce((sum, item) => {
    if (item.variant) {
      return sum + (item.variant.mrp - item.variant.price);
    }
    return sum;
  }, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-45"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 bottom-0 ${
          isRTL ? "left-0" : "right-0"
        } w-80 sm:w-96 bg-cream text-ink border-s border-line shadow-luxury-lg z-50 transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : isRTL
            ? "-translate-x-full"
            : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-line">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-gold fill-gold" />
            <h2 className="text-lg font-semibold">
              {t("wishlistLabel")}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist sidebar"
            className="p-2 hover:bg-champagne rounded-full transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <p className="text-center text-muted">Loading...</p>
          ) : wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center">
                <Heart size={28} className="text-muted" />
              </div>
              <p className="text-center text-muted">
                {t("empty wishlist")}
              </p>
            </div>
          ) : (
            wishlistItems.map((item) => {
              // Use variant data if available, otherwise use product data
              const displayData = item.variant || item.product;
              const imageUrl = 
                displayData?.imageUrlEnglish?.[0]?.imageUrl ||
                displayData?.imageUrlArabic?.[0]?.imageUrl ||
                "/placeholder.png";
              const name = displayData?.nameEnglish || displayData?.nameArabic || "Unknown Product";
              const price = item.variant?.price || 0;
              const mrp = item.variant?.mrp || 0;
              const discount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
              const inStock = item.variant ? item.variant.stock > 0 : true;

              return (
                <div
                  key={item._id}
                  className="flex gap-3 bg-card p-3 rounded-xl border border-line"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-champagne">
                    <Image
                      src={imageUrl}
                      alt={name}
                      fill
                      sizes="5rem"
                      className={`object-cover ${
                        !inStock ? "opacity-50" : ""
                      }`}
                    />
                    {!inStock && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-white bg-black/70 px-2 py-0.5 rounded-full">
                          {t("outOfStock")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">
                      {name}
                    </h3>

                    {item.variant && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-ink">
                          {formatPrice(price)}
                        </span>
                        {mrp > price && (
                          <>
                            <span className="text-xs line-through text-muted">
                              {formatPrice(mrp)}
                            </span>
                            <span className="text-xs text-green-500 font-semibold">
                              {discount}% {t("cart.off")}
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => moveToCart(item)}
                        disabled={!inStock || !item.variant}
                        aria-label="Move item to cart"
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none ${
                          inStock && item.variant
                            ? "bg-gold hover:bg-gold-dark text-cream"
                            : "bg-champagne text-muted cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart size={12} />
                        {t("addToCart")}
                      </button>

                      <button
                        onClick={() => removeItem(item._id)}
                        aria-label="Remove item"
                        className="text-muted hover:text-red-500 transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded p-1"
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
          <div className="border-t border-line p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">{t("Total product")}</span>
              <span className="text-ink font-medium">
                {wishlistItems.length}
              </span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted">{t("Total Savings")}</span>
                <span className="text-green-500 font-medium">
                  {formatPrice(totalSavings)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

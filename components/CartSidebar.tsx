"use client";

import { X, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface CartItem {
  _id: string;
  product?: {
    _id: string;
    nameEnglish: string;
    nameArabic?: string;
  };
  variant: {
    _id: string;
    nameEnglish: string;
    nameArabic?: string;
    color?: string;
    price: number;
    mrp: number;
    imageUrlEnglish?: { imageUrl: string }[];
    imageUrlArabic?: { imageUrl: string }[];
  };
  quantity: number;
  itemPrice: number;
  mrpPrice: number;
  itemDiscount: number;
}

interface CartSummary {
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  mrpTotal: number;
  discount: number;
  discountPercentage: number;
  couponCode: string | null;
  couponDiscount: number;
  tax: number;
  total: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>({
    itemCount: 0,
    totalQuantity: 0,
    subtotal: 0,
    mrpTotal: 0,
    discount: 0,
    discountPercentage: 0,
    couponCode: null,
    couponDiscount: 0,
    tax: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.log("⚠️ No token found - user not logged in");
        setCartItems([]);
        setSummary({
          itemCount: 0,
          totalQuantity: 0,
          subtotal: 0,
          mrpTotal: 0,
          discount: 0,
          discountPercentage: 0,
          couponCode: null,
          couponDiscount: 0,
          tax: 0,
          total: 0,
        });
        return;
      }

      console.log("🔄 Fetching cart with token...");
      const res = await api.get("/user/cart");
      console.log("✅ Cart API Response:", res.data);
      setCartItems(res.data.items || []);
      setSummary(res.data.summary || {});
    } catch (error: any) {
      console.error("❌ Cart fetch error:", error?.response?.data || error.message);
      if (error?.response?.status === 401) {
        console.log("⚠️ Unauthorized - clearing cart");
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when sidebar opens
  useEffect(() => {
    if (isOpen) {
      console.log("🔄 Fetching cart...");
      fetchCart();
    }
  }, [isOpen]);

  /* ================= UPDATE QUANTITY ================= */
  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await api.put(`/user/cart/${cartItemId}`, {
        quantity: newQuantity,
      });
      // Refresh cart after update
      fetchCart();
    } catch (error: any) {
      console.error("Update quantity error:", error?.response?.data);
      alert(error?.response?.data?.message || "Failed to update quantity");
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (cartItemId: string) => {
    try {
      await api.delete(`/user/cart/${cartItemId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
      // Refresh cart to update summary
      fetchCart();
    } catch (error: any) {
      console.error("Remove cart item error:", error?.response?.data);
    }
  };

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
          <h2 className="text-xl font-semibold text-gray-300">
            {t("cart.yourCart")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2A2A] rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Shop Order Header */}
        <div className="px-4 py-3 border-b border-[#2A2A2A]">
          <p className="text-sm text-gray-400">
            {t("cart.shopOrder")} ({summary.itemCount} {t("cart.items")})
          </p>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <X size={28} className="text-gray-600" />
              </div>
              <p className="text-center text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => {
              const imageUrl =
                item.variant?.imageUrlEnglish?.[0]?.imageUrl ||
                item.variant?.imageUrlArabic?.[0]?.imageUrl ||
                "/placeholder.png";
              const name =
                item.variant?.nameEnglish ||
                item.variant?.nameArabic ||
                item.product?.nameEnglish ||
                "Unknown Product";
              const discount = item.variant?.mrp > item.variant?.price
                ? Math.round(
                    ((item.variant.mrp - item.variant.price) /
                      item.variant.mrp) *
                      100
                  )
                : 0;

              return (
                <div
                  key={item._id}
                  className="flex gap-3 bg-[#0D0D0D] rounded-lg p-3 border border-[#2A2A2A]"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-[#2A2A2A]">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium mb-2 line-clamp-2">
                        {name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-white">
                          KWD {item.variant?.price.toFixed(2)}
                        </span>
                        {discount > 0 && (
                          <>
                            <span className="text-xs text-gray-500 line-through">
                              {item.variant?.mrp.toFixed(2)}
                            </span>
                            <span className="text-xs text-green-500 font-semibold">
                              {discount}% {t("cart.off")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-[#2A2A2A] rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#3A3A3A] rounded-full transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#3A3A3A] rounded-full transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-xs text-red-500 hover:text-red-400 transition"
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Payment Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#2A2A2A] bg-[#0D0D0D]">
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{t("cart.payment")}</span>
                <span className="text-gray-400">
                  {t("cart.items")} ({summary.itemCount})
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{t("cart.total")}</span>
                <span className="text-white font-medium">
                  KWD {summary.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{t("cart.discount")}</span>
                <span className="text-green-500 font-medium">
                  KWD {summary.discount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{t("cart.shipping")}</span>
                <span className="text-white font-medium">
                  {t("cart.free")}
                </span>
              </div>

              {summary.tax > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white font-medium">
                    KWD {summary.tax.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Final Total */}
              <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                <span className="text-2xl font-bold text-white">
                  KWD {summary.total.toFixed(2)}
                </span>
                <button
                  className="bg-[#C9A24D] hover:bg-[#B8934C] text-black px-8 py-3 rounded-lg font-semibold transition"
                  onClick={() => {
                    onClose();
                    router.push("/checkout");
                  }}
                >
                  {t("cart.buyNow")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

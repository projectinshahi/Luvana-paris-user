"use client";

import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Image from "next/image";
import { imageSrc, showPlaceholder } from "@/lib/cloudinary";
import { useDrawer } from "@/lib/useDrawer";

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
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const topOffset = useDrawer(isOpen, onClose);

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
      {/* Backdrop — starts at navbar bottom, fades in/out */}
      <div
        aria-hidden
        onClick={onClose}
        style={{ top: topOffset }}
        className={`fixed inset-x-0 bottom-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        inert={!isOpen}
        style={{ top: topOffset }}
        className={`fixed bottom-0 right-0 w-full sm:w-80 md:w-96 max-w-sm bg-cream text-ink border-s border-line shadow-luxury-lg z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-line">
          <h2 className="text-xl font-semibold text-ink">
            {t("cart.yourCart")}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart sidebar"
            className="p-2 text-ink hover:bg-champagne rounded-full transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Shop Order Header */}
        <div className="px-4 py-3 border-b border-line">
          <p className="text-sm text-muted">
            {t("cart.shopOrder")} ({summary.itemCount} {t("cart.items")})
          </p>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {loading ? (
            <div className="flex flex-col gap-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex gap-3 rounded-xl border border-line bg-card p-3">
                  <div className="h-20 w-20 shrink-0 rounded-lg skeleton-luxury" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 skeleton-luxury rounded" />
                    <div className="h-3 w-1/2 skeleton-luxury rounded" />
                    <div className="h-8 w-24 skeleton-luxury rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-2 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne">
                <ShoppingCart size={28} className="text-gold-dark" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-ink">Your cart is empty</p>
                <p className="text-sm text-muted">Add a few favorites to keep your order ready.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-cream transition hover:bg-gold-dark focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
              >
                Continue shopping
              </button>
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
                  className="flex gap-3 bg-card rounded-xl p-3 border border-line"
                >
                  {/* Product Image */}
                  <div className="relative w-20 sm:w-24 h-20 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-champagne aspect-square">
                    <Image
                      src={imageSrc(imageUrl)}
                      alt={name}
                      onError={showPlaceholder}
                      fill
                      sizes="(max-width: 640px) 5rem, 6rem"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium mb-2 line-clamp-2">
                        {name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-ink">
                          {formatPrice(item.variant?.price)}
                        </span>
                        {discount > 0 && (
                          <>
                            <span className="text-xs text-muted line-through">
                              {formatPrice(item.variant?.mrp)}
                            </span>
                            <span className="text-xs text-green-600 font-semibold">
                              {discount}% {t("cart.off")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-line rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-9 h-9 flex items-center justify-center text-ink hover:bg-champagne rounded-full transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-9 h-9 flex items-center justify-center text-ink hover:bg-champagne rounded-full transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        aria-label="Remove item"
                        className="text-xs text-muted hover:text-red-500 transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded px-1"
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
          <div className="border-t border-line bg-champagne">
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{t("cart.payment")}</span>
                <span className="text-muted">
                  {t("cart.items")} ({summary.itemCount})
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{t("cart.total")}</span>
                <span className="text-ink font-medium">
                  {formatPrice(summary.subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{t("cart.discount")}</span>
                <span className="text-green-600 font-medium">
                  {formatPrice(summary.discount)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{t("cart.shipping")}</span>
                <span className="text-ink font-medium">
                  {t("cart.free")}
                </span>
              </div>

              {summary.tax > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Tax</span>
                  <span className="text-ink font-medium">
                    {formatPrice(summary.tax)}
                  </span>
                </div>
              )}

              {/* Final Total */}
              <div className="flex items-center justify-between pt-3 border-t border-line">
                <span className="text-2xl font-bold text-ink">
                  {formatPrice(summary.total)}
                </span>
                <button
                  className="bg-gold hover:bg-gold-dark text-cream px-8 py-3 rounded-full font-semibold uppercase tracking-wide transition focus-visible:ring-2 focus-visible:ring-gold-dark focus:outline-none"
                  onClick={() => {
                    onClose();
                    router.push("/checkout");
                  }}
                  aria-label="Proceed to checkout"
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

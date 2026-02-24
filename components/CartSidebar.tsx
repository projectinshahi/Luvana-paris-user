"use client";

import { X, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  quantity: number;
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

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Vitamin C & Ferulic Acid Serum",
      brand: "THE BRAND NAME",
      price: 11.27,
      originalPrice: 16.10,
      discount: 70,
      image: "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Vitamin C & Ferulic Acid Serum",
      brand: "THE BRAND NAME",
      price: 22.38,
      originalPrice: 31.97,
      discount: 70,
      image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice - item.price) * item.quantity),
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal;

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
            {t("cart.shopOrder")} ({cartItems.length} {t("cart.items")})
          </p>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 bg-[#0D0D0D] rounded-lg p-3 border border-[#2A2A2A]"
            >
              {/* Product Image */}
              <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-[#2A2A2A]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
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
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-xs text-green-500 font-semibold">
                      {item.discount}% {t("cart.off")}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-[#2A2A2A] rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#3A3A3A] rounded-full transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#3A3A3A] rounded-full transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:text-red-400 transition"
                  >
                    {t("cart.remove")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="border-t border-[#2A2A2A] bg-[#0D0D0D]">
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{t("cart.payment")}</span>
              <span className="text-gray-400">
                {t("cart.items")} ({cartItems.length})
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{t("cart.total")}</span>
              <span className="text-white font-medium">
                {formatPrice(total)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{t("cart.discount")}</span>
              <span className="text-green-500 font-medium">
                {formatPrice(totalDiscount)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{t("cart.shipping")}</span>
              <span className="text-white font-medium">
                {shipping === 0 ? t("cart.free") : formatPrice(shipping)}
              </span>
            </div>

            {/* Final Total */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
              <span className="text-2xl font-bold text-white">
                {formatPrice(total)}
              </span>
              <button  className="bg-[#C9A24D] hover:bg-[#B8934C] text-black px-8 py-3 rounded-lg font-semibold transition"
  onClick={() => {
    onClose();
    router.push('/checkout');
  }}>
                {t("cart.buyNow")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

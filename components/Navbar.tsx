"use client";

import { useState, useEffect } from "react";
import { Heart, User, ShoppingCart, Menu, Search, Settings, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import CountrySelector from "./CountrySelector";
import MobileMenu from "./MobileMenu";
import MobileSearch from "./MobileSearch";
import LoginModal from "@/components/LoginModal";

import SettingsOverlay from "@/components/SettingsOverlay";
import { useLanguage } from "@/lib/useLanguage";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";

export default function   Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const { t, ready } = useTranslation("common");
  const { isRTL } = useLanguage();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state until both mounted and translations are ready
  if (!mounted || !ready) {
    return (
      <>
        {/* Top Offer Bar */}
        <div className="fixed top-0 left-0 right-0 bg-[#0A0A0A] text-white text-center text-xs sm:text-sm py-1.5 sm:py-2 z-90">
          <span className="block text-[10px] sm:text-xs">Buy for ₹999 and enjoy a cool 25% OFF!</span>
        </div>

        {/* Mobile Top Navbar - Menu | Logo | Settings */}
        <nav className="sm:hidden fixed top-6 left-0 right-0 bg-[#0D0D0D] text-white px-4 py-3 z-80 border-b border-gray-800 flex items-center justify-between">
          <button className="p-1 hover:bg-gray-800 rounded transition-colors">
            <Menu size={24} />
          </button>
          <div className="text-yellow-400 font-bold text-lg">LOGO</div>
          <button className="p-1 hover:bg-gray-800 rounded transition-colors">
            <Settings size={24} />
          </button>
        </nav>

        {/* Desktop Navbar - Static during loading */}
        <nav className="hidden sm:flex fixed top-6 sm:top-9 left-0 right-0 bg-[#0D0D0D] text-white px-2 sm:px-4 md:px-10 py-1.5 sm:py-2 md:py-3 z-40 no-rtl-transform">
          <div className="flex items-center justify-between navbar-flex w-full">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-no-reverse shrink-0" style={{ order: 1 }}>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors">
              <Menu size={16} className="sm:size-4.5" />
            </button>
            <div className="text-yellow-400 font-bold text-xs sm:text-sm md:text-lg whitespace-nowrap">LOGO</div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden sm:flex flex-1 mx-8 md:mx-10 justify-center" style={{ order: 2 }}>
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 max-w-xl w-full flex-no-reverse">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search for you"
                className="bg-transparent outline-none text-sm px-2 w-full text-white placeholder-gray-400 text-left"
                dir="ltr"
              />
            </div>
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-2 flex-no-reverse shrink-0" style={{ order: 3 }}>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowWishlist(true)}>
              <Heart size={14} className="sm:size-4" />
            </button>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors">
              <User  size={14}  className="sm:size-4" onClick={() => setShowLogin(true)} />
            </button>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowCart(true)}>
              <ShoppingCart size={14} className="sm:size-4" />
            </button>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors ml-0.5">
              <Settings size={16} className="text-white sm:size-4.5" />
            </button>
          </div>
        </div>
        </nav>

        {/* Mobile Bottom Navigation Bar - Static during loading */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] text-white px-0 py-2 z-40 border-t border-gray-800 flex items-center justify-around">
          <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors text-yellow-400 bg-gray-800">
            <Home size={20} />
          </button>
          <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors hover:text-red-500" onClick={() => setShowWishlist(true)}>
            <Heart size={20} />
          </button>
          <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors" onClick={() => setShowCart(true)}>
            <ShoppingCart size={20} />
          </button>
          <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <User size={20} onClick={() => setShowLogin(true)} />
          </button>
        </nav>
      </>
    );
  }

  return (
    <>
      {/* Top Offer Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#0A0A0A] text-white text-center text-xs sm:text-sm py-1.5 sm:py-2 z-50" suppressHydrationWarning>
        <span className="block text-[10px] sm:text-xs">{t("navbar.topOffer")}</span>
      </div>

      {/* Mobile Top Navbar - Menu | Logo | Settings */}
      <nav className="sm:hidden fixed top-6 left-0 right-0 bg-[#0D0D0D] text-white px-4 py-3 z-40 border-b border-gray-800 flex items-center justify-between" dir="ltr" suppressHydrationWarning>
        <button 
          className="p-1 hover:bg-gray-800 rounded transition-colors" 
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        <div className="text-yellow-400 font-bold text-lg">
          {t("navbar.logo")}
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
        >
          <Settings size={24} />
        </button>
      </nav>

      {/* Desktop Navbar - Hidden on Mobile */}
      <nav className="hidden sm:flex fixed top-6 sm:top-9 left-0 right-0 bg-[#0D0D0D] text-white px-2 sm:px-4 md:px-10 py-1.5 sm:py-2 md:py-3 z-40" dir="ltr" suppressHydrationWarning>
        <div className="flex items-center justify-between navbar-flex w-full">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-no-reverse shrink-0" style={{ order: 1 }}>
        
            <div className="text-yellow-400 font-bold text-xs sm:text-sm md:text-lg whitespace-nowrap">
              {t("navbar.logo")}
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden sm:flex flex-1 mx-8 md:mx-10 justify-center" style={{ order: 2 }}>
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 max-w-xl w-full flex-no-reverse">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder={t("search")}
                className={`bg-transparent outline-none text-sm px-2 w-full text-white placeholder-gray-400 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              />
            </div>
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-2 flex-no-reverse shrink-0" style={{ order: 3 }}>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowWishlist(true)}>
              <Heart
                className="cursor-pointer hover:text-red-500 transition-colors"
                size={14}
              />
            </button>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors">
              <User className="cursor-pointer hover:text-gray-300 transition-colors" size={14} onClick={() => setShowLogin(true)} />
            </button>
            <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowCart(true)}>
              <ShoppingCart className="cursor-pointer hover:text-gray-300 transition-colors" size={14} />
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors ml-0.5"
            >
              <Settings size={16} className="text-white sm:size-4.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] text-white px-0 py-2 z-40 border-t border-gray-800 flex items-center justify-around" dir="ltr" suppressHydrationWarning>
        <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors text-yellow-400 bg-gray-800">
          <Home size={20} />
        </button>
        <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors hover:text-red-500" onClick={() => setShowWishlist(true)}>
          <Heart size={20} />
        </button>
        {/* <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <ShoppingCart size={20} onClick={() => setShowCart(true)}/>
        </button> */}
        {/* <button
  className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors"
  onClick={() => setShowCart(true)}
>
  <ShoppingCart
    className="cursor-pointer hover:text-gray-300 transition-colors"
    size={14}
  />
</button> */}
<button
  className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors"
  onClick={() => setShowCart(true)}
>
  <ShoppingCart
    size={14}
    className="cursor-pointer hover:text-gray-300"
  />
</button>


        <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Search size={20} />
        </button>
        <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <User size={20} onClick={() => setShowLogin(true)} />
        </button>
      </nav>

      {/* Settings Overlay */}
      <SettingsOverlay 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      <LoginModal 
  isOpen={showLogin} 
  onClose={() => setShowLogin(false)} 
/>
<CartSidebar
      isOpen={showCart}
      onClose={() => setShowCart(false)}
    />
<WishlistSidebar
      isOpen={showWishlist}
      onClose={() => setShowWishlist(false)}
    />
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </>
  );
}

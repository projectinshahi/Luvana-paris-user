// "use client";

// import { useState, useEffect } from "react";
// import { Heart, User, ShoppingCart, Menu, Search, Settings, Home } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./LanguageSwitcher";
// import CountrySelector from "./CountrySelector";
// import MobileMenu from "./MobileMenu";
// import MobileSearch from "./MobileSearch";
// import LoginModal from "@/components/LoginModal";
// import { useRouter } from "next/navigation";

// import SettingsOverlay from "@/components/SettingsOverlay";
// import { useLanguage } from "@/lib/useLanguage";
// import CartSidebar from "./CartSidebar";
// import WishlistSidebar from "./WishlistSidebar";
// import SearchSidebar from "./SearchSidebar";

// export default function   Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [showWishlist, setShowWishlist] = useState(false);
// const [animate, setAnimate] = useState(true);
// const router = useRouter();
// const [showUserDropdown, setShowUserDropdown] = useState(false);

//   const { t, ready } = useTranslation("common");
//   const { isRTL } = useLanguage();
//   const offers = t("navbar.offers", {
//   returnObjects: true,
// }) as string[];

// const [offerIndex, setOfferIndex] = useState(0);
// // useEffect(() => {
// //   const interval = setInterval(() => {
// //     setOfferIndex((prev) => (prev + 1) % offers.length);
// //   }, 5000);

// //   return () => clearInterval(interval);
// // }, [offers.length]);
// useEffect(() => {
//   if (!offers || offers.length === 0) return;

//   const interval = setInterval(() => {
//     setAnimate(false);

//     setTimeout(() => {
//       setOfferIndex((prev) => (prev + 1) % offers.length);
//       setAnimate(true);
//     }, 300); // animation sync
//   }, 5000);

//   return () => clearInterval(interval);
// }, [offers]);


//   // Prevent hydration mismatch by only rendering after mount
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Show loading state until both mounted and translations are ready
//   if (!mounted || !ready) {
//     return (
//       <>
//         {/* Top Offer Bar */}
//         <div className="fixed top-[32px] left-0 right-0 bg-[#0A0A0A] text-white text-center text-xs sm:text-sm py-1.5 sm:py-2 z-90">
//           {/* <span className="block text-[10px] sm:text-xs">  {offers[offerIndex]}</span> */}
//           <span
//   className={`block text-[10px] sm:text-xs transition-all duration-300 ease-in-out
//     ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
//   `}
// >
//   {offers[offerIndex]}
// </span>

//         </div>

//         {/* Mobile Top Navbar - Menu | Logo | Settings */}
//         {/* <nav className="sm:hidden fixed top-[32px] left-0 right-0 bg-[#0D0D0D] text-white px-4 py-3 z-80 border-b border-gray-800 flex items-center justify-between"> */}
//         <nav className="sm:hidden fixed top-[32px] left-0 right-0 bg-[#0D0D0D] text-white px-4 py-3 z-40 flex items-center justify-between">
//           <button className="p-1 hover:bg-gray-800 rounded transition-colors">
//             <Menu size={24} />
//           </button>
//           <div className="text-yellow-400 font-bold text-lg" >LOGO</div>
//           <button className="p-1 hover:bg-gray-800 rounded transition-colors">
//             <Settings size={24} />
//           </button>
//         </nav>

//         {/* Desktop Navbar - Static during loading */}
//         <nav className="hidden sm:flex fixed top-[32px] sm:top-[40px] left-0 right-0 bg-[#0D0D0D] text-white px-2 sm:px-4 md:px-10 py-1.5 sm:py-2 md:py-3 z-40 no-rtl-transform">
//           <div className="flex items-center justify-between navbar-flex w-full">
//           {/* Left Section - Logo */}
//           <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-no-reverse shrink-0" style={{ order: 1 }}>
//             <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors">
//               <Menu size={16} className="sm:size-4.5" />
//             </button>
//             <div className="text-yellow-400 font-bold text-xs sm:text-sm md:text-lg whitespace-nowrap">LOGO</div>
//           </div>

//           {/* Center Section - Search */}
//           <div className="hidden sm:flex flex-1 mx-8 md:mx-10 justify-center" style={{ order: 2 }}>
//             <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 max-w-xl w-full flex-no-reverse">
//               <Search size={18} className="text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search for you"
//                 className="bg-transparent outline-none text-sm px-2 w-full text-white placeholder-gray-400 text-left"
//                 dir="ltr"
//               />
//             </div>
//           </div>

//           {/* Right Section - Icons */}
//           <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-2 flex-no-reverse shrink-0" style={{ order: 3 }}>
//               <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowSearch(true)}>
//               <Search size={14} className="sm:size-4" />
//             </button>
//             <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowWishlist(true)}>
//               <Heart size={14} className="sm:size-4" />
//             </button>
//             {/* <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors">
//               <User  size={14}  className="sm:size-4" onClick={() => setShowLogin(true)} />
//             </button> */}
//             <div className="relative">
//   <button
//     onClick={() => setShowUserDropdown(!showUserDropdown)}
//     className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors"
//   >
//     <User
//       className="cursor-pointer hover:text-gray-300 transition-colors"
//       size={14}
//     />
//   </button>

//   {showUserDropdown && (
//     <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg z-50">

//       {/* Your Profile */}
//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
//         onClick={() => {
//           setShowUserDropdown(false);
//           router.push("/myprofile");
//         }}
//       >
//         Your Profile
//       </button>

//       {/* Sign Up */}
//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
//         onClick={() => {
//           setShowUserDropdown(false);
//           setShowLogin(true);
//         }}
//       >
//         Sign Up
//       </button>

//     </div>
//   )}
// </div>

//             <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowCart(true)}>
//               <ShoppingCart size={14} className="sm:size-4" />
//             </button>
//             <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors ml-0.5">
//               <Settings size={16} className="text-white sm:size-4.5" />
//             </button>
//           </div>
//         </div>
//         </nav>

//         {/* Mobile Bottom Navigation Bar - Static during loading */}
//         <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] text-white px-0 py-2 z-40 border-t border-gray-800 flex items-center justify-around">
//           <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors text-yellow-400 bg-gray-800">
//             <Home size={20} />
//           </button>
//            <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors hover:text-red-500" onClick={() => setShowSearch(true)}>
//             <Search size={20} />
//           </button>
//           <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors hover:text-red-500" onClick={() => setShowWishlist(true)}>
//             <Heart size={20} />
//           </button>
//           <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors" onClick={() => setShowCart(true)}>
//             <ShoppingCart size={20} />
//           </button>
//           <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
//             <Search size={20} />
//           </button>
//           {/* <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
//             <User size={20} onClick={() => setShowLogin(true)} />
//           </button> */}
//           <div className="relative">
//   <button
//     className="text-gray-300 hover:text-white transition-colors"
//     onClick={() => setShowUserDropdown(!showUserDropdown)}
//   >
//     <User size={20} />
//   </button>

//   {showUserDropdown && (
//     <div className="absolute bottom-12 right-0 w-40 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg z-50">

//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
//         onClick={() => {
//           setShowUserDropdown(false);
//           router.push("/myprofile");
//         }}
//       >
//         Your Profile
//       </button>

//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
//         onClick={() => {
//           setShowUserDropdown(false);
//           setShowLogin(true);
//         }}
//       >
//         Sign Up
//       </button>

//     </div>
//   )}
// </div>

//         </nav>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* Top Offer Bar */}
//       <div className="fixed top-[32px] left-0 right-0 bg-[#0A0A0A] text-white text-center text-xs sm:text-sm py-1.5 sm:py-2 z-50" suppressHydrationWarning>
//         {/* <span className="block text-[10px] sm:text-xs"> {offers[offerIndex]}</span> */}
//         <span
//   key={offerIndex}
//   className="block text-[10px] sm:text-xs animate-fade"
// >
//   {offers[offerIndex]}
// </span>

//       </div>

//       {/* Mobile Top Navbar - Menu | Logo | Settings */}
//       {/* <nav className="sm:hidden fixed top-6 left-0 right-0 bg-[#0D0D0D] text-white px-4 py-3 z-40 border-b border-gray-800 flex items-center justify-between" dir="ltr" suppressHydrationWarning> */}
//       <nav className="hidden sm:flex fixed top-[32px] sm:top-[40px] left-0 right-0 bg-[#0D0D0D] text-white px-2 sm:px-4 md:px-10 py-1.5 sm:py-2 md:py-3 z-40">
//         <button 
//           className="p-1 hover:bg-gray-800 rounded transition-colors" 
//           onClick={() => setMobileMenuOpen(true)}
//         >
//           <Menu size={24} />
//         </button>
//         <div className="text-yellow-400 font-bold text-lg">
//           {t("navbar.logo")}
//         </div>
//         <button
//           onClick={() => setShowSettings(!showSettings)}
//           className="p-1 hover:bg-gray-800 rounded transition-colors"
//         >
//           <Settings size={24} />
//         </button>
//       </nav>

//       {/* Desktop Navbar - Hidden on Mobile */}
//       <nav className="hidden sm:flex fixed top-[32px] sm:top-[40px] left-0 right-0 bg-[#0D0D0D] text-white px-2 sm:px-4 md:px-10 py-1.5 sm:py-2 md:py-3 z-40" dir="ltr" suppressHydrationWarning>
//         <div className="flex items-center justify-between navbar-flex w-full">
//           {/* Left Section - Logo */}
//           <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-no-reverse shrink-0" style={{ order: 1 }}>
        
//             {/* <div className="text-yellow-400 font-bold text-xs sm:text-sm md:text-lg whitespace-nowrap">
//               {t("navbar.logo")}
//             </div> */}
//             <div
//   onClick={() => router.push("/")}
//   className="text-yellow-400 font-bold text-xs sm:text-sm md:text-lg whitespace-nowrap cursor-pointer"
// >
//   {t("navbar.logo")}
// </div>

//           </div>

//           {/* Center Section - Search */}
//           {/* <div className="hidden sm:flex flex-1 mx-8 md:mx-10 justify-center" style={{ order: 2 }}>
//             <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 max-w-xl w-full flex-no-reverse">
//               <Search size={18} className="text-gray-400" />
//               <input
//                 type="text"
//                 placeholder={t("search")}
//                 className={`bg-transparent outline-none text-sm px-2 w-full text-white placeholder-gray-400 ${
//                   isRTL ? 'text-right' : 'text-left'
//                 }`}
//                 dir={isRTL ? 'rtl' : 'ltr'}
//                 style={{ textAlign: isRTL ? 'right' : 'left' }}
//               />
//             </div>
//           </div> */}

//           {/* Right Section - Icons */}
//           <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-2 flex-no-reverse shrink-0" style={{ order: 3 }}>
//               <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowSearch(true)}>
//               <Search
//                 className="cursor-pointer hover:text-red-500 transition-colors"
//                 size={14}
//               />
//             </button>
//             <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowWishlist(true)}>
//               <Heart
//                 className="cursor-pointer hover:text-red-500 transition-colors"
//                 size={14}
//               />
//             </button>
//             {/* <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors">
//               <User className="cursor-pointer hover:text-gray-300 transition-colors" size={14} onClick={() => setShowLogin(true)} />
//             </button> */}
//             <div className="relative">
//   <button
//     onClick={() => setShowUserDropdown(!showUserDropdown)}
//     className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors"
//   >
//     <User
//       className="cursor-pointer hover:text-gray-300 transition-colors"
//       size={14}
//     />
//   </button>

//   {showUserDropdown && (
//     <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg z-50">

//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
//         onClick={() => {
//           setShowUserDropdown(false);
//           router.push("/myprofile");
//         }}
//       >
//         Your Profile
//       </button>

//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
//         onClick={() => {
//           setShowUserDropdown(false);
//           setShowLogin(true);
//         }}
//       >
//         Sign Up
//       </button>

//     </div>
//   )}
// </div>

//             <button className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors" onClick={() => setShowCart(true)}>
//               <ShoppingCart className="cursor-pointer hover:text-gray-300 transition-colors" size={14} />
//             </button>
            
//             <button
//               onClick={() => setShowSettings(!showSettings)}
//               className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors ml-0.5"
//             >
//               <Settings size={16} className="text-white sm:size-4.5" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Bottom Navigation Bar */}
//       {/* <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] text-white px-0 py-2 z-40 border-t border-gray-800 flex items-center justify-around" dir="ltr" suppressHydrationWarning>
//         <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors text-yellow-400 bg-gray-800">
//           <Home size={20} />
//         </button>
//         <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors hover:text-red-500" onClick={() => setShowWishlist(true)}>
//           <Heart size={20} />
//         </button> */}
//         {/* <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
//           <ShoppingCart size={20} onClick={() => setShowCart(true)}/>
//         </button> */}
//         {/* <button
//   className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors"
//   onClick={() => setShowCart(true)}
// >
//   <ShoppingCart
//     className="cursor-pointer hover:text-gray-300 transition-colors"
//     size={14}
//   />
// </button> */}
// {/* <button
//   className="p-1 sm:p-1.5 hover:bg-gray-700 rounded transition-colors"
//   onClick={() => setShowCart(true)}
// >
//   <ShoppingCart
//     size={14}
//     className="cursor-pointer hover:text-gray-300"
//   />
// </button>


//         <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors" >
//           <Search size={20} onClick={() => setShowSearch(true)}/>
//         </button>
//         <button className="p-3 rounded-lg hover:bg-gray-800 transition-colors">
//           <User size={20} onClick={() => setShowLogin(true)} />
//         </button>
//       </nav> */}
//       <nav className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
//   <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-[#2a2a2a]/90 backdrop-blur-md shadow-lg">
    
//     {/* HOME (ACTIVE) */}
//     <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9A24D] text-black">
//       <Home size={20} />
//     </button>

//     {/* WISHLIST */}
//     <button
//       className="text-gray-300 hover:text-red-500 transition-colors"
//       onClick={() => setShowWishlist(true)}
//     >
//       <Heart size={20} />
//     </button>

//     {/* CART */}
//     <button
//       className="text-gray-300 hover:text-white transition-colors"
//       onClick={() => setShowCart(true)}
//     >
//       <ShoppingCart size={20} />
//     </button>

//     {/* SEARCH */}
//     <button
//       className="text-gray-300 hover:text-white transition-colors"
//       onClick={() => setShowSearch(true)}
//     >
//       <Search size={20} />
//     </button>

//     {/* PROFILE */}
//     <button
//       className="text-gray-300 hover:text-white transition-colors"
//       onClick={() => setShowLogin(true)}
//     >
//       <User size={20} />
//     </button>

//   </div>
// </nav>


//       {/* Settings Overlay */}
//       <SettingsOverlay 
//         isOpen={showSettings} 
//         onClose={() => setShowSettings(false)} 
//       />
//       <LoginModal 
//   isOpen={showLogin} 
//   onClose={() => setShowLogin(false)} 
// />
// <CartSidebar
//       isOpen={showCart}
//       onClose={() => setShowCart(false)}
//     />
// <SearchSidebar
//       isOpen={showSearch}
//       onClose={() => setShowSearch(false)}
//     />
// <WishlistSidebar
//       isOpen={showWishlist}
//       onClose={() => setShowWishlist(false)}
//     />
//       {/* Mobile Menu */}
//       <MobileMenu 
//         isOpen={mobileMenuOpen} 
//         onClose={() => setMobileMenuOpen(false)} 
//       />
//     </>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Heart,
//   User,
//   ShoppingCart,
//   Menu,
//   Search,
//   Settings,
//   Home,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";

// import SettingsOverlay from "@/components/SettingsOverlay";
// import LoginModal from "@/components/LoginModal";
// import CartSidebar from "./CartSidebar";
// import WishlistSidebar from "./WishlistSidebar";
// import SearchSidebar from "./SearchSidebar";
// import MobileMenu from "./MobileMenu";
// import { useLanguage } from "@/lib/useLanguage";

// export default function Navbar() {
//   const router = useRouter();
//   const { t, ready } = useTranslation("common");
//   const { isRTL } = useLanguage();

//   const [mounted, setMounted] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [showWishlist, setShowWishlist] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const offers = t("navbar.offers", {
//     returnObjects: true,
//   }) as string[];

//   const [offerIndex, setOfferIndex] = useState(0);
//   useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     setIsLoggedIn(true);
//   }
// }, []);

//   useEffect(() => {
//     setMounted(true);
//   }, []);
// useEffect(() => {
//   const fetchPromotions = async () => {
//     try {
//       const res = await fetch(
//         "http://localhost:8000/admin/promotion-strip"
//       );
//       const data = await res.json();

//       // Filter active promotions
//       const activePromotions = data
//         .filter((item: any) => item.status === "active")
//         .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
//         .map((item: any) =>
//           isRTL ? item.contentArabic : item.contentEnglish
//         );

//       setOffers(activePromotions);
//     } catch (error) {
//       console.error("Failed to fetch promotions:", error);
//     }
//   };

//   fetchPromotions();
// }, [isRTL]);

//   // useEffect(() => {
//   //   if (!offers || offers.length === 0) return;

//   //   const interval = setInterval(() => {
//   //     setOfferIndex((prev) => (prev + 1) % offers.length);
//   //   }, 5000);

//   //   return () => clearInterval(interval);
//   // }, [offers]);
//   useEffect(() => {
//   if (!offers || offers.length === 0) return;

//   const interval = setInterval(() => {
//     setOfferIndex((prev) => (prev + 1) % offers.length);
//   }, 5000);

//   return () => clearInterval(interval);
// }, [offers]);

//   if (!mounted || !ready) return null;
//   const handleLogout = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     await fetch("http://localhost:8000/user/logout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Remove token
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setShowUserDropdown(false);

//     router.push("/");
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };

//   return (
//     <>
//       {/* 🔥 FIXED HEADER CONTAINER */}
//       <div className="fixed top-0 left-0 right-0 z-50">

//         {/* ===== OFFER BAR ===== */}
//         <div className="bg-[#0D0D0D] text-white text-center text-xs sm:text-sm py-2">
//           <span className="block text-[10px] sm:text-xs">
//             {/* {offers?.[offerIndex]} */}
//             {offers.length > 0 ? offers[offerIndex] : "Loading..."}
//           </span>
//         </div>

//         {/* ===== DESKTOP NAVBAR ===== */}
//         <nav
//           className="hidden sm:flex items-center justify-between bg-[#0D0D0D] text-white px-4 md:px-10 py-3"
//           dir="ltr"
//         >
//           {/* LEFT - LOGO */}
//           <div
//             onClick={() => router.push("/")}
//             className="text-yellow-400 font-bold text-lg cursor-pointer"
//           >
//             {t("navbar.logo")}
//           </div>

//           {/* RIGHT - ICONS */}
// <div className="flex items-center gap-4 ">

//   <Search
//     className="cursor-pointer hover:text-red-500 transition"
//     size={18}
//     onClick={() => setShowSearch(true)}
//   />

//   <Heart
//     className="cursor-pointer hover:text-red-500 transition"
//     size={18}
//     onClick={() => setShowWishlist(true)}
//   />

 
//   <div className="relative">
//   <User
//     className="cursor-pointer hover:text-gray-300 transition"
//     size={18}
//     onClick={() => {
//       if (!isLoggedIn) {
//         setShowLogin(true); // open login modal
//       } else {
//         setShowUserDropdown(!showUserDropdown);
//       }
//     }}
//   />

//   {isLoggedIn && showUserDropdown && (
//     <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg">
      
//       {/* Profile */}
//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
//         onClick={() => {
//           setShowUserDropdown(false);
//           router.push("/myprofile");
//         }}
//       >
//         Your Profile
//       </button>

//       {/* Logout */}
//       <button
//         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </div>
//   )}
// </div>

//   <ShoppingCart
//     className="cursor-pointer hover:text-gray-300 transition"
//     size={18}
//     onClick={() => setShowCart(true)}
//   />

//   {/* 🔥 SETTINGS AFTER CART (Desktop only) */}
//   <Settings
//     className="cursor-pointer hover:text-gray-300 transition hidden sm:block"
//     size={18}
//     onClick={() => setShowSettings(true)}
//   />
// </div>
//         </nav>

//         {/* ===== MOBILE NAVBAR ===== */}
//         <nav className="sm:hidden flex items-center justify-between bg-[#0D0D0D] text-white px-4 py-3">

//           <Menu
//             size={22}
//             onClick={() => setMobileMenuOpen(true)}
//             className="cursor-pointer"
//           />

//           <div
//             onClick={() => router.push("/")}
//             className="text-yellow-400 font-bold text-lg cursor-pointer"
//           >
//             {t("navbar.logo")}
//           </div>

//           <Settings
//             size={22}
//             onClick={() => setShowSettings(true)}
//             className="cursor-pointer"
//           />
//         </nav>
//       </div>

//       {/* ===== MOBILE FLOAT NAV ===== */}
//       <nav className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
//         <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-[#2a2a2a]/90 backdrop-blur-md shadow-lg">

//           <Home size={20} />

//           <Heart size={20} onClick={() => setShowWishlist(true)} />

//           <ShoppingCart size={20} onClick={() => setShowCart(true)} />

//           <Search size={20} onClick={() => setShowSearch(true)} />

//           <User size={20} onClick={() => setShowLogin(true)} />
//         </div>
//       </nav>

//       {/* ===== SIDEBARS & MODALS ===== */}
//       <SettingsOverlay isOpen={showSettings} onClose={() => setShowSettings(false)} />
//       <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
//       <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
//       <WishlistSidebar isOpen={showWishlist} onClose={() => setShowWishlist(false)} />
//       <SearchSidebar isOpen={showSearch} onClose={() => setShowSearch(false)} />
//       <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Heart,
  User,
  ShoppingCart,
  Menu,
  Search,
  Settings,
  Home,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser, selectIsAuthenticated } from "@/app/features/auth";
import { toast } from "react-toastify";
import SettingsOverlay from "@/components/SettingsOverlay";
import LoginModal from "@/components/LoginModal";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import SearchSidebar from "./SearchSidebar";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "@/lib/useLanguage";
import { useCurrency } from "@/contexts/CurrencyContext";
import { COUNTRIES } from "@/lib/countries";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { t, ready } = useTranslation("common");
  const { isRTL, languages, changeLanguage, currentLang } = useLanguage();
  const { selectedCountry, setSelectedCountry } = useCurrency();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Refs for dropdowns to detect outside clicks
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // ✅ NEW PROMOTION STATES
  const [offers, setOffers] = useState<string[]>([]);
  const [offerIndex, setOfferIndex] = useState(0);
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ FETCH PROMOTION STRIP
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(
          `${API_URL}/admin/promotion-strip`,
          { cache: "no-store" }
        );

        const data = await res.json();

        const activePromotions = data
          .filter((item: any) => item.status === "active")
          .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
          .map((item: any) =>
            isRTL ? item.contentArabic : item.contentEnglish
          );

        setOffers(activePromotions);
      } catch (error) {
        console.error("Promotion fetch error:", error);
      }
    };

    fetchPromotions();
  }, [isRTL]);

  // ✅ AUTO ROTATION
  useEffect(() => {
    if (!offers.length) return;

    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [offers]);

  // ✅ CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    if (showUserDropdown || showCountryDropdown || showLanguageDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown, showCountryDropdown, showLanguageDropdown]);

  // ✅ CLOSE DROPDOWN WHEN SIDEBARS OPEN
  useEffect(() => {
    if (showWishlist || showCart || showSearch || showSettings) {
      setShowUserDropdown(false);
      setShowCountryDropdown(false);
      setShowLanguageDropdown(false);
    }
  }, [showWishlist, showCart, showSearch, showSettings]);

  if (!mounted || !ready) return null;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logged out successfully");
      setShowUserDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        
        {/* 🔥 PROMOTION BAR */}
        {/* <div className="bg-[#0A0A0A] text-white text-center text-xs sm:text-sm py-4">
          <span className="block text-[10px] sm:text-xs">
            {offers.length > 0 ? offers[offerIndex] : "Loading..."}
          </span>
        </div>     */}
        <div className="bg-[#0A0A0A] text-white text-center py-3">
  <span className="block text-sm sm:text-base font-medium tracking-wide">
    {offers.length > 0 ? offers[offerIndex] : "Loading..."}
  </span>
</div>

        {/* DESKTOP NAVBAR */}
        <nav
          dir="ltr"
          className="hidden sm:flex items-center justify-between bg-[#0D0D0D] text-white px-4 md:px-10 py-3"
        >
          <div
            onClick={() => router.push("/")}
            className="text-yellow-400 font-bold text-lg cursor-pointer"
          >
            {t("navbar.logo")}
          </div>

          <div className="flex items-center gap-4">

            <Search size={18} onClick={() => setShowSearch(true)} className="cursor-pointer hover:text-gray-300 transition" />
            <Heart size={18} onClick={() => setShowWishlist(true)} className="cursor-pointer hover:text-red-500 transition" />

            <div className="relative" ref={userDropdownRef}>
              <User
                size={18}
                className="cursor-pointer hover:text-gray-300 transition"
                onClick={() => {
                  if (!isAuthenticated) setShowLogin(true);
                  else setShowUserDropdown(!showUserDropdown);
                }}
              />

              {isAuthenticated && showUserDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg z-100">
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition rounded-t-lg"
                    onClick={() => {
                      setShowUserDropdown(false);
                      router.push("/myprofile");
                    }}
                  >
                    Your Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition rounded-t-lg"
                    onClick={() => {
                      setShowUserDropdown(false);
                      router.push("/myorders");
                    }}
                  >
                    Your Orders
                  </button>

                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400 transition rounded-b-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <ShoppingCart size={18} onClick={() => setShowCart(true)} className="cursor-pointer hover:text-gray-300 transition" />

            {/* COUNTRY & LANGUAGE GROUP */}
            <div className="flex items-center gap-1.5">
              
              {/* COUNTRY SELECTOR */}
              <div className="relative" ref={countryDropdownRef}>
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center justify-center p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
                  title={selectedCountry.name}
                >
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                </button>

                {showCountryDropdown && (
                  <div className="absolute right-0 mt-2 bg-[#1a1a1a] rounded-lg shadow-lg z-50 min-w-max border border-gray-700 max-h-64 overflow-y-auto">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                          selectedCountry.code === country.code ? 'bg-gray-700 text-yellow-400' : 'text-gray-200'
                        }`}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{country.name}</span>
                          <span className="text-xs text-gray-400">{country.currency} ({country.currencySymbol})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* LANGUAGE SELECTOR */}
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center justify-center p-1.5 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors text-sm cursor-pointer"
                  title={currentLang.name}
                >
                  <span className="text-xs font-bold uppercase">{currentLang.name}</span>
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 bg-[#1a1a1a] rounded-lg shadow-lg z-50 min-w-max border border-gray-700 max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                          currentLang.code === lang.code ? 'bg-gray-700 text-yellow-400' : 'text-gray-200'
                        }`}
                      >
                        <img
                          src={lang.flag}
                          alt={lang.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* <Settings size={18} onClick={() => setShowSettings(true)} className="cursor-pointer hover:text-gray-300 transition hidden sm:block" /> */}
          </div>
        </nav>

        {/* MOBILE NAVBAR */}
        <nav
          dir="ltr"
          className="sm:hidden flex items-center justify-between bg-[#0D0D0D] text-white px-4 py-3"
        >
          <Menu size={22} onClick={() => setMobileMenuOpen(true)} className="cursor-pointer" />
          <div
            onClick={() => router.push("/")}
            className="text-yellow-400 font-bold text-lg cursor-pointer"
          >
            {t("navbar.logo")}
          </div>
          <Settings size={22} onClick={() => setShowSettings(true)} className="cursor-pointer" />
        </nav>
      </div>

      {/* MOBILE FLOAT NAV */}
      <nav
        dir="ltr"
        className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-[#2a2a2a]/90 backdrop-blur-md shadow-lg">
          <Home size={20} onClick={() => router.push("/")} className="cursor-pointer" />
          <Heart size={20} onClick={() => setShowWishlist(true)} className="cursor-pointer" />
          <ShoppingCart size={20} onClick={() => setShowCart(true)} className="cursor-pointer" />
          <Search size={20} onClick={() => setShowSearch(true)} className="cursor-pointer" />
          <User size={20} onClick={() => setShowLogin(true)} className="cursor-pointer" />
        </div>
      </nav>

      {/* SIDEBARS */}
      <SettingsOverlay isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
      <WishlistSidebar isOpen={showWishlist} onClose={() => setShowWishlist(false)} />
      <SearchSidebar isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
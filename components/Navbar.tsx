"use client";

import { useState } from "react";
import { Heart, User, ShoppingCart, Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Offer Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#0A0A0A] text-white text-center text-sm py-2 z-50">
        Buy for ₹999 and enjoy a cool 25% OFF!
      </div>

      {/* Main Navbar */}
      <nav className="fixed top-9 left-0 right-0 bg-[#0D0D0D] text-white px-4 md:px-10 py-3 flex items-center justify-between z-50">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="text-yellow-400 font-bold text-lg">LOGO</div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="flex items-center bg-gray-800 rounded-full px-4 py-2  max-w-xl">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search for you"
              className="bg-transparent outline-none text-sm px-2 w-full text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
      <div className="flex items-center gap-5">
  <Heart className="cursor-pointer" />
  <User className="cursor-pointer" />
  <ShoppingCart className="cursor-pointer" />

  <div className="flex items-center gap-2 cursor-pointer">
    <img
      src="https://flagcdn.com/w40/in.png"
      alt="India"
      className="w-5 h-5 rounded-full object-cover"
    />
    <span className="text-sm">English</span>
  </div>
</div>

      </nav>

      {/* Mobile Search */}
      <div className="md:hidden bg-gray-900 px-4 py-2 fixed top-[60px] left-0 right-0 z-40">
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for you"
            className="bg-transparent outline-none text-sm px-2 w-full text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black text-white px-4 py-4 space-y-4 fixed top-[110px] left-0 right-0 z-40">
          <div className="flex gap-4">
            <Heart />
            <User />
            <ShoppingCart />
          </div>
          <div className="flex items-center gap-2">
            <img src="https://flagcdn.com/w20/gb.png" alt="en" />
            <span>English</span>
          </div>
        </div>
      )}
    </>
  );
}

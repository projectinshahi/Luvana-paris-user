"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#C9A24D] mb-4">LUVANA</h3>
            <p className="text-gray-400 mb-6">
              Your trusted destination for premium beauty products from around the world.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#C9A24D] transition">
                <Mail size={18} />
                <span>support@luvana.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#C9A24D] transition">
                <Phone size={18} />
                <span>+91 1800 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#C9A24D] transition">
                <MapPin size={18} />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Brands
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C9A24D] transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3">We Accept</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-400">Visa</span>
                <span className="bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-400">Mastercard</span>
                <span className="bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-400">UPI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              &copy; 2024 LUVANA. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-[#C9A24D] text-sm transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C9A24D] text-sm transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C9A24D] text-sm transition">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

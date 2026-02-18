"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in");
  };
  const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="20"
    height="20"
  >
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.4 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.3l-6.1-5C29.3 35.7 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 4.9-5.8 6.2l6.1 5C39.5 35.8 44 30.4 44 24c0-1.3-.1-2.5-.4-3.5z"/>
  </svg>
);


  return (
    <>
      {/* 🔒 Blur + dark overlay (EXCLUDES NAVBAR) */}
      {/* Adjust top-[64px] if your navbar height is different */}
      {/* <div
        className="fixed top-[64px] left-0 right-0 bottom-0 z-[60] bg-black/60 backdrop-blur-md"
        onClick={onClose}
      /> */}
      <div
  className="fixed top-24 left-0 right-0 bottom-0 z-60"
  style={{
    backgroundColor: "#24232380",
    backdropFilter: "blur(12px)",
  }}
  onClick={onClose}
/>


      {/* 🟨 Modal layer */}
      <div className="fixed inset-0 z-70 flex items-center justify-center pointer-events-none">
        <div
          className="relative bg-[#1a1a1a] rounded-2xl w-full max-w-md mx-4 p-8 shadow-2xl border border-gray-800 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full transition"
          >
            <X size={20} className="text-gray-400" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A24D] transition ${
                isRTL ? "text-right" : "text-left"
              }`}
              dir={isRTL ? "rtl" : "ltr"}
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A24D] transition ${
                  isRTL ? "text-right pr-12" : "text-left pr-12"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition ${
                  isRTL ? "left-2" : "right-2"
                }`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#C9A24D] hover:bg-[#B8934C] text-black font-semibold rounded-lg transition duration-300 mt-6"
            >
              Continue
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white rounded-lg transition duration-300 flex items-center justify-center gap-3"
          >
            <GoogleIcon />
            sign in with google
          </button>
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account? <button className="text-[#C9A24D] hover:text-[#B8934C] font-medium transition">Sign up</button>
          </p>

          {/* Footer */}
          {/* <p className="text-center text-gray-400 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <button className="text-[#C9A24D] hover:text-[#B8934C] font-medium transition">
              Sign up
            </button>
          </p> */}
        </div>
      </div>
    </>
  );
}

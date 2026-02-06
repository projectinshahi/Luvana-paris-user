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
            Sign in with Google
          </button>

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

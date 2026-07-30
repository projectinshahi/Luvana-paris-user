"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerUser, selectAuthLoading, selectAuthError } from "@/app/features/auth";
import { toast } from "react-toastify";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [capsOn, setCapsOn] = useState(false);

  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();

  // Password strength (0–4), display only — does not affect validation
  const pwScore = password
    ? [password.length >= 8, /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length
    : 0;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Dispatch Redux action
    const resultAction = await dispatch(
      registerUser({
        name,
        email,
        phone,
        password,
        confirmPassword,
      })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success("🎉 Registration successful! Please login to continue.");
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      // Switch to login modal after a short delay
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } else if (registerUser.rejected.match(resultAction)) {
      toast.error(
        (resultAction.payload as string) || "Registration failed"
      );
    }
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up
    console.log("Google sign up");
  };

  return (
    <>
      {/* Backdrop - starts below complete navbar (offer bar + main navbar) */}
      <div
        className="fixed top-18 sm:top-20 left-0 right-0 bottom-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ zIndex: 45 }}
        onClick={onClose}
      />
      
      {/* Modal with slide-in from right animation */}
      <div className="fixed pt-20 inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 45 }}>
        <div 
          className="relative bg-card rounded-2xl w-full max-w-md mx-4 p-6 sm:p-8 shadow-luxury-lg border border-line pointer-events-auto max-h-[90vh] overflow-y-auto animate-slide-in-right scrollbar-hide"
          onClick={(e) => e.stopPropagation()}
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
        >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 hover:bg-champagne rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <X size={20} className="text-muted hover:text-ink" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-ink text-center mb-8">
          Sign Up
        </h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={`w-full px-4 py-3 bg-card border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{ fontSize: '16px' }}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={`w-full px-4 py-3 bg-card border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{ fontSize: '16px' }}
              required
            />
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="tel"
              placeholder="Phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className={`w-full px-4 py-3 bg-card border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => setCapsOn(e.getModifierState("CapsLock"))}
              autoComplete="new-password"
              className={`w-full px-4 py-3 bg-card border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition ${
                isRTL ? 'text-right pr-12' : 'text-left pr-12'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{ fontSize: '16px' }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={`absolute top-1/2 -translate-y-1/2 p-2.5 text-muted hover:text-ink transition rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isRTL ? 'left-2' : 'right-2'
              }`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password strength + Caps Lock — display only, fixed height (no CLS) */}
          <div className="min-h-[18px] -mt-3">
            {password && (
              <div className="grid grid-cols-4 gap-1" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-colors duration-300 ${
                      i < pwScore
                        ? pwScore <= 1 ? "bg-red-400" : pwScore === 2 ? "bg-warning" : pwScore === 3 ? "bg-gold" : "bg-success"
                        : "bg-line"
                    }`}
                  />
                ))}
              </div>
            )}
            {capsOn && <p className="text-[11px] text-warning mt-1">Caps Lock is on</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className={`w-full px-4 py-3 bg-card border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition ${
                isRTL ? 'text-right pr-12' : 'text-left pr-12'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{ fontSize: '16px' }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className={`absolute top-1/2 -translate-y-1/2 p-2.5 text-muted hover:text-ink transition rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isRTL ? 'left-2' : 'right-2'
              }`}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold hover:bg-gold-dark text-cream font-semibold uppercase tracking-wide rounded-full transition duration-300 mt-6 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[.99] flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            {loading && <span className="inline-block w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" />}
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-line" />
          <span className="text-muted text-sm">or</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        {/* Google Sign Up */}
        <button
          type="button"
          onClick={() => toast.info("Google Sign Up coming soon!")}
          className="w-full py-3 bg-card hover:bg-champagne border border-line text-ink rounded-lg transition duration-300 flex items-center justify-center gap-3 active:scale-[.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z" fill="#4285F4"/>
            <path d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"/>
            <path d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40665 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"/>
            <path d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"/>
          </svg>
          Sign up with google
        </button>
       <button
  type="button"
  onClick={() => toast.info("Apple Sign Up coming soon!")}
  className="w-full py-3 mt-3 bg-black hover:bg-gray-900 border border-line text-white rounded-lg transition duration-300 flex items-center justify-center gap-3 active:scale-[.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="white"
  >
    <path d="M16.365 1.43c0 1.14-.46 2.24-1.22 3.05-.78.82-2.06 1.45-3.19 1.36-.15-1.08.39-2.23 1.14-3.02.82-.86 2.16-1.48 3.27-1.39zM21.4 17.13c-.6 1.36-.89 1.97-1.69 3.18-1.11 1.66-2.67 3.73-4.63 3.75-1.73.02-2.18-1.13-4.52-1.12-2.34.01-2.83 1.14-4.56 1.12-1.96-.02-3.45-1.88-4.57-3.55C.6 17.34-.7 12.52 1.21 9.47c1.36-2.15 3.51-3.41 5.53-3.41 2.05 0 3.34 1.15 5.03 1.15 1.64 0 2.65-1.15 5-1.15 1.8 0 3.7.98 5.05 2.68-4.46 2.46-3.75 8.83.22 10.39z"/>
  </svg>

  Continue with Apple
</button>
        {/* Social Media Icons */}
        {/* <div className="flex items-center justify-center gap-4 mt-6"> */}
          {/* Facebook */}
          {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button> */}

          {/* Twitter/X */}
          {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button> */}

          {/* Instagram */}
          {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
              <defs>
                <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FD5949"/>
                  <stop offset="50%" stopColor="#D6249F"/>
                  <stop offset="100%" stopColor="#285AEB"/>
                </linearGradient>
              </defs>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button> */}

          {/* YouTube */}
          {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </button> */}
        {/* </div> */}

        {/* Login Link */}
        <p className="text-center text-muted text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-gold-dark hover:text-gold font-medium transition rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gold px-1"
          >
            Login
          </button>
        </p>
      </div>
      </div>
    </>
  );
}

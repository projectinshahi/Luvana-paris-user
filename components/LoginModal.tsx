// "use client";

// import { useState } from "react";
// import { X, Eye, EyeOff } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";
// import SignupModal from "./SignupModal";
// import Toast from "./Toast";

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showSignup, setShowSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  
//   const { t } = useTranslation("common");
//   const { isRTL } = useLanguage();

//   if (!isOpen && !showSignup) return null;

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   console.log("Login:", { email, password });
//   // };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setError("");

//     // Basic validation
//     if (!email || !password) {
//       setToast({ message: "Please enter email and password", type: "error" });
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("http://localhost:8000/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Save token
//       localStorage.setItem("token", data.token);

//       setToast({ message: "✨ Login successful! Welcome back!", type: "success" });

//       // Close modal after short delay
//       setTimeout(() => {
//         onClose();
//       }, 1500);

//     } catch (err: any) {
//       setToast({ message: err.message || "Login failed. Please check your credentials.", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     console.log("Google sign in");
//   };

//   const handleSwitchToSignup = () => {
//     setShowSignup(true);
//   };

//   const handleSwitchToLogin = () => {
//     setShowSignup(false);
//   };

//   const GoogleIcon = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 48 48"
//       width="20"
//       height="20"
//     >
//       <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"/>
//       <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.4 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/>
//       <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.3l-6.1-5C29.3 35.7 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
//       <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 4.9-5.8 6.2l6.1 5C39.5 35.8 44 30.4 44 24c0-1.3-.1-2.5-.4-3.5z"/>
//     </svg>
//   );

//   // If signup modal is open, show it instead
//   if (showSignup) {
//     return (
//       <SignupModal
//         isOpen={true}
//         onClose={() => {
//           setShowSignup(false);
//           onClose();
//         }}
//         onSwitchToLogin={handleSwitchToLogin}
//       />
//     );
//   }

//   return (
//     <>
//       {/* Toast Notification */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {/* Backdrop - starts below complete navbar (offer bar + main navbar) */}
//       <div
//         className="fixed top-18 sm:top-20 left-0 right-0 bottom-0 backdrop-blur-sm transition-opacity duration-300"
//         style={{ backgroundColor: '#2423380', zIndex: 45 }}
//         onClick={onClose}
//       />

//       {/* Modal with slide-in from right animation */}
//       <div 
//         className="fixed inset-0 flex items-center justify-center pointer-events-none"
//         style={{ zIndex: 45 }}
//       >
//         <div
//           className="relative bg-[#2423380] rounded-2xl w-full max-w-md mx-4 p-8 shadow-2xl  pointer-events-auto animate-slide-in-right"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full transition"
//           >
//             <X size={20} className="text-gray-400" />
//           </button>

//           {/* Title */}
//           <h2 className="text-2xl font-semibold text-white text-center mb-8">
//             Login
//           </h2>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email Input */}
//             <div>
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none  transition ${
//                   isRTL ? 'text-right' : 'text-left'
//                 }`}
//                 dir={isRTL ? 'rtl' : 'ltr'}
//                 style={{ fontSize: '16px' }}
//                 required
//               />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none  transition ${
//                   isRTL ? 'text-right pr-12' : 'text-left pr-12'
//                 }`}
//                 dir={isRTL ? 'rtl' : 'ltr'}
//                 style={{ fontSize: '16px' }}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className={`absolute top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition ${
//                   isRTL ? 'left-2' : 'right-2'
//                 }`}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             {/* Continue Button */}
//             {/* <button
//               type="submit"
//               className="w-full py-3 bg-[#C9A24D] hover:bg-[#B8934C] text-black font-semibold rounded-lg transition duration-300 mt-6"
//             >
//               Continue
//             </button> */}
//             <button
//   type="submit"
//   disabled={loading}
//   className="w-full py-3 bg-[#C9A24D] hover:bg-[#B8934C] text-black font-semibold rounded-lg transition duration-300 mt-6 disabled:opacity-50"
// >
//   {loading ? "Logging in..." : "Continue"}
// </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-4 my-6">
//             <div className="flex-1 h-px bg-gray-700" />
//             <span className="text-gray-500 text-sm">or</span>
//             <div className="flex-1 h-px bg-gray-700" />
//           </div>

//           {/* Google Sign In */}
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white rounded-lg transition duration-300 flex items-center justify-center gap-3"
//           >
//             <GoogleIcon />
//             Sign in with google
//           </button>

//           {/* Social Media Icons */}
//           {/* <div className="flex items-center justify-center gap-4 mt-6"> */}
//             {/* Facebook */}
//             {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
//                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//               </svg>
//             </button> */}

//             {/* Twitter/X */}
//             {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
//                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//               </svg>
//             </button> */}

//             {/* Instagram */}
//             {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#instagram-gradient-login)">
//                 <defs>
//                   <linearGradient id="instagram-gradient-login" x1="0%" y1="100%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#FD5949"/>
//                     <stop offset="50%" stopColor="#D6249F"/>
//                     <stop offset="100%" stopColor="#285AEB"/>
//                   </linearGradient>
//                 </defs>
//                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//               </svg>
//             </button> */}

//             {/* YouTube */}
//             {/* <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
//                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//               </svg>
//             </button> */}
//           {/* </div> */}

//           {/* Sign Up Link */}
//           <p className="text-center text-gray-400 text-sm mt-6">
//             Don't have an account?{" "}
//             <button 
//               type="button"
//               onClick={handleSwitchToSignup}
//               className="text-[#C9A24D] hover:text-[#B8934C] font-medium transition"
//             >
//               Sign up
//             </button>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import SignupModal from "./SignupModal";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  loginUser,
  selectAuthLoading,
  selectIsAuthenticated,
} from "@/app/features/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();

  useEffect(() => {
    if (isAuthenticated && justLoggedIn) {
      toast.success("✨ Login successful! Welcome back!");
      setJustLoggedIn(false);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [isAuthenticated, justLoggedIn, onClose]);

  if (!isOpen && !showSignup) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    const resultAction = await dispatch(
      loginUser({ email, password })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      setJustLoggedIn(true);
    } else if (loginUser.rejected.match(resultAction)) {
      toast.error(
        (resultAction.payload as string) || "Login failed"
      );
    }
  };

  const handleSwitchToSignup = () => {
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
  };

  if (showSignup) {
    return (
      <SignupModal
        isOpen={true}
        onClose={() => {
          setShowSignup(false);
          onClose();
        }}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  return (
    <>
      <div
        className="fixed top-18 sm:top-20 left-0 right-0 bottom-0 backdrop-blur-sm transition-opacity duration-300"
        style={{ backgroundColor: "#2423380", zIndex: 45 }}
        onClick={onClose}
      />

      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 45 }}
      >
        <div
          className="relative bg-[#2423380] rounded-2xl w-full max-w-md mx-4 p-8 shadow-2xl pointer-events-auto animate-slide-in-right"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full transition"
          >
            <X size={20} className="text-gray-400" />
          </button>

          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                  isRTL ? "text-right" : "text-left"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ fontSize: "16px" }}
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                  isRTL ? "text-right pr-12" : "text-left pr-12"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ fontSize: "16px" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition ${
                  isRTL ? "left-2" : "right-2"
                }`}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading as boolean}
              className="w-full py-3 bg-[#C9A24D] hover:bg-[#B8934C] text-black font-semibold rounded-lg transition duration-300 mt-6 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
            <button
          type="button"
          onClick={() => toast.info("Google Sign Up coming soon!")}
          className="w-full py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white rounded-lg transition duration-300 flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z" fill="#4285F4"/>
            <path d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"/>
            <path d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40665 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"/>
            <path d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"/>
          </svg>
          Sign up with google
        </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSwitchToSignup}
              className="text-[#C9A24D] hover:text-[#B8934C] font-medium transition"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
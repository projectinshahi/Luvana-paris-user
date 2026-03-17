"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={24} className="text-green-500" />,
    error: <XCircle size={24} className="text-red-500" />,
    info: <AlertCircle size={24} className="text-blue-500" />,
  };

  const bgColors = {
    success: "bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/30",
    error: "bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/30",
    info: "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/30",
  };

  return (
    <div
      className={`fixed top-20 right-4 z-100 min-w-[320px] max-w-md ${bgColors[type]} border backdrop-blur-lg rounded-xl shadow-2xl animate-slide-in-right`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 bg-gray-800/50 rounded-b-xl overflow-hidden">
        <div
          className={`h-full ${
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          } animate-progress`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-progress {
          animation: progress linear;
        }
      `}</style>
    </div>
  );
}

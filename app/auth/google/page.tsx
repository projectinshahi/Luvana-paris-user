"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/app/features/auth/authSlice";
import { API_BASE_URL } from "@/lib/apiBase";

export default function GoogleAuthCallbackPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ran = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error || !code) {
      setFailed(true);
      return;
    }

    fetch(`${API_BASE_URL}/user/google-auth/exchange?code=${encodeURIComponent(code)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.token) throw new Error(data.message || "Exchange failed");
        dispatch(setCredentials({ token: data.token, user: data.user }));
        router.replace("/");
      })
      .catch(() => {
        setFailed(true);
      });
  }, [dispatch, router]);

  if (failed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-sm px-6">
          <p className="text-base font-medium text-ink mb-2">Google sign-in failed</p>
          <p className="text-sm text-muted mb-6">
            Please try again. If the problem persists, sign in with email and password.
          </p>
          <button
            onClick={() => router.replace("/")}
            className="px-6 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold-dark transition"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted text-sm">Completing sign-in…</p>
      </div>
    </div>
  );
}

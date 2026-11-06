"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/app/features/auth/authSlice";
import { API_BASE_URL } from "@/lib/apiBase";

export default function GoogleAuthCallbackPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error || !code) {
      router.replace("/");
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
        router.replace("/");
      });
  }, [dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted text-sm">Completing sign-in…</p>
      </div>
    </div>
  );
}

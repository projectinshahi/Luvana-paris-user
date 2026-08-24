"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCurrentUser } from "@/app/features/auth";

// Receives the Google OAuth redirect (?token=... or ?error=...), stores the JWT,
// hydrates the Redux auth state via the existing profile fetch, then returns home.
function GoogleAuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = params.get("token");
    const error = params.get("error");

    if (error || !token) {
      toast.error("Google sign-in failed. Please try again.");
      router.replace("/");
      return;
    }

    localStorage.setItem("token", token);
    dispatch(fetchCurrentUser()).finally(() => {
      toast.success("✨ Signed in with Google!");
      router.replace("/");
    });
  }, [params, dispatch, router]);

  return (
    <div className="min-h-[60svh] flex items-center justify-center text-ink-soft">
      Signing you in…
    </div>
  );
}

export default function GoogleAuthPage() {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" />}>
      <GoogleAuthCallback />
    </Suspense>
  );
}

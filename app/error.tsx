"use client";

import { useEffect } from "react";

// Route-level error boundary — catches render/runtime errors in any page and
// shows a graceful, on-brand fallback with a retry instead of a blank screen.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70svh] flex flex-col items-center justify-center gap-6 px-6 text-center bg-cream text-ink">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne">
        <span aria-hidden className="text-2xl text-gold-dark">
          ✦
        </span>
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted">
          An unexpected error occurred. Please try again — if it keeps happening,
          refresh the page.
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold-dark focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
      >
        Try again
      </button>
    </div>
  );
}

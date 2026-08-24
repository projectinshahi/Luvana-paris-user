"use client";

import { useEffect, useState } from "react";

// True on viewports below Tailwind's `md` (768px). SSR-safe: starts false and
// corrects after mount — both callers only render images after a client fetch,
// so the match has resolved before any image paints (no desktop→mobile flash).
export function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return isMobile;
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared behaviour for the site's slide-in drawers (search, cart, wishlist, menu):
 *  - anchors the drawer to the navbar's bottom edge (no gap) → returns `topOffset`
 *  - locks page scroll on <html> while open (globals reserves the gutter → no shift)
 *  - Escape closes
 * Resilient to an unstable `onClose` (kept in a ref) so it never re-runs per render.
 */
export function useDrawer(isOpen: boolean, onClose: () => void) {
  const [topOffset, setTopOffset] = useState(64);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const measure = () => {
      const nav = document.querySelector<HTMLElement>("[data-app-navbar]");
      setTopOffset(nav ? Math.round(nav.getBoundingClientRect().bottom) : 64);
    };
    measure();
    window.addEventListener("resize", measure);

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeRef.current(); };
    document.addEventListener("keydown", onKey);

    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", measure);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prev;
    };
  }, [isOpen]);

  return topOffset;
}

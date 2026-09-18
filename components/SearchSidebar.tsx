"use client";

import Image from "next/image";
import { imageSrc, showPlaceholder } from "@/lib/cloudinary";
import { Search, X, Loader2, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/useDebounce";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/lib/useLanguage";
import { API_BASE_URL } from "@/lib/apiBase";

interface Variant {
  _id: string;
  imageUrlEnglish?: { imageUrl: string }[];
  imageUrlArabic?: { imageUrl: string }[];
}

interface Product {
  _id: string;
  nameEnglish: string;
  nameArabic?: string;
  imageUrlEnglish?: { imageUrl: string }[];
  imageUrlArabic?: { imageUrl: string }[];
  variants?: Variant[];
  minPrice: number | null;
  brand?: {
    nameEnglish: string;
    nameArabic?: string;
  };
}

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_KEY = "recentSearches";

export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage === "ar";

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [topOffset, setTopOffset] = useState(64); // drawer starts exactly at the navbar's bottom
  const debouncedQuery = useDebounce(query, 250);

  /* ================= SEARCH PRODUCTS (logic unchanged) ================= */
  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);
        setShowResults(false);

        const API_URL = API_BASE_URL;
        let url = `${API_URL}/user/product?limit=10`;

        if (debouncedQuery.trim()) {
          url = `${API_URL}/user/product?search=${encodeURIComponent(debouncedQuery)}&limit=10`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setProducts(data.items || []);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) searchProducts();
  }, [debouncedQuery, isOpen]);

  /* ========= OPEN: anchor to navbar, scroll-lock, Escape, focus trap ========= */
  useEffect(() => {
    if (!isOpen) return;
    const asideEl = asideRef.current;
    triggerRef.current = (document.activeElement as HTMLElement) ?? null; // for focus restore

    // Start exactly at the navbar's bottom edge — no gap on any breakpoint.
    const measure = () => {
      const nav = document.querySelector<HTMLElement>("[data-app-navbar]");
      setTopOffset(nav ? Math.round(nav.getBoundingClientRect().bottom) : 64);
    };
    measure();
    window.addEventListener("resize", measure);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !asideEl) return;
      const f = asideEl.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);

    // Lock page scroll on <html> (the viewport scroller); scrollbar-gutter keeps it shift-free.
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const t = setTimeout(() => inputRef.current?.focus(), 60);

    return () => {
      window.removeEventListener("resize", measure);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      clearTimeout(t);
      triggerRef.current?.focus?.(); // restore focus to the search button
    };
  }, [isOpen, onClose]);

  /* ================= RECENT SEARCHES (frontend-only) ================= */
  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      if (Array.isArray(r)) setRecent(r.slice(0, 6));
    } catch { /* ignore */ }
  }, []);

  const saveRecent = (term: string) => {
    const t = term.trim();
    if (!t) return;
    setRecent((prev) => {
      const next = [t, ...prev.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const clearRecent = () => {
    setRecent([]);
    try { localStorage.removeItem(RECENT_KEY); } catch { /* ignore */ }
  };

  const handleProductClick = (productId: string) => {
    saveRecent(query);
    onClose();
    router.push(`/brands/${productId}`);
  };

  const handleClear = () => {
    setQuery("");
    setProducts([]);
    setShowResults(false);
    inputRef.current?.focus();
  };

  const productName = (p: Product) => (isArabic ? p.nameArabic || p.nameEnglish : p.nameEnglish);
  const productImage = (p: Product) => {
    const v = p.variants?.[0];
    // Arabic images are optional, so either language's image beats the placeholder.
    const [first, second] = isArabic
      ? (["imageUrlArabic", "imageUrlEnglish"] as const)
      : (["imageUrlEnglish", "imageUrlArabic"] as const);
    return (
      v?.[first]?.[0]?.imageUrl ||
      v?.[second]?.[0]?.imageUrl ||
      p[first]?.[0]?.imageUrl ||
      p[second]?.[0]?.imageUrl ||
      "/placeholder.png"
    );
  };

  const dir = isArabic ? "rtl" : "ltr";

  return (
    <>
      <style>{`
        .search-scroll::-webkit-scrollbar { width: 6px; }
        .search-scroll::-webkit-scrollbar-thumb { background: #e8ded2; border-radius: 999px; }
        .search-scroll::-webkit-scrollbar-thumb:hover { background: #d8cbb8; }
        .search-scroll { scrollbar-width: thin; scrollbar-color: #e8ded2 transparent; }
      `}</style>

      {/* BACKDROP — starts at the navbar's bottom so the navbar stays clear; fades in/out (200ms) */}
      <div
        aria-hidden
        onClick={onClose}
        style={{ top: topOffset }}
        className={`fixed inset-x-0 bottom-0 z-40 bg-ink/40 backdrop-blur-md transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* DRAWER — right-side sliding panel (left in RTL) */}
      <aside
        ref={asideRef}
        role="dialog"
        aria-modal="true"
        aria-label={isArabic ? "البحث عن المنتجات" : "Search products"}
        dir={dir}
        inert={!isOpen}
        style={{ top: topOffset }}
        className={`fixed bottom-0 right-0 z-50 flex flex-col w-full sm:w-[440px] lg:w-[520px] bg-cream text-ink border border-line shadow-luxury-lg sm:rounded-l-[24px]
          transition-transform duration-200 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ── Sticky header ── */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-line bg-cream/95 backdrop-blur">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {isArabic ? "البحث عن المنتجات" : "Search Products"}
          </h2>
          <button
            onClick={onClose}
            aria-label={isArabic ? "إغلاق البحث" : "Close search"}
            className="p-2 text-ink-soft hover:bg-champagne hover:text-ink rounded-full transition focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Sticky search bar (56px) ── */}
        <div className="shrink-0 px-5 py-3 border-b border-line">
          <div className="relative flex items-center gap-3 h-14 bg-card border border-line rounded-xl px-4 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition">
            {loading ? (
              <Loader2 className="w-5 h-5 text-gold animate-spin shrink-0" aria-hidden />
            ) : (
              <Search className="w-5 h-5 text-muted shrink-0" aria-hidden />
            )}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveRecent(query); }}
              placeholder={isArabic ? "ابحث عن المنتجات والعلامات والفئات..." : "Search products, brands, categories..."}
              aria-label={isArabic ? "البحث" : "Search"}
              className="bg-transparent text-[15px] text-ink placeholder:text-muted outline-none w-full min-w-0"
            />
            {query && (
              <button
                onClick={handleClear}
                aria-label={isArabic ? "مسح" : "Clear"}
                className="p-1 text-muted hover:bg-champagne hover:text-ink rounded-full transition shrink-0 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ── Results (only this scrolls) ── */}
        <div className="search-scroll flex-1 overflow-y-auto px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {/* Recent searches — shown when the box is empty */}
          {!query.trim() && recent.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
                  {isArabic ? "عمليات البحث الأخيرة" : "Recent Searches"}
                </p>
                <button onClick={clearRecent} className="text-xs text-muted hover:text-gold-dark transition">
                  {isArabic ? "مسح" : "Clear"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-card text-sm text-ink-soft hover:border-gold hover:text-gold-dark transition"
                  >
                    <Clock size={13} className="text-muted" aria-hidden />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            /* Skeletons */
            <div className="flex flex-col gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-line">
                  <div className="w-22 h-22 skeleton-luxury rounded-xl shrink-0" />
                  <div className="flex-1">
                    <div className="h-2.5 skeleton-luxury rounded w-20 mb-2" />
                    <div className="h-3 skeleton-luxury rounded w-40 mb-2" />
                    <div className="h-3 skeleton-luxury rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : showResults ? (
            products.length > 0 ? (
              <>
                <p className="text-sm text-muted mb-4">
                  {query.trim()
                    ? isArabic
                      ? `تم العثور على ${products.length} نتيجة`
                      : `Found ${products.length} result${products.length !== 1 ? "s" : ""}`
                    : isArabic
                      ? "منتجات رائجة"
                      : "Popular Products"}
                </p>

                <div className="flex flex-col gap-3">
                  {products.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => handleProductClick(product._id)}
                      className="group w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-line text-start hover:border-gold hover:shadow-luxury transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <div className="relative w-22 h-22 shrink-0 rounded-xl overflow-hidden bg-champagne">
                        <Image
                          src={imageSrc(productImage(product))}
                          alt={productName(product) || ""}
                          onError={showPlaceholder}
                          fill
                          sizes="88px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {product.brand && (
                          <p className="text-[11px] uppercase tracking-[0.12em] text-muted mb-0.5 truncate">
                            {isArabic ? product.brand.nameArabic || product.brand.nameEnglish : product.brand.nameEnglish}
                          </p>
                        )}
                        <p className="text-sm font-medium text-ink line-clamp-2 mb-1.5 leading-snug">
                          {productName(product)}
                        </p>
                        {product.minPrice != null && (
                          <p className="text-base text-gold-dark font-semibold">
                            {formatPrice(product.minPrice)}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* No results */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center mb-4">
                  <Search size={26} className="text-gold-dark" aria-hidden />
                </div>
                <p className="text-base font-medium text-ink">
                  {isArabic ? "لا توجد منتجات" : "No products found"}
                </p>
                <p className="text-sm text-muted mt-1.5 max-w-[15rem]">
                  {isArabic
                    ? `لم نجد نتائج لـ "${query}". جرّب كلمات مختلفة.`
                    : `We couldn't find anything for “${query}”. Try different keywords.`}
                </p>
              </div>
            )
          ) : null}
        </div>
      </aside>
    </>
  );
}

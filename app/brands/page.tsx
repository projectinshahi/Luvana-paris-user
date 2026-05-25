"use client";

import { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Heart, X, Search, SlidersHorizontal, ChevronDown, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import axios from "axios";
import { useCurrency } from "@/contexts/CurrencyContext";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Variant {
  _id: string;
  price: number;
  mrp: number;
  imageUrlEnglish?: { imageUrl: string }[];
  imageUrlArabic?: { imageUrl: string }[];
  currency?: { country: string; price: number; mrp: number }[];
}

interface Product {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  shortDescriptionEnglish: string;
  shortDescriptionArabic: string;
  minPrice: number | null;
  variants?: Variant[];
  category: { _id: string; nameEnglish: string; nameArabic: string };
  brand: { _id: string; nameEnglish: string; nameArabic: string };
  imageUrlEnglish: { imageUrl: string }[];
  imageUrlArabic: { imageUrl: string }[];
}

/* ─── Gold theme constants ───────────────────────────────────────────────── */
const GOLD = "#C9A24D";
const GOLD_LIGHT = "#E2C07A";
const GOLD_DARK = "#A07C30";

/* ─── Skeleton card ──────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="lux-card rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full aspect-[3/4] bg-[#1E1E1E]" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 bg-[#1E1E1E] rounded w-1/3" />
        <div className="h-4 bg-[#1E1E1E] rounded w-3/4" />
        <div className="h-3 bg-[#1E1E1E] rounded w-full" />
        <div className="h-3 bg-[#1E1E1E] rounded w-2/3" />
        <div className="h-5 bg-[#1E1E1E] rounded w-1/4 mt-2" />
        <div className="h-10 bg-[#1E1E1E] rounded-xl mt-3" />
      </div>
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────────────────────── */
function ProductCard({
  product,
  isArabic,
  selectedVariantId,
  formatPrice,
  onCardClick,
  onAddToCart,
  onWishlist,
}: {
  product: Product;
  isArabic: boolean;
  selectedVariantId?: string;
  formatPrice: (n: number) => string;
  onCardClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
  onWishlist: (e: React.MouseEvent) => void;
}) {
  const selectedVariant =
    product.variants?.find((v) => v._id === selectedVariantId) ||
    product.variants?.[0];

  const image = isArabic
    ? selectedVariant?.imageUrlArabic?.[0]?.imageUrl ||
      selectedVariant?.imageUrlEnglish?.[0]?.imageUrl ||
      product.imageUrlArabic?.[0]?.imageUrl ||
      product.imageUrlEnglish?.[0]?.imageUrl
    : selectedVariant?.imageUrlEnglish?.[0]?.imageUrl ||
      selectedVariant?.imageUrlArabic?.[0]?.imageUrl ||
      product.imageUrlEnglish?.[0]?.imageUrl ||
      product.imageUrlArabic?.[0]?.imageUrl;

  const name = isArabic ? product.nameArabic : product.nameEnglish;
  const desc = isArabic ? product.shortDescriptionArabic : product.shortDescriptionEnglish;
  const brandName = isArabic ? product.brand?.nameArabic : product.brand?.nameEnglish;
  const price = selectedVariant?.price ?? product.minPrice ?? 0;

  return (
    <div
      onClick={onCardClick}
      className="lux-card group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
    >
      {/* ── Image ── */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#111]">
        <img
          src={image || "/placeholder.png"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist */}
        <button
          onClick={onWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.7)"; }}
        >
          <Heart size={15} strokeWidth={2} />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] mb-1"
          style={{ color: `${GOLD}99` }}>
          {brandName}
        </p>

        <h3 className="font-semibold text-xs sm:text-sm leading-snug mb-1.5 text-white/90 group-hover:text-white transition-colors line-clamp-2">
          {name}
        </h3>

        <p className="text-[11px] text-white/35 line-clamp-2 mb-2 flex-1 leading-relaxed hidden sm:block">
          {desc}
        </p>

        {/* Price — clean, no strike-through */}
        <div className="mb-3">
          <span className="text-sm sm:text-base font-bold" style={{ color: GOLD }}>
            {formatPrice(price)}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          className="lux-btn-cart w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300"
        >
          <ShoppingCart size={12} strokeWidth={2.5} className="sm:hidden" />
          <ShoppingCart size={14} strokeWidth={2.5} className="hidden sm:block" />
          <span className="sm:hidden">Cart</span>
          <span className="hidden sm:inline">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function BrandsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, currentLanguage } = useLanguage();
  const isArabic = currentLanguage === "ar";
  const { formatPrice } = useCurrency();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [homeCategories, setHomeCategories] = useState<any[]>([]);
  const [homeBrands, setHomeBrands] = useState<any[]>([]);

  /* ── Sync URL params ── */
  useEffect(() => {
    const cat = searchParams.get("category");
    const brand = searchParams.get("brand");
    setSelectedCategories(cat ? cat.split(",") : []);
    setSelectedBrands(brand ? [brand] : []);
    if (brand) setTimeout(() => window.scrollTo(0, 0), 100);
  }, [searchParams]);

  /* ── Fetch home data (categories + brands for filters) ── */
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.luvanaparis.com";
        const res = await axios.get(`${API_URL}/user/home`);
        setHomeCategories(res.data.categories?.filter((c: any) => c.status === "active") || []);
        setHomeBrands(res.data.brands?.filter((b: any) => b.status === "active") || []);
      } catch (e) { console.error(e); }
    };
    fetchHomeData();
  }, []);

  /* ── Fetch products ── */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const cat = searchParams.get("category");
        const brand = searchParams.get("brand");
        const params: any = { page: 1, limit: 50, search: searchQuery };
        if (cat) params.category = cat;
        if (brand) params.brand = brand;
        if (priceRange < 5000) params.maxPrice = priceRange;
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.luvanaparis.com";
        const res = await axios.get(`${API_URL}/user/product`, { params });
        const data = res.data.items || res.data.products || res.data || [];
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) { console.error(e); setProducts([]); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, [searchParams, priceRange, searchQuery]);

  /* ── Handlers ── */
  const updateURL = (cats: string[], brands: string[]) => {
    const p = new URLSearchParams();
    if (cats.length) p.set("category", cats.join(","));
    if (brands.length) p.set("brand", brands.join(","));
    router.push(`/brands?${p.toString()}`);
  };

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) { toast.info("Please login to add to cart"); return; }
    const variantId = selectedVariants[product._id] || product.variants?.[0]?._id;
    if (!variantId) { toast.error("No variant available"); return; }
    try {
      await api.post("/user/cart", { variant: variantId, quantity: 1 });
      toast.success("Added to cart!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleWishlist = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) { toast.info("Please login to save items"); return; }
    const variantId = selectedVariants[product._id] || product.variants?.[0]?._id;
    if (!variantId) { toast.error("No variant available"); return; }
    try {
      await api.post("/user/wishlist", { variant: variantId });
      toast.success("Saved to wishlist!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add to wishlist");
    }
  };

  /* ── Sort ── */
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    const getPrice = (p: Product) => p.variants?.[0]?.price ?? p.minPrice ?? 0;
    if (sortBy === "low") sorted.sort((a, b) => getPrice(a) - getPrice(b));
    if (sortBy === "high") sorted.sort((a, b) => getPrice(b) - getPrice(a));
    return sorted;
  }, [products, sortBy]);

  /* ── Filter panel content ── */
  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Price */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>
          Price Range
        </h3>
        <div className="relative">
          <input
            type="range" min="0" max="5000" value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: GOLD, background: `linear-gradient(to right, ${GOLD} 0%, ${GOLD} ${(priceRange/5000)*100}%, #2A2A2A ${(priceRange/5000)*100}%, #2A2A2A 100%)` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-xs text-white/30">KWD 0</span>
          <span className="text-xs font-semibold" style={{ color: GOLD }}>KWD {priceRange.toLocaleString()}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)` }} />

      {/* Categories */}
      {homeCategories.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>
            Categories
          </h3>
          <div className="space-y-2.5">
            {homeCategories.map((cat) => {
              const active = selectedCategories.includes(cat._id);
              return (
                <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => {
                      const updated = active
                        ? selectedCategories.filter((c) => c !== cat._id)
                        : [...selectedCategories, cat._id];
                      updateURL(updated, selectedBrands);
                    }}
                    className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      borderColor: active ? GOLD : "#3A3A3A",
                      background: active ? `${GOLD}20` : "transparent",
                    }}
                  >
                    {active && <div className="w-2 h-2 rounded-sm" style={{ background: GOLD }} />}
                  </div>
                  <span className={`text-sm transition-colors duration-200 ${active ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                    {isArabic ? cat.nameArabic : cat.nameEnglish}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)` }} />

      {/* Brands */}
      {homeBrands.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>
            Brands
          </h3>
          <div className="space-y-2.5">
            {homeBrands.map((brand) => {
              const active = selectedBrands.includes(brand._id);
              return (
                <label key={brand._id} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => {
                      const updated = active
                        ? selectedBrands.filter((b) => b !== brand._id)
                        : [...selectedBrands, brand._id];
                      updateURL(selectedCategories, updated);
                    }}
                    className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      borderColor: active ? GOLD : "#3A3A3A",
                      background: active ? `${GOLD}20` : "transparent",
                    }}
                  >
                    {active && <div className="w-2 h-2 rounded-sm" style={{ background: GOLD }} />}
                  </div>
                  <span className={`text-sm transition-colors duration-200 ${active ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                    {isArabic ? brand.nameArabic : brand.nameEnglish}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange < 5000) && (
        <button
          onClick={() => { setPriceRange(5000); updateURL([], []); }}
          className="w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-200"
          style={{ borderColor: `${GOLD}40`, color: GOLD }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${GOLD}15`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  const activeFilterCount = selectedCategories.length + selectedBrands.length + (priceRange < 5000 ? 1 : 0);

  return (
    <>
      {/* ── Global luxury styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .lux-page { font-family: 'DM Sans', sans-serif; }

        /* Product card */
        .lux-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease;
        }
        .lux-card:hover {
          border-color: rgba(201,162,77,0.3);
          box-shadow: 0 0 0 1px rgba(201,162,77,0.08), 0 12px 48px rgba(0,0,0,0.6);
          transform: translateY(-3px);
        }

        /* Cart button */
        .lux-btn-cart {
          border: 1px solid rgba(201,162,77,0.5);
          color: ${GOLD};
          background: transparent;
        }
        .lux-btn-cart:hover {
          background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
          border-color: transparent;
          color: #000;
          box-shadow: 0 4px 20px rgba(201,162,77,0.3);
        }

        /* Customize / Filter button — gold, not orange */
        .lux-btn-filter {
          background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD});
          color: #000;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.25s ease;
        }
        .lux-btn-filter:hover {
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
          box-shadow: 0 4px 20px rgba(201,162,77,0.35);
          transform: translateY(-1px);
        }

        /* Search input */
        .lux-search {
          border-radius: 10px;
        }
        .lux-search:focus {
          border-color: rgba(201,162,77,0.45) !important;
          box-shadow: 0 0 0 2px rgba(201,162,77,0.07);
        }

        /* Sort select — compact, auto width */
        .lux-select {
          background: #111;
          border: 1px solid rgba(201,162,77,0.25);
          color: #C9A24D;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: auto;
        }
        .lux-select:focus {
          border-color: rgba(201,162,77,0.6);
          box-shadow: 0 0 0 2px rgba(201,162,77,0.1);
          outline: none;
        }
        .lux-select option { background: #0D0D0D; color: #ccc; }

        /* Filter drawer slide-in */
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .filter-drawer { animation: slideInLeft 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* Card entrance */
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: cardIn 0.4s ease forwards; }

        /* Range input thumb */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: ${GOLD};
          border: 2px solid #000;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(201,162,77,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: ${GOLD};
          border: 2px solid #000;
          cursor: pointer;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0D0D0D; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 2px; }
      `}</style>

      <div className="lux-page pt-27 sm:pt-28 pb-20 min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

          {/* ══ SINGLE-ROW TOOLBAR ══
               [ Search ──────── ] [ Sort By ▾ ] [ Customize ]
               One row on every screen size. No wrapping ever.
               On desktop: Customize is hidden (sidebar handles it).
          ══════════════════════════════════════════════════════ */}
          <div
            className="flex items-center gap-2 mb-6 w-full"
            style={{ flexWrap: "nowrap" }}
          >
            {/* ── Search input — grows to fill remaining space ── */}
            <div className="relative flex-1 min-w-0 sm:min-w-50%">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: `${GOLD}55` }}
              />
              <input
                placeholder={t("brandsPage.searchProducts") || "Search…"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="lux-search w-full bg-[#111] border border-white/8 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 outline-none transition-all"
              />
            </div>

            {/* ── Sort By dropdown — fixed width, never shrinks ── */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="lux-select appearance-none rounded-lg pl-2.5 pr-6 py-2 text-[11px] cursor-pointer"
                style={{ minWidth: 0 }}
              >
                <option value="default">Sort</option>
                <option value="low">Price ↑</option>
                <option value="high">Price ↓</option>
              </select>
              <ChevronDown
                size={10}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: `${GOLD}80` }}
              />
            </div>

            {/* ── Customize — mobile only, fixed width, never shrinks ── */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lux-btn-filter lg:hidden flex items-center gap-1 px-2.5 py-2 rounded-lg text-[11px] flex-shrink-0 whitespace-nowrap"
            >
              <SlidersHorizontal size={11} />
              <span>Customize</span>
              {activeFilterCount > 0 && (
                <span
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0"
                  style={{ background: "rgba(0,0,0,0.35)", color: "#000" }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* ── Layout: sidebar + grid ── */}
          <div className="flex gap-6 lg:gap-8 items-start">

            {/* ── Desktop Filter Sidebar ── */}
            <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-[#111] border border-white/6 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={14} style={{ color: GOLD }} />
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                      Customize
                    </h2>
                  </div>
                  {activeFilterCount > 0 && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${GOLD}18`, color: GOLD, border: `1px solid ${GOLD}35` }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <FilterPanel />
              </div>
            </aside>

            {/* ── Products Grid ── */}
            <main className="flex-1 min-w-0">

              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                  {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}25` }}>
                    <Sparkles size={24} style={{ color: `${GOLD}80` }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white/70 mb-2">No products found</h3>
                  <p className="text-sm text-white/30 mb-6">Try adjusting your filters or search</p>
                  <button
                    onClick={() => { setSearchQuery(""); setPriceRange(5000); updateURL([], []); }}
                    className="lux-btn-filter px-6 py-2.5 rounded-full text-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                  {sortedProducts.map((product, idx) => (
                    <div
                      key={product._id}
                      className="card-enter"
                      style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
                    >
                      <ProductCard
                        product={product}
                        isArabic={isArabic}
                        selectedVariantId={selectedVariants[product._id]}
                        formatPrice={formatPrice}
                        onCardClick={() => router.push(`/brands/${product._id}`)}
                        onAddToCart={(e) => handleAddToCart(e, product)}
                        onWishlist={(e) => handleWishlist(e, product)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>

        {/* ── Mobile Filter Drawer ── */}
        {isFilterOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="filter-drawer fixed top-0 left-0 h-full w-[85vw] max-w-sm bg-[#0D0D0D] z-50 flex flex-col shadow-2xl"
              style={{ borderRight: `1px solid ${GOLD}20` }}>

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: `1px solid ${GOLD}15` }}>
                <div className="flex items-center gap-3">
                  <SlidersHorizontal size={16} style={{ color: GOLD }} />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                    Customize
                  </h2>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${GOLD}20`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <FilterPanel />
              </div>

              {/* Drawer footer */}
              <div className="px-6 py-5" style={{ borderTop: `1px solid ${GOLD}15` }}>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="lux-btn-filter w-full py-3 rounded-xl text-sm"
                >
                  Show {sortedProducts.length} Result{sortedProducts.length !== 1 ? "s" : ""}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

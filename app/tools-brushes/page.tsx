"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Heart, X, SlidersHorizontal, ChevronDown, Sparkles } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { imageSrc, showPlaceholder } from "@/lib/cloudinary";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

/* ─── Gold theme constants ───────────────────────────────────────────────── */
const GOLD = "#8B5E3C";
const GOLD_LIGHT = "#A9764F";
const GOLD_DARK = "#714B2F";

/* ─── Skeleton card ──────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="lux-card rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full aspect-[3/4] skeleton-luxury" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 skeleton-luxury rounded w-1/3" />
        <div className="h-4 skeleton-luxury rounded w-3/4" />
        <div className="h-3 skeleton-luxury rounded w-full" />
        <div className="h-5 skeleton-luxury rounded w-1/4 mt-2" />
        <div className="h-10 skeleton-luxury rounded-xl mt-3" />
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function ToolsBrushesPage() {
  const { formatPrice } = useCurrency();

  const [priceRange, setPriceRange] = useState(5000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ─── Static product data ─────────────────────────────────────────────── */
  const products: Product[] = [
    {
      id: 1,
      name: "Pro Blending Brush Set",
      description: "Ultra-soft synthetic bristles for seamless blending.",
      price: 1299,
      image: "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
      category: "Brushes",
      brand: "GlowLab",
    },
    {
      id: 2,
      name: "Foundation Flat Brush",
      description: "Precision flat brush for flawless foundation application.",
      price: 799,
      image: "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
      category: "Brushes",
      brand: "DermaCare",
    },
    {
      id: 3,
      name: "Contour & Highlight Kit",
      description: "Angled brush set for sculpted, defined looks.",
      price: 2199,
      image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
      category: "Tools",
      brand: "Luxe Beauty",
    },
    {
      id: 4,
      name: "Eyeliner Precision Brush",
      description: "Fine-tip brush for sharp, precise liner application.",
      price: 899,
      image: "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
      category: "Brushes",
      brand: "Luxe Beauty",
    },
    {
      id: 5,
      name: "Makeup Sponge Duo",
      description: "Latex-free sponges for airbrushed coverage.",
      price: 999,
      image: "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
      category: "Tools",
      brand: "SilkRoots",
    },
    {
      id: 6,
      name: "Brush Cleaner Spray",
      description: "Fast-drying formula that sanitises and conditions bristles.",
      price: 749,
      image: "https://svashudhi.com/cdn/shop/collections/hairfall_treatment_square_2400x.jpg?v=1690965512",
      category: "Tools",
      brand: "SilkRoots",
    },
  ];

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  /* ─── Filter + Sort ───────────────────────────────────────────────────── */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (searchQuery)
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    data = data.filter((p) => p.price <= priceRange);

    if (selectedCategories.length)
      data = data.filter((p) => selectedCategories.includes(p.category));

    if (selectedBrands.length)
      data = data.filter((p) => selectedBrands.includes(p.brand));

    if (sortBy === "low") data.sort((a, b) => a.price - b.price);
    if (sortBy === "high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [priceRange, selectedCategories, selectedBrands, sortBy, searchQuery]);

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (priceRange < 5000 ? 1 : 0);

  const resetFilters = () => {
    setPriceRange(5000);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchQuery("");
  };

  /* ─── Filter panel (shared desktop + mobile) ──────────────────────────── */
  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Price */}
      <div>
        <h3
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          style={{ color: GOLD }}
        >
          Price Range
        </h3>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            accentColor: GOLD,
            background: `linear-gradient(to right, ${GOLD} 0%, ${GOLD} ${(priceRange / 5000) * 100}%, #E8DED2 ${(priceRange / 5000) * 100}%, #E8DED2 100%)`,
          }}
        />
        <div className="flex justify-between mt-3">
          <span className="text-xs text-muted">0</span>
          <span className="text-xs font-semibold" style={{ color: GOLD }}>
            {formatPrice(priceRange)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)`,
        }}
      />

      {/* Categories */}
      <div>
        <h3
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          style={{ color: GOLD }}
        >
          Categories
        </h3>
        <div className="space-y-2.5">
          {categories.map((cat) => {
            const active = selectedCategories.includes(cat);
            return (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      active ? prev.filter((c) => c !== cat) : [...prev, cat]
                    )
                  }
                  className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    borderColor: active ? GOLD : "#E8DED2",
                    background: active ? `${GOLD}20` : "transparent",
                  }}
                >
                  {active && (
                    <div className="w-2 h-2 rounded-sm" style={{ background: GOLD }} />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors duration-200 ${
                    active ? "text-ink" : "text-muted group-hover:text-ink-soft"
                  }`}
                >
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)`,
        }}
      />

      {/* Brands */}
      <div>
        <h3
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          style={{ color: GOLD }}
        >
          Brands
        </h3>
        <div className="space-y-2.5">
          {brands.map((brand) => {
            const active = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() =>
                    setSelectedBrands((prev) =>
                      active ? prev.filter((b) => b !== brand) : [...prev, brand]
                    )
                  }
                  className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    borderColor: active ? GOLD : "#E8DED2",
                    background: active ? `${GOLD}20` : "transparent",
                  }}
                >
                  {active && (
                    <div className="w-2 h-2 rounded-sm" style={{ background: GOLD }} />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors duration-200 ${
                    active ? "text-ink" : "text-muted group-hover:text-ink-soft"
                  }`}
                >
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-200"
          style={{ borderColor: `${GOLD}40`, color: GOLD }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${GOLD}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  /* ─── Render ──────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Luxury styles ── */}
      <style>{`
        .lux-page { font-family: 'DM Sans', -apple-system, sans-serif; }

        .lux-card {
          background: #FFFFFF;
          border: 1px solid #E8DED2;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease;
        }
        .lux-card:hover {
          border-color: rgba(139,94,60,0.3);
          box-shadow: 0 0 0 1px rgba(139,94,60,0.08), 0 22px 55px -20px rgba(31,31,31,0.2);
          transform: translateY(-3px);
        }

        .lux-btn-cart {
          border: 1px solid rgba(139,94,60,0.5);
          color: ${GOLD};
          background: transparent;
          transition: all 0.25s ease;
        }
        .lux-btn-cart:hover {
          background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
          border-color: transparent;
          color: #FFFDF9;
          box-shadow: 0 4px 20px rgba(139,94,60,0.3);
        }

        .lux-btn-filter {
          background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD});
          color: #FFFDF9;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.25s ease;
        }
        .lux-btn-filter:hover {
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
          box-shadow: 0 4px 20px rgba(139,94,60,0.35);
          transform: translateY(-1px);
        }

        .lux-select {
          background: #FAF6EF;
          border: 1px solid rgba(139,94,60,0.25);
          color: ${GOLD};
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lux-select:focus {
          border-color: rgba(139,94,60,0.6);
          box-shadow: 0 0 0 2px rgba(139,94,60,0.1);
          outline: none;
        }
        .lux-select option { background: #FFFFFF; color: #2E2A26; }

        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .filter-drawer { animation: slideInLeft 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: cardIn 0.4s ease forwards; }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: ${GOLD};
          border: 2px solid #FFFDF9;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(139,94,60,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: ${GOLD};
          border: 2px solid #FFFDF9;
          cursor: pointer;
        }
      `}</style>

      <div className="lux-page pt-6 sm:pt-10 pb-20 min-h-screen bg-cream text-ink overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

          {/* ── Page heading ── */}
          <div className="mb-6">
            <p className="eyebrow mb-2">Luvana Paris</p>
            <h1
              className="text-2xl sm:text-3xl font-semibold tracking-wide"
              style={{ color: "#2E2A26" }}
            >
              Tools &amp; Brushes
            </h1>
            <p className="text-xs text-muted mt-1 tracking-widest uppercase">
              Professional-grade artistry essentials
            </p>
          </div>

          {/* ══ CONTROLS ROW ══
               Desktop: [Sort▾]  ·  [N items]   (Sort sits above the product grid, right-aligned)
               Mobile:  [Sort▾]  [Customize]  ·  [N items]
          ══════════════════════════════════════════════════════ */}
          <div className="flex items-center gap-2 sm:gap-3 mb-6 w-full">

            {/* Sort By — luxury dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="lux-select appearance-none rounded-lg pl-3 pr-7 py-2 text-xs cursor-pointer"
              >
                <option value="default">Sort By</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
              <ChevronDown
                size={11}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: `${GOLD}80` }}
              />
            </div>

            {/* Customize — mobile only */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lux-btn-filter lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs flex-shrink-0 relative"
            >
              <SlidersHorizontal size={12} />
              Customize
              {activeFilterCount > 0 && (
                <span
                  className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{
                    background: "rgba(255,253,249,0.3)",
                    color: "#FFFDF9",
                    border: "1px solid rgba(255,253,249,0.45)",
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Item count — pushed to the right */}
            <span className="ml-auto text-[11px] text-muted whitespace-nowrap">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ── Main layout: sidebar + grid ── */}
          <div className="flex gap-6 lg:gap-8 items-start">

            {/* ── Desktop Filter Sidebar ── */}
            <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
              <div
                className="sticky top-24 rounded-2xl p-5"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8DED2",
                }}
              >
                {/* Sidebar header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={14} style={{ color: GOLD }} />
                    <h2
                      className="text-xs font-semibold uppercase tracking-[0.2em]"
                      style={{ color: GOLD }}
                    >
                      Customize
                    </h2>
                  </div>
                  {activeFilterCount > 0 && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: `${GOLD}18`,
                        color: GOLD,
                        border: `1px solid ${GOLD}35`,
                      }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <FilterPanel />
              </div>
            </aside>

            {/* ── Product Grid ── */}
            <main className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: `${GOLD}10`,
                      border: `1px solid ${GOLD}25`,
                    }}
                  >
                    <Sparkles size={24} style={{ color: `${GOLD}80` }} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    No products found
                  </h3>
                  <p className="text-sm text-muted mb-6">
                    Try adjusting your filters
                  </p>
                  <button
                    onClick={resetFilters}
                    className="lux-btn-filter px-6 py-2.5 rounded-full text-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                  {filteredProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className="card-enter"
                      style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
                    >
                      <div className="lux-card group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col">

                        {/* Image */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-champagne">
                          <img
                            src={imageSrc(product.image, 640)}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            onError={showPlaceholder}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2A26]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Wishlist */}
                          <button
                            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                            style={{
                              background: "rgba(255,253,249,0.85)",
                              backdropFilter: "blur(8px)",
                              color: "#6D665F",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = GOLD;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,253,249,0.85)";
                            }}
                          >
                            <Heart size={15} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-3 sm:p-4 flex flex-col flex-1">
                          <p
                            className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] mb-1"
                            style={{ color: `${GOLD}99` }}
                          >
                            {product.brand}
                          </p>

                          <h3 className="font-medium text-xs sm:text-sm leading-snug mb-1.5 text-ink group-hover:text-gold transition-colors line-clamp-2">
                            {product.name}
                          </h3>

                          <p className="text-[11px] text-muted line-clamp-2 mb-2 flex-1 leading-relaxed hidden sm:block">
                            {product.description}
                          </p>

                          <div className="mb-3">
                            <span
                              className="text-sm sm:text-base font-semibold"
                              style={{ color: "#2E2A26" }}
                            >
                              {formatPrice(product.price)}
                            </span>
                          </div>

                          <button className="lux-btn-cart w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold tracking-wide">
                            <ShoppingCart size={12} strokeWidth={2.5} className="sm:hidden" />
                            <ShoppingCart size={14} strokeWidth={2.5} className="hidden sm:block" />
                            <span className="sm:hidden">Cart</span>
                            <span className="hidden sm:inline">Add to Cart</span>
                          </button>
                        </div>
                      </div>
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
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-[#2E2A26]/40 z-40 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
            {/* Drawer */}
            <div
              className="filter-drawer fixed top-0 left-0 h-full w-[85vw] max-w-sm bg-cream z-50 flex flex-col shadow-2xl"
              style={{ borderRight: `1px solid ${GOLD}20` }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: `1px solid ${GOLD}15` }}
              >
                <div className="flex items-center gap-3">
                  <SlidersHorizontal size={16} style={{ color: GOLD }} />
                  <h2
                    className="text-sm font-semibold uppercase tracking-[0.2em]"
                    style={{ color: GOLD }}
                  >
                    Customize
                  </h2>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(46,42,38,0.06)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${GOLD}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(46,42,38,0.06)";
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <FilterPanel />
              </div>

              {/* Footer */}
              <div
                className="px-6 py-5"
                style={{ borderTop: `1px solid ${GOLD}15` }}
              >
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="lux-btn-filter w-full py-3 rounded-xl text-sm"
                >
                  Show {filteredProducts.length} Result
                  {filteredProducts.length !== 1 ? "s" : ""}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

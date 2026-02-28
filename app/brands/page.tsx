
  "use client";

  import { useState, useEffect, useMemo } from "react";
  import { ShoppingCart, X, Heart, Search, Sliders } from "lucide-react";
  import { useRouter, useSearchParams } from "next/navigation";
  import { useLanguage } from "@/lib/useLanguage";
  import { toast } from "react-toastify";
  import api from "@/lib/axios";
  import axios from "axios";

 
interface Variant {
  _id: string;
  price: number;
  mrp: number;
}

interface Product {
  _id: string;
  nameEnglish: string;
  shortDescriptionEnglish: string;
  minPrice: number | null;
  variants?: Variant[];
  category: {
    _id: string;
    nameEnglish: string;
  };
  brand: {
    _id: string;
    nameEnglish: string;
  };
  imageUrlEnglish: {
    imageUrl: string;
  }[];
}
  export default function BrandsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // const { t } = useLanguage();
    const { t, currentLanguage } = useLanguage();
const isArabic = currentLanguage === "ar";

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedVariants, setSelectedVariants] = useState<{
  [key: string]: string;
}>({});
    const [priceRange, setPriceRange] = useState(5000);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [homeCategories, setHomeCategories] = useState<any[]>([]);
const [homeBrands, setHomeBrands] = useState<any[]>([]);

    /* ================= LOAD BRAND FROM URL PARAMETER ================= */
    useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
  }, [searchParams]);

    /* ================= LOAD CATEGORY FROM URL PARAMETER ================= */
    useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

    /* ================= FETCH PRODUCTS ================= */
    useEffect(() => {
  const fetchHomeData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/home");

      const activeCategories = res.data.categories.filter(
        (cat: any) => cat.status === "active"
      );

      const activeBrands = res.data.brands.filter(
        (brand: any) => brand.status === "active"
      );

      setHomeCategories(activeCategories);
      setHomeBrands(activeBrands);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  fetchHomeData();
}, []);
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);

    
const params: any = {
  page: 1,
  limit: 50,
  search: searchQuery,
};

// if (selectedCategories.length > 0) {
//   params.category = selectedCategories.join(",");
// }

// if (selectedBrands.length > 0) {
//   params.brand = selectedBrands.join(",");
// }
if (selectedCategories.length > 0) {
  params.category = selectedCategories;
}

if (selectedBrands.length > 0) {
  params.brand = selectedBrands;
}
// Only apply price filter if user actually changed it
if (priceRange < 5000) {
  params.maxPrice = priceRange;
}
          const res = await axios.get(
            "http://localhost:8000/user/product",
            { params }
          );

          console.log("API Response:", res.data); // Debug log
          const items = res.data.items || [];
          console.log("Products count:", items.length); // Debug log
          console.log("Sample product:", items[0]); // Debug log
          
          setProducts(items);
        } catch (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [priceRange, selectedCategories, selectedBrands, searchQuery]);

  
const handleAddToCart = async (product: Product) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const selectedVariantId =
      selectedVariants[product._id] ||
      product.variants?.[0]?._id;

    if (!selectedVariantId) {
      toast.error("No variant available");
      return;
    }

    const response = await api.post("/user/cart", {
      variant: selectedVariantId,
      quantity: 1,
    });

    console.log("✅ Cart Response:", response.data);
    toast.success("✅ Item added to cart successfully!");
  } catch (error: any) {
    console.error("❌ Cart error:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Failed to add to cart");
  }
};

const handleAddToWishlist = async (product: Product) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const selectedVariantId =
      selectedVariants[product._id] ||
      product.variants?.[0]?._id;

    if (!selectedVariantId) {
      toast.error("No variant available");
      return;
    }

    const response = await api.post("/user/wishlist", {
      variant: selectedVariantId,
    });

    console.log("✅ Wishlist Response:", response.data);
    toast.success("❤️ Added to wishlist!");
  } catch (error: any) {
    console.error("❌ Wishlist error:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Failed to add to wishlist");
  }
};

    /* ================= SORT PRODUCTS ================= */
    const sortedProducts = useMemo(() => {
      let sorted = [...products];

      if (sortBy === "low") {
        sorted.sort((a, b) => {
          const priceA = a.minPrice || 0;
          const priceB = b.minPrice || 0;
          return priceA - priceB;
        });
      } else if (sortBy === "high") {
        sorted.sort((a, b) => {
          const priceA = a.minPrice || 0;
          const priceB = b.minPrice || 0;
          return priceB - priceA;
        });
      }

      return sorted;
    }, [products, sortBy]);

    /* ================= FILTER CONTENT ================= */
    const FilterContent = () => (
      <div className="space-y-6">

        {/* Price */}
        <div className="pb-5 border-b border-[#2A2A2A]">
          <h3 className="text-[#C9A24D] font-semibold mb-3 text-sm uppercase tracking-wide">{t("brandsPage.filterByPrice")}</h3>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#C9A24D]"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-400">KWD 0</p>
            <p className="text-sm font-semibold text-[#C9A24D]">KWD {priceRange.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Categories */}
        <div className="pb-5 border-b border-[#2A2A2A]">
          <h3 className="text-[#C9A24D] font-semibold mb-3 text-sm uppercase tracking-wide">{t("brandsPage.categories")}</h3>
          <div className="space-y-2">
            {/* {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(cat.id)
                        ? prev.filter((c) => c !== cat.id)
                        : [...prev, cat.id]
                    )
                  }
                  className="w-4 h-4 rounded border-[#2A2A2A] accent-[#C9A24D] cursor-pointer"
                />
                <span className="text-sm text-gray-300 group-hover:text-[#C9A24D] transition-colors">{cat.name}</span>
              </label>
            ))} */}
            {homeCategories.map((cat) => (
  <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={selectedCategories.includes(cat._id)}
      onChange={() =>
        setSelectedCategories((prev) =>
          prev.includes(cat._id)
            ? prev.filter((c) => c !== cat._id)
            : [...prev, cat._id]
        )
      }
      className="w-4 h-4 rounded border-[#2A2A2A] accent-[#C9A24D] cursor-pointer"
    />
    <span className="text-sm text-gray-300 group-hover:text-[#C9A24D] transition-colors">
      {isArabic ? cat.nameArabic : cat.nameEnglish}
    </span>
  </label>
))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="text-[#C9A24D] font-semibold mb-3 text-sm uppercase tracking-wide">{t("Brands")}</h3>
          <div className="space-y-2">
            {/* {brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() =>
                    setSelectedBrands((prev) =>
                      prev.includes(brand.id)
                        ? prev.filter((b) => b !== brand.id)
                        : [...prev, brand.id]
                    )
                  }
                  className="w-4 h-4 rounded border-[#2A2A2A] accent-[#C9A24D] cursor-pointer"
                />
                <span className="text-sm text-gray-300 group-hover:text-[#C9A24D] transition-colors">{brand.name}</span>
              </label>
            ))} */}
            {homeBrands.map((brand) => (
  <label key={brand._id} className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={selectedBrands.includes(brand._id)}
      onChange={() =>
        setSelectedBrands((prev) =>
          prev.includes(brand._id)
            ? prev.filter((b) => b !== brand._id)
            : [...prev, brand._id]
        )
      }
      className="w-4 h-4 rounded border-[#2A2A2A] accent-[#C9A24D] cursor-pointer"
    />
    <span className="text-sm text-gray-300 group-hover:text-[#C9A24D] transition-colors">
      {isArabic ? brand.nameArabic : brand.nameEnglish}
    </span>
  </label>
))}
          </div>
        </div>
      </div>
    );

    /* ================= UI ================= */
    return (
      <div dir="ltr" className="pt-16 pb-16 min-h-screen bg-linear-to-b from-[#0D0D0D] to-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header Section */}
          <div className="mb-10">
            {/* <h1 className="text-4xl font-bold text-center mb-2">Explore Our Collection</h1>
            <p className="text-center text-gray-400 text-sm">Discover premium beauty and skincare products curated just for you</p> */}
          </div>

          {/* Centered Search Bar */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-2xl flex gap-3 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  placeholder={t("brandsPage.searchProducts")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-full pl-12 pr-4 py-3 text-sm outline-none placeholder-gray-500  transition-colors"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full text-sm font-medium text-white outline-none transition-colors cursor-pointer whitespace-nowrap"
              >
                <option value="default">{t("brandsPage.default")}</option>
                <option value="low">{t("brandsPage.priceLowToHigh")}</option>
                <option value="high">{t("brandsPage.priceHighToLow")}</option>
              </select>

              <button
                onClick={() => setIsFilterOpen(true)}
                className="h-11 px-6 rounded-full text-sm font-medium bg-[#FF7A00] hover:bg-[#E66E00] transition-colors lg:hidden flex items-center gap-2"
              >
                <Sliders size={16} />
                {t("brandsPage.customize")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Desktop Filters */}
            <aside className="hidden lg:block bg-[#1A1A1A] border border-[#2A2A2A] p-6 rounded-xl h-fit sticky top-20">
              <h2 className="text-lg font-bold mb-6 text-white">{t("brandsPage.customize")}</h2>
              <FilterContent />
            </aside>

            {/* Products Grid */}
            <main className="lg:col-span-3">
              {loading ? (
                // Loading Skeleton
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col animate-pulse"
                    >
                      {/* Skeleton Image */}
                      <div className="relative w-full h-64 bg-[#2A2A2A]" />

                      {/* Skeleton Content */}
                      <div className="p-4 flex flex-col flex-1">
                        <div className="h-3 bg-[#2A2A2A] rounded w-20 mb-3" />
                        <div className="h-4 bg-[#2A2A2A] rounded w-32 mb-2" />
                        <div className="h-3 bg-[#2A2A2A] rounded w-full mb-2" />
                        <div className="h-3 bg-[#2A2A2A] rounded w-24 mb-4" />
                        <div className="h-10 bg-[#2A2A2A] rounded-lg mt-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">{t("brandsPage.noProducts")}</h3>
                  <p className="text-gray-400 mb-6">{t("brandsPage.noProducts")}</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange(5000);
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                    }}
                    className="px-6 py-2 bg-[#C9A24D] text-black rounded-full font-medium hover:bg-[#D9B25D] transition-colors"
                  >
                    {t("brandsPage.resetFilters")}
                  </button>
                </div>
              ) : (
                // Products Grid
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => router.push(`/brands/${product._id}`)}
                      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col cursor-pointer group  transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A24D]/10"
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-64 overflow-hidden bg-[#0D0D0D]">
                        <img
                          src={
                            product.imageUrlEnglish?.[0]?.imageUrl ||
                            "/placeholder.png"
                          }
                          alt={product.nameEnglish}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Wishlist Button */}
                        {/* <button className="absolute top-3 right-3 bg-black/70 hover:bg-[#C9A24D] p-2.5 rounded-full transition-all duration-300 transform group-hover:scale-110">
                          <Heart size={16} strokeWidth={2} />
                        </button> */}
                        {/* <button
  onClick={(e) => {
    e.stopPropagation();
    handleAddToWishlist(product._id);
  }}
  className="absolute top-3 right-3 bg-black/70 hover:bg-[#C9A24D] p-2.5 rounded-full transition-all duration-300 transform group-hover:scale-110"
>
  <Heart size={16} strokeWidth={2} />
</button> */}
<button
  onClick={(e) => {
    e.stopPropagation();
    handleAddToWishlist(product);
  }}
  className="absolute top-3 right-3 bg-black/70 hover:bg-[#C9A24D] p-2.5 rounded-full transition-all duration-300 transform group-hover:scale-110"
>
  <Heart size={16} strokeWidth={2} />
</button>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {product.brand?.nameEnglish || "N/A"} • {product.category?.nameEnglish || "N/A"}
                        </p>

                        <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-[#C9A24D] transition-colors">
                          {product.nameEnglish || "Product"}
                        </h3>

                        <p className="text-gray-400 text-sm line-clamp-2 mb-3 -grow">
                          {product.shortDescriptionEnglish || "No description"}
                        </p>
                        {/* {product.variants && product.variants.length > 0 && (
  <select
    onClick={(e) => e.stopPropagation()}
    onChange={(e) =>
      setSelectedVariants((prev) => ({
        ...prev,
        [product._id]: e.target.value,
      }))
    }
    className="mb-3 w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm"
  >
    <option value="">Select Variant</option>
    {product.variants.map((variant) => (
      <option key={variant._id} value={variant._id}>
        ₹{variant.price}
      </option>
    ))}
  </select>
)} */}

                        {/* <p className="text-[#C9A24D] font-bold text-lg mb-4">
                          ₹{product.minPrice ? product.minPrice.toLocaleString("en-IN") : "0"}
                        </p> */}
                        {(() => {
  const firstVariant = product.variants?.[0];

  const price = firstVariant?.price ?? product.minPrice ?? 0;
  const mrp = firstVariant?.mrp ?? null;

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[#C9A24D] font-bold text-lg">
        KWD {price.toLocaleString("en-IN")}
      </span>

      {mrp && mrp > price && (
        <span className="text-gray-500 line-through text-sm">
          KWD {mrp.toLocaleString("en-IN")}
        </span>
      )}
    </div>
  );
})()}
{/* 
                        <button className="w-full flex items-center justify-center gap-2 border-2 border-[#C9A24D] py-2.5 rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition-all duration-300 font-medium">
                          <ShoppingCart size={16} />
                          {t("products.addToCart")}
                        </button> */}
                        {/* <button
  onClick={(e) => {
    e.stopPropagation();
    // handleAddToCart(
    //   product._id,
    //   product.variants?.[0]?._id
    // );
    const selectedVariantId = selectedVariants[product._id];

if (product.variants?.length && !selectedVariantId) {
  alert("Please select a variant");
  return;
}

handleAddToCart(product._id, selectedVariantId);
  }}
  className="w-full flex items-center justify-center gap-2 border-2 border-[#C9A24D] py-2.5 rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition-all duration-300 font-medium"
>
  <ShoppingCart size={16} />
  {t("products.addToCart")}
</button> */}
<button
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCart(product);
  }}
  className="w-full flex items-center justify-center gap-2 border-2 border-[#C9A24D] py-2.5 rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition-all duration-300 font-medium"
>
  <ShoppingCart size={16} />
  {t("products.addToCart")}
</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="fixed top-0 left-0 h-full w-80 max-w-full bg-[#0D0D0D] z-50 p-6 overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2A2A2A]">
                  <h2 className="text-lg font-bold">{t("brandsPage.customize")}</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="hover:bg-[#1A1A1A] p-2 rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <FilterContent />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
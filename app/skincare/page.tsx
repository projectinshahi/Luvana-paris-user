"use client";

import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/lib/useLanguage";
import { toast } from "react-toastify";
import api from "@/lib/axios";

interface Product {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  shortDescriptionEnglish?: string;
  shortDescriptionArabic?: string;
  minPrice: number;
  maxPrice: number;
  imageUrlEnglish?: { imageUrl: string }[];
  imageUrlArabic?: { imageUrl: string }[];
  brand?: {
    nameEnglish: string;
    nameArabic: string;
  };
  category?: {
    nameEnglish: string;
    nameArabic: string;
  };
}

export default function SkincarePage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { currentLanguage, isRTL } = useLanguage();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${API_URL}/user/product?category=Skincare`);
        const data = await res.json();
        
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique brands
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p) => {
      const brandName = currentLanguage === "ar" 
        ? p.brand?.nameArabic || p.brand?.nameEnglish
        : p.brand?.nameEnglish || p.brand?.nameArabic;
      if (brandName) brandSet.add(brandName);
    });
    return Array.from(brandSet);
  }, [products, currentLanguage]);

  /* ================= FILTER + SORT ================= */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (searchQuery) {
      data = data.filter((p) => {
        const productName = currentLanguage === "ar" ? p.nameArabic : p.nameEnglish;
        return productName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    data = data.filter((p) => p.minPrice <= priceRange);

    if (selectedCategories.length) {
      data = data.filter((p) => {
        const categoryName = currentLanguage === "ar" 
          ? p.category?.nameArabic 
          : p.category?.nameEnglish;
        return selectedCategories.includes(categoryName || "");
      });
    }

    if (selectedBrands.length) {
      data = data.filter((p) => selectedBrands.includes(
        currentLanguage === "ar" 
          ? p.brand?.nameArabic || p.brand?.nameEnglish || ""
          : p.brand?.nameEnglish || p.brand?.nameArabic || ""
      ));
    }

    if (sortBy === "low") data.sort((a, b) => a.minPrice - b.minPrice);
    if (sortBy === "high") data.sort((a, b) => b.minPrice - a.minPrice);

    return data;
  }, [priceRange, selectedCategories, selectedBrands, sortBy, searchQuery, currentLanguage, products]);

  /* ================= FILTER CONTENT ================= */
  const FilterContent = () => (
    // <div className="space-y-4 text-sm">
    <div className="space-y-4 text-sm h-fit self-start">

      {/* Price (compact) */}
      <div>
        <h3 className="text-[#C9A24D] font-semibold mb-1"> Filter By Price</h3>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-[#C9A24D]"
        />
        <p className="text-xs text-gray-400 mt-1">
          Up to {formatPrice(priceRange)}
        </p>
      </div>

      {/* Categories */}
      {/* <div>
        <h3 className="text-[#C9A24D] font-semibold mb-1">Categories</h3>
        {categories.map((cat) => (
          <label key={cat} className="flex gap-2 text-gray-300">
            <input
              type="checkbox"
              className="accent-[#C9A24D]"
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                setSelectedCategories((prev) =>
                  prev.includes(cat)
                    ? prev.filter((c) => c !== cat)
                    : [...prev, cat]
                )
              }
            />
            {cat}
          </label>
        ))}
      </div> */}

      {/* Brands */}
      <div>
        <h3 className="text-[#C9A24D] font-semibold mb-1">Brands</h3>
        {brands.map((brand) => (
          <label key={brand} className="flex gap-2 text-gray-300">
            <input
              type="checkbox"
              className="accent-[#C9A24D]"
              checked={selectedBrands.includes(brand)}
              onChange={() =>
                setSelectedBrands((prev) =>
                  prev.includes(brand)
                    ? prev.filter((b) => b !== brand)
                    : [...prev, brand]
                )
              }
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );

  /* ================= UI ================= */
  return (
    <div className="pt-16 pb-16 min-h-screen bg-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breadcrumb */}
       
        {/* TOP BAR (ALL DEVICES) */}
        {/* <div className="flex flex-col sm:flex-row gap-3 mb-5"> */}
          {/* <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm outline-none"
          /> */}

<div className="flex flex-col sm:flex-row gap-3 mb-5">
  <div className="ml-auto flex gap-3">
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="h-9 px-4 rounded-full text-sm bg-gray-800"
    >
      <option value="default">Sort</option>
      <option value="low">Price: Low → High</option>
      <option value="high">Price: High → Low</option>
    </select>

    <button
      onClick={() => setIsFilterOpen(true)}
      className="h-9 px-4 rounded-full text-sm font-medium bg-[#FF7A00] lg:hidden w-fit flex items-center"
    >
      Filters
    </button>
  </div>



</div>


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Filters */}
          {/* <aside className="hidden lg:block bg-[#1A1A1A] border border-[#2A2A2A] p-4 rounded-lg"> */}
          <aside className="hidden lg:block bg-[#1A1A1A] border border-[#2A2A2A] p-4 rounded-lg h-fit">

            <FilterContent />
          </aside>

          {/* Products */}
          <main className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col"
              >
                {/* Image */}
                {/* <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 bg-black/60 p-2 rounded-full">
                    <Heart size={16} />
                  </button>
                </div> */}
                {/* Image */}
<div className="relative w-full h-64 overflow-hidden">
  <img
    src={currentLanguage === "ar" ? product.imageUrlArabic?.[0]?.imageUrl : product.imageUrlEnglish?.[0]?.imageUrl || "https://via.placeholder.com/400"}
    alt={currentLanguage === "ar" ? product.nameArabic : product.nameEnglish}
    className="w-full h-full object-cover object-center"
  />

  {/* Wishlist */}
  <button className="absolute top-3 right-3 bg-black/60 p-2 rounded-full hover:bg-[#C9A24D] transition">
    <Heart size={16} />
  </button>
</div>


                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-gray-400">
                    {currentLanguage === "ar" ? product.brand?.nameArabic || product.brand?.nameEnglish : product.brand?.nameEnglish || product.brand?.nameArabic} • {currentLanguage === "ar" ? product.category?.nameArabic || product.category?.nameEnglish : product.category?.nameEnglish || product.category?.nameArabic}
                  </p>

                  <h3 className="font-semibold">{currentLanguage === "ar" ? product.nameArabic : product.nameEnglish}</h3>

                  <p className="text-gray-400 text-sm line-clamp-2">
                    {currentLanguage === "ar" ? product.shortDescriptionArabic || product.shortDescriptionEnglish : product.shortDescriptionEnglish || product.shortDescriptionArabic}
                  </p>

                  <p className="text-[#C9A24D] font-bold mt-3">
                    {formatPrice(product.minPrice)}
                  </p>

                  <button className="mt-auto w-full flex items-center justify-center gap-2 border border-[#C9A24D] py-2 rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </main>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="fixed top-0 left-0 h-full w-80 bg-[#0D0D0D] z-50 p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X />
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

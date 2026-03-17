// "use client";

// import Image from "next/image";
// import { Search, X } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDebounce } from "@/lib/useDebounce";
// import { useCurrency } from "@/contexts/CurrencyContext";
// import { useLanguage } from "@/lib/useLanguage";

// interface SearchSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Product {
//   _id: string;
//   nameEnglish: string;
//   nameArabic?: string;
//   imageUrlEnglish?: { imageUrl: string }[];
//   imageUrlArabic?: { imageUrl: string }[];
//   minPrice: number | null;
//   brand?: {
//     nameEnglish: string;
//     nameArabic?: string;
//   };
//   category?: {
//     nameEnglish: string;
//     nameArabic?: string;
//   };
// }

// export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const { formatPrice } = useCurrency();
//   const { currentLanguage } = useLanguage();
// const isArabic = currentLanguage === "ar";

//   // Debounce search query to avoid too many API calls
//   const debouncedQuery = useDebounce(query, 500);

//   /* ================= SEARCH PRODUCTS ================= */
//   // useEffect(() => {
//   //   const searchProducts = async () => {
//   //     if (!debouncedQuery.trim()) {
//   //       setProducts([]);
//   //       setShowResults(false);
//   //       return;
//   //     }

//   //     try {
//   //       setLoading(true);
//   //       setShowResults(true);

//   //       const response = await fetch(
//   //         `http://localhost:8000/user/product?search=${encodeURIComponent(
//   //           debouncedQuery
//   //         )}&limit=10`
//   //       );

//   //       const data = await response.json();
//   //       console.log("🔍 Search results:", data);

//   //       setProducts(data.items || []);
//   //     } catch (error) {
//   //       console.error("Search error:", error);
//   //       setProducts([]);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   searchProducts();
//   // }, [debouncedQuery]);
//   useEffect(() => {
//   const searchProducts = async () => {
//     try {
//       setLoading(true);
//       setShowResults(true);

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
//       let url = `${API_URL}/user/product?limit=10`;

//       // If user typed something, use search API
//       if (debouncedQuery.trim()) {
//         url = `${API_URL}/user/product?search=${encodeURIComponent(
//           debouncedQuery
//         )}&limit=10`;
//       }

//       const response = await fetch(url);
//       const data = await response.json();

//       setProducts(data.items || []);
//     } catch (error) {
//       console.error("Search error:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   searchProducts();
// }, [debouncedQuery, isOpen]);

//   /* ================= HANDLE PRODUCT CLICK ================= */
//   const handleProductClick = (productId: string) => {
//     onClose();
//     router.push(`/brands/${productId}`);
//   };

//   /* ================= CLEAR SEARCH ================= */
//   const handleClear = () => {
//     setQuery("");
//     setProducts([]);
//     setShowResults(false);
//   };

//   return (
//     <>
//     <style>{`
//   .custom-scroll::-webkit-scrollbar {
//     width: 6px;
//   }

//   .custom-scroll::-webkit-scrollbar-track {
//     background: #1A1A1A;
//   }

//   .custom-scroll::-webkit-scrollbar-thumb {
//     background: #C9A24D;
//     border-radius: 10px;
//   }

//   .custom-scroll::-webkit-scrollbar-thumb:hover {
//     background: #D4AF37;
//   }

//   /* Firefox */
//   .custom-scroll {
//     scrollbar-width: thin;
//     scrollbar-color: #C9A24D #1A1A1A;
//   }
// `}</style>
//       {/* BACKDROP */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45"
//           onClick={onClose}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed top-16 right-0 bottom-0 w-full sm:w-95 bg-[#1A1A1A] text-white z-50
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
//           <h2 className="text-lg font-semibold">Search Products</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-[#2A2A2A] rounded-full transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* SEARCH INPUT */}
//         <div className="p-4">
//           <div className="relative flex items-center gap-3 bg-[#2A2A2A] rounded-lg px-4 py-3">
//             <Search className="w-5 h-5 text-gray-400" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search for products..."
//               className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-full"
//               autoFocus
//             />
//             {query && (
//               <button
//                 onClick={handleClear}
//                 className="p-1 hover:bg-[#3A3A3A] rounded-full transition"
//               >
//                 <X size={16} className="text-gray-400" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RESULTS */}
//         {/* <div className="px-4 pb-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}> */}
//         <div
//   className="px-4 pb-4 overflow-y-auto custom-scroll"
//   style={{ maxHeight: "calc(100vh - 180px)" }}
// >
//           {loading ? (
//             <div className="flex items-center justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A24D]"></div>
//             </div>
//           ) : showResults ? (
//             products.length > 0 ? (
//               <>
//                 <p className="text-sm text-gray-400 mb-4">
//                   Found {products.length} result{products.length !== 1 ? "s" : ""}
//                 </p>
//                 <div className="flex flex-col gap-3">
//                   {products.map((product) => {
//                     const image =
//                       product.imageUrlEnglish?.[0]?.imageUrl ||
//                       product.imageUrlArabic?.[0]?.imageUrl ||
//                       "/placeholder.png";

//                     return (
//                       <div
//                         key={product._id}
//                         onClick={() => handleProductClick(product._id)}
//                         className="flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] hover:border-[#C9A24D] cursor-pointer transition"
//                       >
//                         {/* IMAGE */}
//                         <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#2A2A2A]">
//                           <Image
//                             src={image}
//                             alt={product.nameEnglish}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>

//                         {/* TEXT */}
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium line-clamp-2 mb-1">
//                             {product.nameEnglish}
//                           </p>
//                           {product.brand && (
//                             <p className="text-xs text-gray-400 mb-1">
//                               {product.brand.nameEnglish}
//                             </p>
//                           )}
//                           {product.minPrice && (
//                             <p className="text-sm text-[#C9A24D] font-semibold">
//                               {formatPrice(product.minPrice)}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-12 text-center">
//                 <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-4">
//                   <Search size={28} className="text-gray-600" />
//                 </div>
//                 <p className="text-sm text-gray-400">
//                   No products found for "{query}"
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Try searching with different keywords
//                 </p>
//               </div>
//             )
//           ) : (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-4">
//                 <Search size={28} className="text-gray-600" />
//               </div>
//               <p className="text-sm text-gray-400">
//                 Start typing to search products
//               </p>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Search, X } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDebounce } from "@/lib/useDebounce";
// import { useCurrency } from "@/contexts/CurrencyContext";
// import { useLanguage } from "@/lib/useLanguage";

// interface Variant {
//   _id: string;
//   imageUrlEnglish?: { imageUrl: string }[];
//   imageUrlArabic?: { imageUrl: string }[];
// }

// interface Product {
//   _id: string;
//   nameEnglish: string;
//   nameArabic?: string;

//   imageUrlEnglish?: { imageUrl: string }[];
//   imageUrlArabic?: { imageUrl: string }[];

//   variants?: Variant[];

//   minPrice: number | null;

//   brand?: {
//     nameEnglish: string;
//     nameArabic?: string;
//   };
// }

// interface SearchSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
//   const router = useRouter();
//   const { formatPrice } = useCurrency();
//   const { currentLanguage } = useLanguage();

//   const isArabic = currentLanguage === "ar";

//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);

//   const debouncedQuery = useDebounce(query, 500);

//   /* ================= SEARCH PRODUCTS ================= */

//   useEffect(() => {
//     const searchProducts = async () => {
//       try {
//         setLoading(true);
//         setShowResults(true);

//         const API_URL =
//           process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//         let url = `${API_URL}/user/product?limit=10`;

//         if (debouncedQuery.trim()) {
//           url = `${API_URL}/user/product?search=${encodeURIComponent(
//             debouncedQuery
//           )}&limit=10`;
//         }

//         const response = await fetch(url);
//         const data = await response.json();

//         setProducts(data.items || []);
//       } catch (error) {
//         console.error("Search error:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isOpen) searchProducts();
//   }, [debouncedQuery, isOpen]);

//   /* ================= PRODUCT CLICK ================= */

//   const handleProductClick = (productId: string) => {
//     onClose();
//     router.push(`/brands/${productId}`);
//   };

//   /* ================= CLEAR SEARCH ================= */

//   const handleClear = () => {
//     setQuery("");
//     setProducts([]);
//     setShowResults(false);
//   };

//   return (
//     <>
//       {/* Invisible Scrollbar */}
//       <style>{`
//       .custom-scroll::-webkit-scrollbar {
//         display:none;
//       }

//       .custom-scroll {
//         -ms-overflow-style:none;
//         scrollbar-width:none;
//       }
//       `}</style>

//       {/* BACKDROP */}

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45"
//           onClick={onClose}
//         />
//       )}

//       {/* SIDEBAR */}

//       <aside
//         className={`fixed top-16 right-0 bottom-0 w-full sm:w-95 bg-[#1A1A1A] text-white z-50
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         {/* HEADER */}

//         <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
//           <h2 className="text-lg font-semibold">
//             {isArabic ? "البحث عن المنتجات" : "Search Products"}
//           </h2>

//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-[#2A2A2A] rounded-full transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* SEARCH INPUT */}

//         <div className="p-4">
//           <div className="relative flex items-center gap-3 bg-[#2A2A2A] rounded-lg px-4 py-3">
//             <Search className="w-5 h-5 text-gray-400" />

//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder={
//                 isArabic ? "ابحث عن المنتجات..." : "Search for products..."
//               }
//               className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-full"
//               autoFocus
//             />

//             {query && (
//               <button
//                 onClick={handleClear}
//                 className="p-1 hover:bg-[#3A3A3A] rounded-full transition"
//               >
//                 <X size={16} className="text-gray-400" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RESULTS */}

//         <div
//           className="px-4 pb-4 overflow-y-auto custom-scroll"
//           style={{ maxHeight: "calc(100vh - 180px)" }}
//         >
//           {loading ? (
//             <div className="flex items-center justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A24D]" />
//             </div>
//           ) : showResults ? (
//             products.length > 0 ? (
//               <>
//                 <p className="text-sm text-gray-400 mb-4">
//                   {isArabic
//                     ? `تم العثور على ${products.length}`
//                     : `Found ${products.length} result${
//                         products.length !== 1 ? "s" : ""
//                       }`}
//                 </p>

//                 <div className="flex flex-col gap-3">
//                   {products.map((product) => {
//                     /* ================= IMAGE LOGIC ================= */

//                     const selectedVariant = product.variants?.[0];

//                     const variantImage = isArabic
//                       ? selectedVariant?.imageUrlArabic?.[0]?.imageUrl
//                       : selectedVariant?.imageUrlEnglish?.[0]?.imageUrl;

//                     const productImage = isArabic
//                       ? product.imageUrlArabic?.[0]?.imageUrl
//                       : product.imageUrlEnglish?.[0]?.imageUrl;

//                     const image =
//                       variantImage ||
//                       productImage ||
//                       "/placeholder.png";

//                     return (
//                       <div
//                         key={product._id}
//                         onClick={() => handleProductClick(product._id)}
//                         className="flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] hover:border-[#C9A24D] cursor-pointer transition"
//                       >
//                         {/* IMAGE */}

//                         <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#2A2A2A]">
//                           <Image
//                             src={image}
//                             alt={
//                               isArabic
//                                 ? product.nameArabic || ""
//                                 : product.nameEnglish
//                             }
//                             fill
//                             className="object-cover"
//                           />
//                         </div>

//                         {/* TEXT */}

//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium line-clamp-2 mb-1">
//                             {isArabic
//                               ? product.nameArabic
//                               : product.nameEnglish}
//                           </p>

//                           {product.brand && (
//                             <p className="text-xs text-gray-400 mb-1">
//                               {isArabic
//                                 ? product.brand.nameArabic
//                                 : product.brand.nameEnglish}
//                             </p>
//                           )}

//                           {product.minPrice && (
//                             <p className="text-sm text-[#C9A24D] font-semibold">
//                               {formatPrice(product.minPrice)}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-12 text-center">
//                 <Search size={28} className="text-gray-600 mb-3" />

//                 <p className="text-sm text-gray-400">
//                   {isArabic
//                     ? `لا توجد نتائج لـ "${query}"`
//                     : `No products found for "${query}"`}
//                 </p>
//               </div>
//             )
//           ) : (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <Search size={28} className="text-gray-600 mb-3" />

//               <p className="text-sm text-gray-400">
//                 {isArabic
//                   ? "ابدأ الكتابة للبحث عن المنتجات"
//                   : "Start typing to search products"}
//               </p>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }
"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/useDebounce";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/lib/useLanguage";

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

export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
const router = useRouter();
const { formatPrice } = useCurrency();
const { currentLanguage } = useLanguage();

const isArabic = currentLanguage === "ar";

const [query, setQuery] = useState("");
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(false);
const [showResults, setShowResults] = useState(false);

const debouncedQuery = useDebounce(query, 500);

/* ================= SEARCH PRODUCTS ================= */

useEffect(() => {
const searchProducts = async () => {
try {
setLoading(true);
setShowResults(false);


    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    let url = `${API_URL}/user/product?limit=10`;

    if (debouncedQuery.trim()) {
      url = `${API_URL}/user/product?search=${encodeURIComponent(
        debouncedQuery
      )}&limit=10`;
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

/* ================= PRODUCT CLICK ================= */

const handleProductClick = (productId: string) => {
onClose();
router.push(`/brands/${productId}`);
};

/* ================= CLEAR SEARCH ================= */

const handleClear = () => {
setQuery("");
setProducts([]);
setShowResults(false);
};

return (
<>
{/* Invisible Scrollbar */} <style>{`
.custom-scroll::-webkit-scrollbar {
display:none;
}


  .custom-scroll {
    -ms-overflow-style:none;
    scrollbar-width:none;
  }
  `}</style>

  {/* BACKDROP */}

  {isOpen && (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-45"
      onClick={onClose}
    />
  )}

  {/* SIDEBAR */}

  <aside
    className={`fixed top-16 right-0 bottom-0 w-full sm:w-95 bg-[#1A1A1A] text-white z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
  >
    {/* HEADER */}

    <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
      <h2 className="text-lg font-semibold">
        {isArabic ? "البحث عن المنتجات" : "Search Products"}
      </h2>

      <button
        onClick={onClose}
        className="p-2 hover:bg-[#2A2A2A] rounded-full transition"
      >
        <X size={20} />
      </button>
    </div>

    {/* SEARCH INPUT */}

    <div className="p-4">
      <div className="relative flex items-center gap-3 bg-[#2A2A2A] rounded-lg px-4 py-3">
        <Search className="w-5 h-5 text-gray-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isArabic ? "ابحث عن المنتجات..." : "Search for products..."
          }
          className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-full"
          autoFocus
        />

        {query && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-[#3A3A3A] rounded-full transition"
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>

    {/* RESULTS */}

    {/* <div
      className="px-4 pb-4 overflow-y-auto custom-scroll"
      style={{ maxHeight: "calc(100vh - 180px)" }}
    > */}
    <div className="relative">
      {loading ? (
        /* Skeleton Loading */
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] animate-pulse"
            >
              <div className="w-16 h-16 bg-[#2A2A2A] rounded-lg"></div>

              <div className="flex-1">
                <div className="h-3 bg-[#2A2A2A] rounded w-32 mb-2"></div>
                <div className="h-3 bg-[#2A2A2A] rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : showResults ? (
        products.length > 0 ? (
          <>
            <p className="text-sm text-gray-400 mb-4">
              {isArabic
                ? `تم العثور على ${products.length}`
                : `Found ${products.length} result${
                    products.length !== 1 ? "s" : ""
                  }`}
            </p>

            <div className="flex flex-col gap-3">
              {products.map((product) => {
                /* IMAGE PRIORITY LOGIC */

                const selectedVariant = product.variants?.[0];

                const variantImage = isArabic
                  ? selectedVariant?.imageUrlArabic?.[0]?.imageUrl
                  : selectedVariant?.imageUrlEnglish?.[0]?.imageUrl;

                const productImage = isArabic
                  ? product.imageUrlArabic?.[0]?.imageUrl
                  : product.imageUrlEnglish?.[0]?.imageUrl;

                const image =
                  variantImage ||
                  productImage ||
                  "/placeholder.png";

                return (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] hover:border-[#C9A24D] cursor-pointer transition"
                  >
                    {/* IMAGE */}

                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#2A2A2A]">
                      <Image
                        src={image}
                        alt={
                          isArabic
                            ? product.nameArabic || ""
                            : product.nameEnglish
                        }
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* TEXT */}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2 mb-1">
                        {isArabic
                          ? product.nameArabic
                          : product.nameEnglish}
                      </p>

                      {product.brand && (
                        <p className="text-xs text-gray-400 mb-1">
                          {isArabic
                            ? product.brand.nameArabic
                            : product.brand.nameEnglish}
                        </p>
                      )}

                      {product.minPrice && (
                        <p className="text-sm text-[#C9A24D] font-semibold">
                          {formatPrice(product.minPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search size={28} className="text-gray-600 mb-3" />

            <p className="text-sm text-gray-400">
              {isArabic
                ? `لا توجد نتائج لـ "${query}"`
                : `No products found for "${query}"`}
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search size={28} className="text-gray-600 mb-3" />

          <p className="text-sm text-gray-400">
            {isArabic
              ? "ابدأ الكتابة للبحث عن المنتجات"
              : "Start typing to search products"}
          </p>
        </div>
      )}
    </div>
  </aside>
</>


);
}

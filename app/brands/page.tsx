

// "use client";

// import { useState, useMemo } from "react";
// import { ShoppingCart, Home, SlidersHorizontal, X } from "lucide-react";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   brand: string;
// }

// export default function BrandsPage() {
//   const [priceRange, setPriceRange] = useState(5000);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState("default");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   /* ================= PRODUCTS ================= */
//   const products: Product[] = [
//     {
//       id: 1,
//       name: "Hydra Glow Face Serum",
//       description: "Lightweight hyaluronic acid serum for intense hydration.",
//       price: 1299,
//       image:
//         "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
//       category: "Skincare",
//       brand: "GlowLab",
//     },
//     {
//       id: 2,
//       name: "Vitamin C Brightening Cream",
//       description: "Daily moisturizer enriched with Vitamin C.",
//       price: 1799,
//       image:
//         "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
//       category: "Skincare",
//       brand: "DermaCare",
//     },
//     {
//       id: 3,
//       name: "Matte Finish Foundation",
//       description: "Full coverage matte foundation.",
//       price: 2199,
//       image:
//         "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
//       category: "Makeup",
//       brand: "Luxe Beauty",
//     },
//     {
//       id: 4,
//       name: "Velvet Touch Lipstick",
//       description: "Creamy matte lipstick with rich pigment.",
//       price: 899,
//       image:
//         "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       category: "Makeup",
//       brand: "Luxe Beauty",
//     },
//     {
//       id: 5,
//       name: "Argan Repair Hair Serum",
//       description: "Nourishing serum to control frizz.",
//       price: 999,
//       image:
//         "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
//       category: "Haircare",
//       brand: "SilkRoots",
//     },
//     {
//       id: 6,
//       name: "Keratin Smooth Shampoo",
//       description: "Strengthens hair and reduces breakage.",
//       price: 749,
//       image:
//         "https://svashudhi.com/cdn/shop/collections/hairfall_treatment_square_2400x.jpg?v=1690965512",
//       category: "Haircare",
//       brand: "SilkRoots",
//     },
//   ];

//   const categories = ["Skincare", "Makeup", "Haircare", "Fragrance"];
//   const brands = ["GlowLab", "DermaCare", "Luxe Beauty", "SilkRoots", "Maison Aura"];

//   /* ================= FILTER ================= */
//   const filteredProducts = useMemo(() => {
//     let data = [...products];

//     if (searchQuery)
//       data = data.filter((p) =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     data = data.filter((p) => p.price <= priceRange);

//     if (selectedCategories.length)
//       data = data.filter((p) => selectedCategories.includes(p.category));

//     if (selectedBrands.length)
//       data = data.filter((p) => selectedBrands.includes(p.brand));

//     if (sortBy === "low") data.sort((a, b) => a.price - b.price);
//     if (sortBy === "high") data.sort((a, b) => b.price - a.price);

//     return data;
//   }, [priceRange, selectedCategories, selectedBrands, sortBy, searchQuery]);

//   /* ================= FILTER UI ================= */
//   const FilterContent = () => (
//     <div className="space-y-6">
//       {/* Price */}
//       <div>
//         <h3 className="text-[#C9A24D] mb-2 font-semibold">Price</h3>
//         <input
//           type="range"
//           min="0"
//           max="5000"
//           value={priceRange}
//           onChange={(e) => setPriceRange(Number(e.target.value))}
//           className="w-full accent-[#C9A24D]"
//         />
//         <p className="text-sm text-gray-400 mt-1">Up to ₹{priceRange}</p>
//       </div>

//       {/* Categories */}
//       <div>
//         <h3 className="text-[#C9A24D] mb-2 font-semibold">Categories</h3>
//         {categories.map((cat) => (
//           <label key={cat} className="flex gap-2 text-sm text-gray-300">
//             <input
//               type="checkbox"
//               className="accent-[#C9A24D]"
//               checked={selectedCategories.includes(cat)}
//               onChange={() =>
//                 setSelectedCategories((prev) =>
//                   prev.includes(cat)
//                     ? prev.filter((c) => c !== cat)
//                     : [...prev, cat]
//                 )
//               }
//             />
//             {cat}
//           </label>
//         ))}
//       </div>

//       {/* Brands */}
//       <div>
//         <h3 className="text-[#C9A24D] mb-2 font-semibold">Brands</h3>
//         {brands.map((brand) => (
//           <label key={brand} className="flex gap-2 text-sm text-gray-300">
//             <input
//               type="checkbox"
//               className="accent-[#C9A24D]"
//               checked={selectedBrands.includes(brand)}
//               onChange={() =>
//                 setSelectedBrands((prev) =>
//                   prev.includes(brand)
//                     ? prev.filter((b) => b !== brand)
//                     : [...prev, brand]
//                 )
//               }
//             />
//             {brand}
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   /* ================= UI ================= */
//   return (
//     <div className="pt-16 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
//           <Home size={16} />
//           <span>Home</span>
//           <span>›</span>
//           <span className="text-[#C9A24D]">Cosmetics</span>
//         </div>

//         {/* Mobile Filter Button */}
//         <div className="flex gap-3 mb-4 lg:hidden">
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center gap-2 border border-[#C9A24D] px-4 py-2 rounded-lg text-[#C9A24D]"
//           >
//             <SlidersHorizontal size={16} />
//             Filters
//           </button>

//           <select
//             onChange={(e) => setSortBy(e.target.value)}
//             className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white"
//           >
//             <option value="default">Sort</option>
//             <option value="low">Price: Low → High</option>
//             <option value="high">Price: High → Low</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block bg-[#1A1A1A] border border-[#2A2A2A] p-6 rounded-lg">
//             <FilterContent />
//           </aside>

//           {/* Products */}
//           <main className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="aspect-square object-cover"
//                 />
//                 <div className="p-4">
//                   <p className="text-xs text-gray-400">
//                     {product.brand} • {product.category}
//                   </p>
//                   <h3 className="font-semibold">{product.name}</h3>
//                   <p className="text-gray-400 text-sm mb-2">
//                     {product.description}
//                   </p>
//                   <p className="text-[#C9A24D] font-bold mb-3">
//                     ₹{product.price}
//                   </p>
//                   <button className="w-full flex items-center justify-center gap-2 border border-[#C9A24D] py-2 rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black">
//                     <ShoppingCart size={16} />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </main>
//         </div>

//         {/* Mobile Filter Drawer */}
//         {isFilterOpen && (
//           <>
//             <div
//               className="fixed inset-0 bg-black/60 z-40"
//               onClick={() => setIsFilterOpen(false)}
//             />
//             <div className="fixed top-0 left-0 h-full w-80 bg-[#0D0D0D] z-50 p-6 overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Filters</h2>
//                 <button onClick={() => setIsFilterOpen(false)}>
//                   <X />
//                 </button>
//               </div>
//               <FilterContent />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import { ShoppingCart, Home, X } from "lucide-react";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   brand: string;
// }

// export default function BrandsPage() {
//   const [priceRange, setPriceRange] = useState(5000);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState("default");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   /* ================= PRODUCTS ================= */
//   const products: Product[] = [
//     {
//       id: 1,
//       name: "Hydra Glow Face Serum",
//       description: "Lightweight hyaluronic acid serum for intense hydration.",
//       price: 1299,
//       image:
//         "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
//       category: "Skincare",
//       brand: "GlowLab",
//     },
//     {
//       id: 2,
//       name: "Vitamin C Brightening Cream",
//       description: "Daily moisturizer enriched with Vitamin C.",
//       price: 1799,
//       image:
//         "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
//       category: "Skincare",
//       brand: "DermaCare",
//     },
//     { 
//       id: 3,
//       name: "Matte Finish Foundation",
//       description: "Full coverage matte foundation.",
//       price: 2199,
//       image:
//         "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
//       category: "Makeup",
//       brand: "Luxe Beauty",
//     },
//     {
//       id: 4,
//       name: "Velvet Touch Lipstick",
//       description: "Creamy matte lipstick with rich pigment.",
//       price: 899,
//       image:
//         "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       category: "Makeup",
//       brand: "Luxe Beauty",
//     },
//     {
//       id: 5,
//       name: "Argan Repair Hair Serum",
//       description: "Nourishing serum to control frizz.",
//       price: 999,
//       image:
//         "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
//       category: "Haircare",
//       brand: "SilkRoots",
//     },
//     {
//       id: 6,
//       name: "Keratin Smooth Shampoo",
//       description: "Strengthens hair and reduces breakage.",
//       price: 749,
//       image:
//         "https://svashudhi.com/cdn/shop/collections/hairfall_treatment_square_2400x.jpg?v=1690965512",
//       category: "Haircare",
//       brand: "SilkRoots",
//     },
//   ];

//   const categories = ["Skincare", "Makeup", "Haircare", "Fragrance"];
//   const brands = ["GlowLab", "DermaCare", "Luxe Beauty", "SilkRoots", "Maison Aura"];

//   /* ================= FILTER LOGIC ================= */
//   const filteredProducts = useMemo(() => {
//     let data = [...products];

//     if (searchQuery) {
//       data = data.filter((p) =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     data = data.filter((p) => p.price <= priceRange);

//     if (selectedCategories.length > 0) {
//       data = data.filter((p) => selectedCategories.includes(p.category));
//     }

//     if (selectedBrands.length > 0) {
//       data = data.filter((p) => selectedBrands.includes(p.brand));
//     }

//     if (sortBy === "low") data.sort((a, b) => a.price - b.price);
//     if (sortBy === "high") data.sort((a, b) => b.price - a.price);

//     return data;
//   }, [priceRange, selectedCategories, selectedBrands, sortBy, searchQuery]);

//   /* ================= FILTER CONTENT ================= */
//   const FilterContent = () => (
//     <div className="space-y-6">
//       {/* Price */}
//       <div>
//         <h3 className="text-[#C9A24D] font-semibold mb-2">Price</h3>
//         <input
//           type="range"
//           min="0"
//           max="5000"
//           value={priceRange}
//           onChange={(e) => setPriceRange(Number(e.target.value))}
//           className="w-full accent-[#C9A24D]"
//         />
//         <p className="text-sm text-gray-400 mt-1">Up to ₹{priceRange}</p>
//       </div>

//       {/* Categories */}
//       <div>
//         <h3 className="text-[#C9A24D] font-semibold mb-2">Categories</h3>
//         {categories.map((cat) => (
//           <label key={cat} className="flex gap-2 text-sm text-gray-300">
//             <input
//               type="checkbox"
//               className="accent-[#C9A24D]"
//               checked={selectedCategories.includes(cat)}
//               onChange={() =>
//                 setSelectedCategories((prev) =>
//                   prev.includes(cat)
//                     ? prev.filter((c) => c !== cat)
//                     : [...prev, cat]
//                 )
//               }
//             />
//             {cat}
//           </label>
//         ))}
//       </div>

//       {/* Brands */}
//       <div>
//         <h3 className="text-[#C9A24D] font-semibold mb-2">Brands</h3>
//         {brands.map((brand) => (
//           <label key={brand} className="flex gap-2 text-sm text-gray-300">
//             <input
//               type="checkbox"
//               className="accent-[#C9A24D]"
//               checked={selectedBrands.includes(brand)}
//               onChange={() =>
//                 setSelectedBrands((prev) =>
//                   prev.includes(brand)
//                     ? prev.filter((b) => b !== brand)
//                     : [...prev, brand]
//                 )
//               }
//             />
//             {brand}
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   /* ================= UI ================= */
//   return (
//     <div className="pt-16 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
//           <Home size={16} />
//           <span>Home</span>
//           <span>›</span>
//           <span className="text-[#C9A24D]">All Collection</span>
//         </div>

//         {/* MOBILE SEARCH + FILTER BAR */}
//         <div className="lg:hidden mb-4">
//           <div className="flex items-center gap-3">

//             {/* Search */}
//             <div className="flex items-center flex-1 bg-gray-800 rounded-full border border-gold-200 px-4 py-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-gray-400 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>

//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
//               />
//             </div>

//             {/* Filters */}
//             <button
//               onClick={() => setIsFilterOpen(true)}
//               className="px-4 py-2 rounded-full text-sm font-medium text-white"
//               style={{ backgroundColor: "#FF7A00" }}
//             >
//               Filters
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* DESKTOP SIDEBAR */}
//           <aside className="hidden lg:block bg-[#1A1A1A] border border-[#2A2A2A] p-6 rounded-lg">
//             <FilterContent />
//           </aside>

//           {/* PRODUCTS */}
//           <main className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="aspect-square object-cover"
//                 />

//                 <div className="p-4">
//                   <p className="text-xs text-gray-400">
//                     {product.brand} • {product.category}
//                   </p>
//                   <h3 className="font-semibold">{product.name}</h3>
//                   <p className="text-gray-400 text-sm mb-2">
//                     {product.description}
//                   </p>
//                   <p className="text-[#C9A24D] font-bold mb-3">
//                     ₹{product.price}
//                   </p>

//                   <button className="w-full flex items-center justify-center gap-2 border border-[#C9A24D] py-2 rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black">
//                     <ShoppingCart size={16} />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </main>
//         </div>

//         {/* MOBILE FILTER DRAWER */}
//         {isFilterOpen && (
//           <>
//             <div
//               className="fixed inset-0 bg-black/60 z-40"
//               onClick={() => setIsFilterOpen(false)}
//             />
//             <div className="fixed top-0 left-0 h-full w-80 bg-[#0D0D0D] z-50 p-6 overflow-y-auto">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold">Filters</h2>
//                 <button onClick={() => setIsFilterOpen(false)}>
//                   <X />
//                 </button>
//               </div>
//               <FilterContent />
//             </div>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import {
//   ShoppingCart,
//   Home,
//   X,
//   Heart,
// } from "lucide-react";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   brand: string;
// }

// export default function BrandsPage() {
//   const [priceRange, setPriceRange] = useState(5000);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState("default");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   /* ================= PRODUCTS ================= */
//   const products: Product[] = [
//     {
//       id: 1,
//       name: "Hydra Glow Face Serum",
//       description: "Lightweight hyaluronic acid serum for intense hydration.",
//       price: 1299,
//       image:
//         "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
//       category: "Skincare",
//       brand: "GlowLab",
//     },
//     {
//       id: 2,
//       name: "Vitamin C Brightening Cream",
//       description: "Daily moisturizer enriched with Vitamin C.",
//       price: 1799,
//       image:
//         "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
//       category: "Skincare",
//       brand: "DermaCare",
//     },
//     {
//       id: 3,
//       name: "Matte Finish Foundation",
//       description: "Full coverage matte foundation.",
//       price: 2199,
//       image:
//         "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
//       category: "Makeup",
//       brand: "Luxe Beauty",
//     },
//     {
//       id: 4,
//       name: "Velvet Touch Lipstick",
//       description: "Creamy matte lipstick with rich pigment.",
//       price: 899,
//       image:
//         "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//       category: "Makeup",
//       brand: "Luxe Beauty",
//     },
    // {
    //   id: 5,
    //   name: "Argan Repair Hair Serum",
    //   description: "Nourishing serum to control frizz.",
    //   price: 999,
    //   image:
    //     "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
    //   category: "Haircare",
    //   brand: "SilkRoots",
    // },
    // {
    //   id: 6,
    //   name: "Keratin Smooth Shampoo",
    //   description: "Strengthens hair and reduces breakage.",
    //   price: 749,
    //   image:
    //     "https://svashudhi.com/cdn/shop/collections/hairfall_treatment_square_2400x.jpg?v=1690965512",
    //   category: "Haircare",
    //   brand: "SilkRoots",
    // },
//   ];

//   const categories = ["Skincare", "Makeup", "Haircare", "Fragrance"];
//   const brands = ["GlowLab", "DermaCare", "Luxe Beauty", "SilkRoots", "Maison Aura"];

//   /* ================= FILTER + SORT ================= */
//   const filteredProducts = useMemo(() => {
//     let data = [...products];

//     if (searchQuery) {
//       data = data.filter((p) =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     data = data.filter((p) => p.price <= priceRange);

//     if (selectedCategories.length) {
//       data = data.filter((p) =>
//         selectedCategories.includes(p.category)
//       );
//     }

//     if (selectedBrands.length) {
//       data = data.filter((p) =>
//         selectedBrands.includes(p.brand)
//       );
//     }

//     if (sortBy === "low") {
//       data.sort((a, b) => a.price - b.price);
//     } else if (sortBy === "high") {
//       data.sort((a, b) => b.price - a.price);
//     }

//     return data;
//   }, [priceRange, selectedCategories, selectedBrands, sortBy, searchQuery]);

//   /* ================= FILTER CONTENT ================= */
//   const FilterContent = () => (
//     <div className="space-y-5 text-sm">
//       {/* Price (compact) */}
//       <div>
//         <h3 className="text-[#C9A24D] font-semibold mb-1">Price</h3>
//         <input
//           type="range"
//           min="0"
//           max="5000"
//           value={priceRange}
//           onChange={(e) => setPriceRange(Number(e.target.value))}
//           className="w-full accent-[#C9A24D]"
//         />
//         <p className="text-xs text-gray-400 mt-1">
//           Up to ₹{priceRange}
//         </p>
//       </div>

//       {/* Categories */}
//       <div>
//         <h3 className="text-[#C9A24D] font-semibold mb-2">Categories</h3>
//         {categories.map((cat) => (
//           <label key={cat} className="flex gap-2 text-gray-300">
//             <input
//               type="checkbox"
//               className="accent-[#C9A24D]"
//               checked={selectedCategories.includes(cat)}
//               onChange={() =>
//                 setSelectedCategories((prev) =>
//                   prev.includes(cat)
//                     ? prev.filter((c) => c !== cat)
//                     : [...prev, cat]
//                 )
//               }
//             />
//             {cat}
//           </label>
//         ))}
//       </div>

//       {/* Brands */}
//       <div>
//         <h3 className="text-[#C9A24D] font-semibold mb-2">Brands</h3>
//         {brands.map((brand) => (
//           <label key={brand} className="flex gap-2 text-gray-300">
//             <input
//               type="checkbox"
//               className="accent-[#C9A24D]"
//               checked={selectedBrands.includes(brand)}
//               onChange={() =>
//                 setSelectedBrands((prev) =>
//                   prev.includes(brand)
//                     ? prev.filter((b) => b !== brand)
//                     : [...prev, brand]
//                 )
//               }
//             />
//             {brand}
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   /* ================= UI ================= */
//   return (
//     <div className="pt-16 pb-16 min-h-screen bg-[#0D0D0D] text-white">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
//           <Home size={16} />
//           <span>Home</span>
//           <span>›</span>
//           <span className="text-[#C9A24D]">All Collection</span>
//         </div>

//         {/* MOBILE SEARCH + SORT + FILTER */}
//         <div className="lg:hidden mb-4 space-y-3">
//           <div className="flex gap-3">
//             <input
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm outline-none"
//             />

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 rounded-full text-sm bg-gray-800"
//             >
//               <option value="default">Sort</option>
//               <option value="low">Low → High</option>
//               <option value="high">High → Low</option>
//             </select>

//             <button
//               onClick={() => setIsFilterOpen(true)}
//               className="px-4 py-2 rounded-full text-sm font-medium bg-[#FF7A00]"
//             >
//               Filters
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* Desktop Filters */}
//           <aside className="hidden lg:block bg-[#1A1A1A] border border-[#2A2A2A] p-5 rounded-lg">
//             <FilterContent />
//           </aside>

//           {/* Products */}
//           <main className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col"
//               >
//                 {/* Image */}
//                 <div className="relative aspect-square">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                   {/* Wishlist */}
//                   <button className="absolute top-3 right-3 bg-black/60 p-2 rounded-full hover:bg-[#C9A24D]">
//                     <Heart size={16} />
//                   </button>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4 flex flex-col flex-1">
//                   <p className="text-xs text-gray-400">
//                     {product.brand} • {product.category}
//                   </p>
//                   <h3 className="font-semibold">{product.name}</h3>
//                   <p className="text-gray-400 text-sm line-clamp-2">
//                     {product.description}
//                   </p>

//                   <p className="text-[#C9A24D] font-bold mt-3">
//                     ₹{product.price}
//                   </p>

//                   {/* Button aligned */}
//                   <button className="mt-auto w-full flex items-center justify-center gap-2 border border-[#C9A24D] py-2 rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black">
//                     <ShoppingCart size={16} />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </main>
//         </div>

//         {/* Mobile Filter Drawer */}
//         {isFilterOpen && (
//           <>
//             <div
//               className="fixed inset-0 bg-black/60 z-40"
//               onClick={() => setIsFilterOpen(false)}
//             />
//             <div className="fixed top-0 left-0 h-full w-80 bg-[#0D0D0D] z-50 p-6 overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Filters</h2>
//                 <button onClick={() => setIsFilterOpen(false)}>
//                   <X />
//                 </button>
//               </div>
//               <FilterContent />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Home, X, Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

export default function BrandsPage() {
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ================= PRODUCTS ================= */
  const products: Product[] = [
    {
      id: 1,
      name: "Hydra Glow Face Serum",
      description: "Lightweight hyaluronic acid serum for intense hydration.",
      price: 1299,
      image:
        "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
      category: "Skincare",
      brand: "GlowLab",
    },
    {
      id: 2,
      name: "Vitamin C Brightening Cream",
      description: "Daily moisturizer enriched with Vitamin C.",
      price: 1799,
      image:
        "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
      category: "Skincare",
      brand: "DermaCare",
    },
    {
      id: 3,
      name: "Matte Finish Foundation",
      description: "Full coverage matte foundation.",
      price: 2199,
      image:
        "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
      category: "Makeup",
      brand: "Luxe Beauty",
    },
    {
      id: 4,
      name: "Velvet Touch Lipstick",
      description: "Creamy matte lipstick with rich pigment.",
      price: 899,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
      category: "Makeup",
      brand: "Luxe Beauty",
    },
        {
      id: 5,
      name: "Argan Repair Hair Serum",
      description: "Nourishing serum to control frizz.",
      price: 999,
      image:
        "https://m.media-amazon.com/images/I/61Nnnk9WDIL._AC_UF1000,1000_QL80_.jpg",
      category: "Haircare",
      brand: "SilkRoots",
    },
    {
      id: 6,
      name: "Keratin Smooth Shampoo",
      description: "Strengthens hair and reduces breakage.",
      price: 749,
      image:
        "https://svashudhi.com/cdn/shop/collections/hairfall_treatment_square_2400x.jpg?v=1690965512",
      category: "Haircare",
      brand: "SilkRoots",
    },
  ];

  const categories = ["Skincare", "Makeup", "Haircare", "Fragrance"];
  const brands = ["GlowLab", "DermaCare", "Luxe Beauty", "SilkRoots", "Maison Aura"];

  /* ================= FILTER + SORT ================= */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (searchQuery) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    data = data.filter((p) => p.price <= priceRange);

    if (selectedCategories.length) {
      data = data.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length) {
      data = data.filter((p) => selectedBrands.includes(p.brand));
    }

    if (sortBy === "low") data.sort((a, b) => a.price - b.price);
    if (sortBy === "high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [priceRange, selectedCategories, selectedBrands, sortBy, searchQuery]);

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
          Up to ₹{priceRange}
        </p>
      </div>

      {/* Categories */}
      <div>
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
      </div>

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
                key={product.id}
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
    src={product.image}
    alt={product.name}
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
                    {product.brand} • {product.category}
                  </p>

                  <h3 className="font-semibold">{product.name}</h3>

                  <p className="text-gray-400 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-[#C9A24D] font-bold mt-3">
                    ₹{product.price}
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



// "use client";

// import Image from "next/image";
// import { Search, Menu } from "lucide-react";
// import { useState, useMemo } from "react";

// interface SearchSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
//   const results = [
//     {
//       id: 1,
//       title: "Ferulic Acid Serum",
//       price: "KWD 11.27",
//       image: "/images/search1.jpg",
//     },
//     {
//       id: 2,
//       title: "Vitamin C & Ferulic Acid Serum",
//       price: "KWD 11.27",
//       image: "/images/search2.jpg",
//     },
//     {
//       id: 3,
//       title: "Niacinamide Brightening Serum",
//       price: "KWD 9.80",
//       image: "/images/1.jpg",
//     },
//   ];

//   /* 🔍 SEARCH STATE */
//   const [searchQuery, setSearchQuery] = useState("");

//   /* 🔎 FILTER LOGIC */
//   const filteredResults = useMemo(() => {
//     if (!searchQuery.trim()) return results;

//     return results.filter((item) =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [searchQuery, results]);

//   return (
//     <>
//       {/* BACKDROP */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-70 top-16 sm:top-14"
//           onClick={onClose}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed top-16 sm:top-14 bottom-0 right-0
//         w-full sm:w-[320px] bg-black text-white z-80
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         {/* HEADER */}
//         <div className="relative flex items-center justify-center h-14 bg-[#2b2b2b]">
//           <button className="absolute left-4" onClick={onClose}>
//             <Menu className="w-5 h-5 text-white" />
//           </button>
//           <h2 className="text-sm font-medium tracking-wide">Search</h2>
//         </div>

//         {/* SEARCH INPUT */}
//         <div className="px-4 pt-6">
//           <div className="flex items-center gap-3 bg-[#3a3a3a] rounded-full px-4 py-3">
//             <Search className="w-4 h-4 text-gray-300" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for you"
//               className="bg-transparent text-sm text-white placeholder-gray-300 outline-none w-full"
//             />
//           </div>
//         </div>

//         {/* RESULTS */}
//         <div className="px-4 mt-6">
//           <p className="text-sm text-gray-300 mb-4">
//             {searchQuery ? "Search Results" : "Popular Products"}
//           </p>

//           <div className="flex flex-col gap-4">
//             {filteredResults.length > 0 ? (
//               filteredResults.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-4 cursor-pointer"
//                 >
//                   {/* IMAGE */}
//                   <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#222]">
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* TEXT */}
//                   <div className="flex-1">
//                     <p className="text-sm leading-snug line-clamp-2">
//                       {item.title}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-400 text-center mt-6">
//                 No results found
//               </p>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Search } from "lucide-react";
// import { useState, useMemo } from "react";

// interface SearchSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
//   const products = [
//      {
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
//         {
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

//   const [query, setQuery] = useState("");

//   const filteredProducts = useMemo(() => {
//     if (!query.trim()) return products;
//     return products.filter((p) =>
//       p.title.toLowerCase().includes(query.toLowerCase())
//     );
//   }, [query]);

//   return (
//     <>
//       {/* BACKDROP */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//           onClick={onClose}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed top-0 right-0 h-screen w-[320px] bg-black text-white z-50
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         {/* HEADER */}
//         <div className="h-14 flex items-center justify-center bg-[#2b2b2b] text-sm tracking-wide">
//           Search
//         </div>

//         {/* SEARCH INPUT */}
//         <div className="px-4 pt-6">
//           <div className="flex items-center gap-3 bg-[#3a3a3a] rounded-full px-4 py-3">
//             <Search className="w-4 h-4 text-gray-300" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search for you"
//               className="bg-transparent text-sm text-white placeholder-gray-300 outline-none w-full"
//             />
//           </div>
//         </div>

//         {/* RESULTS */}
//         <div className="px-4 mt-6">
//           <p className="text-sm text-gray-300 mb-4">
//             Search Results
//           </p>

//           <div className="flex flex-col gap-4">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((item) => (
//                 <div key={item.id} className="flex items-center gap-4">
//                   {/* IMAGE */}
//                   <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#222]">
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* TEXT */}
//                   <div>
//                     <p className="text-sm leading-snug line-clamp-2">
//                       {item.title}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500 text-center mt-6">
//                 No results found
//               </p>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
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

  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[320px] bg-black text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="h-14 flex items-center justify-center bg-[#2b2b2b] text-sm tracking-wide">
          Search
        </div>

        {/* SEARCH INPUT */}
        <div className="px-4 pt-6">
          <div className="flex items-center gap-3 bg-[#3a3a3a] rounded-full px-4 py-3">
            <Search className="w-4 h-4 text-gray-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for you"
              className="bg-transparent text-sm text-white placeholder-gray-300 outline-none w-full"
            />
          </div>
        </div>

        {/* RESULTS */}
        <div className="px-4 mt-6">
          <p className="text-sm text-gray-300 mb-4">Search Results</p>

          <div className="flex flex-col gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#222]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm leading-snug line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center mt-6">
                No results found
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

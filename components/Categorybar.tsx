// "use client";

// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";



// type Brand = {
//   name: string;
//   sub?: string[];
// };

// type MenuItem = {
//   key: string;
//   brands?: Brand[];
// };

// export default function CategoryBar() {
//   const { t, i18n } = useTranslation('common');
//   const [openMenu, setOpenMenu] = useState<string | null>(null);
//   const [openSub, setOpenSub] = useState<string | null>(null);
//   // const [selectedItem, setSelectedItem] = useState<string>("New");
//   const [selectedItem, setSelectedItem] = useState<string>("new");

//   const isRTL = i18n.language === 'ar';
//   const router = useRouter();

//   const menu: MenuItem[] = [
//     {
//       key: "new",
//       brands: [
//         { name: "L'Oréal", sub: ["Estée Lauder", "MAC"] },
//         { name: "Maybelline", sub: ["Clinique", "Fenty Beauty"] },
//       ],
//     },
//     { key: "brands" },
//     { key: "makeup" },
//     { key: "skincare" },
//     { key: "haircare" },
//     { key: "fragrance" },
//     { key: "bodycare" },
//     { key: "toolsBrushes" },
//   ];
//   const routeMap: Record<string, string> = {
//     new: "/",
//     brands: "/brands",
//     makeup: "/makeup",
//     skincare: "/skincare",
//     haircare: "/haircare",
//     fragrance: "/fragrance",
//     bodycare: "/bodycare",
//     toolsBrushes: "/tools-brushes",
//   };

//   const handleClick = (key: string) => {
//     console.log('Clicked key:', key);
//     console.log('Route:', routeMap[key]);
//     setSelectedItem(key);
//     const route = routeMap[key];
//     if (route) {
//       console.log('Navigating to:', route);
//       router.push(route);
//     } else {
//       console.log('No route found for key:', key);
//     }
//   };

//   return (
//     <div className="w-full bg-black relative z-10">
//       {/* ================= DESKTOP ================= */}
//       <div
//         className={`hidden md:flex justify-center gap-6 py-4 text-white px-4 ${
//           isRTL ? "flex-row-reverse" : ""
//         }`}
//       >
//         {menu.map((item) => {
//           const label = t(`categories.${item.key}`);

//           return (
//             <div
//               key={item.key}
//               className="relative"
//               onMouseEnter={() => setOpenMenu(item.key)}
//               onMouseLeave={() => {
//                 setOpenMenu(null);
//                 setOpenSub(null);
//               }}
//             >
//               {/* TOP BUTTON */}
//               <button
//                 onClick={() => handleClick(item.key)}
//                 className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border-2
//                   ${
//                     selectedItem === item.key
//                       ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
//                       : "text-white border-transparent hover:text-[#C9A24D]"
//                   }
//                 `}
//               >
//                 {label}
//               </button>

//               {/* FIRST DROPDOWN */}
//               {item.brands && openMenu === item.key && (
//                 <div
//                   className={`absolute top-full mt-2 ${
//                     isRTL
//                       ? "right-1/2 translate-x-1/2"
//                       : "left-1/2 -translate-x-1/2"
//                   } bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-60`}
//                 >
//                   {item.brands.map((brand) => (
//                     <div
//                       key={brand.name}
//                       className={`relative px-5 py-3 hover:bg-[#2a2a2a] cursor-pointer flex justify-between items-center border-b border-gray-700 last:border-b-0 ${
//                         isRTL ? "flex-row-reverse" : ""
//                       }`}
//                       onMouseEnter={() => setOpenSub(brand.name)}
//                     >
//                       <span className="text-sm">{brand.name}</span>
//                       <span className="text-[#C9A24D]">
//                         {isRTL ? "‹" : "›"}
//                       </span>

//                       {/* SUB DROPDOWN */}
//                       {brand.sub && openSub === brand.name && (
//                         <div
//                           className={`absolute top-0 ${
//                             isRTL ? "right-full mr-2" : "left-full ml-2"
//                           } bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-52`}
//                         >
//                           {brand.sub.map((sub) => (
//                             <div
//                               key={sub}
//                               className="px-5 py-3 hover:bg-[#2a2a2a] text-sm border-b border-gray-700 last:border-b-0"
//                             >
//                               {sub}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* ================= MOBILE ================= */}
//       <div className="md:hidden overflow-x-auto py-3 px-3">
//         <div
//           className={`flex gap-3 whitespace-nowrap ${
//             isRTL ? "flex-row-reverse" : ""
//           }`}
//         >
//           {menu.map((item) => {
//             const label = t(`categories.${item.key}`);

//             return (
//               <button
//                 key={item.key}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   handleClick(item.key);
//                 }}
//                 type="button"
//                 className={`px-4 py-2 rounded-full text-xs font-medium border transition cursor-pointer
//                   ${
//                     selectedItem === item.key
//                       ? "text-[#C9A24D] border-[#C9A24D]"
//                       : "text-white border-transparent"
//                   }
//                 `}
//               >
//                 {label}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

type Category = {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  status: string;
};

type Brand = {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  status: string;
};

export default function CategoryBar() {
  const { i18n } = useTranslation("common");
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string>("new");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const isRTL = i18n.language === "ar";

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/home");
        const data = await res.json();

        const activeCategories = data.categories.filter(
          (cat: Category) => cat.status === "active"
        );

        const activeBrands = data.brands.filter(
          (brand: Brand) => brand.status === "active"
        );

        setCategories(activeCategories);
        setBrands(activeBrands);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  // ================= CLICK HANDLER =================
  const handleClick = (key: string) => {
    setSelectedItem(key);

    if (key === "new") {
      router.push("/");
    } else if (key === "brands") {
      router.push("/brands");
    } else {
      // Navigate to brands page with category filter
      router.push(`/brands?category=${key}`);
    }
  };

  return (
    <div className="w-full bg-black relative z-10">
      {/* ================= DESKTOP ================= */}
      <div
        className={`hidden md:flex justify-center gap-6 py-4 text-white px-4 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        {/* ===== NEW ===== */}
        <div>
          <button
            onClick={() => handleClick("new")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border-2
              ${
                selectedItem === "new"
                  ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
                  : "text-white border-transparent hover:text-[#C9A24D]"
              }
            `}
          >
            {isRTL ? "جديد" : "New"}
          </button>
        </div>

        {/* ===== BRANDS ===== */}
        <div className="relative">
          <button
            onClick={() => {
              setSelectedItem("brands");
              setOpenMenu(openMenu === "brands" ? null : "brands");
            }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border-2
              ${
                selectedItem === "brands"
                  ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
                  : "text-white border-transparent hover:text-[#C9A24D]"
              }
            `}
          >
            {isRTL ? "العلامات التجارية" : "Brands"}
          </button>

          {/* Brands Dropdown - Show on Click */}
          {openMenu === "brands" && (
            <div
              className={`absolute top-full mt-2 z-50 ${
                isRTL
                  ? "right-1/2 translate-x-1/2"
                  : "left-1/2 -translate-x-1/2"
              } bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-72 max-h-96 overflow-y-auto`}
            >
              {brands.map((brand) => (
                <div
                  key={brand._id}
                  onClick={() => {
                    router.push(`/brands?brand=${brand._id}`);
                    setOpenMenu(null);
                  }}
                  className="px-5 py-3 hover:bg-[#2a2a2a] cursor-pointer text-sm border-b border-gray-700 last:border-b-0 transition"
                >
                  {isRTL ? brand.nameArabic : brand.nameEnglish}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== DYNAMIC CATEGORIES ===== */}
        {categories.map((cat) => (
          <div key={cat._id}>
            <button
              onClick={() => handleClick(cat._id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border-2
                ${
                  selectedItem === cat._id
                    ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
                    : "text-white border-transparent hover:text-[#C9A24D]"
                }
              `}
            >
              {isRTL ? cat.nameArabic : cat.nameEnglish}
            </button>
          </div>
        ))}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden py-3 px-3">
        <div
          className={`flex gap-3 whitespace-nowrap overflow-x-auto ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <button
            onClick={() => handleClick("new")}
            className={`px-4 py-2 rounded-full text-xs font-medium border
              ${
                selectedItem === "new"
                  ? "text-[#C9A24D] border-[#C9A24D]"
                  : "text-white border-transparent"
              }
            `}
          >
            {isRTL ? "جديد" : "New"}
          </button>

          {/* Mobile Brands with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setSelectedItem("brands");
                setOpenMenu(openMenu === "brands" ? null : "brands");
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium border
                ${
                  selectedItem === "brands"
                    ? "text-[#C9A24D] border-[#C9A24D]"
                    : "text-white border-transparent"
                }
              `}
            >
              {isRTL ? "العلامات التجارية" : "Brands"}
            </button>

            {/* Mobile Brands Dropdown */}
            {openMenu === "brands" && (
              <div
                className={`absolute ${
                  isRTL ? "right-0" : "left-0"
                } top-full mt-2 z-50 bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-48 max-h-64 overflow-y-auto`}
              >
                {brands.map((brand) => (
                  <div
                    key={brand._id}
                    onClick={() => {
                      router.push(`/brands?brand=${brand._id}`);
                      setOpenMenu(null);
                    }}
                    className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-xs border-b border-gray-700 last:border-b-0 transition"
                  >
                    {isRTL ? brand.nameArabic : brand.nameEnglish}
                  </div>
                ))}
              </div>
            )}
          </div>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleClick(cat._id)}
              className={`px-4 py-2 rounded-full text-xs font-medium border
                ${
                  selectedItem === cat._id
                    ? "text-[#C9A24D] border-[#C9A24D]"
                    : "text-white border-transparent"
                }
              `}
            >
              {isRTL ? cat.nameArabic : cat.nameEnglish}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
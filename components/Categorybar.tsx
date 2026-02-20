"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";


// type Brand = {
//   name: string;
//   sub?: string[];
// };

// type MenuItem = {
//   name: string;
//   brands?: Brand[];
// };
type Brand = {
  name: string;
  sub?: string[];
};

type MenuItem = {
  key: string;
  brands?: Brand[];
};

export default function CategoryBar() {
  const { t, i18n } = useTranslation('common');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  // const [selectedItem, setSelectedItem] = useState<string>("New");
  const [selectedItem, setSelectedItem] = useState<string>("new");

  const isRTL = i18n.language === 'ar';
  const router = useRouter();

  const menu: MenuItem[] = [
    {
      key: "new",
      brands: [
        { name: "L'Oréal", sub: ["Estée Lauder", "MAC"] },
        { name: "Maybelline", sub: ["Clinique", "Fenty Beauty"] },
      ],
    },
    { key: "brands" },
    { key: "makeup" },
    { key: "skincare" },
    { key: "haircare" },
    { key: "fragrance" },
    { key: "bodycare" },
    { key: "toolsBrushes" },
  ];
//   const routeMap: Record<string, string> = {
//   [t("categories.brands")]: "/brands",
//   [t("categories.makeup")]: "/makeup",
//   [t("categories.skincare")]: "/skincare",
//   [t("categories.haircare")]: "/haircare",
//   [t("categories.fragrance")]: "/fragrance",
//   [t("categories.bodycare")]: "/bodycare",
//   [t("categories.toolsBrushes")]: "/tools-brushes",
// };


//   return (
//     // <div className="w-full bg-black py-2 sm:py-4 relative z-10">
//     <div className="hidden md:block w-full bg-black py-4 relative z-10">

//       {/* DESKTOP MENU - ONLY visible on desktop screens (hidden on mobile) */}
//       <div className={`hidden sm:flex justify-center gap-4 lg:gap-8 text-white px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
//         {menu.map((item) => (
//           <div
//             key={item.name}
//             className="relative"
//             onMouseEnter={() => setOpenMenu(item.name)}
//             onMouseLeave={() => {
//               setOpenMenu(null);
//               setOpenSub(null);
//             }}
//           >
//             {/* TOP ITEM */}
//             <button
//               // onClick={() => setSelectedItem(item.name);
                
//               // }
// //               onClick={() => {
// //   setSelectedItem(item.name);

// //   if (item.name === t("categories.brands")) {
// //     router.push("/brands");
// //   }
// // }}
// onClick={() => {
//   setSelectedItem(item.name);

//   const route = routeMap[item.name];
//   if (route) {
//     router.push(route);
//   }
// }}

              
//               className={`px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium transition duration-300 ${isRTL ? 'font-arabic' : ''}
//                 ${
//                   selectedItem === item.name
//                     ? "text-[#C9A24D] border-2 border-[#C9A24D] bg-[#1a1a1a]"
//                     : "text-white hover:text-[#C9A24D] border-2 border-transparent"
//                 }
//               `}
//             >
//               {item.name}
//             </button>

//             {/* FIRST DROPDOWN */}
//             {item.brands && openMenu === item.name && (
//               <div className={`absolute top-full mt-2 ${
//   isRTL
//     ? "right-1/2 translate-x-1/2"
//     : "left-1/2 -translate-x-1/2"
// } bg-[#1a1a1a] border border-[#C9A24D] text-white rounded-lg shadow-xl min-w-50 lg:min-w-60 z-20`}
// >
//                 {item.brands.map((brand) => (
//                   <div
//                     key={brand.name}
//                     className={`relative px-4 lg:px-5 py-2 lg:py-3 hover:bg-[#2a2a2a] cursor-pointer flex justify-between items-center border-b border-gray-700 last:border-b-0 transition ${isRTL ? 'flex-row-reverse' : ''}`}
//                     onMouseEnter={() => setOpenSub(brand.name)}
//                   >
//                     <span className="font-medium text-white text-sm">{brand.name}</span>
//                     <span className="text-[#C9A24D] text-sm">{isRTL ? '‹' : '›'}</span>

//                     {/* SUB DROPDOWN */}
//                     {brand.sub && openSub === brand.name && (
//                       <div className={`absolute top-0 ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-45 lg:min-w-55 z-30`}>
//                         {brand.sub.map((sub) => (
//                           <div
//                             key={sub}
//                             className="px-4 lg:px-5 py-2 lg:py-3 hover:bg-[#2a2a2a] cursor-pointer text-white border-b border-gray-700 last:border-b-0 transition text-sm"
//                           >
//                             {sub}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* MOBILE MENU - Completely hidden on mobile */}
//       {/* Categories are accessed through the mobile hamburger menu instead */}
//     </div>
//   );
// }
  const routeMap: Record<string, string> = {
    new: "/",
    brands: "/brands",
    makeup: "/makeup",
    skincare: "/skincare",
    haircare: "/haircare",
    fragrance: "/fragrance",
    bodycare: "/bodycare",
    toolsBrushes: "/tools-brushes",
  };

  const handleClick = (key: string) => {
    console.log('Clicked key:', key);
    console.log('Route:', routeMap[key]);
    setSelectedItem(key);
    const route = routeMap[key];
    if (route) {
      console.log('Navigating to:', route);
      router.push(route);
    } else {
      console.log('No route found for key:', key);
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
        {menu.map((item) => {
          const label = t(`categories.${item.key}`);

          return (
            <div
              key={item.key}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.key)}
              onMouseLeave={() => {
                setOpenMenu(null);
                setOpenSub(null);
              }}
            >
              {/* TOP BUTTON */}
              <button
                onClick={() => handleClick(item.key)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border-2
                  ${
                    selectedItem === item.key
                      ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
                      : "text-white border-transparent hover:text-[#C9A24D]"
                  }
                `}
              >
                {label}
              </button>

              {/* FIRST DROPDOWN */}
              {item.brands && openMenu === item.key && (
                <div
                  className={`absolute top-full mt-2 ${
                    isRTL
                      ? "right-1/2 translate-x-1/2"
                      : "left-1/2 -translate-x-1/2"
                  } bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-60`}
                >
                  {item.brands.map((brand) => (
                    <div
                      key={brand.name}
                      className={`relative px-5 py-3 hover:bg-[#2a2a2a] cursor-pointer flex justify-between items-center border-b border-gray-700 last:border-b-0 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                      onMouseEnter={() => setOpenSub(brand.name)}
                    >
                      <span className="text-sm">{brand.name}</span>
                      <span className="text-[#C9A24D]">
                        {isRTL ? "‹" : "›"}
                      </span>

                      {/* SUB DROPDOWN */}
                      {brand.sub && openSub === brand.name && (
                        <div
                          className={`absolute top-0 ${
                            isRTL ? "right-full mr-2" : "left-full ml-2"
                          } bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-52`}
                        >
                          {brand.sub.map((sub) => (
                            <div
                              key={sub}
                              className="px-5 py-3 hover:bg-[#2a2a2a] text-sm border-b border-gray-700 last:border-b-0"
                            >
                              {sub}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden overflow-x-auto py-3 px-3">
        <div
          className={`flex gap-3 whitespace-nowrap ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {menu.map((item) => {
            const label = t(`categories.${item.key}`);

            return (
              <button
                key={item.key}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClick(item.key);
                }}
                type="button"
                className={`px-4 py-2 rounded-full text-xs font-medium border transition cursor-pointer
                  ${
                    selectedItem === item.key
                      ? "text-[#C9A24D] border-[#C9A24D]"
                      : "text-white border-transparent"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
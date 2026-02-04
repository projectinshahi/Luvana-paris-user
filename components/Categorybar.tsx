// "use client";

// import { useState } from "react";

// const categories = [
//   "New",
//   "Brands",
//   "Makeup",
//   "Skin care",
//   "Hair care",
//   "Fragrance",
//   "Body care",
//   "Tools & Brushes",
// ];

// export default function CategoryBar() {
//   const [active, setActive] = useState<string>("New");

//   return (
//     <div className="w-full bg-black py-2">
//       <div className="max-w-[1728px] mx-auto px-6">
//         <div className="flex items-center gap-8 border border-[#1E90FF] px-6 py-2">
//           {categories.map((item) => (
//             <button
//               key={item}
//               onClick={() => setActive(item)}
//               className={`text-sm md:text-base font-medium transition
//                 ${
//                   active === item
//                     ? "text-[#C9A24D] border border-[#C9A24D] px-4 py-1 rounded"
//                     : "text-white hover:text-[#C9A24D]"
//                 }
//               `}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

type Brand = {
  name: string;
  sub?: string[];
};

type MenuItem = {
  name: string;
  brands?: Brand[];
};

export default function CategoryBar() {
  const { t, i18n } = useTranslation('common');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("New");
  const isRTL = i18n.language === 'ar';

  const menu: MenuItem[] = [
    {
      name: t('categories.new'),
      brands: [
        { name: "L'Oréal", sub: ["Estée Lauder", "MAC"] },
        { name: "Maybelline", sub: ["Clinique", "Fenty Beauty"] },
      ],
    },
    { name: t('categories.brands') },
    { name: t('categories.makeup') },
    { name: t('categories.skincare') },
    { name: t('categories.haircare') },
    { name: t('categories.fragrance') },
    { name: t('categories.bodycare') },
    { name: t('categories.toolsBrushes') },
  ];

  return (
    <div className="w-full bg-black py-2 sm:py-4 relative z-10">
      {/* DESKTOP MENU */}
      <div className={`hidden md:flex justify-center gap-4 lg:gap-8 text-white px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {menu.map((item) => (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => setOpenMenu(item.name)}
            onMouseLeave={() => {
              setOpenMenu(null);
              setOpenSub(null);
            }}
          >
            {/* TOP ITEM */}
            <button
              onClick={() => setSelectedItem(item.name)}
              className={`px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium transition duration-300 ${isRTL ? 'font-arabic' : ''}
                ${
                  selectedItem === item.name
                    ? "text-[#C9A24D] border-2 border-[#C9A24D] bg-[#1a1a1a]"
                    : "text-white hover:text-[#C9A24D] border-2 border-transparent"
                }
              `}
            >
              {item.name}
            </button>

            {/* FIRST DROPDOWN */}
            {item.brands && openMenu === item.name && (
              <div className={`absolute top-full mt-2 ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} bg-[#1a1a1a] border border-[#C9A24D] text-white rounded-lg shadow-xl min-w-[200px] lg:min-w-[240px] z-20`}>
                {item.brands.map((brand) => (
                  <div
                    key={brand.name}
                    className={`relative px-4 lg:px-5 py-2 lg:py-3 hover:bg-[#2a2a2a] cursor-pointer flex justify-between items-center border-b border-gray-700 last:border-b-0 transition ${isRTL ? 'flex-row-reverse' : ''}`}
                    onMouseEnter={() => setOpenSub(brand.name)}
                  >
                    <span className="font-medium text-white text-sm">{brand.name}</span>
                    <span className="text-[#C9A24D] text-sm">{isRTL ? '‹' : '›'}</span>

                    {/* SUB DROPDOWN */}
                    {brand.sub && openSub === brand.name && (
                      <div className={`absolute top-0 ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-[180px] lg:min-w-[220px] z-30`}>
                        {brand.sub.map((sub) => (
                          <div
                            key={sub}
                            className="px-4 lg:px-5 py-2 lg:py-3 hover:bg-[#2a2a2a] cursor-pointer text-white border-b border-gray-700 last:border-b-0 transition text-sm"
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
        ))}
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden px-4">
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedItem(item.name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition duration-300 whitespace-nowrap ${isRTL ? 'font-arabic' : ''}
                ${
                  selectedItem === item.name
                    ? "text-[#C9A24D] border border-[#C9A24D] bg-[#1a1a1a]"
                    : "text-white hover:text-[#C9A24D] border border-transparent"
                }
              `}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

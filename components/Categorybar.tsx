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

type Brand = {
  name: string;
  sub?: string[];
};

type MenuItem = {
  name: string;
  brands?: Brand[];
};

const menu: MenuItem[] = [
  {
    name: "New",
    brands: [
      { name: "L'Oréal", sub: ["Estée Lauder", "MAC"] },
      { name: "Maybelline", sub: ["Clinique", "Fenty Beauty"] },
    ],
  },
  { name: "Brands" },
  { name: "Makeup" },
  { name: "Skin care" },
  { name: "Hair care" },
  { name: "Fragrance" },
  { name: "Body care" },
  { name: "Tools & Brushes" },
];

export default function CategoryBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("New");

  return (
    <div className="w-full bg-black py-4 relative z-10">
      {/* CENTER MENU */}
      <div className="flex justify-center gap-8 text-white px-4">

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
              className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300
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
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#C9A24D] text-white rounded-lg shadow-xl min-w-[240px] z-20">

                {item.brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="relative px-5 py-3 hover:bg-[#2a2a2a] cursor-pointer flex justify-between items-center border-b border-gray-700 last:border-b-0 transition"
                    onMouseEnter={() => setOpenSub(brand.name)}
                  >
                    <span className="font-medium text-white">{brand.name}</span>
                    <span className="text-[#C9A24D] text-sm">›</span>

                    {/* SUB DROPDOWN */}
                    {brand.sub && openSub === brand.name && (
                      <div className="absolute top-0 left-full ml-2 bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-xl min-w-[220px] z-30">
                        {brand.sub.map((sub) => (
                          <div
                            key={sub}
                            className="px-5 py-3 hover:bg-[#2a2a2a] cursor-pointer text-white border-b border-gray-700 last:border-b-0 transition"
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
    </div>
  );
}

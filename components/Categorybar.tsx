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

import { useState, useEffect, useRef } from "react";
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
  const [dropdownLeft, setDropdownLeft] = useState(12);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const isRTL = i18n.language === "ar";

  // Drag and swipe support
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const brandsBtnRef = useRef<HTMLButtonElement>(null);
  
  // Premium physics for smooth interaction
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumAnimationRef = useRef<number | null>(null);
  const isMovingRef = useRef(false);

  // Physics constants for premium smooth feel
  const FRICTION = 0.92;
  const MIN_VELOCITY = 0.05;
  const VELOCITY_MULTIPLIER = 2;
  const SCROLL_MULTIPLIER = 1.8;

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.luvanaparis.com";
        const res = await fetch(`${API_URL}/user/home`);
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

 
const handleClick = (key: string) => {
  setSelectedItem(key);
  setOpenMenu(null);

  if (key === "new") {
    router.push("/");
  } else if (key === "brands") {
    router.push("/brands");
  } else {
    // ✅ Correct format
    router.push(`/brands?category=${key}`);
  }
};

  /* ================= PREMIUM DRAG AND SWIPE HANDLERS ================= */
  
  const updateDropdownPosition = () => {
    if (brandsBtnRef.current && categoryScrollRef.current) {
      const btnRect = brandsBtnRef.current.getBoundingClientRect();
      
      let left = btnRect.left;
      const dropdownWidth = 240; 
      
      if (left + dropdownWidth > window.innerWidth - 12) {
         left = window.innerWidth - dropdownWidth - 12;
      }
      if (left < 12) left = 12;

      setDropdownLeft(left);
    }
  };

  const calculateVelocity = (currentX: number, previousX: number, timeDiff: number) => {
    if (timeDiff <= 0) return 0;
    const rawVelocity = (previousX - currentX) / timeDiff;
    return rawVelocity * VELOCITY_MULTIPLIER;
  };

  const applyMomentumScrolling = (initialVelocity: number) => {
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
    }

    let velocity = initialVelocity;
    const animate = () => {
      if (!categoryScrollRef.current || Math.abs(velocity) < MIN_VELOCITY) {
        velocity = 0;
        isMovingRef.current = false;
        return;
      }

      isMovingRef.current = true;
      categoryScrollRef.current.scrollLeft += velocity;
      velocity *= FRICTION;
      momentumAnimationRef.current = requestAnimationFrame(animate);
    };

    momentumAnimationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoryScrollRef.current) return;
    
    isDraggingRef.current = true;
    isMovingRef.current = true;
    
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
    }

    startXRef.current = e.pageX - categoryScrollRef.current.offsetLeft;
    scrollLeftRef.current = categoryScrollRef.current.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = Date.now();
    
    categoryScrollRef.current.style.cursor = "grabbing";
    categoryScrollRef.current.style.scrollBehavior = "auto";
    (e.currentTarget as HTMLElement).style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !categoryScrollRef.current) return;

    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * SCROLL_MULTIPLIER;
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTimeRef.current;
    
    if (timeDiff > 0) {
      velocityRef.current = calculateVelocity(e.pageX, lastXRef.current, timeDiff);
    }
    
    lastXRef.current = e.pageX;
    lastTimeRef.current = currentTime;
    
    categoryScrollRef.current.scrollLeft = scrollLeftRef.current + walk;
  };

  const handleMouseUp = () => {
    if (!categoryScrollRef.current) return;
    
    isDraggingRef.current = false;
    categoryScrollRef.current.style.cursor = "grab";
    categoryScrollRef.current.style.userSelect = "auto";
    categoryScrollRef.current.style.scrollBehavior = "smooth";

    applyMomentumScrolling(velocityRef.current);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!categoryScrollRef.current) return;
    
    isDraggingRef.current = true;
    isMovingRef.current = true;
    
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
    }

    startXRef.current = e.touches[0].clientX - categoryScrollRef.current.offsetLeft;
    scrollLeftRef.current = categoryScrollRef.current.scrollLeft;
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !categoryScrollRef.current) return;

    const x = e.touches[0].clientX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * SCROLL_MULTIPLIER;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastTimeRef.current;
    
    if (timeDiff > 0) {
      velocityRef.current = calculateVelocity(e.touches[0].clientX, lastXRef.current, timeDiff);
    }
    
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = currentTime;

    categoryScrollRef.current.scrollLeft = scrollLeftRef.current + walk;
  };

  const handleTouchEnd = () => {
    if (!categoryScrollRef.current) return;
    
    isDraggingRef.current = false;

    applyMomentumScrolling(velocityRef.current);
  };
  return (
    <div className="w-full bg-black relative z-[60]">
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
            // className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border
            //   ${
            //     selectedItem === "new"
            //       ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
            //       : "text-white border-transparent hover:text-[#C9A24D]"
            //   }
            // `}
            className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border focus:outline-none focus:ring-0
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
            className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border
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
              } bg-[#1a1a1a] border border-[#C9A24D] rounded-lg shadow-[0_4px_30px_rgba(201,162,77,0.15)] min-w-80 max-h-96 overflow-y-auto desktop-dropdown-animate`}
            >
              {brands.map((brand) => (
                <div
                  key={brand._id}
                  onClick={() => {
                    setSelectedItem("brands");
                    setOpenMenu(null);
                    router.push(`/brands?brand=${brand._id}`);
                  }}
                  className={`px-5 py-3 hover:bg-[#2a2a2a] cursor-pointer text-sm font-medium text-gray-200 hover:text-[#C9A24D] border-b border-gray-800 last:border-b-0 transition-colors ${
                    isRTL ? "text-right" : "text-left"
                  }`}
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
              className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 border
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
          ref={categoryScrollRef}
          onScroll={updateDropdownPosition}
          className={`flex gap-3 whitespace-nowrap overflow-x-auto hide-scrollbar scroll-snap-x select-none ${
            isRTL ? "flex-row-reverse" : ""
          }`}
          style={{
            scrollBehavior: 'smooth',
            scrollPaddingLeft: '0px',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => handleClick("new")}
            className={`px-4 py-2 rounded-full text-xs font-medium border scroll-snap-align-start shrink-0 transition-colors
              ${
                selectedItem === "new"
                  ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
                  : "text-white border-transparent hover:text-[#C9A24D]"
              }
            `}
          >
            {isRTL ? "جديد" : "New"}
          </button>

          {/* Mobile Brands Button */}
          <button
            ref={brandsBtnRef}
            onClick={(e) => {
              if (openMenu === "brands") {
                router.push("/brands");
                setOpenMenu(null);
              } else {
                setSelectedItem("brands");
                setOpenMenu("brands");
                setTimeout(updateDropdownPosition, 0);
              }
            }}
            className={`px-4 py-2 rounded-full text-xs font-medium border scroll-snap-align-start shrink-0 transition-colors
              ${
                selectedItem === "brands"
                  ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
                  : "text-white border-transparent hover:text-[#C9A24D]"
              }
            `}
          >
            {isRTL ? "العلامات التجارية" : "Brands"}
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleClick(cat._id)}
              className={`px-4 py-2 rounded-full text-xs font-medium border scroll-snap-align-start shrink-0 transition-colors
                ${
                  selectedItem === cat._id
                    ? "text-[#C9A24D] border-[#C9A24D] bg-[#1a1a1a]"
                    : "text-white border-transparent hover:text-[#C9A24D]"
                }
              `}
            >
              {isRTL ? cat.nameArabic : cat.nameEnglish}
            </button>
          ))}
        </div>

        {/* Mobile Brands Dropdown Rendered outside the scrolling container */}
        {openMenu === "brands" && (
          <div
            className="absolute z-[70] bg-[#0a0a0a] border border-[#C9A24D] rounded-lg shadow-2xl min-w-[240px] max-h-[50vh] overflow-y-auto dropdown-slide-down"
            style={{ 
               top: '100%', 
               left: `${dropdownLeft}px`,
               marginTop: '4px' 
            }}
          >
            {brands.map((brand) => (
              <div
                key={brand._id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem("brands");
                  setOpenMenu(null);
                  router.push(`/brands?brand=${brand._id}`);
                }}
                className={`px-5 py-3 hover:bg-[#1a1a1a] cursor-pointer text-sm font-medium text-white hover:text-[#C9A24D] border-b border-[#222] last:border-b-0 transition-colors ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {isRTL ? brand.nameArabic : brand.nameEnglish}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        /* Premium scrollbar hiding */
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE & Edge */
          -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge Chromium */
        }

        /* Scroll snap container with premium feel */
        .scroll-snap-x {
          scroll-snap-type: x mandatory;
          scroll-snap-stop: always;
          scroll-behavior: smooth;
          scroll-padding: 0px;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          touch-action: pan-x; /* Allow native horizontal panning */
          overscroll-behavior-x: contain; /* Prevent browser bounce */
        }

        /* Scroll snap alignment for items */
        .scroll-snap-align-start {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          flex-shrink: 0; /* Prevent button squishing */
        }

        /* Premium drag cursor feedback */
        .scroll-snap-x {
          cursor: grab;
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text y="16" font-size="20">✋</text></svg>') 16 16, grab;
        }

        .scroll-snap-x:active {
          cursor: grabbing;
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text y="16" font-size="20">✊</text></svg>') 16 16, grabbing;
        }

        /* Smooth animation without jitter */
        .scroll-snap-x * {
          backface-visibility: hidden; /* Reduce jitter */
          -webkit-font-smoothing: antialiased;
          -webkit-touch-callout: none;
        }

        /* Prevent selection while dragging */
        .select-none {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        /* Performance optimization for buttons */
        .scroll-snap-align-start {
          will-change: transform;
          transform: translateZ(0);
        }

        /* Smooth transitions */
        .transition-all {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Dropdown Animations */
        @keyframes dropdownSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dropdown-slide-down {
          animation: dropdownSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes desktopDropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px) translateX(var(--tw-translate-x));
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(var(--tw-translate-x));
          }
        }
        .desktop-dropdown-animate {
          animation: desktopDropdownSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
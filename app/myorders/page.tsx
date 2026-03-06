// "use client";

// import { useState } from "react";
// import { Package, ChevronRight, Search, Filter } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "@/lib/useLanguage";
// import ResponsiveLayout from "@/components/ResponsiveLayout";

// interface Order {
//   id: string;
//   date: string;
//   status: "delivered" | "shipped" | "processing" | "cancelled";
//   total: number;
//   items: {
//     name: string;
//     image: string;
//     quantity: number;
//     price: number;
//   }[];
// }

// export default function YourOrdersPage() {
//   const { t } = useTranslation("common");
//   const { isRTL } = useLanguage();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");

//   const orders: Order[] = [
//     {
//       id: "ORD-2024-001",
//       date: "2024-02-15",
//       status: "delivered",
//       total: 3098,
//       items: [
//         {
//           name: "Velvet Matte Lipstick - Berry Pink",
//           image: "https://cdn.thewirecutter.com/wp-content/media/2026/02/BEST-LIPSTICK-0410-2x1-1.jpg",
//           quantity: 1,
//           price: 899,
//         },
//         {
//           name: "Luxury Glow Serum 30ml",
//           image: "https://healthstores.in/cdn/shop/files/PP_whitening_Cream_7.jpg?v=1766571833&width=1445",
//           quantity: 2,
//           price: 2199,
//         },
//       ],
//     },
//     {
//       id: "ORD-2024-002",
//       date: "2024-02-10",
//       status: "shipped",
//       total: 1599,
//       items: [
//         {
//           name: "Hydrating Face Cream",
//           image: "https://www.jovees.com/cdn/shop/files/Artboard_3_b97ec74d-8c5a-4ea6-81ed-7360dfbfa50e.jpg?v=1738930572",
//           quantity: 1,
//           price: 1599,
//         },
//       ],
//     },
//     {
//       id: "ORD-2024-003",
//       date: "2024-02-05",
//       status: "processing",
//       total: 2499,
//       items: [
//         {
//           name: "Makeup Gift Set",
//           image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24576580/2023/11/28/a7cac8ba-5190-410f-994a-c4b3a0aefce61701159587240-NOY-Set-Of-15-Makeup-Gift-Set-9491701159587175-1.jpg",
//           quantity: 1,
//           price: 2499,
//         },
//       ],
//     },
//   ];

//   const statusColors = {
//     delivered: "bg-green-500/20 text-green-400 border-green-500/30",
//     shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
//     processing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//     cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
//   };

//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
//     const matchesFilter = filterStatus === "all" || order.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <>
     
//       <ResponsiveLayout>
//         <div className="min-h-screen bg-[#0D0D0D] text-white pt-20">
//           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Header */}
//             <div className="mb-8">
//               <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
//                 Your Orders
//               </h1>
//               <p className={`text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
//                 Track and manage your orders
//               </p>
//             </div>

//             {/* Search and Filter */}
//             <div className="mb-6 flex flex-col sm:flex-row gap-4">
//               {/* Search */}
//               <div className="flex-1 relative">
//                 <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
//                 <input
//                   type="text"
//                   placeholder="Search orders..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className={`w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A24D] transition ${
//                     isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'
//                   }`}
//                   style={{ fontSize: '16px' }}
//                 />
//               </div>

//               {/* Filter */}
//               <div className="relative">
//                 <Filter size={18} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`} />
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className={`bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-3 text-white focus:outline-none focus:border-[#C9A24D] transition appearance-none cursor-pointer ${
//                     isRTL ? 'pr-4 pl-12 text-right' : 'pl-12 pr-10 text-left'
//                   }`}
//                   style={{ fontSize: '16px', minWidth: '180px' }}
//                 >
//                   <option value="all">All Orders</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="processing">Processing</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </div>

//             {/* Orders List */}
//             {filteredOrders.length === 0 ? (
//               <div className="text-center py-16">
//                 <Package size={64} className="mx-auto mb-4 text-gray-600" />
//                 <h3 className="text-xl font-semibold mb-2">No orders found</h3>
//                 <p className="text-gray-400">Try adjusting your search or filter</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredOrders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#C9A24D]/30 transition"
//                   >
//                     {/* Order Header */}
//                     <div className="p-4 sm:p-6 border-b border-[#2A2A2A]">
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
//                             <h3 className="text-lg font-semibold">{order.id}</h3>
//                             <span
//                               className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
//                                 statusColors[order.status]
//                               } w-fit`}
//                             >
//                               {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-400">
//                             Ordered on {new Date(order.date).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'long',
//                               day: 'numeric'
//                             })}
//                           </p>
//                         </div>
//                         <div className={`${isRTL ? 'text-right' : 'text-left'} sm:text-right`}>
//                           <p className="text-sm text-gray-400 mb-1">Total</p>
//                           <p className="text-xl font-bold text-[#C9A24D]">₹{order.total.toLocaleString()}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Order Items */}
//                     <div className="p-4 sm:p-6">
//                       <div className="space-y-4">
//                         {order.items.map((item, idx) => (
//                           <div
//                             key={idx}
//                             className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
//                           >
//                             {/* Product Image */}
//                             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#0D0D0D] shrink-0">
//                               <img
//                                 src={item.image}
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>

//                             {/* Product Info */}
//                             <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
//                               <h4 className="font-medium mb-1 line-clamp-2">{item.name}</h4>
//                               <p className="text-sm text-gray-400 mb-2">Qty: {item.quantity}</p>
//                               <p className="text-[#C9A24D] font-semibold">₹{item.price.toLocaleString()}</p>
//                             </div>

//                             {/* View Details Button - Desktop */}
//                             <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#C9A24D] hover:bg-[#B8934C] text-black rounded-lg font-medium transition h-fit">
//                               View Details
//                               <ChevronRight size={16} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Action Buttons - Mobile */}
//                       <div className="sm:hidden mt-4 pt-4 border-t border-[#2A2A2A] flex gap-3">
//                         <button className="flex-1 py-3 bg-[#C9A24D] hover:bg-[#B8934C] text-black rounded-lg font-medium transition">
//                           View Details
//                         </button>
//                         {order.status === "delivered" && (
//                           <button className="flex-1 py-3 border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D]/10 rounded-lg font-medium transition">
//                             Buy Again
//                           </button>
//                         )}
//                       </div>

//                       {/* Action Buttons - Desktop */}
//                       <div className="hidden sm:flex gap-3 mt-6 pt-6 border-t border-[#2A2A2A]">
//                         <button className="px-6 py-3 bg-[#C9A24D] hover:bg-[#B8934C] text-black rounded-lg font-medium transition">
//                           Track Order
//                         </button>
//                         {order.status === "delivered" && (
//                           <button className="px-6 py-3 border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D]/10 rounded-lg font-medium transition">
//                             Buy Again
//                           </button>
//                         )}
//                         {order.status === "processing" && (
//                           <button className="px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500/10 rounded-lg font-medium transition">
//                             Cancel Order
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </ResponsiveLayout>
    
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Package, ChevronRight, Search, Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/useLanguage";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import api from "@/lib/axios";

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled" | "pending";
  total: number;
  items: OrderItem[];
}

export default function YourOrdersPage() {
  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  /* ================= FETCH ORDERS ================= */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/user/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const backendOrders = res.data.orders || [];

        const formattedOrders = backendOrders.map((order: any) => ({
          id: order.orderId,
          date: order.createdAt,
          status: order.status,
          total: order.price - order.discount,

          items: order.orderItem.map((item: any) => ({
            name: isRTL
              ? item.productNameArabic || item.product?.nameArabic
              : item.productNameEnglish || item.product?.nameEnglish,

            image: isRTL
              ? item.productImageArabic
              : item.productImageEnglish,

            quantity: item.quantity,
            price: item.price,
          })),
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isRTL]);

  /* ================= STATUS COLORS ================= */

  const statusColors: any = {
    delivered: "bg-green-500/20 text-green-400 border-green-500/30",
    shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    processing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  /* ================= FILTER ================= */

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <ResponsiveLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading Orders...
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-[#0D0D0D] text-white pt-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}

          <div className="mb-8">
            <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${isRTL ? "text-right" : "text-left"}`}>
              Your Orders
            </h1>
            <p className={`text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              Track and manage your orders
            </p>
          </div>

          {/* SEARCH + FILTER */}

          <div className="mb-6 flex flex-col sm:flex-row gap-4">

            <div className="flex-1 relative">
              <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-4" : "left-4"}`} />

              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A24D] transition ${
                  isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
                }`}
              />
            </div>

            <div className="relative">
              <Filter size={18} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-4" : "left-4"}`} />

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-3 text-white focus:outline-none focus:border-[#C9A24D] appearance-none ${
                  isRTL ? "pr-4 pl-12 text-right" : "pl-12 pr-10 text-left"
                }`}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* ORDERS LIST */}

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package size={64} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-gray-400">Try adjusting your search</p>
            </div>
          ) : (
            <div className="space-y-4">

              {filteredOrders.map((order) => (

                <div
                  key={order.id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#C9A24D]/30 transition"
                >

                  {/* ORDER HEADER */}

                  <div className="p-4 sm:p-6 border-b border-[#2A2A2A]">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">

                          <h3 className="text-lg font-semibold">
                            {order.id}
                          </h3>

                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs border ${
                              statusColors[order.status]
                            }`}
                          >
                            {order.status}
                          </span>

                        </div>

                        <p className="text-sm text-gray-400">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>

                      </div>

                      <div className="text-[#C9A24D] font-bold text-xl">
                        ₹{order.total.toLocaleString()}
                      </div>

                    </div>

                  </div>

                  {/* ORDER ITEMS */}

                  <div className="p-4 sm:p-6 space-y-4">

                    {order.items.map((item, idx) => (

                      <div
                        key={idx}
                        className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                      >

                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#0D0D0D]">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                        </div>

                        <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>

                          <h4 className="font-medium mb-1">
                            {item.name}
                          </h4>

                          <p className="text-sm text-gray-400">
                            Qty: {item.quantity}
                          </p>

                          <p className="text-[#C9A24D] font-semibold">
                            ₹{item.price}
                          </p>

                        </div>

                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#C9A24D] text-black rounded-lg">
                          View Details
                          <ChevronRight size={16} />
                        </button>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>
      </div>
    </ResponsiveLayout>
  );
}
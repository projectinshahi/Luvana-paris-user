
// "use client";

// import {
//   User,
//   Shield,
//   MapPin,
//   LogOut,
//   Phone,
//   Edit,
//   Plus,
// } from "lucide-react";

// export default function ProfilePage() {
//   return (
//     <div className="min-h-screen bg-black text-white py-20 px-4">
//       <div className="max-w-7xl mx-auto">

//         {/* Page Header */}
//         <div className="mb-14">
//           <h1 className="text-4xl font-bold text-white">Profile</h1>
//           <p className="text-gray-400 mt-2">
//             Manage your account settings and preferences
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* LEFT SECTION */}
//           <div className="lg:col-span-2 space-y-10">

//             {/* Profile Info */}
//             <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center gap-3">
//                   <User size={20} className="text-[#C9A24D]" />
//                   <h2 className="text-xl font-semibold text-white">
//                     Profile Information
//                   </h2>
//                 </div>

//                 <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition">
//                   <Edit size={16} />
//                   Edit
//                 </button>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-6 text-gray-300">

//                 <div>
//                   <p className="text-sm text-gray-500">Full Name</p>
//                   <p className="mt-1 text-white font-medium">
//                     Nived Krishna
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Date of Birth</p>
//                   <p className="mt-1">Not set</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Email Address</p>
//                   <button className="mt-3 px-4 py-2 rounded-full border border-white/20 text-sm hover:border-[#C9A24D] hover:text-[#C9A24D] transition">
//                     Add Email
//                   </button>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Phone Number</p>
//                   <div className="flex items-center gap-3 mt-2">
//                     <Phone size={16} className="text-gray-400" />
//                     <span className="text-white">
//                       919074007274
//                     </span>
//                     <span className="bg-green-600 text-xs px-2 py-1 rounded-full">
//                       Verified
//                     </span>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* Addresses */}
//             <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center gap-3">
//                   <MapPin size={20} className="text-[#C9A24D]" />
//                   <h2 className="text-xl font-semibold text-white">
//                     Addresses
//                   </h2>
//                 </div>

//                 <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition">
//                   <Plus size={16} />
//                   Add Address
//                 </button>
//               </div>

//               <div className="bg-black border border-white/10 rounded-xl p-6 hover:border-[#C9A24D]/40 transition">
//                 <h3 className="font-semibold text-white mb-3">
//                   Home
//                 </h3>
//                 <p className="text-sm text-gray-400 leading-relaxed">
//                   Kuppadakkath House, Pariyaram Panchayat,
//                   <br />
//                   P.O Pariyaram, Kannur
//                   <br />
//                   Kerala 670502, India
//                 </p>
//               </div>
//             </div>

//           </div>

//           {/* RIGHT SECTION */}
//           <div className="space-y-10">

//             {/* Account Details */}
//             <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
//               <div className="flex items-center gap-3 mb-8">
//                 <Shield size={20} className="text-[#C9A24D]" />
//                 <h2 className="text-xl font-semibold text-white">
//                   Account Details
//                 </h2>
//               </div>

//               <div className="space-y-5 text-gray-300">

//                 <div>
//                   <p className="text-sm text-gray-500">Account Type</p>
//                   <p className="mt-1 text-white">Phone</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Role</p>
//                   <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs">
//                     Customer
//                   </span>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Status</p>
//                   <span className="bg-[#C9A24D] text-black px-3 py-1 rounded-full text-xs font-semibold">
//                     Active
//                   </span>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Member Since</p>
//                   <p className="mt-1 text-white">2/9/2026</p>
//                 </div>

//               </div>
//             </div>

//             {/* Security */}
//             <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
//               <div className="flex items-center gap-3 mb-8">
//                 <Shield size={20} className="text-[#C9A24D]" />
//                 <h2 className="text-xl font-semibold text-white">
//                   Security
//                 </h2>
//               </div>

//               <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#C9A24D] text-black font-semibold hover:opacity-90 transition">
//                 <LogOut size={18} />
//                 Sign Out
//               </button>
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  User,
  Shield,
  MapPin,
  LogOut,
  Phone,
  Edit,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  // 🔥 Simulated user data (replace with API data)
  const [user, setUser] = useState({
    name: "Nived Krishna",
    dob: "",
    email: "",
    phone: "919074007274",
    memberSince: "2/9/2026",
    address: "Kuppadakkath House, Pariyaram Panchayat, P.O Pariyaram, Kannur Kerala 670502, India",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Save Update Function
  const handleSave = async () => {
    try {
      setLoading(true);

      // 🔥 Replace this with your backend API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      /*
      await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      */

      setEditMode(false);
      alert("Profile Updated Successfully");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">

            {/* Profile Info */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-[#C9A24D]" />
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                </div>

                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A24D] text-black font-semibold"
                    >
                      <Save size={16} />
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="p-2 border border-white/20 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">

                {/* Name */}
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  {editMode ? (
                    <input
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3 focus:border-[#C9A24D] outline-none"
                    />
                  ) : (
                    <p className="mt-2 text-white font-medium">
                      {user.name}
                    </p>
                  )}
                </div>

                {/* DOB */}
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  {editMode ? (
                    <input
                      type="date"
                      name="dob"
                      value={user.dob}
                      onChange={handleChange}
                      className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3 focus:border-[#C9A24D] outline-none"
                    />
                  ) : (
                    <p className="mt-2 text-gray-300">
                      {user.dob || "Not set"}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3 focus:border-[#C9A24D] outline-none"
                    />
                  ) : (
                    <p className="mt-2 text-gray-300">
                      {user.email || "No email added"}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{user.phone}</span>
                    <span className="bg-green-600 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Address */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-[#C9A24D]" />
                  <h2 className="text-xl font-semibold">Address</h2>
                </div>
              </div>

              {editMode ? (
                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black border border-white/20 rounded-lg p-4 focus:border-[#C9A24D] outline-none"
                />
              ) : (
                <p className="text-gray-400">{user.address}</p>
              )}
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-10">

            {/* Account Details */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield size={20} className="text-[#C9A24D]" />
                <h2 className="text-xl font-semibold">Account Details</h2>
              </div>

              <p className="text-sm text-gray-500">Member Since</p>
              <p className="mt-1 text-white">{user.memberSince}</p>
            </div>

            {/* Security */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <button className="w-full py-3 rounded-full bg-[#C9A24D] text-black font-semibold flex items-center justify-center gap-2">
                <LogOut size={18} />
                Sign Out
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

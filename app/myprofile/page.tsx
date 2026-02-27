
// "use client";

// import {
//   User,
//   Shield,
//   MapPin,
//   LogOut,
//   Phone,
//   Edit,
//   Save,
//   X,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const router = useRouter();

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dob: "",
//     address: "",
//     memberSince: "",
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // ✅ GET TOKEN FROM LOCALSTORAGE
//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null;

//   // ✅ FETCH PROFILE
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!token) {
//         router.push("/login");
//         return;
//       }

//       try {
//         const res = await fetch(
//           "http://localhost:8000/user/profile",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (res.status === 401) {
//           localStorage.removeItem("token");
//           router.push("/login");
//           return;
//         }

//         const data = await res.json();

//         console.log("Backend Response:", data);

//         const userData = data.user;

//         setUser({
//           name: userData?.name || "",
//           email: userData?.email || "",
//           phone: userData?.phone || "",
//           dob: userData?.dob || "",
//           address: userData?.address || "",
//           memberSince: userData?.createdAt
//             ? new Date(userData.createdAt).toLocaleDateString()
//             : "",
//         });
//       } catch (error) {
//         console.error("Profile fetch error:", error);
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchProfile();
//   }, [router, token]);

//   const handleChange = (e: any) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   // ✅ UPDATE PROFILE
//   const handleSave = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         "http://localhost:8000/user/profile",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             dob: user.dob,
//             address: user.address,
//           }),
//         }
//       );

//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         router.push("/login");
//         return;
//       }

//       const data = await res.json();
//       const updatedUser = data.user;

//       setUser((prev) => ({
//         ...prev,
//         name: updatedUser?.name || prev.name,
//         email: updatedUser?.email || prev.email,
//       }));

//       setEditMode(false);
//       alert("Profile Updated Successfully");
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ LOGOUT
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/");
//   };

//   if (fetching) {
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         Loading Profile...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white py-20 px-4">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="mb-14">
//           <h1 className="text-4xl font-bold">Profile</h1>
//           <p className="text-gray-400 mt-2">
//             Manage your account settings and preferences
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2 space-y-10">

//             <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center gap-3">
//                   <User size={20} className="text-[#C9A24D]" />
//                   <h2 className="text-xl font-semibold">
//                     Profile Information
//                   </h2>
//                 </div>

//                 {!editMode ? (
//                   <button
//                     onClick={() => setEditMode(true)}
//                     className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24D] text-[#C9A24D]"
//                   >
//                     <Edit size={16} />
//                     Edit
//                   </button>
//                 ) : (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={handleSave}
//                       className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A24D] text-black font-semibold"
//                     >
//                       <Save size={16} />
//                       {loading ? "Saving..." : "Save"}
//                     </button>
//                     <button
//                       onClick={() => setEditMode(false)}
//                       className="p-2 border border-white/20 rounded-full"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="grid sm:grid-cols-2 gap-6">

//                 <div>
//                   <p className="text-sm text-gray-500">Full Name</p>
//                   {editMode ? (
//                     <input
//                       name="name"
//                       value={user.name}
//                       onChange={handleChange}
//                       className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3"
//                     />
//                   ) : (
//                     <p className="mt-2 text-white font-medium">
//                       {user.name}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Email Address</p>
//                   {editMode ? (
//                     <input
//                       name="email"
//                       value={user.email}
//                       onChange={handleChange}
//                       className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3"
//                     />
//                   ) : (
//                     <p className="mt-2 text-gray-300">
//                       {user.email}
//                     </p>
//                   )}
//                 </div>

//               </div>
//             </div>

//             <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <Shield size={20} className="text-[#C9A24D]" />
//                 <h2 className="text-xl font-semibold">
//                   Account Details
//                 </h2>
//               </div>

//               <p className="text-sm text-gray-500">Member Since</p>
//               <p className="mt-1 text-white">
//                 {user.memberSince}
//               </p>
//             </div>

//           </div>

//           {/* RIGHT SIDE */}
//           <div className="space-y-10">
//             <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
//               <button
//                 onClick={handleLogout}
//                 className="w-full py-3 rounded-full bg-[#C9A24D] text-black font-semibold flex items-center justify-center gap-2"
//               >
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
  Save,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    memberSince: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ✅ FETCH PROFILE
  const fetchProfile = async () => {
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/");
        return;
      }

      const data = await res.json();
      const userData = data.user;

      setUser({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        dob: userData?.dob || "",
        address: userData?.address || "",
        memberSince: userData?.createdAt
          ? new Date(userData.createdAt).toLocaleDateString()
          : "",
      });
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ UPDATE PROFILE
  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          address: user.address,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/");
        return;
      }

      await res.json();

      setEditMode(false);

      // 🔥 REFRESH PROFILE AFTER UPDATE
      await fetchProfile();

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">

            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-[#C9A24D]" />
                  <h2 className="text-xl font-semibold">
                    Profile Information
                  </h2>
                </div>

                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24D] text-[#C9A24D]"
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
                      className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3"
                    />
                  ) : (
                    <p className="mt-2 text-white font-medium">
                      {user.name || "Not set"}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  {editMode ? (
                    <input
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3"
                    />
                  ) : (
                    <p className="mt-2 text-gray-300">
                      {user.email || "Not set"}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  {editMode ? (
                    <input
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3"
                    />
                  ) : (
                    <p className="mt-2 text-gray-300">
                      {user.phone || "Not set"}
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
                      className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3"
                    />
                  ) : (
                    <p className="mt-2 text-gray-300">
                      {user.dob || "Not set"}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Address */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <p className="text-sm text-gray-500">Address</p>
              {editMode ? (
                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  rows={3}
                  className="mt-2 w-full bg-black border border-white/20 rounded-lg p-3"
                />
              ) : (
                <p className="mt-2 text-gray-300">
                  {user.address || "Not set"}
                </p>
              )}
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-10">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="mt-2 text-white">
                {user.memberSince}
              </p>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-full bg-[#C9A24D] text-black font-semibold flex items-center justify-center gap-2"
              >
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
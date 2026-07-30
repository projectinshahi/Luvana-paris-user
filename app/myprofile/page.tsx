"use client";

import {
  User,
  MapPin,
  LogOut,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useLanguage } from "@/lib/useLanguage";

interface Address {
  _id: string;
  type: string;
  name: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    memberSince: "",
  });

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [addressForm, setAddressForm] = useState({
    type: "home",
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    isDefault: false,
  });
     const { t, currentLanguage } = useLanguage();
  const isArabic = currentLanguage === "ar";

  // ✅ VALIDATE PHONE NUMBER (International)
  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Check if it's between 7 and 15 digits (international standard)
    return cleaned.length >= 7 && cleaned.length <= 15;
  };

  // ✅ VALIDATE EMAIL
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ VALIDATE ADDRESS FORM
  const validateAddressForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!addressForm.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!addressForm.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(addressForm.phone)) {
      newErrors.phone = "Invalid phone number (7-15 digits)";
    }

    if (addressForm.email && !validateEmail(addressForm.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!addressForm.addressLine1.trim()) {
      newErrors.addressLine1 = "Address line 1 is required";
    }

    if (!addressForm.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!addressForm.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!addressForm.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ UPDATE PROFILE
  const handleSave = async () => {
    if (!user.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!user.email.trim() || !validateEmail(user.email)) {
      toast.error("Valid email is required");
      return;
    }

    if (user.phone && !validatePhone(user.phone)) {
      toast.error("Invalid phone number");
      return;
    }

    try {
      setLoading(true);

      await api.put("/user/profile", {
        name: user.name,
        email: user.email,
        phone: user.phone,
      });

      setEditMode(false);
      await fetchProfile();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CREATE/UPDATE ADDRESS
  const handleSaveAddress = async () => {
    if (!validateAddressForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      if (editingAddress) {
        // Update existing address
        await api.put(`/user/address/${editingAddress}`, addressForm);
        toast.success("Address updated successfully!");
      } else {
        // Create new address
        await api.post("/user/address", addressForm);
        toast.success("Address added successfully!");
      }

      setShowAddressForm(false);
      setEditingAddress(null);
      resetAddressForm();
      await fetchAddresses();
    } catch (error: any) {
      console.error("Address save error:", error);
      toast.error(error?.response?.data?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE ADDRESS
  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      await api.delete(`/user/address/${addressId}`);
      toast.success("Address deleted successfully!");
      await fetchAddresses();
    } catch (error: any) {
      console.error("Delete address error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete address");
    }
  };

  // ✅ SET DEFAULT ADDRESS
  const handleSetDefault = async (addressId: string) => {
    try {
      await api.put(`/user/address/${addressId}`, { isDefault: true });
      toast.success("Default address updated!");
      await fetchAddresses();
    } catch (error: any) {
      console.error("Set default error:", error);
      toast.error("Failed to set default address");
    }
  };

  // ✅ EDIT ADDRESS
  const handleEditAddress = (address: Address) => {
    setAddressForm({
      type: address.type,
      name: address.name,
      phone: address.phone,
      email: address.email || "",
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state || "",
      country: address.country,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
    setEditingAddress(address._id);
    setShowAddressForm(true);
    setErrors({});
  };

  // ✅ RESET ADDRESS FORM
  const resetAddressForm = () => {
    setAddressForm({
      type: "home",
      name: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      isDefault: false,
    });
    setErrors({});
  };

  // ✅ FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      // Backend returns { user: {...} }
      const userData = res.data.user;
      setUser({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        memberSince: userData.createdAt
          ? new Date(userData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "N/A",
      });
    } catch (error: any) {
      console.error("Fetch profile error:", error);
      if (error?.response?.status === 401) {
        toast.error("Please login to view your profile");
        router.push("/");
      }
    }
  };

  // ✅ FETCH ADDRESSES
  const fetchAddresses = async () => {
    try {
      const res = await api.get("/user/address");
      setAddresses(res.data.addresses || []);
    } catch (error: any) {
      console.error("Fetch addresses error:", error);
    }
  };

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ LOAD DATA ON MOUNT
  useEffect(() => {
    const loadData = async () => {
      setFetching(true);
      await Promise.all([fetchProfile(), fetchAddresses()]);
      setFetching(false);
    };
    loadData();
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-cream text-ink flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-ink py-27 px-4" dir="ltr">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl font-bold text-ink">{t("My Profile")}</h1>
          <p className="text-muted mt-2">
            Manage your account settings and addresses
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-10">
            {/* PROFILE INFORMATION */}
            <div className="bg-card border border-line rounded-2xl shadow-luxury p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gold" />
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                </div>

                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold text-gold-dark hover:bg-gold hover:text-cream transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-cream font-semibold hover:bg-gold-dark transition disabled:opacity-50"
                    >
                      <Save size={16} />
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        fetchProfile();
                      }}
                      className="p-2 border border-line rounded-full hover:bg-champagne transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <p className="text-sm text-ink-soft mb-2">Full Name *</p>
                  {editMode ? (
                    <input
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                       dir={isArabic ? "rtl" : "ltr"}
                      className="w-full bg-card text-ink placeholder:text-muted border border-line rounded-lg p-3 focus:border-gold focus:outline-none transition"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="text-ink font-medium">
                      {user.name || "Not set"}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm text-ink-soft mb-2">Email Address *</p>
                  {editMode ? (
                    <input
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                       dir={isArabic ? "rtl" : "ltr"}
                      className="w-full bg-card text-ink placeholder:text-muted border border-line rounded-lg p-3 focus:border-gold focus:outline-none transition"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <p className="text-ink">{user.email || "Not set"}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <p className="text-sm text-ink-soft mb-2">Phone Number</p>
                  {editMode ? (
                    <input
                      name="phone"
                      type="tel"
                      value={user.phone}
                      onChange={handleChange}
                       dir={isArabic ? "rtl" : "ltr"}
                      className="w-full bg-card text-ink placeholder:text-muted border border-line rounded-lg p-3 focus:border-gold focus:outline-none transition"
                      placeholder="+1234567890"
                    />
                  ) : (
                    <p className="text-ink">{user.phone || "Not set"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ADDRESSES */}
            <div className="bg-card border border-line rounded-2xl shadow-luxury p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gold" />
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                </div>

                {!showAddressForm && (
                  <button
                    onClick={() => {
                      resetAddressForm();
                      setShowAddressForm(true);
                      setEditingAddress(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold text-gold-dark hover:bg-gold hover:text-cream transition"
                  >
                    <Plus size={16} />
                    Add Address
                  </button>
                )}
              </div>

              {/* ADDRESS FORM */}
              {showAddressForm && (
                <div className="mb-6 p-6 bg-champagne border border-line rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingAddress ? "Edit Address" : "New Address"}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Type */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        Address Type *
                      </label>
                      <select
                        value={addressForm.type}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, type: e.target.value })
                        }
                        className="w-full bg-card text-ink placeholder:text-muted border border-line rounded-lg p-3 focus:border-gold focus:outline-none"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        Full Name *
                      </label>
                      <input
                        value={addressForm.name}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, name: e.target.value })
                        }
                        className={`w-full bg-card text-ink placeholder:text-muted border ${
                          errors.name ? "border-red-500" : "border-line"
                        } rounded-lg p-3 focus:border-gold focus:outline-none`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-error text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, phone: e.target.value })
                        }
                        className={`w-full bg-card text-ink placeholder:text-muted border ${
                          errors.phone ? "border-red-500" : "border-line"
                        } rounded-lg p-3 focus:border-gold focus:outline-none`}
                        placeholder="+1234567890"
                      />
                      {errors.phone && (
                        <p className="text-error text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={addressForm.email}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, email: e.target.value })
                        }
                        className={`w-full bg-card text-ink placeholder:text-muted border ${
                          errors.email ? "border-red-500" : "border-line"
                        } rounded-lg p-3 focus:border-gold focus:outline-none`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-error text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Address Line 1 */}
                    <div className="sm:col-span-2">
                      <label className="text-sm text-ink-soft mb-2 block">
                        Address Line 1 *
                      </label>
                      <input
                        value={addressForm.addressLine1}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            addressLine1: e.target.value,
                          })
                        }
                        className={`w-full bg-card text-ink placeholder:text-muted border ${
                          errors.addressLine1 ? "border-red-500" : "border-line"
                        } rounded-lg p-3 focus:border-gold focus:outline-none`}
                        placeholder="Street address, P.O. box"
                      />
                      {errors.addressLine1 && (
                        <p className="text-error text-xs mt-1">
                          {errors.addressLine1}
                        </p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div className="sm:col-span-2">
                      <label className="text-sm text-ink-soft mb-2 block">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        value={addressForm.addressLine2}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            addressLine2: e.target.value,
                          })
                        }
                        className="w-full bg-card text-ink placeholder:text-muted border border-line rounded-lg p-3 focus:border-gold focus:outline-none"
                        placeholder="Apartment, suite, unit, building, floor, etc."
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        City *
                      </label>
                      <input
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, city: e.target.value })
                        }
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`w-full bg-card text-ink placeholder:text-muted border ${
                          errors.city ? "border-red-500" : "border-line"
                        } rounded-lg p-3 focus:border-gold focus:outline-none`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-error text-xs mt-1">{errors.city}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        State/Province (Optional)
                      </label>
                      <input
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, state: e.target.value })
                        }
                        className="w-full bg-card text-ink placeholder:text-muted border border-line rounded-lg p-3 focus:border-gold focus:outline-none"
                        placeholder="NY"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        Country *
                      </label>
                      <input
                        value={addressForm.country}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, country: e.target.value })
                        }
                        className={`w-full bg-card text-ink placeholder:text-muted border ${
                          errors.country ? "border-red-500" : "border-line"
                        } rounded-lg p-3 focus:border-gold focus:outline-none`}
                        placeholder="United States"
                      />
                      {errors.country && (
                        <p className="text-error text-xs mt-1">{errors.country}</p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label className="text-sm text-ink-soft mb-2 block">
                        Postal Code *
                      </label>
                      <input
                        value={addressForm.postalCode}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            postalCode: e.target.value,
                          })
                        }
                        className={`w-full bg-card text-ink placeholder:text-muted border ${
                          errors.postalCode ? "border-red-500" : "border-line"
                        } rounded-lg p-3 focus:border-gold focus:outline-none`}
                        placeholder="10001"
                      />
                      {errors.postalCode && (
                        <p className="text-error text-xs mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>

                    {/* Default Checkbox */}
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              isDefault: e.target.checked,
                            })
                          }
                          className="w-4 h-4 accent-gold"
                        />
                        <span className="text-sm text-ink-soft">
                          Set as default address
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSaveAddress}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-2 rounded-full bg-gold text-cream font-semibold hover:bg-gold-dark transition disabled:opacity-50"
                    >
                      <Save size={16} />
                      {loading ? "Saving..." : "Save Address"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                        resetAddressForm();
                      }}
                      className="btn-luxury-outline px-6 py-2 rounded-full transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ADDRESS LIST */}
              <div className="space-y-4">
                {addresses.length === 0 ? (
                  <div className="text-center py-8 text-muted">
                    <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No addresses saved yet</p>
                    <p className="text-sm mt-2">Add your first address to get started</p>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`p-4 rounded-xl border ${
                        address.isDefault
                          ? "border-gold ring-1 ring-gold bg-gold/5"
                          : "border-line bg-card"
                      } relative`}
                    >
                      {address.isDefault && (
                        <div className="absolute top-4 right-4">
                          <span className="flex items-center gap-1 text-xs bg-gold/15 text-gold-dark px-2 py-1 rounded-full font-semibold">
                            <Check size={12} />
                            Default
                          </span>
                        </div>
                      )}

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-champagne text-ink-soft px-2 py-1 rounded capitalize">
                            {address.type}
                          </span>
                          <h3 className="font-semibold text-ink">{address.name}</h3>
                        </div>
                        <p className="text-sm text-ink-soft">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p className="text-sm text-ink-soft">
                          {address.city}
                          {address.state && `, ${address.state}`} {address.postalCode}
                        </p>
                        <p className="text-sm text-ink-soft">{address.country}</p>
                        <p className="text-sm text-muted mt-2">
                          Phone: {address.phone}
                        </p>
                        {address.email && (
                          <p className="text-sm text-muted">
                            Email: {address.email}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address._id)}
                            className="text-xs px-3 py-1.5 rounded-full border border-line text-ink-soft hover:bg-champagne transition"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="text-xs px-3 py-1.5 rounded-full border border-gold text-gold-dark hover:bg-gold hover:text-cream transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address._id)}
                          className="text-xs px-3 py-1.5 rounded-full border border-red-200 text-error hover:bg-red-50 transition"
                        >
                          <Trash2 size={12} className="inline" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Member Since */}
            <div className="bg-card border border-line rounded-2xl shadow-luxury p-6">
              <p className="text-sm text-ink-soft mb-2">Member Since</p>
              <p className="text-ink font-semibold">{user.memberSince}</p>
            </div>

            {/* Logout */}
            <div className="bg-card border border-line rounded-2xl shadow-luxury p-6">
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-full border border-red-200 text-error font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition"
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

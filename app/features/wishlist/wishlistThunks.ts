import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WishlistItem } from "./wishlistTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 🔥 FETCH WISHLIST - GET http://localhost:8000/user/wishlist
export const fetchWishlist = createAsyncThunk<
  WishlistItem[],
  void,
  { rejectValue: string }
>("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/wishlist`,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch wishlist"
    );
  }
});

// 🔥 ADD TO WISHLIST - POST http://localhost:8000/user/wishlist
export const addToWishlistDB = createAsyncThunk<
  WishlistItem[],
  { productId: string },
  { rejectValue: string }
>("wishlist/addToWishlistDB", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/wishlist`,
      data,
      getAuthHeader()
    );
    return response.data; // updated wishlist
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add to wishlist"
    );
  }
});

// 🔥 REMOVE FROM WISHLIST - DELETE http://localhost:8000/user/wishlist
export const removeFromWishlistDB = createAsyncThunk<
  WishlistItem[],
  string,
  { rejectValue: string }
>("wishlist/removeFromWishlistDB", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `${API_URL}/user/wishlist`,
      {
        ...getAuthHeader(),
        data: { productId }
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to remove from wishlist"
    );
  }
});
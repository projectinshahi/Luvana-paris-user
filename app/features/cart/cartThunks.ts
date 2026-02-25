import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to get token safely
const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// 🔥 FETCH CART
export const fetchCart = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}/cart`,
      getAuthHeader()
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart"
    );
  }
});


// 🔥 ADD TO CART (DB)
export const addToCartDB = createAsyncThunk<
  CartItem[],
  { productId: string; quantity: number },
  { rejectValue: string }
>("cart/addToCartDB", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart`,
      data,
      getAuthHeader()
    );

    return response.data; // return updated cart
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add to cart"
    );
  }
});


// 🔥 REMOVE FROM CART (DB)
export const removeFromCartDB = createAsyncThunk<
  CartItem[],
  string,
  { rejectValue: string }
>("cart/removeFromCartDB", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `${API_URL}/cart/${productId}`,
      getAuthHeader()
    );

    return response.data; // updated cart
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to remove from cart"
    );
  }
});


// 🔥 UPDATE QUANTITY (DB)
export const updateCartQuantityDB = createAsyncThunk<
  CartItem[],
  { productId: string; quantity: number },
  { rejectValue: string }
>("cart/updateCartQuantityDB", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${API_URL}/cart/${data.productId}`,
      { quantity: data.quantity },
      getAuthHeader()
    );

    return response.data; // updated cart
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update quantity"
    );
  }
});
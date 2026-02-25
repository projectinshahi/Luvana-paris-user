import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "./orderTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 🔥 CREATE ORDER
export const createOrder = createAsyncThunk<
  Order,
  { items: any[]; totalAmount: number },
  { rejectValue: string }
>("orders/createOrder", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create order"
    );
  }
});

// 🔥 FETCH USER ORDERS
export const fetchUserOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}/orders`,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch orders"
    );
  }
});

// 🔥 FETCH SINGLE ORDER
export const fetchOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/fetchOrderById", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}/orders/${orderId}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch order"
    );
  }
});

// 🔥 ADMIN: UPDATE ORDER STATUS
export const updateOrderStatus = createAsyncThunk<
  Order,
  { orderId: string; status: string },
  { rejectValue: string }
>("orders/updateOrderStatus", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(
      `${API_URL}/orders/${data.orderId}`,
      { status: data.status },
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update status"
    );
  }
});
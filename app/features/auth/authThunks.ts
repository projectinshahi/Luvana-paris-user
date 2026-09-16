import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./authTypes";
import { API_BASE_URL } from "@/lib/apiBase";

const API_URL = API_BASE_URL;

// 🔥 LOGIN
export const loginUser = createAsyncThunk<
  { user: User; token: string },          // Return type
  { email: string; password: string },    // Argument type
  { rejectValue: string }                 // Error type
>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// 🔥 REGISTER (without auto-login)
export const registerUser = createAsyncThunk<
  { message: string },
  { name: string; email: string; password: string; confirmPassword: string; phone?: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/register`, userData);
      // Return only the message, not the token or user
      return { message: response.data.message || "Registration successful" };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// 🔥 FETCH CURRENT USER (Auto Login on Refresh)
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend returns { user: {...} }
      return {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// 🔥 LOGOUT
export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (token) {
        await axios.post(
          `${API_URL}/user/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Clear token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }

      return undefined;
    } catch (error: any) {
      // Even if logout API fails, clear local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./authTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// 🔥 REGISTER
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { name: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/register`, userData);
      return response.data;
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

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
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
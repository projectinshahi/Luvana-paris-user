import axios, { AxiosError, AxiosInstance } from "axios";

// ────────────────────────────────────────────────────────────────────────────
// AXIOS CONFIGURATION - Production Ready
// ────────────────────────────────────────────────────────────────────────────

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.luvanaparis.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// ────────────────────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR - Auto-attach JWT token
// ────────────────────────────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`[Axios] 🔐 Token attached to ${config.method?.toUpperCase()} ${config.url}`);
      } else {
        console.warn(`[Axios] ⚠️ No token found for ${config.method?.toUpperCase()} ${config.url}`);
      }
    }
    console.log(`[Axios] 📤 Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error("[Axios] ❌ Request error:", error);
    return Promise.reject(error);
  }
);

// ────────────────────────────────────────────────────────────────────────────
// RESPONSE INTERCEPTOR - Handle errors globally
// ────────────────────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    console.log(`[Axios] ✅ Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as any;

    console.error(`[Axios] ❌ Error ${status}:`, {
      url: error.config?.url,
      method: error.config?.method,
      status,
      message: data?.message || error.message,
      data,
    });

    // Handle 401 - Token expired or invalid
    if (status === 401) {
      console.warn("[Axios] 🔓 401 Unauthorized - Token invalid/expired");
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // Optionally redirect to login
        // window.location.href = "/login";
      }
    }

    // Handle 403 - Forbidden
    if (status === 403) {
      console.warn("[Axios] 🚫 403 Forbidden - Access denied");
    }

    // Handle 404 - Not found
    if (status === 404) {
      console.warn("[Axios] 🔍 404 Not Found");
    }

    // Handle 500 - Server error
    if (status === 500) {
      console.error("[Axios] 💥 500 Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;

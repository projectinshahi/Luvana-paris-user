// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000",
// });

// api.interceptors.request.use((config) => {
//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;
// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ← THIS IS THE CRITICAL PART — auto-attach token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {  // safe for SSR
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("[Axios] Added Bearer token to request:", config.url); // debug
      } else {
        console.log("[Axios] No token found for request:", config.url);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle 401 globally (logout / refresh later)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("[Axios] 401 detected → token invalid/expired");
      // Optional: localStorage.removeItem("token");
      // Optional: window.location.href = "/login"; or dispatch logout
    }
    return Promise.reject(error);
  }
);

export default api;
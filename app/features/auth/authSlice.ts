import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchCurrentUser, logoutUser } from "./authThunks";
import { AuthState, User } from "./authTypes";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // remove token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔥 LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Still clear user even on API error
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // 🔥 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔥 REGISTER (no auto-login)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Don't set user or token - just clear any errors
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔥 FETCH CURRENT USER (Auto Login)
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        
        // Restore token from localStorage if available
        if (typeof window !== "undefined") {
          const savedToken = localStorage.getItem("token");
          if (savedToken) {
            state.token = savedToken;
          }
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        
        // Clear invalid token from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
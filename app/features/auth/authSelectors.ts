import { RootState } from "@/redux/store";

// 🔥 Get full auth state
export const selectAuthState = (state: RootState) => state.auth;

// 🔥 Get current user
export const selectUser = (state: RootState) => state.auth.user;

// 🔥 Get token
export const selectToken = (state: RootState) => state.auth.token;

// 🔥 Check if authenticated
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

// 🔥 Get loading state
export const selectAuthLoading = (state: RootState) =>
  state.auth.loading;

// 🔥 Get error state
export const selectAuthError = (state: RootState) =>
  state.auth.error;
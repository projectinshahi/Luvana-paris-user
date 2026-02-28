"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrentUser, selectAuthLoading } from "@/app/features/auth";

/**
 * AuthInitializer Component
 *
 * This component handles automatic auth state restoration on app load/refresh.
 * It checks localStorage for a saved token and validates it with the backend.
 *
 * Why this is needed:
 * - Redux store recreates on page refresh with initialState
 * - This component checks if a token exists and fetches current user
 * - If token is valid → user is restored automatically
 * - If token is invalid/expired → localStorage is cleared
 */
export function AuthInitializer() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent running multiple times and avoid hydration issues
    if (isInitialized) return;

    // Check if token exists in localStorage
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    // If token found, validate it by fetching current user
    if (token) {
      console.log("🔄 Token found in localStorage. Validating...");
      dispatch(fetchCurrentUser());
    }

    setIsInitialized(true);
  }, []); // Run only once on mount

  // Don't render anything - this is a functional component
  // Just silently restores auth state
  return null;
}

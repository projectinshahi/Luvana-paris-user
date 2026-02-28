"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";
import { AuthInitializer } from "@/components/AuthInitializer";

interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}

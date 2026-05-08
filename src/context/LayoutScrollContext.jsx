"use client";

import { createContext, useContext } from "react";

export const LayoutScrollContext = createContext(null);

export function useLayoutScroll() {
  const ctx = useContext(LayoutScrollContext);
  if (!ctx) {
    throw new Error("useLayoutScroll must be used within the main site layout");
  }
  return ctx;
}

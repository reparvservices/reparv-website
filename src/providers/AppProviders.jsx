"use client";

import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "../store/auth";
import { PropertyFilterProvider } from "../store/propertyFilter";

function DeferredGoogleOAuth({ clientId, children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return children;
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}

export default function AppProviders({ children }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";
  return (
    <HelmetProvider>
      <AuthProvider>
        <PropertyFilterProvider>
          <DeferredGoogleOAuth clientId={clientId}>
            {children}
          </DeferredGoogleOAuth>
        </PropertyFilterProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

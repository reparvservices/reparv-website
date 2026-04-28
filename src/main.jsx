import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/auth.jsx";
import { PropertyFilterProvider } from "./store/propertyFilter.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <PropertyFilterProvider>
        <StrictMode>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
             <App />
          </GoogleOAuthProvider>
        </StrictMode>
      </PropertyFilterProvider>
    </AuthProvider>
  </HelmetProvider>
);

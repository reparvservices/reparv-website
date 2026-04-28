import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./store/auth";
import { PropertyFilterProvider } from "./store/propertyFilter";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

function NextClientApp() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <PropertyFilterProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </PropertyFilterProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default NextClientApp;

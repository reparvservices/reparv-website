// components/GoogleLoginButton.jsx
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { getBackendUrl } from "../lib/env";

const API_BASE = getBackendUrl();

// Google renders its button inside a cross-origin iframe (max 400px wide),
// so it can't be clicked from code. We lay the real button invisibly on top
// of our styled button and stretch it to cover the full width.
const GOOGLE_BUTTON_MAX_WIDTH = 400;

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const googleWidth = Math.min(
    containerWidth || GOOGLE_BUTTON_MAX_WIDTH,
    GOOGLE_BUTTON_MAX_WIDTH,
  );
  const scaleX = containerWidth ? containerWidth / googleWidth : 1;

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${API_BASE}/user/auth/google`,
        {
          token: credentialResponse.credential, // Google ID Token
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.data?.token) {
        throw new Error("Invalid Google login response");
      }

      localStorage.setItem(
        "guestUser",
        JSON.stringify(res.data.user)
      );
      localStorage.setItem("accessToken", res.data.token);

      onSuccess?.(res.data);
    } catch (err) {
      console.error("Google login error:", err);
      onError?.(
        err?.response?.data?.message || "Google login failed"
      );
    }
  };

  return (
    <div ref={containerRef} className="group w-full relative">
      {/* Visible styled button (clicks pass to the Google button above it) */}
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-3 w-full h-10
                   border border-gray-300 rounded-lg
                   group-hover:bg-gray-100 transition
                   text-sm text-gray-700 font-medium"
      >
        <FcGoogle size={22} />
        Continue with Google
      </div>

      {/* Real Google button, invisible, covering the styled button */}
      <div
        className="absolute inset-0 z-10 opacity-[0.01] overflow-hidden cursor-pointer"
        style={{ transform: `scaleX(${scaleX})`, transformOrigin: "left" }}
      >
        {containerWidth > 0 && (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => onError?.("Google login failed")}
            useOneTap={false}
            size="large"
            width={String(Math.floor(googleWidth))}
          />
        )}
      </div>
    </div>
  );
};

export default GoogleLoginButton;

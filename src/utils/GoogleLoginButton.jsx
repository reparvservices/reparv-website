// components/GoogleLoginButton.jsx
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const googleBtnRef = useRef(null);

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
    <div className="w-full relative">
      <div className="absolute inset-0 opacity-0">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => onError?.("Google login failed")}
          useOneTap={false}
        />
      </div>

      <button
        onClick={() =>
          googleBtnRef.current?.querySelector("div")?.click()
        }
        className="flex items-center justify-center gap-3 w-full
                   border border-gray-300 rounded-lg py-2
                   hover:bg-gray-100 transition
                   text-sm text-gray-700 font-medium"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;

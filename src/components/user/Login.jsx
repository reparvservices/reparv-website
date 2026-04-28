import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../../store/auth";
import Loader from "../Loader";
import GoogleLoginButton from "../../utils/GoogleLoginButton";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const { showLogin, setShowLogin, setShowAgreement } = useAuth();

  const [mode, setMode] = useState("LOGIN");
  const [step, setStep] = useState("INPUT");
  const [sended, setSended] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (step === "OTP") {
      setTimer(60);
      setCanResend(false);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step, sended]);

  if (!showLogin) return null;

  /* ---------------- SEND OTP ---------------- */
  const handleSendOtp = async () => {
    setError("");

    if (mode === "REGISTER" && !name.trim()) {
      return setError("Please enter your name");
    }

    if (!/^\d{10}$/.test(phone)) {
      return setError("Enter valid 10-digit mobile number");
    }

    if (!agree) {
      return setError("Please accept Terms & Conditions");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: phone }),
      });

      const data = await res.json();
      setSended(!sended);
      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep("OTP");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerifyOtp = async () => {
    setError("");

    if (otp.length !== 6) {
      return setError("Enter valid 6-digit OTP");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed for HttpOnly cookie
        body: JSON.stringify({
          contact: phone,
          otp,
          fullname: mode === "REGISTER" ? name : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      /* ---------------- SAVE USER ---------------- */
      if (data.user) {
         localStorage.setItem("guestUser", JSON.stringify(data.user));
         window.location.reload();
      }

      /* ---------------- SAVE TOKEN (OPTIONAL) ---------------- */
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
        window.location.reload();
      }

      // SUCCESS
      setShowLogin(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleSuccess = (data) => {
    // JWT already issued by backend
    setShowLogin(false);
  };

  const handleGoogleError = (err) => {
    setError("Google login failed. Please try again.");
  };

  /* ---------------- WHATSAPP LOGIN ---------------- */
  const handleWhatsappLogin = () => {
    console.log("WhatsApp OTP Login");
  };

  return (
    <div className="w-full sm:max-w-[450px] bg-white rounded-tl-xl rounded-tr-xl sm:rounded-[20px] max-h-[80vh] overflow-scroll scrollbar-hide p-4 py-6 sm:p-6 relative">
      {/* Close */}
      <button
        onClick={() => setShowLogin(false)}
        className="absolute right-4 top-4 text-xl"
      >
        <IoClose />
      </button>

      {/* Header */}
      <h2
        className={`${
          step === "OTP" ? "hidden" : "block"
        } text-[26px] sm:text-[32px] font-bold mb-2`}
      >
        {mode === "LOGIN" ? "Login" : "Register"}
      </h2>
      <p
        className={`${
          mode === "Register" || step === "OTP" ? "hidden" : "block"
        } text-[#6B7280] text-sm mb-2`}
      >
        Please Enter Your Phone Number
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* ---------------- INPUT STEP ---------------- */}
      {step === "INPUT" && (
        <>
          {mode === "REGISTER" && (
            <div>
              <label htmlFor="fullname" className="text-xs font-bold ml-1">
                Full Name
              </label>
              <input
                value={name}
                id="fullname"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full Name"
                className="w-full mt-1 border border-[#D9D9D9] rounded-lg h-[45px] px-3 mb-2 text-sm outline-none"
              />
            </div>
          )}

          <div>
            <label htmlFor="phone" className="text-xs font-bold ml-1">
              Phone Number
            </label>
            <div className="flex items-center border border-[#D9D9D9] rounded-lg px-3 h-[45px] mb-3 mt-1">
              <span className="mr-2 text-black text-sm font-semibold pr-2 border-r border-r-[#D9D9D9]">
                +91
              </span>
              <input
                value={phone}
                id="phone"
                maxLength={10}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 text-[10px] mb-4 ml-1">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <p>
              By clicking you agree to{" "}
              <span
                onClick={() => {
                  setShowAgreement(true);
                }}
                className="text-[#2563EB] font-bold cursor-pointer"
              >
                Terms & Conditions
              </span>
            </p>
          </div>

          <button
            onClick={handleSendOtp}
            className="w-full h-[45px] bg-[#8A38F5] text-white rounded-lg font-semibold cursor-pointer active:scale-98"
          >
            {loading ? "Loading..." : "Continue"}
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[1px] bg-[#6B7280] " />
            <span className="text-[#6B7280] text-sm">OR</span>
            <div className="flex-1 h-[1px] bg-[#6B7280]" />
          </div>

          <div className="w-full flex justify-center mb-3">
            <GoogleLoginButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          <button
            onClick={handleWhatsappLogin}
            className="hidden w-full h-[40px] text-sm text-gray-700 font-medium border border-gray-300 rounded-lg  items-center justify-center gap-3 hover:bg-green-50"
          >
            <FaWhatsapp size={22} className="text-green-500" />
            Continue with WhatsApp
          </button>

          <p className="text-center text-[#868686] text-sm mt-4">
            {mode === "LOGIN" ? (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setMode("REGISTER")}
                  className="text-[#7B3FE4] font-bold cursor-pointer"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("LOGIN")}
                  className="text-[#7B3FE4] font-bold cursor-pointer"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </>
      )}

      {/* ---------------- OTP STEP ---------------- */}
      {step === "OTP" && (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>

          <p className="text-sm text-[#6B7280] mb-6">
            OTP send on {"+91XXXXXXXX" + phone.slice(8)}{" "}
            <span
              onClick={() => setStep("INPUT")}
              className="text-[#5E23DC] cursor-pointer font-bold"
            >
              Edit
            </span>
          </p>

          <p className="text-sm text-[#6B7280] mb-2">Enter OTP</p>

          <div className="flex justify-between gap-2 mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");

                  const newOtp = otp.split("");
                  newOtp[index] = val; // allow empty also
                  setOtp(newOtp.join(""));

                  if (val && e.target.nextSibling) {
                    e.target.nextSibling.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    const newOtp = otp.split("");

                    if (otp[index]) {
                      newOtp[index] = "";
                      setOtp(newOtp.join(""));
                    } else {
                      e.target.previousSibling?.focus();
                    }
                  }
                }}
                className="w-[48px] h-[48px] border border-[#D9D9D9] rounded-lg text-center text-lg font-semibold outline-[#7B3FE4]"
              />
            ))}
          </div>

          <p className="text-center text-sm text-[#6B7280] mb-6">
            {canResend ? (
              <span
                onClick={handleSendOtp}
                className="text-[#5E23DC] font-medium cursor-pointer"
              >
                Resend OTP
              </span>
            ) : (
              <>
                Get OTP in <span className="font-medium">{timer} sec</span>
              </>
            )}
          </p>

          <button
            onClick={handleVerifyOtp}
            className="w-full h-[50px] bg-[#5E23DC] text-white rounded-lg font-semibold"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;

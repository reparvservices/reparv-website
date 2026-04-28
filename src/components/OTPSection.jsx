import { useState, useEffect, useRef } from "react";

export default function OtpSection({
  phone,
  onSendOtp,
  onVerifyOtp,
  loading,
  message,
  isError,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [sent, setSent] = useState(false);
  const inputsRef = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Reset OTP flow when phone changes
  useEffect(() => {
    setOtp(["", "", "", "", "", ""]);
    setSent(false);
    setTimer(0);
  }, [phone]);

  const handleSend = async () => {
    const success = await onSendOtp();
    if (success !== false) {
      setSent(true);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  };

  const handleVerify = async () => {
    const success = await onVerifyOtp(otp.join(""));
    if (success !== false) {
      // stop timer + hide OTP section after success
      setTimer(0);
      setSent(false);
      setOtp(["", "", "", "", "", ""]);
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    if (!paste.every((d) => /^\d$/.test(d))) return;

    const newOtp = [...otp];
    paste.forEach((d, i) => {
      newOtp[i] = d;
    });

    setOtp(newOtp);
    inputsRef.current[paste.length - 1]?.focus();
  };

  const otpValue = otp.join("");

  return (
    <div className="w-full flex flex-col gap-3">
      {!sent ? (
        <button
          type="button"
          onClick={handleSend}
          disabled={!phone || phone.length !== 10 || loading}
          className="w-full bg-[#5323DC] text-white py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <>
          <div
            className="flex flex-col justify-center gap-4"
            onPaste={handlePaste}
          >
            <label htmlFor="fullName" className="ml-1 text-xs">
              Enter OTP
            </label>
            <div className="grid grid-cols-6 place-items-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-11 text-center text-sm font-semibold border border-[#00000033] rounded-md focus:outline-none focus:border-[#5E23DC]"
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={otpValue.length !== 6 || loading}
            className="w-full bg-[#5E23DC] text-white py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {timer > 0 ? (
            <p className="text-xs text-center text-gray-500">
              Resend OTP in {timer}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              className="text-xs text-[#5E23DC] underline"
            >
              Resend OTP
            </button>
          )}

          {/* OTP Message */}
          {message && (
            <p
              className={`text-xs text-center ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}

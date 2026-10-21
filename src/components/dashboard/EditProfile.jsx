"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../../store/auth";
import { FaChevronDown, FaCamera, FaLock } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { getImageURI } from "../../utils/helper";

const EMPTY_PROFILE = {
  fullname: "",
  email: "",
  contact: "",
  address: "",
  state: "",
  city: "",
  userimage: "",
};

const EDITABLE_FIELDS = ["fullname", "email", "address", "state", "city"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // matches backend multer limit
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const inputClass =
  "w-full border border-[#D9D9D9] rounded-lg px-4 py-2.5 outline-[#8A38F5] disabled:bg-gray-50 disabled:text-gray-500";

export default function EditProfile() {
  const router = useRouter();
  const { URI, setLoading, setUser: setAuthUser } = useAuth();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [savedProfile, setSavedProfile] = useState(EMPTY_PROFILE);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const isDirty =
    !!imageFile ||
    EDITABLE_FIELDS.some((key) => (profile[key] || "") !== (savedProfile[key] || ""));

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(""), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  // Release the object URL used for the image preview
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${URI}/user/profile`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      const next = { ...EMPTY_PROFILE };
      Object.keys(next).forEach((key) => {
        next[key] = data?.[key] ?? "";
      });
      setProfile(next);
      setSavedProfile(next);
    } catch (err) {
      console.error(err);
      setError("Could not load your profile. Please refresh the page.");
    } finally {
      setProfileLoaded(true);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await fetch(`${URI}/admin/states`, {
        credentials: "include",
      });
      const data = await res.json();
      setStates(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCities = async (state) => {
    try {
      const res = await fetch(`${URI}/admin/cities/${state}`, {
        credentials: "include",
      });
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchStates();
  }, []);

  useEffect(() => {
    if (profile.state) fetchCities(profile.state);
    else setCities([]);
  }, [profile.state]);

  const updateField = (key, value) => {
    setError("");
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return setError("Profile photo must be a JPG or PNG image");
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return setError("Profile photo must be smaller than 5 MB");
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Phone is changed through its own OTP flow, separate from "Save Changes"
  const handleContactChanged = (contact, token) => {
    setProfile((prev) => ({ ...prev, contact }));
    setSavedProfile((prev) => ({ ...prev, contact }));
    setAuthUser((prev) => {
      const next = { ...(prev || {}), contact };
      try {
        localStorage.setItem("guestUser", JSON.stringify(next));
        if (token) localStorage.setItem("accessToken", token);
      } catch {
        /* ignore */
      }
      return next;
    });
    setError("");
    setSuccess("Phone number updated successfully");
  };

  const handleReset = () => {
    setProfile(savedProfile);
    setImageFile(null);
    setImagePreview("");
    setError("");
  };

  const handleSave = async () => {
    // 🔹 Frontend validation (mirrors the backend's required fields)
    if (!profile.fullname?.trim()) {
      return setError("Full name is required");
    }

    if (!profile.email?.trim()) {
      return setError("Email is required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      return setError("Please enter a valid email address");
    }

    if (!profile.address?.trim()) {
      return setError("Current address is required");
    }

    if (!profile.state || !profile.city) {
      return setError("State and City are required");
    }

    setError("");
    setSaving(true);
    setLoading(true);

    try {
      const formData = new FormData();
      EDITABLE_FIELDS.forEach((key) =>
        formData.append(key, String(profile[key] ?? "").trim()),
      );
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch(`${URI}/user/profile/edit`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      // 🔹 Backend validation / auth errors
      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
        } else if (response.status === 400 || response.status === 409) {
          setError(data?.message || "Invalid data provided");
        } else if (response.status >= 500) {
          setError("Something went wrong. Please try again later.");
        } else {
          setError("Unexpected error occurred");
        }
        return;
      }

      // ✅ Success — keep the form, the header and the stored user in sync
      const updated = {
        ...profile,
        userimage: data?.userImage ?? profile.userimage,
      };
      setProfile(updated);
      setSavedProfile(updated);
      setImageFile(null);
      setImagePreview("");

      setAuthUser((prev) => {
        const next = {
          ...(prev || {}),
          fullname: updated.fullname,
          email: updated.email,
          userimage: updated.userimage,
        };
        try {
          localStorage.setItem("guestUser", JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });

      setSuccess("Profile updated successfully");
    } catch (err) {
      // 🔹 Network / CORS / timeout
      if (!navigator.onLine) {
        setError("No internet connection");
      } else {
        setError("Unable to connect to server. Please try again.");
      }

      console.error("Profile update error:", err);
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  const avatarSrc =
    imagePreview ||
    (profile.userimage ? getImageURI(profile.userimage) : "") ||
    "/assets/user/UserIcon.svg";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white p-4 sm:p-8 md:rounded-2xl md:shadow-sm"
    >
      {/* ================= HEADER ================= */}
      <div className="flex md:hidden items-center gap-3 mb-6">
        <IoArrowBack
          size={22}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h2 className="text-lg font-bold">Edit Profile</h2>
      </div>

      <div className="hidden md:block pb-4 border-b border-b-[#D9D9D9] mb-6">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <p className="text-[#868686] text-sm">
          Update your personal details and profile picture
        </p>
      </div>

      {/* ================= PHOTO ================= */}
      <div className="flex items-center gap-5 mb-8">
        <div className="relative shrink-0">
          <img
            src={avatarSrc}
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = "/assets/user/UserIcon.svg";
            }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#5323DC]"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Change profile photo"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#5323DC] text-white flex items-center justify-center shadow"
          >
            <FaCamera size={13} />
          </button>
        </div>
        <div className="min-w-0">
          <p className="font-bold text-lg truncate">
            {profile.fullname || (profileLoaded ? "Your Name" : "")}
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-sm font-semibold text-[#5323DC] hover:underline"
          >
            {imageFile ? "Choose a different photo" : "Change photo"}
          </button>
          <p className="text-xs text-gray-400">JPG or PNG, up to 5 MB</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        <Field label="Full Name" required>
          <input
            type="text"
            value={profile.fullname}
            onChange={(e) => updateField("fullname", e.target.value)}
            disabled={!profileLoaded}
            className={inputClass}
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={!profileLoaded}
            className={inputClass}
          />
        </Field>

        <Field
          label="Phone Number"
          hint={
            <span className="flex items-center gap-1">
              <FaLock size={10} /> Verified with an OTP sent to the new number
            </span>
          }
        >
          <PhoneChange
            URI={URI}
            currentContact={profile.contact}
            disabled={!profileLoaded}
            onChanged={handleContactChanged}
          />
        </Field>

        <Field label="Current Address" required>
          <input
            type="text"
            value={profile.address}
            onChange={(e) => updateField("address", e.target.value)}
            disabled={!profileLoaded}
            className={inputClass}
          />
        </Field>

        <Field label="State" required>
          <div className="relative">
            <select
              value={profile.state}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, state: e.target.value, city: "" }))
              }
              disabled={!profileLoaded}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select state
              </option>
              {states?.map((s, i) => (
                <option key={i} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500" />
          </div>
        </Field>

        <Field label="City" required>
          <div className="relative">
            <select
              value={profile.city}
              onChange={(e) => updateField("city", e.target.value)}
              disabled={!profile.state}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                {profile.state ? "Select city" : "Select a state first"}
              </option>
              {cities?.map((c, i) => (
                <option key={i} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500" />
          </div>
        </Field>

        {/* Messages */}
        {(error || success) && (
          <div className="sm:col-span-2">
            {error && (
              <p className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5">
                {success}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          {isDirty && (
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#D9D9D9] text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Discard Changes
            </button>
          )}
          <button
            type="submit"
            disabled={!isDirty || saving}
            className="w-full sm:w-[220px] bg-[#8A38F5] text-white text-sm font-semibold py-3 rounded-lg active:scale-98 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

const RESEND_SECONDS = 30;

function PhoneChange({ URI, currentContact, disabled, onChanged }) {
  const [step, setStep] = useState("view"); // view | enter | verify
  const [newContact, setNewContact] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const reset = () => {
    setStep("view");
    setNewContact("");
    setOtp("");
    setMessage("");
    setResendIn(0);
  };

  const post = async (path, body) => {
    const res = await fetch(`${URI}/user/profile/contact/${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Something went wrong");
    return data;
  };

  const sendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(newContact)) {
      return setMessage("Enter a valid 10-digit mobile number");
    }
    if (newContact === currentContact) {
      return setMessage("This is already your phone number");
    }
    setBusy(true);
    setMessage("");
    try {
      await post("send-otp", { contact: newContact });
      setStep("verify");
      setOtp("");
      setResendIn(RESEND_SECONDS);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) return setMessage("Enter the 6-digit OTP");
    setBusy(true);
    setMessage("");
    try {
      const data = await post("verify-otp", { contact: newContact, otp });
      onChanged(data?.contact || newContact, data?.token);
      reset();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

  // Enter submits the current step instead of the profile form
  const onKeyDown = (action) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  if (step === "view") {
    return (
      <div className="flex gap-2">
        <input
          type="tel"
          value={currentContact ? `+91 ${currentContact}` : "Not added"}
          disabled
          className={`${inputClass} flex-1`}
        />
        <button
          type="button"
          onClick={() => setStep("enter")}
          disabled={disabled}
          className="shrink-0 px-4 rounded-lg border border-[#5323DC] text-[#5323DC] text-sm font-semibold hover:bg-[#F6F1FF] disabled:opacity-50"
        >
          {currentContact ? "Change" : "Add"}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#E4D8FF] bg-[#FAF8FF] p-3 space-y-2">
      {step === "enter" ? (
        <div className="flex gap-2">
          <div className="flex flex-1 items-center rounded-lg border border-[#D9D9D9] bg-white focus-within:border-[#8A38F5]">
            <span className="pl-3 pr-2 text-sm text-gray-500 border-r border-[#D9D9D9]">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              autoFocus
              maxLength={10}
              value={newContact}
              onChange={(e) => {
                setMessage("");
                setNewContact(e.target.value.replace(/\D/g, ""));
              }}
              onKeyDown={onKeyDown(sendOtp)}
              placeholder="New mobile number"
              className="w-full px-3 py-2.5 rounded-lg outline-none"
            />
          </div>
          <button
            type="button"
            onClick={sendOtp}
            disabled={busy || newContact.length !== 10}
            className="shrink-0 px-4 rounded-lg bg-[#5323DC] text-white text-sm font-semibold disabled:opacity-50"
          >
            {busy ? "Sending..." : "Send OTP"}
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-600">
            Enter the OTP sent to <span className="font-semibold">+91 {newContact}</span>{" "}
            <button
              type="button"
              onClick={() => {
                setStep("enter");
                setMessage("");
              }}
              className="text-[#5323DC] font-semibold hover:underline"
            >
              Edit
            </button>
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setMessage("");
                setOtp(e.target.value.replace(/\D/g, ""));
              }}
              onKeyDown={onKeyDown(verifyOtp)}
              placeholder="6-digit OTP"
              className={`${inputClass} flex-1 tracking-[0.3em] bg-white`}
            />
            <button
              type="button"
              onClick={verifyOtp}
              disabled={busy || otp.length !== 6}
              className="shrink-0 px-4 rounded-lg bg-[#5323DC] text-white text-sm font-semibold disabled:opacity-50"
            >
              {busy ? "Verifying..." : "Verify"}
            </button>
          </div>
          <button
            type="button"
            onClick={sendOtp}
            disabled={busy || resendIn > 0}
            className="text-xs font-semibold text-[#5323DC] disabled:text-gray-400"
          >
            {resendIn > 0 ? `Resend OTP in ${resendIn}s` : "Resend OTP"}
          </button>
        </>
      )}

      {message && <p className="text-xs text-red-600">{message}</p>}

      <button
        type="button"
        onClick={reset}
        className="block text-xs font-semibold text-gray-500 hover:text-gray-800"
      >
        Cancel
      </button>
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-bold mb-1 ml-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1 ml-1">{hint}</p>}
    </div>
  );
}

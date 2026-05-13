"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../store/auth";
import { FaChevronDown } from "react-icons/fa";
import { getImageURI } from "../../utils/helper";

export default function EditProfile() {
  const { URI, setLoading } = useAuth();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    contact: "",
    address: "",
    state: "",
    city: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [success]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${URI}/user/profile`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setUser((prev) => ({ ...prev, ...data }));
    } catch (err) {
      console.error(err);
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
    if (user.state) fetchCities(user.state);
  }, [user.state]);

  const handleSave = async () => {
    // 🔹 Frontend validation
    if (!user.fullname?.trim()) {
      return setError("Full name is required");
    }

    if (!user.email?.trim()) {
      return setError("Email is required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      return setError("Please enter a valid email address");
    }

    if (!user.state || !user.city) {
      return setError("State and City are required");
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${URI}/user/profile/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      // 🔹 Backend validation / auth errors
      if (!response.ok) {
        // 401 – Unauthorized
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          return;
        }

        // 400 / 409 – Validation / conflict
        if (response.status === 400 || response.status === 409) {
          setError(data?.message || "Invalid data provided");
          return;
        }

        // 500 – Server error
        if (response.status >= 500) {
          setError("Something went wrong. Please try again later.");
          return;
        }

        setError("Unexpected error occurred");
        return;
      }

      // ✅ Success
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
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(user.contact))
      return setError("Invalid mobile number");

    setError("");

    try {
      await fetch(`${URI}/user/send-otp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: user.contact }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white p-4 sm:p-8 py-10 shadow-sm"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full flex gap-10 pb-5 lg:pb-3 lg:border-b border-b-[#D9D9D9] mb-6"
      >
        <div className="w-15 h-15 rounded-full flex lg:hidden items-center justify-center">
          <img src={getImageURI(user?.userimage) || "/assets/user/UserIcon.svg"} alt="user" className="w-full h-full" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="text-[#868686] text-sm">
            Update your personal details and profile picture
          </p>
        </div>
      </motion.div>

      <div className="flex gap-8 items-start">
        <div className="hidden lg:flex w-20 h-20 rounded-full items-center justify-center">
          <img src={getImageURI(user?.userimage) || "/assets/user/UserIcon.svg"} alt="user" className="w-full h-full" />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-1 ml-1">Name</label>
            <input
              type="text"
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full border border-[#D9D9D9] rounded-lg px-4 py-2 outline-[#8A38F5]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 ml-1">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full border border-[#D9D9D9] rounded-lg px-4 py-2 outline-[#8A38F5]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 ml-1">
              Current Address
            </label>
            <input
              type="text"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full border border-[#D9D9D9] rounded-lg px-4 py-2 outline-[#8A38F5]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <label className="block text-sm font-bold mb-1 ml-1">State</label>
              <select
                value={user.state}
                onChange={(e) =>
                  setUser({ ...user, state: e.target.value, city: "" })
                }
                className="w-full border border-[#D9D9D9] rounded-lg px-4 py-2 outline-[#8A38F5] appearance-none"
              >
                <option value="" disabled></option>
                {states?.map((s, i) => (
                  <option key={i} value={s.state}>
                    {s.state}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-[38px] text-sm" />
            </div>

            <div className="flex-1 relative">
              <label className="block text-sm font-bold mb-1 ml-1">City</label>
              <select
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                disabled={!user.state}
                className="w-full border border-[#D9D9D9] rounded-lg px-4 py-2 outline-[#8A38F5] appearance-none"
              >
                <option value="" disabled></option>
                {cities?.map((c, i) => (
                  <option key={i} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-[38px] text-sm" />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
            <motion.button
              onClick={handleSave}
              className="bg-[#8A38F5] text-white text-sm font-semibold w-full sm:w-[300px] py-3 rounded-lg active:scale-98"
            >
              Save Changes
            </motion.button>
          </div>
          {success && (
            <p className="col-span-1 sm:col-span-2 text-green-600 font-medium text-center">
              {success}
            </p>
          )}
        </div>
      </div>

      <motion.div className="mt-10">
        <h3 className="text-sm font-bold mb-2 ml-1">PHONE NUMBER</h3>

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
          <input
            type="tel"
            maxLength={10}
            value={user.contact}
            onChange={(e) =>
              setUser({
                ...user,
                contact: e.target.value.replace(/\D/g, ""),
              })
            }
            className="flex-1 border border-[#D9D9D9] rounded-lg px-4 py-2 outline-[#8A38F5]"
          />

          <motion.button
            onClick={handleSendOtp}
            className="hidden bg-[#8A38F5] font-semibold text-sm text-white px-6 py-3 rounded-lg"
          >
            Send OTP
          </motion.button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </motion.div>
    </motion.div>
  );
}

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { MdLogin, MdLogout } from "react-icons/md";
import UserIcon from "../assets/user/UserIcon.svg";
import { useAuth } from "../store/auth";
import axios from "axios";
function UserDropdown() {
  const { URI, user, setShowLogin, delTokenInCookie } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const userLogout = async () => {
    try {
      await axios.post(URI + "/user/logout", {}, { withCredentials: true });

      // Clear local auth data
      localStorage.removeItem("guestUser");
      localStorage.removeItem("accessToken"); // if you stored it

      delTokenInCookie(); // optional if backend already clears

      setOpen(false);

      // Navigate first
      router.replace("/");

      // Reload after navigation (guaranteed clean state)
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        onClick={() => {
          if (user) {
            setOpen(!open);
          } else {
            setShowLogin(true);
          }
        }}
        className="w-[95px] h-[45px] flex items-center justify-center gap-2 border border-[#5E23DC] rounded-full cursor-pointer active:scale-95"
      >
        <img
          src={UserIcon}
          alt="User Icon"
          className="w-7 h-7 pointer-events-none"
        />
        <IoMdMenu className="w-7 h-7 text-[#5E23DC]" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 p-4 bg-white rounded-xl shadow-[1px_4px_12px_4px_#00000026] overflow-hidden">
          <button
            onClick={() => {
              router.push("/dashboard");
              setOpen(false);
            }}
            className="w-full flex items-center justify-start gap-2 text-left px-4 py-3 text-base font-bold rounded-lg text-[#7c17ff] hover:bg-[#F4EDFF]"
          >
            <MdDashboard className="w-6 h-6" />
            <span>Dashboard</span>
          </button>

          {!user ? (
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className="w-full flex items-center justify-start gap-2 text-left px-4 py-3 text-base text-[#00b501] rounded-lg font-bold hover:bg-green-50"
            >
              <MdLogin className="w-6 h-6" />
              <span>Login</span>
            </button>
          ) : (
            <button
              onClick={() => {
                userLogout();
              }}
              className="w-full flex items-center justify-start gap-2 text-left px-4 py-3 text-base text-[#FF0000] rounded-lg font-bold hover:bg-red-50"
            >
              <MdLogout className="w-6 h-6" />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDropdown;

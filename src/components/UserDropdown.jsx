import { useRouter } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../store/auth";
import { getImageURI } from "../utils/helper";

// Navbar profile button: opens the profile dashboard for logged-in users
// (logout lives in the dashboard sidebar), or the login popup for guests.
function UserDropdown() {
  const { user, setShowLogin } = useAuth();
  const router = useRouter();

  const avatar = user?.userimage ? getImageURI(user.userimage) : "";

  return (
    <button
      type="button"
      onClick={() => {
        if (user) {
          router.push("/dashboard?tab=profile");
        } else {
          setShowLogin(true);
        }
      }}
      aria-label={user ? "Open my profile" : "Login"}
      title={user ? user.fullname || "My Profile" : "Login"}
      className="w-[95px] h-[45px] flex items-center justify-center gap-2 border border-[#5E23DC] rounded-full active:scale-95 hover:bg-[#F4EDFF] transition"
    >
      <img
        src={avatar || "/assets/user/UserIcon.svg"}
        alt=""
        onError={(e) => {
          e.currentTarget.src = "/assets/user/UserIcon.svg";
        }}
        className={`w-7 h-7 pointer-events-none ${avatar ? "rounded-full object-cover" : ""}`}
      />
      <IoMdMenu className="w-7 h-7 text-[#5E23DC]" />
    </button>
  );
}

export default UserDropdown;

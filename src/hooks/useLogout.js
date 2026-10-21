import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/auth";

/** Logs the guest user out on the server, clears local auth data and returns home. */
export default function useLogout() {
  const router = useRouter();
  const { delTokenInCookie, URI } = useAuth();

  return async () => {
    try {
      await axios.post(URI + "/user/logout", {}, { withCredentials: true });

      // Clear local auth data
      localStorage.removeItem("guestUser");
      localStorage.removeItem("accessToken");

      delTokenInCookie();

      // Navigate first, then reload for a guaranteed clean state
      router.replace("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };
}

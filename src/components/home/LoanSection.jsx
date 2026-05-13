import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../../store/auth";

const LoanSection = () => {
  const { user, setShowLogin } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (user?.id) {
      router.push("/home-loan-application");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center p-4 md:p-8 gap-6 md:pb-15 cursor-pointer"
    >
      <img
        src="/assets/home/HomeLoanCard.svg"
        alt="Get Property In Three Steps"
        loading="lazy"
        className="w-full max-w-[1380px] hover:scale-102 duration-500 transition-all"
      />
    </div>
  );
};

export default LoanSection;
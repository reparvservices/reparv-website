import React from "react";
import { useNavigate } from "react-router-dom";
import HomeLoanCard from "../../assets/home/HomeLoanCard.svg";
import { useAuth } from "../../store/auth";

const LoanSection = () => {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user?.id) {
      navigate("/home-loan-application");
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
        src={HomeLoanCard}
        alt="Get Property In Three Steps"
        loading="lazy"
        className="w-full max-w-[1380px] hover:scale-102 duration-500 transition-all"
      />
    </div>
  );
};

export default LoanSection;
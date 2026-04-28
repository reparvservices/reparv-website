import React, { useEffect } from "react";
import { MdDone } from "react-icons/md";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

function SuccessScreen() {
  const navigate = useNavigate();
  const { successScreen, setSuccessScreen } = useAuth();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // or /properties or wherever makes sense
    }
  };

  // set Timer For Hide After 2 second.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessScreen((prev) => ({ ...prev, show: false }));
      goBack();
    }, 2000);

    return () => clearTimeout(timer);
  }, [successScreen.show]);

  return (
    <div
      onClick={() => {
        navigate(-1);
        setSuccessScreen({ ...successScreen, show: false });
      }}
      className="successScreen inset-0 w-full h-screen flex items-center justify-center fixed z-[1000] bg-white"
    >
      <div className="successMessage w-[90%] sm:w-[70%] max-w-4xl py-8 sm:py-15 rounded-xl bg-gradient-to-r from-[#5323DC] to-[#8A38F5] flex sm:gap-8 gap-4 flex-col items-center justify-center text-white">
        <div className="rightIcon w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#8A38F5]">
          <MdDone className="w-8 h-8" />
        </div>
        <h2 className="text-xl md:text-3xl font-semibold">
          {successScreen.label}
        </h2>
        <h4 className="text-xs md:text-lg">{successScreen.description}</h4>
      </div>
    </div>
  );
}

export default SuccessScreen;

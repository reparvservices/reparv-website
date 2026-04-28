import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdErrorOutline, MdInfoOutline } from "react-icons/md";
import { useAuth } from "../store/auth";

const AlertMessage = () => {
  const { showAlert, setShowAlert } = useAuth();

  useEffect(() => {
    if (showAlert.show) {
      const timer = setTimeout(() => {
        setShowAlert({ ...showAlert, show: false });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showAlert.show]);

  const alertStyles = {
    success: "text-[#00B501]",
    error: "text-red-500",
    info: "text-blue-600",
    warning: "text-yellow-600",
  };

  const icons = {
    success: <IoCheckmarkDoneCircle size={22} />,
    error: <MdErrorOutline size={22} />,
    info: <MdInfoOutline size={22} />,
    warning: <MdInfoOutline size={22} />,
  };

  return (
    <AnimatePresence>
      {showAlert.show && (
        <motion.div
          className="fixed top-1/2 left-1/2 z-[9999]"
          initial={{
            opacity: 0,
            scale: 0.9,
            y: -20,
            x: "-50%",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            x: "-50%",
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: -20,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <div
            onClick={() =>
              setShowAlert({ ...showAlert, show: false })
            }
            className={`flex items-start justify-center gap-3 px-4 sm:px-5 py-4 rounded-xl bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.25)] min-w-[280px] max-w-sm cursor-pointer ${alertStyles[showAlert.type]}`}
          >
            <div className="mt-0.5">{icons[showAlert.type]}</div>

            <div className="flex-1">
              <h4 className="text-base sm:text-lg font-bold">
                {showAlert.title}
              </h4>
              <p className="text-sm mt-1 font-semibold text-black">
                {showAlert.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertMessage;
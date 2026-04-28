import React from "react";
import MobileAppDownload from "../../assets/home/MobileAppDownload.svg";
import HomeAppDownload from "../../assets/home/HomeAppDownload.svg";

const AppDownloadSection = () => {
  return (
    <div
      onClick={() => {
        window.open(
          "https://play.google.com/store/apps/details?id=com.reparvcustomer",
          "_blank"
        );
      }}
      className="flex flex-col items-center p-4 md:p-8 gap-6 pb-10 md:pb-15"
    >
      {/* Mobile */}
      <img
        src={MobileAppDownload}
        alt="Get Property In Three Steps"
        loading="lazy"
        className="block md:hidden w-full  max-w-[1380px] hover:scale-102 duration-500 transition-all cursor-pointer"
      />
      {/* Desktop */}
      <img
        src={HomeAppDownload}
        alt="Get Property In Three Steps"
        loading="lazy"
        className="hidden md:block w-full max-w-[1380px] hover:scale-102 duration-500 transition-all cursor-pointer"
      />
    </div>
  );
};

export default AppDownloadSection;

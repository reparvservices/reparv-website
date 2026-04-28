import React from "react";
import HomeGetPropertyInThreeSteps from "../../assets/home/HomeGetPropertyInThreeSteps.png";
import Step1 from "../../assets/home/Step1.svg";
import Step2 from "../../assets/home/Step2.svg";
import Step3 from "../../assets/home/Step3.svg";

const StepsSection = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 md:p-8 md:pb-15">
      <div className="Heading w-full max-w-[1380px] flex items-center justify-center gap-2 md:gap-6 py-4">
        <div className="w-full flex-1 h-[3px] rounded-tr-md rounded-br-md bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF] " />
        <div className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          Get Your Properties In{" "}
          <span className="text-[#8A38F5] font-bold ">3 Steps</span>
        </div>
        <div className="w-full flex-1 h-[3px] rounded-tl-md rounded-bl-md bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF] " />
      </div>
      <img
        src={HomeGetPropertyInThreeSteps}
        alt="Get Property In Three Steps"
        loading="lazy"
        className="hidden sm:block w-full max-w-[1380px] hover:scale-102 duration-500 transition-all"
      />
      <div className="flex sm:hidden flex-col gap-6">
        <img
          src={Step1}
          alt="Get Property In Three Steps"
          loading="lazy"
          className="w-[220px] object-cover hover:scale-102 duration-500 transition-all"
        />
        <img
          src={Step2}
          alt="Get Property In Three Steps"
          loading="lazy"
          className="w-[200px] object-cover hover:scale-102 duration-500 transition-all"
        />
        <img
          src={Step3}
          alt="Get Property In Three Steps"
          loading="lazy"
          className="w-[220px] object-cover hover:scale-102 duration-500 transition-all"
        />
      </div>
    </div>
  );
};

export default StepsSection;

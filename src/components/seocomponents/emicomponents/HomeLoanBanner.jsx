import React from "react";

const HomeLoanBanner = () => {
  return (
    <div className="flex flex-col items-center gap-6 md:pb-15">
      <img
        src="/assets/seopageassets/emicalculator/MobileEMICalculatorBanner.jpeg"
        alt="Get Property In Three Steps"
        className="block sm:hidden w-full max-w-[1380px] hover:scale-102 duration-500 transition-all"
      />
      <img
        src="/assets/seopageassets/emicalculator/Back.svg"
        alt="Get Property In Three Steps"
        className="hidden sm:block w-full max-w-[1380px] hover:scale-102 duration-500 transition-all"
      />
    </div>
  );
};

export default HomeLoanBanner;

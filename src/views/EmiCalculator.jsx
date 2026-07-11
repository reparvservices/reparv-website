"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { MdDone } from "react-icons/md";
import EMICalculator from "../components/seocomponents/emicomponents/EMICalculator";
import LatestArtical from "../components/seocomponents/common/LatestArtical";
import HowToUseEmiCalculator from "../components/seocomponents/emicomponents/HowToUseEmiCalculator";
const EmiCalculator = ({ initialArticles = null }) => {
  const router = useRouter();

  return (
    <>
      <section className="w-full bg-white">
        <div className="max-w-[1380px] mx-auto px-4 py-6 sm:px-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            {/* LEFT CONTENT */}
            <div className="flex flex-col items-center lg:items-start justify-center">
              <h1 className="text-center lg:text-left text-4xl md:text-5xl xl:text-7xl font-bold text-black leading-tight">
                Home Loan <span className="text-[#8A38F5]">EMI Calculator</span>
              </h1>

              <p className="text-center lg:text-start text-xs md:text-base xl:text-xl mt-2 sm:mt-6 max-w-2xl leading-relaxed">
                Calculate your monthly EMI instantly and plan your home loan
                with confidence. Get accurate results in seconds and make
                informed financial decisions.
              </p>

              {/* FEATURES */}
              <div className="flex gap-4 sm:gap-6 mt-2 sm:mt-6 text-xs sm:text-base text-black">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-[#8A38F5] text-white flex items-center justify-center text-xs">
                    <MdDone className="font-bold" />
                  </span>
                  Instant Results
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-[#8A38F5] text-white flex items-center justify-center text-xs">
                    <MdDone className="font-bold" />
                  </span>
                  100% Accurate
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-[#8A38F5] text-white flex items-center justify-center text-xs">
                    <MdDone className="font-bold" />
                  </span>
                  Free to Use
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-4 sm:mt-8 text-xs sm:text-base">
                <button
                  type="button"
                  onClick={() => {
                    const element = document.getElementById("calculator");
                    if (!element) return;

                    const yOffset = -50; // scroll 50px up
                    const y =
                      element.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;

                    window.scrollTo({ top: y, behavior: "smooth" });
                  }}
                  className="bg-[#8A38F5] hover:bg-[#8A38F5] transition text-white font-bold px-4 sm:px-8 py-2 sm:py-3 rounded-lg shadow-[0px_4px_18px_1px_#5E23DC45]"
                >
                  Calculate EMI
                </button>

                <button
                  type="button"
                  onClick={() => {
                    router.push("/home-loan-application");
                  }}
                  className="border border-[#8A38F5] text-[#8A38F5] font-bold hover:bg-purple-50 transition px-4 sm:px-8 py-2 sm:py-3 rounded-lg"
                >
                  Apply for Home Loan
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <img
                src="/assets/seopageassets/emicalculator/Back.svg"
                alt="EMI Calculator Illustration"
                className="relative w-full object-cover"
              />
            </div>
          </div>

          <div id="calculator">
            <EMICalculator />
            <div className="hidden md:block pb-15">
              <img
                src="/assets/seopageassets/emicalculator/LoanEMIImage.svg"
                alt="Image"
                className="w-full object-cover"
              />
            </div>
            <div className="md:hidden">
              <HowToUseEmiCalculator />
            </div>
          </div>
          <LatestArtical initialArticles={initialArticles} />
        </div>
      </section>
    </>
  );
};

export default EmiCalculator;

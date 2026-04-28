import React, { useState, useEffect } from "react";
import FormatPrice from "../FormatPrice";

const EMICalculator = ({ totalAmount }) => {
  const [downPayment, setDownPayment] = useState(100000);
  const [tenure, setTenure] = useState(20);
  const [interest, setInterest] = useState(9);
  const [emi, setEmi] = useState(0);
  //This is for the Slider Background
  const downPaymentPercentage =
    totalAmount === 0 ? 0 : (downPayment / totalAmount) * 100;
  const tenurePercentage = ((tenure - 1) / (35 - 1)) * 100;
  const interestPercentage = (interest / 15) * 100;

  useEffect(() => {
    const principal = totalAmount - downPayment;
    const monthlyInterest = interest / 12 / 100;
    const numberOfMonths = tenure * 12;

    if (monthlyInterest === 0) {
      setEmi(principal / numberOfMonths);
      return;
    }

    const emiCalc =
      (principal *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, numberOfMonths)) /
      (Math.pow(1 + monthlyInterest, numberOfMonths) - 1);

    setEmi(Math.round(emiCalc || 0));
  }, [downPayment, tenure, interest, totalAmount]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 bg-white rounded-xl p-6 shadow">
      <h2 className="text-base font-medium text-center">EMI calculator</h2>

      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="w-[300px] flex items-center justify-between px-2 py-2">
          <div className="flex-1 h-[2px] rounded-tr-md rounded-br-md bg-gradient-to-l from-black to-transparent " />
          <span className="px-4 bg-white text-xs leading-[140%] font-normal whitespace-nowrap">
            EMI ESTIMATE
          </span>
          <div className="flex-1 h-[2px] rounded-tl-md rounded-bl-md bg-gradient-to-r from-black to-transparent" />
        </div>
        <p className="text-2xl font-semibold text-black">
          {<FormatPrice price={emi} />} / month*
        </p>
        <p className="text-xs font-normal text-black">
          For {tenure} Years @ {interest}% | Total{" "}
          {<FormatPrice price={emi * 12 * parseFloat(tenure) + parseFloat(downPayment)} />}
        </p>
      </div>

      <h2 className="w-full text-xl py-2 font-medium text-left">
        EMI calculator
      </h2>

      <div className="w-full flex flex-col gap-4 ">
        {/* Down Payment */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <label className="font-medium text-black mb-2">Down payment*</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-25 outline-none px-2 py-2 bg-white border border-[#00000033] rounded-md text-sm font-medium "
            />
          </div>

          <input
            type="range"
            min={0}
            max={totalAmount}
            step={1000}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-[6px] rounded-lg"
            style={{
              background: `linear-gradient(to right, #16a34a ${downPaymentPercentage}%, #e5e7eb ${downPaymentPercentage}%)`,
            }}
          />
          <div className="w-full flex items-center justify-between">
            <span className="text-[#00000066] text-base font-medium ">
              <FormatPrice price={0} />
            </span>
            <span className="text-[#00000066] text-base font-medium ">
              <FormatPrice price={totalAmount} />
            </span>
          </div>
        </div>

        {/* Tenure */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <label className="font-medium text-black mb-2">Tenure</label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => {
                setTenure(e.target.value);
              }}
              className="w-18 outline-none px-2 py-2 bg-white border border-[#00000033] rounded-md text-sm font-medium "
            />
          </div>

          <input
            type="range"
            min={1}
            max={35}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-[6px] rounded-lg"
            style={{
              background: `linear-gradient(to right, #16a34a ${tenurePercentage}%, #e5e7eb ${tenurePercentage}%)`,
            }}
          />

          <div className="w-full flex items-center justify-between">
            <span className="text-[#00000066] text-base font-medium ">
              1 Year
            </span>
            <span className="text-[#00000066] text-base font-medium ">
              35 Years
            </span>
          </div>
        </div>

        {/* Interest */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <label className="font-medium text-black mb-2">Intrest</label>
            <input
              type="number"
              value={interest}
              onChange={(e) => {
                setInterest(e.target.value);
              }}
              className="w-18 outline-none px-2 py-2 bg-white border border-[#00000033] rounded-md text-sm font-medium "
            />
          </div>

          <input
            type="range"
            min={0}
            max={15}
            step={0.1}
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            className="w-full h-[6px] rounded-lg"
            style={{
              background: `linear-gradient(to right, #16a34a ${interestPercentage}%, #e5e7eb ${interestPercentage}%)`,
            }}
          />
          <div className="w-full flex items-center justify-between">
            <span className="text-[#00000066] text-base font-medium ">0%</span>
            <span className="text-[#00000066] text-base font-medium ">15%</span>
          </div>
        </div>
      </div>

      <p className="text-base w-full mt-2 font-medium text-left text-[#00000066]">
        *Final EMI gets calculated after income verification.
      </p>
    </div>
  );
};

export default EMICalculator;

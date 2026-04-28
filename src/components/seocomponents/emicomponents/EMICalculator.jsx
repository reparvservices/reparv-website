import { useState, useMemo, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import BudgetProperty from "./BudgetProperty";
import { formatIndianUnit } from "../../../utils/helper";

export default function EMICalculator() {
  const [propertyValue, setPropertyValue] = useState(6000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const loanAmount = Math.max(propertyValue - downPayment, 0);

  const data = useMemo(() => {
    const P = Math.max(propertyValue - downPayment, 0);
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    let emi = 0;

    if (r === 0) {
      emi = P / n; // zero-interest case
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;

    return {
      emi,
      totalInterest,
      totalPayable,
    };
  }, [propertyValue, downPayment, interestRate, tenure]);
  useEffect(() => {
    if (downPayment > propertyValue) {
      setDownPayment(propertyValue);
    }
  }, [downPayment, propertyValue]);

  const COLORS = ["#7C3AED", "#E4CEFF"];
  const pieData = [
    { name: "Principal Amount", value: loanAmount || 1 },
    { name: "Total Interest", value: data.totalInterest || 1 },
  ];

  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto sm:px-6">
        {/* Header */}
        <div className="hidden lg:block text-center mb-12">
          <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-[#3D2A5D]">
            Calculate Your Home Loan EMI
          </h2>
          <p className="text-sm  sm:text-lg text-gray-500 mt-3">
            Adjust the sliders below to calculate your monthly EMI payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {/* LEFT */}
          {/* Heading */}
          <div className="bg-white rounded-2xl p-5 py-6 sm:p-8 shadow-[0px_0px_87px_-3px_#8A38F529]">
            <div className="block lg:hidden mb-6 sm:mb-12">
              <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-[#3D2A5D]">
                Calculate Your Home Loan EMI
              </h2>
              <p className="text-xs sm:text-lg text-gray-500 mt-3">
                Adjust the sliders below to calculate your monthly EMI payment
              </p>
            </div>
            {/* Property Value */}
            <InputBlock
              label="Property Value"
              value={propertyValue}
              setValue={setPropertyValue}
              min={500000}
              max={20000000}
              step={50000}
              left="₹5L"
              right="₹2Cr"
            />

            {/* Down Payment */}
            <InputBlock
              label="Down Payment"
              value={downPayment}
              setValue={setDownPayment}
              min={0}
              max={propertyValue - 500000}
              step={50000}
              left="₹0"
              right="Max"
            />

            {/* Interest */}
            <InputBlock
              label="Interest Rate (% p.a.)"
              value={interestRate}
              setValue={setInterestRate}
              min={5}
              max={20}
              step={0.1}
              left="5%"
              right="20%"
            />

            {/* Tenure */}

            <InputBlock
              label="Loan Tenure (Years)"
              value={tenure}
              setValue={setTenure}
              min={1}
              max={30}
              step={1}
              left="1Y"
              right="30Y"
            />
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl p-5 py-6 sm:p-8 shadow-[0px_0px_87px_-3px_#8A38F529]">
            <h3 className="text-lg font-semibold mb-6">Payment Breakdown</h3>

            {/* Pie Chart */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Pie */}
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={1}
                      stroke="#fff"
                      strokeWidth={3}
                      labelLine={false}
                      label={renderLabel}
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <p className="block sm:hidden text-center text-sm font-semibold">
                Principal vs Interest Breakdown
              </p>

              {/* Legend */}
              <div className="flex sm:flex-col gap-4 pb-4 sm:pb-0">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-sm bg-[#E4CEFF]" />
                  <span className="font-semibold text-sm sm:text-xs xl:text-sm">
                    Total Interest
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-sm bg-[#7C3AED]" />
                  <span className="font-semibold text-sm sm:text-xs xl:text-sm">
                    Principal Amount
                  </span>
                </div>
              </div>
            </div>

            <p className="hidden sm:block text-center text-sm font-semibold m-4">
              Principal vs Interest Breakdown
            </p>

            {/* EMI SUMMARY */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{
                background:
                  "linear-gradient(106.99deg, #5E23DC 1.17%, #8A38F5 98.83%)",
              }}
            >
              <h4 className="text-lg font-semibold mb-4">EMI Summary</h4>

              <div className="grid grid-cols-2 gap-4">
                <Summary title="Monthly EMI" value={data.emi} />
                <Summary title="Loan Amount" value={loanAmount} />
                <Summary title="Total Interest" value={data.totalInterest} />
                <Summary title="Total Payable" value={data.totalPayable} />
              </div>
            </div>
          </div>
        </div>

        <BudgetProperty data={data} loanAmount={loanAmount} />
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function InputBlock({ label, value, setValue, min, max, step, left, right }) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <label className="font-semibold">{label}</label>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const val = e.target.value;
            setValue(val === "" ? "" : Number(val));
          }}
          className="border rounded-md px-3 py-1 w-32 lg:w-40 text-right outline-[#5323DC]"
        />
      </div>
      {typeof value === "number" && value > 0 && (
        <p className="text-xs text-gray-500 text-right mt-1">
          {formatIndianUnit(value)}
        </p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value || 0}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val === "" ? "" : Number(val));
        }}
        className="range-slider w-full"
        style={{
          background: `linear-gradient(
            to right,
            #8A38F5 ${percentage}%,
            #E4CEFF ${percentage}%
          )`,
        }}
      />

      <div className="flex justify-between text-sm text-gray-500 mt-1">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

function Summary({ title, value }) {
  return (
    <div className="bg-white/20 rounded-xl p-4">
      <p className="text-xs sm:text-sm opacity-80">{title}</p>
      <p className="text-sm sm:text-xl font-bold">
        ₹{Math.round(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={name === "Total Interest" ? "#000" : "#fff"}
      className="text-xs font-semibold"
    >
      {name}
      <tspan x={x} y={y + 18} className="text-xs font-bold">
        {`${Math.round(percent * 100)}%`}
      </tspan>
    </text>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { BiBriefcase, BiBuildings } from "react-icons/bi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import Loader from "../components/Loader";
import Step1Personal from "../components/homeLoanPage/Step1Personal";
import CheckEligibilityIncome from "../components/homeLoanPage/CheckEligibilityIncome";
import WhyWeNeedThis from "../components/homeLoanPage/WhyWeNeedThis";
import { useAuth } from "../store/auth";

const INITIAL_FORM = {
  employmentType: "Job",
  fullname: "",
  contactNo: "",
  email: "",
  dateOfBirth: "",
  panNumber: "",
  aadhaarNumber: "",
  state: "",
  city: "",
  pincode: "",
  employmentSector: "",
  workexperienceYear: "",
  workexperienceMonth: "",
  salaryType: "",
  grossPay: "",
  netPay: "",
  pfDeduction: "",
  otherIncome: "",
  yearIncome: "",
  monthIncome: "",
  ongoingEmi: "",
  businessSector: "",
  businessCategory: "",
  businessExperienceYears: "",
  businessExperienceMonths: "",
  businessOtherIncome: "",
};

function EligibilityStepIndicator({ step }) {
  const steps = ["Personal Details", "Income Details"];

  return (
    <div className="flex items-center justify-center my-4 sm:my-6 px-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = step > stepNum;
        const isActive = step === stepNum;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all ${
                  isActive || isCompleted
                    ? "bg-[#8A38F5] text-white shadow-md shadow-purple-200"
                    : "bg-[#D9D9D9] text-[#868686]"
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`text-[11px] sm:text-sm font-semibold mt-1 text-center max-w-[88px] sm:max-w-none ${
                  isActive || isCompleted ? "text-[#8A38F5]" : "text-[#868686]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-[2px] w-14 sm:w-24 mx-1 mb-5 rounded-full transition-all ${
                  step > stepNum ? "bg-[#8A38F5]" : "bg-[#D9D9D9]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CheckEligibility() {
  const router = useRouter();
  const { URI, setLoading, setSuccessScreen, setShowAlert } = useAuth();
  const fieldRefs = useRef({});

  const [step, setStep] = useState(1);
  const [incomeType, setIncomeType] = useState("Job");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const requiredFieldsByStep = {
    1: [
      "fullname",
      "contactNo",
      "email",
      "dateOfBirth",
      "panNumber",
      "aadhaarNumber",
      "state",
      "city",
      "pincode",
    ],
    2:
      incomeType === "Job"
        ? [
            "employmentSector",
            "workexperienceYear",
            "workexperienceMonth",
            "salaryType",
            "grossPay",
            "netPay",
            "pfDeduction",
            "otherIncome",
            "yearIncome",
            "monthIncome",
            "ongoingEmi",
          ]
        : [
            "businessSector",
            "businessCategory",
            "businessExperienceYears",
            "businessExperienceMonths",
            "businessOtherIncome",
            "yearIncome",
            "monthIncome",
            "ongoingEmi",
          ],
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(`${URI}/admin/states`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch states.");
      setStates(await response.json());
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${URI}/admin/cities/${formData.state}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch cities.");
      setCities(await response.json());
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const validateStep = () => {
    const requiredFields = requiredFieldsByStep[step];

    for (const field of requiredFields) {
      if (!formData[field]) {
        const el = fieldRefs.current[field];
        setShowAlert({
          show: true,
          type: "warning",
          title: "",
          message: `Please fill ${field.replace(/([A-Z])/g, " $1")}`,
        });
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => el.focus?.(), 300);
        }
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = { ...formData, employmentType: incomeType };

      const response = await fetch(`${URI}/frontend/emi/check-eligibility`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form. Status: ${response.status}`);
      }

      setSuccessScreen({
        show: true,
        label: "Thank You For Submitting!",
        description: "Our loan expert will call you shortly with your eligibility offer.",
      });

      setFormData({ ...INITIAL_FORM, employmentType: incomeType });
      setStep(1);
      setIncomeType("Job");

      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error("Error submitting form:", err);
      setShowAlert({
        show: true,
        type: "error",
        title: "Submission failed",
        message: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step === 2) {
      handleSubmit();
      return;
    }
    setStep((prev) => Math.min(prev + 1, 2));
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state) fetchCities();
    else setCities([]);
  }, [formData.state]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, employmentType: incomeType }));
  }, [incomeType]);

  return (
    <section className="min-h-screen bg-[#FAF8FF] lg:bg-white">
      <div className="lg:hidden w-full h-[50px] flex items-center gap-4 px-4 py-2 my-2 rounded-lg bg-white shadow-sm">
        <FaArrowLeft onClick={() => router.back()} className="w-5 h-5 cursor-pointer" />
        <span className="w-full text-base font-bold text-center">
          Check Loan Eligibility
        </span>
      </div>

      <div className="hidden lg:grid w-full max-w-[1440px] h-[420px] pb-8 mx-auto relative lg:mb-5 grid-cols-2 overflow-hidden rounded-br-4xl rounded-bl-4xl bg-gradient-to-br from-[#8A38F5] via-[#6B21D8] to-[#3B0764] text-white">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-500/30 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
        <div className="relative z-10 flex items-end justify-center pl-10 pb-8">
          <img
            src="/assets/homeLoan/leftImage.svg"
            alt="Loan eligibility"
            className="w-[320px]"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-end pr-10 pb-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-4 w-fit">
            <IoSpeedometerOutline className="text-lg" />
            Free CIBIL score with your offer
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold mb-3 leading-tight">
            Check Your Home Loan Eligibility
          </h1>
          <p className="opacity-90 text-lg max-w-lg">
            Share a few details and get a personalised EMI offer from our experts — quick, secure, and bank-neutral.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            {["2-minute form", "Expert callback", "No spam"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1"
              >
                <MdVerified className="text-green-300" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-r from-[#8A38F5] to-[#5E23DC] text-white p-5 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <IoSpeedometerOutline />
            Free CIBIL score with your offer
          </div>
          <h1 className="text-2xl font-bold mb-2">Check Loan Eligibility</h1>
          <p className="text-sm text-white/90">
            Fill in your details and our expert will share a personalised EMI offer.
          </p>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto sm:p-4 grid lg:grid-cols-2 gap-8 lg:gap-10 bg-[#FAF8FF] sm:bg-white mb-8 sm:mb-12 px-4 sm:px-0">
        <div className="hidden lg:block">
          <WhyWeNeedThis />
        </div>

        <div className="bg-white lg:bg-[#FAF8FF] rounded-3xl shadow-xl border border-[#E8E8E8] lg:border-0 p-4 sm:p-6">
          <EligibilityStepIndicator step={step} />

          {step === 2 && (
            <div className="w-full flex items-center justify-center mb-4">
              <div className="w-full flex items-center p-1.5 bg-white rounded-2xl border border-[#E8E8E8] shadow-sm gap-2">
                {[
                  { key: "Job", label: "Salaried", Icon: BiBriefcase },
                  { key: "Business", label: "Business", Icon: BiBuildings },
                ].map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setIncomeType(key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      incomeType === key
                        ? "bg-[#8A38F5] text-white shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              <Step1Personal
                formData={formData}
                setFormData={setFormData}
                states={states}
                cities={cities}
                fieldRefs={fieldRefs}
              />
              <div className="mt-4 bg-white p-4 sm:p-6 border border-[#B8B8B8] rounded-xl">
                <label className="text-sm text-black">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="aadhaarNumber"
                  ref={(el) => {
                    fieldRefs.current.aadhaarNumber = el;
                  }}
                  value={formData.aadhaarNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      aadhaarNumber: e.target.value.replace(/\D/g, "").slice(0, 12),
                    }))
                  }
                  className="w-full border border-[#D9D9D9] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8A38F5] mt-1"
                  placeholder="Enter 12-digit Aadhaar number"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <CheckEligibilityIncome
              formData={formData}
              setFormData={setFormData}
              fieldRefs={fieldRefs}
              incomeType={incomeType}
            />
          )}

          <div className="flex justify-between my-5 sm:my-6 gap-3">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
              disabled={step === 1}
              className="px-4 sm:px-6 py-2.5 text-sm sm:text-base border border-gray-300 rounded-xl disabled:opacity-40 font-medium bg-white"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 px-4 sm:px-8 py-2.5 text-sm sm:text-base bg-[#8A38F5] text-white rounded-xl font-bold active:scale-95 shadow-md shadow-purple-200"
            >
              {step === 2 ? "Submit & Get Offer →" : "Continue →"}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
            <span>🔒</span> Your information is secure and encrypted
          </p>
        </div>
      </div>

      <Loader />
    </section>
  );
}

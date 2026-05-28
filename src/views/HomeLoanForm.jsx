import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

import { FiSearch } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { BiBriefcase, BiBuildings } from "react-icons/bi";
import StepIndicator from "../components/homeLoanPage/StepIndicator";
import Step1Personal from "../components/homeLoanPage/Step1Personal";
import Step2Income from "../components/homeLoanPage/Step2Income";
import Step3Documents from "../components/homeLoanPage/Step3Documents";
import WhyWeNeedThis from "../components/homeLoanPage/WhyWeNeedThis";
import leftImage from "../assets/homeLoan/leftImage.svg";
import SEO from "../components/SEO";
import AdvertisementCard from "../components/AdvertisementCard";

const BlogSection = lazy(() => import("../components/BlogSection"));
const FAQSection = lazy(() => import("../components/FAQSection"));

export default function HomeLoanForm() {
  const navigate = useNavigate();
  const {
    URI,
    user,
    setShowLogin,
    setLoading,
    setShowAlert,
    setSuccessScreen,
  } = useAuth();
  const fieldRefs = useRef({});
  const [step, setStep] = useState(1);
  const [incomeType, setIncomeType] = useState("Job");

  const next = () => setStep((p) => Math.min(p + 1, 3));
  const back = () => setStep((p) => Math.max(p - 1, 1));

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    employmentType: incomeType,
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
    panImage: null,
    aadhaarFrontImage: null,
    aadhaarBackImage: null,
  });

  const requiredFieldsByStep = {
    1: [
      "fullname",
      "contactNo",
      "email",
      "dateOfBirth",
      "panNumber",
      "state",
      "city",
      "pincode",
    ],
    2: [
      "employmentSector",
      "workexperienceYear",
      "workexperienceMonth",
      "salaryType",
      "grossPay",
      "netPay",
    ],
    3: ["panImage", "aadhaarNumber", "aadhaarFrontImage", "aadhaarBackImage"],
  };

  const validateStep = () => {
    const requiredFields = requiredFieldsByStep[step];

    for (let field of requiredFields) {
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
          setTimeout(() => {
            el.focus?.();
          }, 300);
        }

        return false;
      }
    }

    return true;
  };

  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "home-loan";
    try {
      const response = await fetch(`${URI}/frontend/seo-data/${page}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch seo data.");
      const data = await response.json();
      setSeoData(data);
    } catch (err) {
      console.error("Error fetching Seo Data:", err);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch(URI + "/admin/states", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch States.");
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${URI}/admin/cities/${formData?.state}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch cities.");
      const data = await response.json();
      setCities(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const skipKeys = [
    "businessSector",
    "businessCategory",
    "businessExperienceYears",
    "businessExperienceMonths",
    "businessOtherIncome",
    "panImage",
    "aadhaarFrontImage",
    "aadhaarBackImage",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user?.id) {
      setShowLogin(true);
    }

    for (const [key, value] of Object.entries(formData)) {
      if (skipKeys.includes(key)) continue;
      if (value === "" || value === null || value === undefined) {
        alert(`Please fill ${key.replace(/([A-Z])/g, " $1")}`);
        setLoading(false);
        return;
      }
    }

    if (!formData.panImage) {
      alert("PAN image is required");
      setLoading(false);
      return;
    }

    if (!formData.aadhaarFrontImage || !formData.aadhaarBackImage) {
      alert("Both Aadhaar Front and Back images are required");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "panImage" &&
          key !== "aadhaarFrontImage" &&
          key !== "aadhaarBackImage"
        ) {
          data.append(key, value);
        }
      });
      data.append("panImage", formData.panImage);
      data.append("aadhaarFrontImage", formData.aadhaarFrontImage);
      data.append("aadhaarBackImage", formData.aadhaarBackImage);

      const response = await fetch(`${URI}/user/emi/check-eligibility`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      if (!response.ok) throw new Error("Submit failed");

      setSuccessScreen({
        show: true,
        label: "Thank You For Submit!",
        description: "Our Representative will call you shortly",
      });

      setTimeout(() => navigate(-1), 1000);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state !== "") {
      fetchCities();
    }
  }, [formData.state]);

  return (
    <>
      <SEO
        title="Apply for Home Loan Online in India | Secure Process by Reparv"
        description="Start your home loan application online with Reparv. Simple 3-step process, secure verification, fast approval support and complete transparency from start to finish."
      />
      <section className="min-h-screen bg-[#FAF8FF] lg:bg-white">
        {/* Back Navigation */}
        <div className="lg:hidden w-full h-[40px] sm:h-[50px] flex items-center gap-4 px-4 py-2 my-2 sm:my-4 rounded-lg bg-white">
          <FaArrowLeft onClick={() => navigate(-1)} className="w-5 h-5" />
          <span className="w-full text-base sm:text-lg font-bold text-center">
            Home Loan Application
          </span>
        </div>

        {/* HERO (desktop only) */}
        <div className="hidden lg:grid w-full max-w-[1440px] h-[550px] pb-[50px] mx-auto relative lg:mb-5 grid-cols-2 overflow-hidden rounded-br-4xl rounded-bl-4xl bg-gradient-to-br from-[#8A38F5] via-[#6B21D8] to-[#3B0764] text-white">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-500/30 blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          <div className="relative z-10 w-full flex items-end justify-center pl-10">
            <img src={leftImage} alt="image" className="w-[400px]" />
          </div>
          <div className="relative z-10 w-full flex items-end justify-center pr-10 pb-10">
            <div className="w-full flex flex-col">
              <h1 className="text-6xl xl:text-7xl font-extrabold mb-4 leading-tight">
                Turn Your Dream
              </h1>
              <h1 className="text-6xl xl:text-7xl font-extrabold mb-6 leading-tight">
                Home Into Reality
              </h1>
              <p className="opacity-90 text-2xl">
                Complete your application in 3 easy steps
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="max-w-[1380px] mx-auto sm:p-4 grid lg:grid-cols-2 gap-10 bg-[#FAF8FF] sm:bg-white mb-5 sm:mb-10">
          {/* LEFT INFO (desktop) */}
          <div className="hidden lg:block">
            <WhyWeNeedThis />
            <div>
              <AdvertisementCard variant="sidebar" />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-1 bg-[#FAF8FF] rounded-3xl shadow-xl p-4 sm:p-6">
            {/* Step Indicator */}
            <StepIndicator step={step} />

            {/* Job / Business Tab — shown only on step 2 */}
            {step === 2 && (
              <div className="w-full flex items-center justify-center mb-4">
                <div className="w-full flex items-center p-1.5 bg-white rounded-2xl border border-[#E8E8E8] shadow-sm gap-2">
                  {[
                    { key: "Job", label: "Job", Icon: BiBriefcase },
                    { key: "Business", label: "Business", Icon: BiBuildings },
                  ].map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setIncomeType(key)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all
                        ${
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

            {/* STEP CONTENT */}
            {step === 1 && (
              <Step1Personal
                formData={formData}
                setFormData={setFormData}
                states={states}
                cities={cities}
                fieldRefs={fieldRefs}
              />
            )}

            {step === 2 && (
              <Step2Income
                formData={formData}
                setFormData={setFormData}
                fieldRefs={fieldRefs}
                incomeType={incomeType}
                setIncomeType={setIncomeType}
              />
            )}

            {step === 3 && (
              <Step3Documents
                formData={formData}
                setFormData={setFormData}
                fieldRefs={fieldRefs}
              />
            )}

            {/* ACTIONS */}
            <div className="flex justify-between my-5 mt-5 sm:mt-6 gap-3">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className="px-4 sm:px-6 py-2.5 text-sm sm:text-base border border-gray-300 rounded-xl disabled:opacity-40 font-medium"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={(e) => {
                  if (!validateStep()) return;
                  if (step === 3) {
                    handleSubmit(e);
                  } else {
                    next();
                  }
                }}
                className="flex-1 px-4 sm:px-8 py-2.5 text-sm sm:text-base bg-[#8A38F5] text-white rounded-xl font-bold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-purple-200"
              >
                {step === 3 ? "Submit" : "Continue to next Step →"}
              </button>
            </div>

            {/* Security note on mobile */}
            {step !== 2 && (
              <p className="text-center text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                <span>🔒</span> Your information is secure and encrypted
              </p>
            )}
          </div>
        </div>

        <Suspense
          fallback={<div className="text-center">Loading steps...</div>}
        >
          <BlogSection heading={"Home Loan Guide"} />
        </Suspense>

        <Suspense
          fallback={<div className="text-center">Loading steps...</div>}
        >
          <FAQSection location={"Reparv Home Loan Application Page"} />
        </Suspense>
      </section>
    </>
  );
}

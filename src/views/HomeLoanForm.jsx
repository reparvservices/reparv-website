"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import Loader from "../components/Loader";
import { useAuth } from "../store/auth";

import { FiSearch } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import StepIndicator from "../components/homeLoanPage/StepIndicator";
import Step1Personal from "../components/homeLoanPage/Step1Personal";
import Step2Income from "../components/homeLoanPage/Step2Income";
import Step3Documents from "../components/homeLoanPage/Step3Documents";
import WhyWeNeedThis from "../components/homeLoanPage/WhyWeNeedThis";
import leftImage from "../assets/homeLoan/leftImage.svg";
import SEO from "../components/SEO";

const BlogSection = lazy(() => import("../components/BlogSection"));
const FAQSection = lazy(() => import("../components/FAQSection"));

export default function HomeLoanForm() {
  const router = useRouter();
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

  const [activeTab, setActiveTab] = useState("Job");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  //EMI Form Data
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

        // 🔔 Show custom alert
        setShowAlert({
          show: true,
          type: "warning", // success | error | info | warning
          title: "",
          message: `Please fill ${field.replace(/([A-Z])/g, " $1")}`,
        });

        // 📍 Scroll to field
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });

          // 🧠 Focus input (delay helps on mobile)
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
        console.log(data);
        setSeoData(data);
      } catch (err) {
        console.error("Error fetching Seo Data:", err);
      }
    };
  
    useEffect(() => {
      fetchSeoData();
    }, []);

  // **Fetch States from API**
  const fetchStates = async () => {
    try {
      const response = await fetch(URI + "/admin/states", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch States.");
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // **Fetch States from API**
  const fetchCities = async () => {
    try {
      const response = await fetch(`${URI}/admin/cities/${formData?.state}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cities.");
      const data = await response.json();
      console.log(data);
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

    // 1 Validate all text / number fields
    for (const [key, value] of Object.entries(formData)) {
      if (skipKeys.includes(key)) continue;

      if (value === "" || value === null || value === undefined) {
        alert(`Please fill ${key.replace(/([A-Z])/g, " $1")}`);
        setLoading(false);
        return;
      }
    }

    // 2 Validate PAN image
    if (!formData.panImage) {
      alert("PAN image is required");
      setLoading(false);
      return;
    }

    // 3 Validate Aadhaar images
    if (!formData.aadhaarFrontImage || !formData.aadhaarBackImage) {
      alert("Both Aadhaar Front and Back images are required");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      // append normal fields
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "panImage" &&
          key !== "aadhaarFrontImage" &&
          key !== "aadhaarBackImage"
        ) {
          data.append(key, value);
        }
      });

      // append images
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

      setTimeout(() => router.back(), 1000);
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
    if (formData.state != "") {
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
        {/* Back Navigation Section */}
        <div className="lg:hidden w-full h-[40px] sm:h-[50px] flex items-center gap-4 px-4 py-2 my-2 sm:my-4 rounded-lg bg-white">
          <FaArrowLeft
            onClick={() => {
              router.back();
            }}
            className="w-5 h-5"
          />
          <span className="w-full text-base sm:text-lg font-bold text-center">
            Home Loan Application
          </span>
        </div>
        {/* HERO */}
        <div
          className="hidden lg:grid w-full max-w-[1440px] h-[550px] pb-[50px] mx-auto relative lg:mb-5 grid-cols-2 overflow-hidden
          rounded-br-4xl rounded-bl-4xl bg-gradient-to-br from-[#8A38F5] via-[#6B21D8] to-[#3B0764] text-white"
        >
          {/* Glow */}
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full 
                bg-purple-500/30 blur-[120px]"
          />

          {/* Dark diagonal overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

          {/* LEFT IMAGE */}
          <div className="relative z-10 w-full flex items-end justify-center pl-10">
            <img src={leftImage} alt="image" className="w-[400px]" />
          </div>

          {/* RIGHT CONTENT */}
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
          {/* LEFT INFO (STATIC) */}
          <div className="hidden lg:block">
            <WhyWeNeedThis />
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-1 bg-[#FAF8FF] rounded-3xl shadow-xl p-4 sm:p-6">
            <StepIndicator step={step} />

            {/* Income Type */}
            <div className="w-full flex items-center justify-center my-4 sm:my-8">
              <div className="w-full max-w-[340px] flex items-center justify-center gap-4 p-2 bg-white rounded-xl">
                {["Job", "Business"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setIncomeType(type)}
                    className={`max-w-[150px] flex-1 py-2 rounded-lg font-semibold
                  ${
                    incomeType === type
                      ? "bg-[#8A38F5] text-white"
                      : " text-black"
                  }`}
                  >
                    {type === "Job" ? "Job" : "Business"}
                  </button>
                ))}
              </div>
            </div>

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
              />
            )}

            {step === 3 && (
              <Step3Documents
                formData={formData}
                setFormData={setFormData}
                fieldRefs={fieldRefs}
              />
            )}

            {/*incomeType === "Business" && (
              <div className="h-40 flex items-center justify-center text-gray-400">
                Business Flow – Empty (as requested)
              </div>
            )*/}

            {/* ACTIONS */}
            <div className="flex justify-between my-5 mt-5 sm:mt-10">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className="px-4 sm:px-6 py-2 text-sm sm:text-base border rounded-lg disabled:opacity-40"
              >
                ← Back
              </button>

              <button
                type="button"
                //disabled={!isStepValid()}
                onClick={(e) => {
                  if (!validateStep()) return;

                  if (step === 3) {
                    handleSubmit(e);
                  } else {
                    next();
                  }
                }}
                className="min-w-[120px] px-4 sm:px-8 py-2 text-sm sm:text-base bg-[#8A38F5] text-white rounded-lg font-semibold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 3 ? "Submit" : "Continue to next Step →"}
              </button>
            </div>
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

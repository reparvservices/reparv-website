import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";
import { getImageURI } from "../../utils/helper";
import OtpSection from "../OTPSection";

export default function SiteVisitPopup({ projectPartner }) {
  const router = useRouter();
  const {
    URI,
    user,
    setLoading,
    propertyId,
    setShowSiteVisitPopup,
    propertyCategory,
    propertyImage,
    successScreen,
    setSuccessScreen,
  } = useAuth();
  //const { id } = useParams();
  const pathname = usePathname();
  const [property, setProperty] = useState({});
  const [minBudget, setMinBudget] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const rentMinBudgetOptions = [
    5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000,
  ];
  const rentMaxBudgetOptions = [
    10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000, 125000,
  ];

  const saleMinBudgetOptions = [
    1000000, 2500000, 5000000, 7500000, 10000000, 20000000, 30000000, 40000000,
  ];
  const saleMaxBudgetOptions = [
    2500000, 5000000, 7500000, 10000000, 20000000, 30000000, 40000000, 50000000,
  ];

  const isRental = [
    "RentalFlat",
    "RentalPlot",
    "RentalShop",
    "RentalOffice",
  ].includes(propertyCategory);

  const minOptions = isRental ? rentMinBudgetOptions : saleMinBudgetOptions;
  const maxOptions = isRental ? rentMaxBudgetOptions : saleMaxBudgetOptions;

  //Inquiry Form Data
  const [formData, setFormData] = useState({
    propertyid: propertyId,
    fullname: "",
    phone: "",
    state: "",
    city: "",
    minbudget: minBudget,
    maxbudget: maxBudget,
    source: "Landing Page",
  });

  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const isSameUserNumber =
    user?.contact && formData.phone && user.contact === formData.phone;

  const getBudgetByPrice = (price, minArr, maxArr) => {
    if (!price) return { min: "", max: "" };

    const min = minArr.find((v) => v >= price) || minArr[minArr.length - 1];
    const max = maxArr.find((v) => v > min) || maxArr[maxArr.length - 1];

    return { min, max };
  };

  const fetchPropertyInfo = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/properties/get/${propertyId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setProperty(data);

      // Auto budget logic
      const price = parseInt(data.totalOfferPrice);
      const { min, max } = getBudgetByPrice(price, minOptions, maxOptions);

      setMinBudget(min);
      setMaxBudget(max);

      // also update form
      setFormData((prev) => ({
        ...prev,
        minbudget: min,
        maxbudget: max,
      }));
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  const sendOtp = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      setOtpLoading(true);
      const res = await fetch(`${URI}/frontend/otp/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      if (!res.ok) throw new Error("OTP send failed");
      alert("OTP sent successfully");
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    try {
      setOtpLoading(true);
      const res = await fetch(`${URI}/frontend/otp/verify`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "OTP failed");

      setOtpVerified(true);
      alert("OTP Verified Successfully");
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSameUserNumber && !otpVerified) {
      alert("Please verify OTP before submitting");
      return;
    }

    setLoading(true);
    // Contact number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      const response = await fetch(`${URI}/frontend/enquiry/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        router.push("/thank-you");
        setSuccessScreen({
          show: true,
          label: "Thank You!",
          description: "Our representative will get in touch with you soon!",
        });
        setShowSiteVisitPopup(false);
      }

      // Clear form after success
      setFormData({
        ...formData,
        propertyid: null,
        fullname: "",
        phone: "",
        state: "",
        city: "",
        minbudget: "",
        maxbudget: "",
        source: "",
      });
    } catch (err) {
      console.error("Error Booking Property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSameUserNumber) {
      setOtpVerified(true);
    } else {
      setOtpVerified(false);
    }
  }, [isSameUserNumber, formData.phone]);

  useEffect(() => {
    fetchPropertyInfo();
  }, [propertyId]);

  useEffect(() => {
    if (property?.state && property?.city) {
      setFormData((prev) => ({
        ...prev,
        state: property?.state || "",
        city: property?.city || "",
      }));
    }
  }, [property]);

  return (
    <div className="w-full max-w-[500px] relative flex flex-col md:flex-row bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl overflow-hidden shadow-xl ">
      {/* Form Section */}
      <div className="w-full flex flex-col gap-3 justify-center p-6 relative">
        {/* Close Button */}
        <div className={`w-full flex items-center justify-between mb-2`}>
          <h3
            className={`${
              projectPartner?.businessLogo ? "hidden" : "block"
            } text-lg font-semibold text-[#111827]`}
          >
            Contact Us
          </h3>
          <img
            src={getImageURI(projectPartner?.businessLogo)}
            alt="Reparv Logo"
            loading="lazy"
            className={`${
              projectPartner?.businessLogo ? "block" : "hidden"
            } h-8`}
          />
          <RxCross2
            onClick={() => {
              setShowSiteVisitPopup(false);
            }}
            className="w-6 h-6 text-xl text-right text-black cursor-pointer hover:text-[#5E23DC] active:scale-95"
          />
        </div>
        <h3
          className={`${
            projectPartner?.businessLogo ? "block" : "hidden"
          } text-lg font-semibold text-[#111827]`}
        >
          Contact Us
        </h3>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-1 gap-3 ">
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullName"
                minLength={3}
                onKeyDown={(e) => {
                  if (!/^[a-zA-Z\s]$/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
                placeholder="Enter Full Name"
                value={formData.fullname}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setFormData({ ...formData, fullname: value });
                }}
                className="w-full font-medium p-3 border border-[#00000033] placeholder:text-[#000000bf] rounded-md focus:outline-0"
                required
              />
            </div>
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Enter Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                minLength={10}
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    // Allows only up to 10 digits
                    setFormData({ ...formData, phone: input });
                  }
                }}
                className="w-full font-medium p-3 border border-[#00000033] placeholder:text-[#000000bf] rounded-md focus:outline-0"
                required
              />
            </div>

            {!isSameUserNumber && (
              <OtpSection
                phone={formData.phone}
                onSendOtp={sendOtp}
                onVerifyOtp={verifyOtp}
                loading={otpLoading}
              />
            )}

            {isSameUserNumber && (
              <p className="text-xs text-green-600 text-center">
                ✔ Verified via logged-in number
              </p>
            )}
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              disabled={!isSameUserNumber && !otpVerified}
              className={`w-full sm:w-1/2 py-2 rounded-md transition cursor-pointer ${
                isSameUserNumber || otpVerified
                  ? "bg-[#5E23DC] text-white hover:scale-105"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Book Site Visit Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import localPropertyImage from "../../assets/property/propertyPicture.svg";
import reparvLogo from "../../assets/reparvLogo.svg";
import { useAuth } from "../../store/auth";
import Loader from "../Loader";
import OtpSection from "../OTPSection";
export default function SiteVisitPopup() {
  const router = useRouter();
  const {
    URI,
    user,
    setLoading,
    enquirySource,
    setShowSiteVisitPopup,
    propertyId,
    propertyCategory,
    propertyImage,
    successScreen,
    setSuccessScreen,
  } = useAuth();

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

  const [formData, setFormData] = useState({
    propertyid: propertyId,
    fullname: user?.fullname || "",
    phone: user?.contact || "",
    state: "",
    city: "",
    minbudget: minBudget,
    maxbudget: maxBudget,
    source: enquirySource,
  });

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

  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [formError, setFormError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpError, setOtpError] = useState(false);

  const isSameUserNumber =
    user?.contact && formData.phone && user.contact === formData.phone;

  const sendOtp = async () => {
    try {
      setOtpLoading(true);
      setOtpMessage("");
      setOtpError(false);

      const res = await fetch(`${URI}/api/user/otp/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      if (!res.ok) throw new Error();

      setOtpMessage("OTP sent successfully");
      setOtpError(false);
      return true;
    } catch {
      setOtpMessage("Failed to send OTP");
      setOtpError(true);
      return false;
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    try {
      setOtpLoading(true);
      setOtpMessage("");
      setOtpError(false);

      const res = await fetch(`${URI}/api/user/otp/verify`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Invalid OTP");
      }

      setOtpVerified(true);
      setOtpMessage("OTP verified successfully");
      setOtpError(false);
      return true;
    } catch (err) {
      setOtpMessage(err.message || "Invalid OTP");
      setOtpError(true);
      return false;
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(formData.phone)) {
      setFormError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!isSameUserNumber && !otpVerified) {
      setFormError("Please verify OTP first");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const response = await fetch(`${URI}/frontend/enquiry/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit enquiry");
      }
      router.push("/thank-you");
      setSuccessScreen({
        show: true,
        label: "Thank You For Registering!",
        description: "Our Representative will call you shortly",
      });

      setShowSiteVisitPopup(false);

      // Reset form safely
      setFormData({
        propertyid: propertyId,
        fullname: user?.fullname || "",
        phone: user?.contact || "",
        state: "",
        city: "",
        minbudget: "",
        maxbudget: "",
        source: enquirySource,
      });
    } catch (err) {
      console.error("Error Booking Property:", err);
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!otpMessage) return;

    const timer = setTimeout(() => {
      setOtpMessage("");
      setOtpError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [otpMessage]);

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

  useEffect(() => {
    setOtpVerified(isSameUserNumber);
  }, [isSameUserNumber, formData.phone]);

  useEffect(() => {
    // When phone changes:
    if (!isSameUserNumber) {
      setOtpVerified(false); // force re-verify
    }
  }, [formData.phone]);

  return (
    <div className="w-full md:max-w-[450px] relative flex flex-col md:flex-row bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl overflow-hidden shadow-xl ">
      <div className="w-full flex flex-col gap-3 justify-center p-6 relative">
        <div className="w-full flex items-center justify-between">
          <img src={reparvLogo} alt="Reparv Logo" className="h-8" />
          <RxCross2
            onClick={() => setShowSiteVisitPopup(false)}
            className="w-5 h-5 text-xl text-right rounded-full bg-[#FAFAFA] text-black cursor-pointer hover:text-[#076300] active:scale-95"
          />
        </div>

        <h2 className="text-base font-semibold">
          Conveniently Book a Property Visit
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-1 gap-3 ">
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
              <label className="ml-1 text-xs">Full Name</label>
              <input
                type="text"
                value={formData.fullname}
                placeholder="Enter Full Name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullname: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                  })
                }
                className="w-full font-medium p-3 border border-[#00000033] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
              <label className="ml-1 text-xs">Enter Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                placeholder="Enter Phone Number"
                onChange={(e) => {
                  if (/^\d{0,10}$/.test(e.target.value)) {
                    setFormData({ ...formData, phone: e.target.value });
                  }
                }}
                className="w-full font-medium p-3 border border-[#00000033] rounded-md"
              />
            </div>

            {!isSameUserNumber && !otpVerified && (
              <OtpSection
                phone={formData.phone}
                onSendOtp={sendOtp}
                onVerifyOtp={verifyOtp}
                loading={otpLoading}
                message={otpMessage}
                isError={otpError}
              />
            )}
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              disabled={!isSameUserNumber && !otpVerified}
              className={`w-full sm:w-1/2 bg-[#5E23DC] text-white py-2 rounded-md hover:scale-105 disabled:scale-100 active:scale-100 transition disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              Book Site Visit Now
            </button>
          </div>

          {formError && (
            <p className="text-xs text-center text-red-600 mt-2">{formError}</p>
          )}

          <p className="text-xs text-center mt-2 text-[#00000066]">
            By registering, you’ll get a call from our agent.
          </p>
        </form>
      </div>
    </div>
  );
}

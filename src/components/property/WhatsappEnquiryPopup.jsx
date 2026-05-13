import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";;
import { addVisitor } from "../../utils/analytics";

export default function WhatsappEnquiryPopup({ property }) {
  const {
    URI,
    selectedCity,
    setLoading,
    showWhatsappEnquiryPopup,
    setShowWhatsappEnquiryPopup,
    successScreen,
    setSuccessScreen,
  } = useAuth();

  //Inquiry Form Data
  const [formData, setFormData] = useState({
    propertyid: property?.propertyid,
    projectpartnerid: property?.projectpartnerid,
    type: "",
    category: "",
    contact: "",
  });

  const propertyTypes = [
    "NewFlat",
    "NewPlot",
    "NewShop",
    "RentalFlat",
    "RentalShop",
    "RentalOffice",
    "Resale",
    "RowHouse",
    "Lease",
    "FarmLand",
    "FarmHouse",
    "CommercialFlat",
    "CommercialPlot",
    "IndustrialSpace",
  ];

  const WHATSAPP_NUMBER =
    "91" +
    (property?.projectPartnerContact ||
      property?.guestUserContact ||
      "8010881965");

  const handleWhatsAppClick = () => {
    // Track WhatsApp enquiry
    if (property?.propertyid) {
      addVisitor({
        URI,
        propertyid: property.propertyid,
        source: "whatsapp",
      });
    }

    // WhatsApp redirect
    const defaultMessage =
      "I am looking to purchase a property in " + (selectedCity || "");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // Contact number validation
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.contact)) {
        alert("Please enter a valid 10-digit mobile number");
        return;
      }
      const response = await fetch(`${URI}/admin/whatsapp-enquirers/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save enquiry. Status: ${response.status}`);
      } else {
        setShowWhatsappEnquiryPopup(false);
        handleWhatsAppClick();
      }
      // Clear form after success
      setFormData({
        ...formData,
        propertyid: property?.propertyid,
        projectpartnerid: property?.projectpartnerid,
        type: "",
        category: "",
        contact: "",
      });
    } catch (err) {
      console.error("Error Sending Enquiry:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[750px] max-h-[70vh] relative flex flex-col md:flex-row bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl overflow-hidden shadow-xl pb-10 md:pb-2">
      {/* Form Section */}
      <div className="w-full flex flex-col gap-3 justify-center p-6 relative">
        {/* Close Button */}
        <div className={`w-full flex items-center justify-between mb-2`}>
          <img src="/assets/property/reparvLogo.svg" alt={"reparv logo"} className={`h-10`} />
          <RxCross2
            onClick={() => {
              setShowWhatsappEnquiryPopup(false);
              setFormData({
                ...formData,
                propertyid: property?.propertyid,
                projectpartnerid: property?.projectpartnerid,
                type: "",
                category: "",
                contact: "",
              });
            }}
            className="w-6 h-6 text-xl text-right text-black cursor-pointer hover:text-[#5E23DC] active:scale-95"
          />
        </div>
        <h3 className={`text-lg font-semibold text-[#111827]`}>
          Fill Empty Fields
        </h3>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf]">
              <label htmlFor="propertyCategory" className="ml-1 text-xs">
                Property Category
              </label>

              <select
                id="propertyCategory"
                name="propertyCategory"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full font-medium p-3 border border-[#00000033] bg-white text-[#000000bf] rounded-md focus:ring-2 focus:ring-[#5E23DC] focus:outline-none appearance-none"
                required
              >
                <option value="" disabled>
                  Select Property Category
                </option>
                <option value="Sell Old Property">Sell Old Property</option>
                <option value="Buy New Property">Buy New Property</option>
                <option value="Rent Property">Rent Property</option>
                <option value="Buy Resale Property">Buy Resale Property</option>
              </select>
            </div>

            {/* Select Type */}
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf]">
              <label htmlFor="propertyType" className="ml-1 text-xs">
                Select Type
              </label>

              <select
                name="propertyType"
                id="propertyType"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full font-medium p-3 border border-[#00000033] rounded-md
               focus:ring-2 focus:ring-[#5E23DC] appearance-none focus:outline-none
               bg-white"
                required
              >
                <option value="">Select Type</option>

                {propertyTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 col-span-1 md:col-span-2 text-sm font-semibold text-[#000000bf] ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Enter Contact Number
              </label>
              <input
                type="text"
                required
                minLength={10}
                maxLength={10}
                name="contact"
                id="contact"
                placeholder="Enter Contact Number"
                value={formData.contact}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    // Allows only up to 10 digits
                    setFormData({ ...formData, contact: input });
                  }
                }}
                className="w-full font-medium p-3 border border-[#00000033] placeholder:text-[#000000bf] rounded-md focus:ring-2 focus:ring-[#5E23DC] focus:outline-none "
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-[#5E23DC] text-white font-semibold py-2 rounded-md hover:scale-105 active:scale-100 transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

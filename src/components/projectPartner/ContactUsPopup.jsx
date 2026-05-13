import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";
import { getImageURI } from "../../utils/helper";
export default function ContactUsPopup({ projectPartner }) {
  const {
    URI,
    user,
    setLoading,
    setIsContactOpen,
    successScreen,
    setSuccessScreen,
  } = useAuth();

  //Inquiry Form Data
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    contact: user?.contact || "",
    message: "",
  });

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
      const response = await fetch(
        `${URI}/frontend/project-partner/message/add/${projectPartner?.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to save message. Status: ${response.status}`);
      } else {
        setSuccessScreen({
          show: true,
          label: "Thank You!",
          description: "Our representative will get in touch with you soon!",
        });
        setIsContactOpen(false);
      }

      // Clear form after success
      setFormData({
        ...formData,
        fullname: user?.fullname || "",
        contact: user?.contact || "",
        message: "",
      });
    } catch (err) {
      console.error("Error Sending Message:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-[750px] relative flex flex-col md:flex-row bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl overflow-hidden shadow-xl ">
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
            className={`${
              projectPartner?.businessLogo ? "block" : "hidden"
            } h-8`}
          />
          <RxCross2
            onClick={() => {
              setIsContactOpen(false);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullName"
                placeholder="Enter Full Name"
                value={formData.fullname}
                onChange={(e) => {
                  setFormData({ ...formData, fullname: e.target.value });
                }}
                className="w-full font-medium p-3 border border-[#00000033] placeholder:text-[#000000bf] rounded-md focus:ring-2 focus:ring-[#5E23DC] focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Enter Contact Number
              </label>
              <input
                type="text"
                required
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
                className="w-full font-medium p-3 border border-[#00000033] placeholder:text-[#000000bf] rounded-md focus:ring-2 focus:ring-[#5E23DC] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] col-span-1 md:col-span-2 ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Enter Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                }}
                rows={4}
                placeholder="Tell us briefly about your query"
                className={`rounded-lg font-medium border border-[#00000033] placeholder:text-[#000000bf] text-[#000000bf] px-3 py-2 resize-y focus:ring-2 focus:ring-[#5E23DC] focus:outline-none `}
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

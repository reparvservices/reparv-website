import React from "react";
import { FaPhoneAlt, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import whatsappIcon from "../../assets/projectPartner/whatsapp.png";
import approvedIcon from "../../assets/property/approvedIcon.svg";
import assuredIcon from "../../assets/property/assuredIcon.svg";
import directionIcon from "../../assets/property/directionIcon.svg";
import { useAuth } from "../../store/auth";
import FormatPrice from "../FormatPrice";
import { IoMdDoneAll } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addVisitor } from "../../utils/analytics";
import { PiMapPinAreaBold } from "react-icons/pi";

const PropertyBookingCard = ({ propertyInfo }) => {
  const navigate = useNavigate();
  const {
    URI,
    user,
    priceSummery,
    setPriceSummery,
    setShowLogin,
    setShowPriceSummery,
    selectedCity,
    setShowBenefitsPopup,
    setShowSiteVisitPopup,
    setPropertyImage,
    setPropertyCategory,
    setPropertyId,
    setShowCallEnquiryPopup,
    setShowWhatsappEnquiryPopup,
  } = useAuth();

  const WHATSAPP_NUMBER =
    "91" +
    (propertyInfo?.projectPartnerContact ||
      propertyInfo?.guestUserContact ||
      "8010881965");

  const handleWhatsAppClick = () => {
    // Track WhatsApp enquiry
    if (propertyInfo?.propertyid) {
      addVisitor({
        URI,
        propertyid: propertyInfo.propertyid,
        source: "whatsapp",
      });
    }

    // WhatsApp redirect
    const defaultMessage = `Hello 👋
I found this property on Reparv and I'm interested.
Property: ${propertyInfo?.propertyName}
Property Link: https://www.reparv.in/property-info/${propertyInfo?.seoSlug}

Please share more details and site visit availability.

Enquiry via Reparv – www.reparv.in`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      defaultMessage,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`w-full max-w-[460px] md:max-h-[80vh] overflow-scroll scrollbar-hide flex flex-col gap-4 bg-white rounded-xl p-2 py-6 pb-8`}
    >
      {/* Title */}
      <div>
        <h2 className="text-lg sm:text-2xl font-bold px-2 sm:px-4 mb-1">
          {propertyInfo.propertyName}
        </h2>
        <h2 className="text-xs px-2 sm:px-4 font-medium">
          Project by: {propertyInfo.projectBy}
        </h2>
      </div>

      {/* Flat/Plot Count */}
      {(propertyInfo?.availableCount > 0 || propertyInfo?.bookedCount > 0) && (
        <div
          className={`${
            ["NewFlat", "NewPlot", "CommercialFlat", "CommercialPlot"].includes(
              propertyInfo.propertyCategory,
            )
              ? "flex"
              : "hidden"
          } px-2 sm:px-4 flex flex-wrap gap-4 text-sm md:text-base font-medium text-[#00092966] group-hover:text-[#e2e2e2] mt-1`}
        >
          <div
            className={`py-[6px] sm:py-[8px] px-4 sm:px-6 flex gap-2 items-center justify-center text-[#8A38F5] bg-[#FAF8FF] font-bold rounded-xl`}
          >
            <span>Available</span>
            <div className="flex items-center justify-center text-xs md:text-sm py-[2px] px-2 bg-white rounded-lg">
              {propertyInfo.availableCount}
            </div>
          </div>

          <div
            className={`py-[6px] sm:py-[8px] px-4 sm:px-6 flex gap-2 items-center justify-center text-[#FF0000] bg-[#FFF4F2] font-bold rounded-xl`}
          >
            <span>Booked </span>
            <div className="flex items-center justify-center text-xs md:text-sm py-[2px] px-2 bg-white rounded-lg">
              {propertyInfo.bookedCount}
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="px-2 sm:px-4 grid grid-cols-2 gap-3 text-[11px] md:text-xs font-medium text-[#00092966] group-hover:text-[#e2e2e2]">
        {propertyInfo.propertyApprovedBy && (
          <div
            className={`${
              propertyInfo.propertyCategory === "FarmLand" ? "hidden" : "flex"
            } h-[40px] gap-2 items-center justify-center text-[#8A38F5] bg-[#FAF8FF] rounded-4xl `}
          >
            <img
              src={approvedIcon}
              alt="Approved Icon"
              loading="lazy"
              className="w-5 object-cover"
            />
            <span>{propertyInfo.propertyApprovedBy + " Approved"}</span>
          </div>
        )}

        {propertyInfo.distanceFromCityCenter && (
          <div
            className={`flex h-[40px] gap-2 items-center justify-center text-[#8A38F5] bg-[#FAF8FF] rounded-4xl `}
          >
            <img
              src={directionIcon}
              alt="Approved Icon"
              loading="lazy"
              className="w-4 object-cover"
            />
            <span>{propertyInfo.distanceFromCityCenter + "KM from City"}</span>
          </div>
        )}

        <div
          className={`${
            ["NewFlat", "NewPlot"].includes(propertyInfo.propertyCategory)
              ? "flex"
              : "hidden"
          } h-[40px] gap-2 flex-col items-center justify-center text-[#8A38F5] bg-[#FAF8FF] rounded-4xl `}
        >
          <div className="flex items-center gap-2">
            <IoMdDoneAll className="w-[17px] h-[17px]" />
            <div className="flex flex-col">
              <span>RERA Approved</span>
              <span className="text-red-500">{propertyInfo.reraRegistered}</span>
            </div>
          </div>
        </div>

        <div
          className={`flex h-[40px] gap-2 items-center justify-center text-[#8A38F5] bg-[#FAF8FF] rounded-4xl `}
        >
          <img
            src={assuredIcon}
            alt="Assured Icon"
            loading="lazy"
            className="w-4 object-cover"
          />
          <span>{"Assured Quality"}</span>
        </div>
      </div>

      {/* Address */}
      <div className="px-3 sm:px-4 flex items-center gap-2 text-[12px] sm:text-xs font-bold text-black">
        <PiMapPinAreaBold size={24} />
        {propertyInfo.address
          ? propertyInfo.address + ", "
          : "" + propertyInfo.state + " " + (propertyInfo.pincode || "")}
      </div>

      <div className="w-full h-[1px] bg-[#D9D9D9]" />
      <div className="w-full flex flex-col gap-4 px-2 sm:px-4 ">
        {/* EMI Box */}
        <div className="border border-[#0000001A] rounded-lg p-4 space-y-4">
          <div
            className={`${
              propertyInfo.propertyCategory === "RentalFlat" ||
              propertyInfo.propertyCategory === "RentalShop" ||
              propertyInfo.propertyCategory === "RentalOffice" ||
              propertyInfo.loanAvailability === "No"
                ? "hidden"
                : "flex"
            } items-center justify-between`}
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm text-[#0b0b0b7b] ">
                EMI starts at
              </p>
              <p className="text-xl font-bold">
                <FormatPrice price={propertyInfo.emi} />{" "}
                <span className="text-base font-medium">/mo</span>
              </p>
            </div>
            <button
              onClick={() => {
                if (user?.id) {
                  navigate("/home-loan-application");
                } else {
                  setShowLogin(true);
                }
              }}
              className="flex items-center text-black text-xs sm:text-sm font-medium gap-1 hover:text-[#8A38F5] transition cursor-pointer"
            >
              Check eligibility{" "}
              <HiOutlineArrowNarrowRight className="text-xl font-normal" />
            </button>
          </div>

          <hr
            className={`${
              propertyInfo.propertyCategory === "RentalFlat" ||
              propertyInfo.propertyCategory === "RentalShop" ||
              propertyInfo.propertyCategory === "RentalOffice" ||
              propertyInfo.loanAvailability === "No"
                ? "hidden"
                : "flex"
            } text-[#0000001A] `}
          />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-base font-bold">
                <FormatPrice price={propertyInfo.totalOfferPrice} />
              </p>
              <p className="text-xs sm:text-sm text-gray-500">+Other Charged</p>
            </div>
            <button
              onClick={() => {
                setShowPriceSummery(true);
                setPriceSummery(propertyInfo);
                console.log(priceSummery);
              }}
              className="flex items-center text-xs sm:text-sm font-medium gap-1 hover:text-[#8A38F5] transition cursor-pointer"
            >
              Pricing Breakup{" "}
              <HiOutlineArrowNarrowRight className="text-xl font-normal" />
            </button>
          </div>
        </div>

        {/* Button */}
        <div className="w-full h-[40px] sm:h-[50px] flex gap-4 items-center justify-between text-gray-700">
          <div
            onClick={() => {
              if (propertyInfo?.propertyid) {
                addVisitor({
                  URI: URI,
                  propertyid: propertyInfo.propertyid,
                  source: "call",
                });
              }

              const phone =
                propertyInfo?.projectPartnerContact ||
                propertyInfo?.guestUserContact ||
                "8010881965";

              window.location.href = `tel:+91${phone}`;

              //setShowCallEnquiryPopup(true);
            }}
            className="w-full text-[#8A38F5] text-xs sm:text-base font-semibold flex items-center justify-center gap-2 border border-[#8A38F5] px-4 py-3 rounded-2xl"
          >
            {" "}
            <FaPhoneAlt className="text-sm sm:text-xl" />
            <span>Call Promoter</span>
          </div>

          <div
            onClick={() => {
              //setShowWhatsappEnquiryPopup(true);
              handleWhatsAppClick();
            }}
            className="w-full h-[40px] sm:h-[50px] text-[#8A38F5] text-xs sm:text-base font-semibold flex items-center justify-center gap-2 border border-[#8A38F5] px-4 py-3 rounded-2xl"
          >
            {" "}
            <img
              src={whatsappIcon}
              alt="WhatsApp Chat"
              loading="lazy"
              className="object-contain w-5 h-5 sm:w-7 sm:h-7 animate-pulse"
            />
            <span>Whatsapp</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            setShowSiteVisitPopup(true);
            setPropertyImage(JSON.parse(propertyInfo.frontView)[0]);
            setPropertyId(JSON.parse(propertyInfo.propertyid));
            setPropertyCategory(propertyInfo.propertyCategory);
          }}
          className="w-full h-[40px] sm:h-[50px] hidden sm:block bg-[#8A38F5] shadow-[0px_7px_13px_0px_#8A38F540] text-white font-bold py-3 rounded-xl text-base active:scale-95 cursor-pointer"
        >
          Book Site Visit Now
        </button>
        <h2 className="text-center text-[#868686] text-sm sm:text-base">
          Free site visit • No brokerage charges
        </h2>
      </div>
    </div>
  );
};

export default PropertyBookingCard;

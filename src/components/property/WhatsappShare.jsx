import React from "react";
import { useAuth } from "../../store/auth";
import { addVisitor } from "../../utils/analytics";

function WhatsappShare({ property }) {
  const { selectedCity, URI, setShowWhatsappEnquiryPopup } = useAuth();

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
    <div>
      <div
        onClick={() => {
          setShowWhatsappEnquiryPopup(true);
        }}
        className="w-full text-[#8A38F5] text-base font-semibold flex items-center justify-center gap-2 border border-[#8A38F5] px-4 py-3 rounded-2xl"
      >
        {" "}
        <img
          src="/assets/property/whatsapp.png"
          alt="WhatsApp Chat"
          className="object-contain w-6 h-6 animate-pulse"
        />
        <span>Whatsapp</span>
      </div>
    </div>
  );
}

export default WhatsappShare;

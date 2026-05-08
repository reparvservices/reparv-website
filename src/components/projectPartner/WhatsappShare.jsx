import { useParams } from "next/navigation";
import React from "react";
import whatsappIcon from "../../assets/projectPartner/whatsapp.png";
import { useAuth } from "../../store/auth";

function WhatsappShare({ projectPartner }) {
  const { contact } = useParams();
  const {selectedCity} = useAuth();
  const WHATSAPP_NUMBER = "91" + contact;

  const handleWhatsAppClick = () => {
    const defaultMessage = "I am looking to purchase a property in " + (selectedCity || "");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="w-10 md:w-15 h-10 md:h-15 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/50 active:scale-95 transition transform hover:scale-110"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp Chat"
          className="object-contain w-10 md:w-25 h-10 md:h-15 a9nimate-pulse"
        />
      </button>
    </div>
  );
}

export default WhatsappShare;

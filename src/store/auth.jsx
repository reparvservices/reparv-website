"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /* ===================== AUTH ===================== */

  // Read accessToken from localStorage
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  let isLoggedIn = !!accessToken;

  const storeTokenInCookie = (token) => {
    Cookies.set("accessToken", token);
    setAccessToken(Cookies.get("accessToken"));
  };
  const delTokenInCookie = () => {
    setAccessToken();
    Cookies.remove("accessToken");
  };

  /* ===================== USER ===================== */

  const [user, setUser] = useState(null);

  /* ===================== UI / APP STATES ===================== */

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [propertySlug, setPropertySlug] = useState(null);
  const [propertyInfoId, setPropertyInfoId] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState("");
  const [enquirySource, setEnquirySource] = useState("Onsite");
  // Alert Message
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: "success", // success | error | info | warning
    title: "",
    message: "",
  });
  const [successScreen, setSuccessScreen] = useState({
    show: false,
    label: "Thank You For Registering!",
    description: "Our Representative will call you shortly",
  });
  const [priceSummery, setPriceSummery] = useState({});
  const [selectedCity, setSelectedCity] = useState("Nagpur");
  const [propertyImage, setPropertyImage] = useState("");
  const [propertyType, setPropertyType] = useState("properties");
  const [bhkType, setBhkType] = useState("2 BHK");
  const [propertySearch, setPropertySearch] = useState("");
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showPriceSummery, setShowPriceSummery] = useState(false);
  const [showBenefitsPopup, setShowBenefitsPopup] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showSiteVisitPopup, setShowSiteVisitPopup] = useState(false);
  const [showPlayVideo, setShowPlayVideo] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [showWingInfoPopup, setShowWingInfoPopup] = useState(false);
  const [showPlotInfoPopup, setShowPlotInfoPopup] = useState(false);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);
  const [showCallEnquiryPopup, setShowCallEnquiryPopup] = useState(false);
  const [showWhatsappEnquiryPopup, setShowWhatsappEnquiryPopup] =
    useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const [showAgreement, setShowAgreement] = useState(false);
  const [showEMIPopup, setShowEMIPopup] = useState(false);

  /* ===================== EFFECTS ===================== */
  const COMING_SOON_MODAL_KEY = "comingSoonModalLastDismissedAt";
  const COMING_SOON_MODAL_COOLDOWN_MS = 12 * 60 * 60 * 1000;

  useEffect(() => {
    const legacyClosed = localStorage.getItem("comingSoonModalClosed");
    const lastDismissedAt = localStorage.getItem(COMING_SOON_MODAL_KEY);

    if (!lastDismissedAt && legacyClosed === "true") {
      localStorage.setItem(COMING_SOON_MODAL_KEY, String(Date.now()));
      localStorage.removeItem("comingSoonModalClosed");
      return;
    }

    const shouldShow =
      !lastDismissedAt ||
      Date.now() - Number(lastDismissedAt) >= COMING_SOON_MODAL_COOLDOWN_MS;

    if (shouldShow) {
      setShowComingSoonModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowComingSoonModal(false);
    localStorage.setItem(COMING_SOON_MODAL_KEY, String(Date.now()));
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("guestUser");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setEnquirySource("Onsite");
    }, 60000);
  }, []);

  /* ===================== API BASE ===================== */

  //const URI = "https://api.reparv.in";
  const URI = "https://aws-api.reparv.in";
  //const URI = "http://localhost:3000";

  return (
    <AuthContext.Provider
      value={{
        /* auth */
        accessToken,
        isLoggedIn,
        storeTokenInCookie,
        delTokenInCookie,

        /* user */
        user,
        setUser,

        /* ui */
        isActive,
        setIsActive,
        showLogin,
        setShowLogin,
        showAgreement,
        setShowAgreement,
        loading,
        setLoading,

        /* property & others */
        propertyId,
        setPropertyId,
        propertySlug,
        setPropertySlug,
        enquirySource,
        setEnquirySource,
        propertyInfoId,
        setPropertyInfoId,
        propertyCategory,
        setPropertyCategory,
        showAlert,
        setShowAlert,
        successScreen,
        setSuccessScreen,
        priceSummery,
        setPriceSummery,
        propertyImage,
        setPropertyImage,
        propertyType,
        setPropertyType,
        bhkType,
        setBhkType,
        propertySearch,
        setPropertySearch,
        selectedCity,
        setSelectedCity,
        showInquiryForm,
        setShowInquiryForm,
        showFilterPopup,
        setShowFilterPopup,
        showPriceSummery,
        setShowPriceSummery,
        showBenefitsPopup,
        setShowBenefitsPopup,
        showSiteVisitPopup,
        setShowSiteVisitPopup,
        showPlayVideo,
        setShowPlayVideo,
        videoURL,
        setVideoURL,
        showWingInfoPopup,
        setShowWingInfoPopup,
        showPlotInfoPopup,
        setShowPlotInfoPopup,
        showCitySelector,
        setShowCitySelector,
        showSharePopup,
        setShowSharePopup,
        isContactOpen,
        setIsContactOpen,
        showEnquiryPopup,
        setShowEnquiryPopup,
        showCallEnquiryPopup,
        setShowCallEnquiryPopup,
        showWhatsappEnquiryPopup,
        setShowWhatsappEnquiryPopup,
        showEMIPopup,
        setShowEMIPopup,
        showComingSoonModal,
        setShowComingSoonModal,
        handleCloseModal,

        URI,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

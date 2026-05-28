"use client";

import { useState, useMemo, lazy, Suspense } from "react";
import { useAuth } from "../store/auth";
import { LayoutScrollContext } from "../context/LayoutScrollContext";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SuccessScreen from "../components/SuccessScreen";
import PriceSummery from "../components/property/PriceSummery";
import BenefitsPopup from "../components/property/BenefitsPopup";
import SiteVisitPopup from "../components/property/SiteVisitPopup";
import FilterSidebar from "../components/FilterSidebar";
import PlayVideo from "../components/property/PlayVideo";
import WingInfo from "../components/property/WingInfo";
import PlotInfo from "../components/property/PlotInfo";
import Share from "../components/property/Share";
import PlayYoutubeVideo from "../components/property/PlayYoutubeVideo";
import Login from "../components/user/Login";
import Agreement from "../components/user/Agreement";
import AlertMessage from "../components/AlertMessage";
import ComingSoonModal from "@/components/ComingSoonModal";

// lazy load
const CitySelector = lazy(() => import("../components/CitySelector"));

export default function SiteLayout({ children }) {
  const {
    showSuccess,
    URI,
    showLogin,
    setShowLogin,
    showAgreement,
    setShowAgreement,
    showAlert,
    successScreen,
    setSuccessScreen,
    selectedCity,
    setSelectedCity,
    showPriceSummery,
    setShowPriceSummery,
    showBenefitsPopup,
    setShowBenefitsPopup,
    showSiteVisitPopup,
    setShowSiteVisitPopup,
    showFilterPopup,
    setShowFilterPopup,
    showPlayVideo,
    setShowPlayVideo,
    showWingInfoPopup,
    setShowWingInfoPopup,
    showPlotInfoPopup,
    setShowPlotInfoPopup,
    showCitySelector,
    setShowCitySelector,
    showSharePopup,
    setShowSharePopup,
    propertyInformation,
    showComingSoonModal,
    setShowComingSoonModal,
    handleCloseModal,
  } = useAuth();

  const { ref: footerRef, inView: footerInView } = useInView({
    threshold: 0.1,
  });
  const [videoInView, setVideoInView] = useState(false);
  const [otherPropertiesInView, setOtherPropertiesInView] = useState(false);

  const isIntersecting = footerInView || videoInView;
  const isScrolling = footerInView || otherPropertiesInView;

  const scrollContext = useMemo(
    () => ({
      setVideoInView,
      isIntersecting,
      setOtherPropertiesInView,
      isScrolling,
    }),
    [isIntersecting, isScrolling],
  );

  return (
    <LayoutScrollContext.Provider value={scrollContext}>
      <div className="layout w-full flex flex-col bg-white overflow-hidden ">
        {/* Desktop Navbar And Mobile SideBar */}
        <Navbar />

        {/* container */}
        <div className="w-full pt-15 sm:pt-21! sm:bg-[#fafafa]">{children}</div>

        {/* footer */}
        <Footer footerRef={footerRef} />

        {/* Login Popup */}
        {showLogin && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0 sm:top-10">
              <Suspense
                fallback={
                  <div className="rounded-full bg-white px-15 py-4 text-2xl font-bold">
                    Loading...
                  </div>
                }
              >
                {" "}
                <Login />
              </Suspense>
            </div>
          </div>
        )}

        {/* City Selector Popup */}
        {showCitySelector && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0 sm:top-10">
              <Suspense
                fallback={
                  <div className="rounded-full bg-white px-15 py-4 text-2xl font-bold">
                    Loading...
                  </div>
                }
              >
                {" "}
                <CitySelector />
              </Suspense>
            </div>
          </div>
        )}

        {/* Show Book Site Form Screen */}
        {showSiteVisitPopup && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-end md:justify-center h-[90vh] absolute bottom-0">
              <SiteVisitPopup />
            </div>
          </div>
        )}

        {/* Show Book Site Form Screen */}
        {showAgreement && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-[1000] flex md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-end md:justify-center h-[90vh] absolute bottom-0">
              <Agreement />
            </div>
          </div>
        )}

        {/* Show Success Screen */}
        {showAlert?.show && <AlertMessage />}

        {/* Show Success Screen */}
        {successScreen?.show && <SuccessScreen />}

        {showPriceSummery && (
          <div
            onClick={() => {
              setShowPriceSummery(false);
            }}
            className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center"
          >
            <PriceSummery />
          </div>
        )}

        {showBenefitsPopup && (
          <div
            onClick={() => {
              setShowBenefitsPopup(false);
            }}
            className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center"
          >
            <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
              <BenefitsPopup />
            </div>
          </div>
        )}

        {showPlayVideo && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <PlayYoutubeVideo />
          </div>
        )}

        {showSharePopup && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <Share propertyData={propertyInformation} />
          </div>
        )}

        {showWingInfoPopup && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <WingInfo />
          </div>
        )}

        {showPlotInfoPopup && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <PlotInfo />
          </div>
        )}

        {showFilterPopup && (
          <div className="Container w-full h-screen bg-[#000000a2] fixed z-50 flex md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-end h-[90vh] absolute bottom-0">
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Show Coming Soon Screen */}
        {showComingSoonModal && <ComingSoonModal onClose={handleCloseModal} />}

      </div>
    </LayoutScrollContext.Provider>
  );
}

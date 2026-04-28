// ProjectPartner.jsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { usePropertyFilter } from "../store/propertyFilter.jsx";
import SEO from "../components/SEO.jsx";
import Navbar from "../components/projectPartner/Navbar.jsx";
// import Footer from "../components/projectPartner/Footer.jsx";
import Footer from "../layout/Footer.jsx";
import SiteVisitPopup from "../components/projectPartner/SiteVisitPopup.jsx";
import SuccessScreen from "../components/SuccessScreen.jsx";
import PriceSummery from "../components/property/PriceSummery.jsx";
import ContactUsPopup from "../components/projectPartner/ContactUsPopup.jsx";
import WhatsappShare from "../components/projectPartner/WhatsappShare.jsx";
import LandingPageSEO from "../components/projectPartner/LandingPageSEO.jsx";
import EnquiryPopup from "../components/projectPartner/EnquiryPopup.jsx";
import AdvertisementCard from "../components/AdvertisementCard.jsx";

const PropertyNavbar = lazy(
  () => import("../components/projectPartner/PropertyNavbar.jsx"),
);
const PropertySlider = lazy(
  () => import("../components/projectPartner/PropertySlider.jsx"),
);
const PropertySwiper = lazy(
  () => import("../components/projectPartner/PropertySwiper.jsx"),
);
const PropertySection = lazy(
  () => import("../components/projectPartner/PropertySection.jsx"),
);
const NewsSection = lazy(
  () => import("../components/projectPartner/NewsSection.jsx"),
);

// Small accessible skeleton used as Suspense fallback
function LoadingSkeleton({ className = "", label = "loading" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`animate-pulse bg-white/60 rounded-md p-6 shadow-sm ${className}`}
    >
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default function ProjectPartner() {
  const { contact } = useParams();
  const {
    URI,
    selectedCity,
    setSelectedCity,
    showSiteVisitPopup,
    setShowSiteVisitPopup,
    showPriceSummery,
    setShowPriceSummery,
    successScreen,
    isContactOpen,
    setIsContactOpen,
    showEnquiryPopup,
    setShowEnquiryPopup,
  } = useAuth();
  const { selectedType } = usePropertyFilter();

  const [cities, setCities] = useState([]);
  const [projectPartner, setProjectPartner] = useState({});
  const [projectPartnerId, setProjectPartnerId] = useState({});

  const handleContactSubmit = async (payload) => {
    // Example: send to your backend
    // await fetch('/api/contact', { method: 'POST', headers: {...}, body: JSON.stringify(payload) })
    console.log("Contact payload:", payload);
    // return when done (ContactModal supports async onSubmit)
  };

  //fetch data on form
  const fetchData = async (id) => {
    try {
      const response = await fetch(
        URI + `/frontend/project-partner/get/${contact}`,
        {
          method: "GET",
          credentials: "include", //  Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch Project Partner.");
      const data = await response.json();
      //console.log(data);
      setProjectPartner(data);
      setProjectPartnerId(data.id);
      setSelectedCity(data.city);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contact]);

  return (
    <div>
      <LandingPageSEO
        seoTitle={
          projectPartner?.seoTitle
            ? projectPartner?.seoTitle
            : "Reparv - India's Fast-Growing Real Estate Ecosystem | Property & Partner Programs"
        }
        seoDescription={
          projectPartner?.seoDescription
            ? projectPartner?.seoDescription
            : "Buy, sell, or rent property with seamless legal and loan assistance. Become a Sales, Territory, Project Partner and grow your real estate career with low investment, high margins, and nationwide scalability powered by Reparv."
        }
        seoKeywords={
          projectPartner?.seoKeywords
            ? projectPartner?.seoKeywords
            : "Buy, sell, or rent property with seamless legal and loan assistance. Become a Sales, Territory, Project Partner and grow your real estate career with low investment, high margins, and nationwide scalability powered by Reparv."
        }
        canonicalUrl={`https://www.reparv.in/project-partner/${contact}`}
        ogImage={`${URI}${projectPartner?.businessLogo}` || ""}
        twitterSite={
          projectPartner?.twitterSite ? projectPartner?.twitterSite : "@reparv"
        }
        twitterDescription={
          projectPartner?.twitterDescription
            ? projectPartner?.twitterDescription
            : "Buy, sell, or rent property with seamless legal and loan assistance. Become a Sales, Territory, Project Partner and grow your real estate career with low investment, high margins, and nationwide scalability powered by Reparv."
        }
      />

      <div className="w-full min-h-screen bg-[#F7FBFD] overflow-x-hidden">
        <Navbar projectPartner={projectPartner} cities={cities} />

        <main className="max-w-full mx-auto">
          <div className="md:pt-8 lg:pt-12">
            <Suspense
              fallback={
                <LoadingSkeleton
                  className="w-full"
                  label="Loading property nav"
                />
              }
            >
              <PropertyNavbar projectPartner={projectPartner} />
            </Suspense>
          </div>

          <section>
            <Suspense
              fallback={
                <LoadingSkeleton
                  className="w-full h-36 sm:h-48"
                  label="Loading slider"
                />
              }
            >
              <PropertySlider projectPartner={projectPartner} />
            </Suspense>
          </section>

          <section className="mt-10 sm:mt-0">
            <Suspense
              fallback={
                <LoadingSkeleton
                  className="w-full h-40 sm:h-56"
                  label="Loading swiper"
                />
              }
            >
              <PropertySwiper projectPartner={projectPartner} />
            </Suspense>
          </section>
          <div className="max-w-[1380px] mx-auto my-5">
            <AdvertisementCard />
          </div>
          <section id="propertiesSearch" className="pt-8 sm:pt-10">
            <div className="bg-transparent">
              <Suspense
                fallback={
                  <LoadingSkeleton
                    className="w-full"
                    label="Loading properties"
                  />
                }
              >
                <PropertySection projectPartner={projectPartner} />
              </Suspense>
            </div>
          </section>
          <section className="mt-8 sm:mt-10">
            <div className="bg-transparent">
              <Suspense
                fallback={
                  <LoadingSkeleton className="w-full" label="Loading news" />
                }
              >
                <NewsSection />
              </Suspense>
            </div>
          </section>

          <div className="max-w-[1380px] mx-auto my-5">
            <AdvertisementCard />
          </div>

          {/* Contact Us CTA (centered)
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-center">
              <button
                onClick={() => setIsContactOpen(true)}
                className="relative w-full sm:w-1/2 md:w-1/3
                        bg-gradient-to-r from-[#10A37F] to-[#19C06B]
                        text-white py-3 rounded-full font-semibold
                        shadow-lg cursor-pointer transition
                        hover:opacity-95 active:scale-[0.985]
                        animate-contact-bounce
                        overflow-hidden"
                aria-haspopup="dialog"
                aria-expanded={isContactOpen}
              >
                Contact Us
  
                <span
                  className="absolute inset-0 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-700 ease-out pointer-events-none
                    bg-gradient-to-r from-transparent via-white/40 to-transparent"
                ></span>
              </button>
            </div> 
          </div>  */}

          <div className="my-12" />
          {/* City Selector Popup */}
        </main>
        <Footer />
      </div>

      {showPriceSummery && (
        <div
          onClick={() => {
            setShowPriceSummery(false);
          }}
          className="Container inset-0 w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center"
        >
          <PriceSummery />
        </div>
      )}

      {/* Show Contact Us Slider Button Popup */}
      {showSiteVisitPopup && (
        <div className="Container inset-0 w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <SiteVisitPopup projectPartner={projectPartner} />
          </div>
        </div>
      )}

      {/* Show Success Screen */}
      {successScreen?.show && <SuccessScreen />}

      {/* Show Contact Us Slider Button Popup */}
      {isContactOpen && (
        <div className="Container inset-0 w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <ContactUsPopup projectPartner={projectPartner} />
          </div>
        </div>
      )}

      {/* Show Contact Us Slider Button Popup */}
      {showEnquiryPopup && (
        <div className="Container inset-0 w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <EnquiryPopup projectPartner={projectPartner} />
          </div>
        </div>
      )}

      {/* WhatsApp Share Icon */}
      <div className="z-49 fixed bottom-[60px] md:bottom-[60px] left-[30px] md:left-[40px] xl:left-[60px] ">
        <WhatsappShare projectPartner={projectPartner} />
      </div>
    </div>
  );
}

import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import PropertyBookingCard from "../components/property/PropertyBookingCard";
import PropertyOverview from "../components/property/PropertyOverview";
import PropertyFeatures from "../components/property/PropertyFeatures";
import EMICalculator from "../components/property/EMICalculator";
import { useInView } from "react-intersection-observer";
import SEO from "../components/SEO";
import WingData from "../components/property/WingData";
import PlotData from "../components/property/PlotData";
import TypeWisePricing from "../components/property/TypeWisePricing";
import WhatsappShare from "../components/property/WhatsappShare";
import { addVisitor } from "../utils/analytics";
import CallEnquiryPopup from "../components/property/CallEnquiryPopup";
import WhatsappEnquiryPopup from "../components/property/WhatsappEnquiryPopup";
import PropertyLocationMap from "../components/property/PropertyLocationMap";
import PropertyDescription from "../components/property/PropertyDescription";
import PropertyTab from "../components/property/PropertyTab";
import PropertyHighlights from "../components/property/PropertyHighlights";
import FilterNavbar from "../components/property/FilterNavbar";
import { getImageURI } from "../utils/helper";
import propertyPicture from "../assets/property/propertyPicture.svg";
import AdvertisementCard from "../components/AdvertisementCard";
// Lazy-loaded components
const PropertyImageGallery = lazy(
  () => import("../components/property/PropertyImageGallery"),
);
const SimilarProperties = lazy(
  () => import("../components/property/SimilarProperties"),
);

function PropertyDetails() {
  const { setOtherPropertiesInView, isScrolling } = useOutletContext();
  const { ref: videoRef, inView: otherPropertiesInView } = useInView({
    threshold: 0.1,
  });

  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const navigate = useNavigate();
  const {
    setShowSiteVisitPopup,
    URI,
    setPropertyCategory,
    setPropertyId,
    showCallEnquiryPopup,
    showWhatsappEnquiryPopup,
    setShowWhatsappEnquiryPopup,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [activeTab, setActiveTab] = useState("Highlights");
  const tabs = [
    "Highlights",
    "About",
    "Overview",
    "Features & Amenities",
    "Location",
  ];

  const frontImage = useMemo(() => {
    try {
      const images = JSON.parse(propertyInfo?.frontView || "[]");

      if (images?.length) {
        return getImageURI(images[0]); // should return full URL
      }

      return propertyPicture;
    } catch (error) {
      return propertyPicture;
    }
  }, [propertyInfo?.frontView]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${URI}/frontend/propertyinfo/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      // If backend returns 404 or invalid slug
      if (!response.ok) {
        setNotFound(true);
        return;
      }

      const data = await response.json();

      // If API returns empty object or null
      if (!data || !data.propertyid) {
        setNotFound(true);
        return;
      }

      setPropertyInfo(data);
      setPropertyCategory(data.propertyCategory);
    } catch (err) {
      console.error("Error fetching property info:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/propertyinfo/getimages/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) return;

      const data = await response.json();
      setPropertyImages([...data]);
    } catch (err) {
      console.error("Error fetching property images:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImages();
  }, [id]);

  useEffect(() => {
    setOtherPropertiesInView(otherPropertiesInView);
  }, [otherPropertiesInView]);

  useEffect(() => {
    if (!propertyInfo?.propertyid) return;

    const key = `viewed_property_${propertyInfo.propertyid}`;

    if (!sessionStorage.getItem(key)) {
      addVisitor({
        URI,
        propertyid: propertyInfo.propertyid,
        source: "view",
      });

      sessionStorage.setItem(key, "true");
    }
  }, [propertyInfo?.propertyid]);

  useEffect(() => {
    if (notFound && !loading) {
      navigate("/404", { replace: true });
    }
  }, [notFound, loading, navigate]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <span className="text-lg text-gray-500">
          Loading property details...
        </span>
      </div>
    );
  }

  if (notFound) {
    return null; // Redirect is happening
  }

  return (
    <>
      <SEO
        title={`${propertyInfo.seoTittle || ""}`}
        description={propertyInfo.seoDescription || ""}
        keywords={propertyInfo.tags || "Property"}
        canonical={`https://www.reparv.in/property-info/${propertyInfo?.seoSlug}`}
        image={frontImage}
      />
      <div className="w-full max-w-[1380px] flex flex-col sm:p-4 mx-auto">
        <div className="hidden lg:flex fixed top-15 sm:top-22 sm:bg-[#fafafa] left-0 w-full items-center justify-center z-20 pt-[20px]">
          <div className="w-full max-w-[1340px] px-4 sm:pr-6">
            <FilterNavbar />
          </div>
        </div>
        <div className="flex w-full lg:pt-[80px]">
          <div className="leftSection w-full md:w-[50%] lg:w-[60%] xl:w-[65%] flex flex-col gap-2 sm:gap-4">
            {propertyInfo?.pageTitle && (
              <h1 className="mx-4 sm:mx-6 mt-2 sm:mt-0 text-lg sm:text-2xl font-bold">
                {propertyInfo?.pageTitle}
              </h1>
            )}
            {/* Lazy load Image Gallery */}
            <Suspense
              fallback={
                <div className="text-center py-10">Loading Images...</div>
              }
            >
              <PropertyImageGallery property={propertyInfo} />
            </Suspense>

            <div className=" block md:hidden">
              <PropertyBookingCard propertyInfo={propertyInfo} />
            </div>

            {/* Show Wing Data */}
            {["NewFlat", "CommercialFlat"].includes(
              propertyInfo.propertyCategory,
            ) && <WingData propertyInfo={propertyInfo} />}

            {/* Show Plot Data */}
            {["NewPlot", "CommercialPlot"].includes(
              propertyInfo.propertyCategory,
            ) && <PlotData propertyInfo={propertyInfo} />}

            {/* Show Type Wise Property */}
            <TypeWisePricing
              propertyInfo={propertyInfo}
              propertyId={propertyInfo?.propertyid}
              propertyCategory={propertyInfo?.propertyCategory}
              propertyType={propertyInfo.propertyType}
              brochureFile={propertyInfo.brochureFile}
              videoLink={propertyInfo.videoLink}
            />

            <PropertyTab
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Property Highlights */}
            {activeTab === "Highlights" && (
              <PropertyHighlights property={propertyInfo} />
            )}

            {/* Property Details */}
            {propertyInfo?.propertyDescription && activeTab === "About" && (
              <PropertyDescription propertyInfo={propertyInfo} />
            )}

            {activeTab === "Overview" && (
              <PropertyOverview propertyInfo={propertyInfo} />
            )}

            {activeTab === "Features & Amenities" && (
              <PropertyFeatures propertyInfo={propertyInfo} />
            )}

            {activeTab === "Location" && (
              <PropertyLocationMap property={propertyInfo} />
            )}

            {/* Property Details */}
            {propertyInfo?.propertyDescription && activeTab !== "About" && (
              <PropertyDescription propertyInfo={propertyInfo} />
            )}

            {activeTab !== "Overview" && (
              <PropertyOverview propertyInfo={propertyInfo} />
            )}

            {activeTab !== "Features & Amenities" && (
              <PropertyFeatures propertyInfo={propertyInfo} />
            )}

            {activeTab !== "Location" && (
              <PropertyLocationMap property={propertyInfo} />
            )}

            {/* Hide EMI Calculator in Rentals 
            {!["RentalFlat", "RentalShop", "RentalOffice"].includes(
              propertyInfo.propertyCategory
            ) && <EMICalculator totalAmount={propertyInfo.totalOfferPrice} />}*/}
          </div>

          {/* Booking card */}
          <div
            className={`${
              isScrolling ? "absolute " : "fixed"
            } bookingSection hidden md:flex left-[50%] lg:left-[60%] xl:left-[65%] w-[50%] lg:w-[40%] xl:w-[35%] max-w-[450px] max-left-[1000px] px-6 pb-6 z-10`}
          >
            <PropertyBookingCard propertyInfo={propertyInfo} />
          </div>
        </div>

        {/* Book Site Visit Button (Mobile) */}
        <div className="fixed z-30 w-full sm:w-auto right-0 bottom-0 sm:hidden p-4 rounded-2xl text-white text-md shadow-lg ">
          <button
            onClick={() => {
              setShowSiteVisitPopup(true);
              setPropertyImages(JSON.parse(propertyInfo.frontView)[0]);
              setPropertyId(JSON.parse(propertyInfo.propertyid));
              setPropertyCategory(propertyInfo.propertyCategory);
            }}
            className="w-full flex items-center justify-center sm:hidden rounded-md bg-[#8A38F5] shadow-[0px_7px_13px_0px_#8A38F540] text-white font-bold py-3 text-base active:scale-95 cursor-pointer"
          >
            Book Site Visit Now
          </button>
        </div>

        {/* Lazy load for Similar Properties */}
        <div ref={videoRef}>
          <Suspense
            fallback={
              <div className="text-center py-10">
                Loading Similar Properties...
              </div>
            }
          >
            <SimilarProperties
              propertyCity={propertyInfo?.city}
              propertyCategory={propertyInfo?.propertyCategory}
              propertyPrice={propertyInfo?.totalOfferPrice}
              propertyId={id}
              key={propertyInfo?.seoSlug}
            />
          </Suspense>
        </div>

        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>

        {/* Show Whatsapp Enquiry Popup */}
        {showCallEnquiryPopup && (
          <div className="Container inset-0 w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
              <CallEnquiryPopup property={propertyInfo} />
            </div>
          </div>
        )}

        {/* Show Whatsapp Enquiry Popup */}
        {showWhatsappEnquiryPopup && (
          <div className="Container inset-0 w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
              <WhatsappEnquiryPopup property={propertyInfo} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyDetails;

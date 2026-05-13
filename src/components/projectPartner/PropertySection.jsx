import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import propertyPicture from "../../assets/property/propertyPicture.svg";
import FormatPrice from "../FormatPrice";
import { useAuth } from "../../store/auth";
import { usePropertyFilter } from "../../store/propertyFilter";
import { FaFire } from "react-icons/fa6";
import { getImageURI } from "../../utils/helper";

function PropertySection({ projectPartner }) {
  const router = useRouter();
  const {
    URI,
    propertyType,
    setPriceSummery,
    propertySearch,
    setShowPriceSummery,
    selectedCity,
    setVideoURL,
    setShowPlayVideo,
    setEnquirySource,
  } = useAuth();
  const { selectedType } = usePropertyFilter();
  const [properties, setProperties] = useState([]);

  const filteredProperties = properties?.filter((property) => {
    const term = propertySearch?.toLowerCase() || "";

    // Property name match
    const nameMatch = property?.propertyName?.toLowerCase().includes(term);

    // Tags match (works with string or array)
    const tagMatch =
      (Array.isArray(property?.tags) &&
        property.tags.some((tag) => tag?.toLowerCase().includes(term))) ||
      property?.tags?.toLowerCase?.().includes(term);

    // Built-up area match
    const areaMatch =
      property?.builtUpArea &&
      property.builtUpArea.toString().toLowerCase().includes(term);

    // Property type match (works with string or array)
    const typeMatch =
      (Array.isArray(property?.propertyType) &&
        property.propertyType.some((type) =>
          type?.toLowerCase().includes(term),
        )) ||
      property?.propertyType?.toString().toLowerCase().includes(term);

    // Property category match
    const categoryMatch =
      property?.propertyCategory &&
      property.propertyCategory.toString().toLowerCase().includes(term);

    return nameMatch || tagMatch || areaMatch || typeMatch || categoryMatch;
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/project-partner/all-properties`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyCategory: selectedType,
            projectPartnerId: projectPartner?.id,
            selectedCity: selectedCity,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching:", err);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity, projectPartner, selectedType]);

  return (
    <div
      className={`${
        properties?.length > 0 ? "flex" : "hidden"
      } w-full max-w-[1250px] flex-col items-center mx-auto p-4 sm:gap-4 md:pt-15 pb-5 md:pb-10`}
    >
      <div className="w-full sm:px-5 lg:px-[20px]">
        <h2 className="text-[18px] sm:text-[24px] text-[#43435D] md:text-[28px] font-semibold mb-1">
          Featured Developers
        </h2>
        <p className="text-xs sm:text-sm text-black">
          Prominent real-estate builders
        </p>
      </div>
      <div className="HomeProperties w-full max-w-[1220px] overflow-scroll scrollbar-hide grid grid-flow-col gap-6 py-4 px-1 sm:p-5">
        {filteredProperties?.map((property) => (
          <div
            key={property?.seoSlug}
            className="relative min-w-[300px] w-[330px] sm:w-[380px] border border-[#00000033] border-t-4 border-t-[#5E23DC] rounded-2xl shadow-md bg-white overflow-hidden"
          >
            <div
              className={`${
                property?.hotDeal === "Active" ? "hidden" : "hidden"
              } absolute w-[65px] h-[40px] p-2 top-[10px] left-[10px] flex gap-1 items-center justify-center bg-red-600 rounded-md`}
            >
              <FaFire className="text-white" />
              <span className="text-white text-xs font-semibold">Hot Deal</span>
            </div>
            <img
              onClick={() => {
                setEnquirySource("Landing Page");
                router.push(`/property-info/${property.seoSlug} `);
              }}
              src={(() => {
                try {
                  const images = JSON.parse(property.frontView || "[]");
                  return images.length > 0
                    ? `${getImageURI(images[0])}`
                    : `/assets/property/propertyPicture.svg`;
                } catch {
                  return `/assets/property/propertyPicture.svg`;
                }
              })()}
              alt={property.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/assets/property/propertyPicture.svg`;
              }}
              loading="lazy"
              className="object-cover h-[250px] w-full bg-[#00000020]"
            />
            <div className="relative flex flex-col gap-2">
              {Number(property?.likes) > 500 && (
                <img
                  src="/assets/projectPartner/popular-tag.png"
                  loading="lazy"
                  className="absolute top-[-15px] left-[-8px]"
                ></img>
              )}

             {/* Read More ... */} 
              <div
                onClick={() => {
                  setEnquirySource("Landing Page");
                  router.push(`/property-info/${property.seoSlug}`);
                }}
                className="overflow-hidden absolute top-[-40px] right-[10px] flex items-center justify-center px-4 py-1 h-[30px] bg-[#5e23dc] text-white text-sm rounded-lg shadow cursor-pointer hover:font-medium border-2"
              >
                <span>Read More...</span>
                <span className="shine-layer"></span>
              </div>

              <div className="w-full px-4 pt-4 flex text-base font-semibold leading-[150%] spacing-[-1%] ">
                <span className="text-[#000929] group-hover:text-white">
                  {property.propertyName.length > 26
                    ? `${property.propertyName.slice(0, 25)}...`
                    : property.propertyName}
                </span>
              </div>

              <div className="w-full flex items-start px-4 gap-2 text-[12px] font-semibold">
                <span className="text-[#5E23DC] group-hover:text-white">
                  {property.propertyCategory}
                </span>
                <div className="flex flex-wrap overflow-scroll scrollbar-hide gap-2 text-black text-xs group-hover:text-white">
                  {property.propertyType?.map((type, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 rounded-xl whitespace-nowrap"
                    >
                      {type.length > 18 ? `${type.slice(0, 17)}...` : type}
                      {index < property.propertyType.length - 1 && ""}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full px-4 flex flex-col items-center justify-between">
                <div className="w-full flex justify-between gap-2 text-sm lg:text-base font-extrabold">
                  <div className="flex gap-2 justify-end flex-col">
                    <div
                      className={`${
                        property.propertyCategory === "RentalFlat" ||
                        property.propertyCategory === "RentalShop" ||
                        property.propertyCategory === "RentalOffice" ||
                        property.loanAvailability === "No"
                          ? "hidden"
                          : "flex"
                      } text-black group-hover:text-white gap-1 `}
                    >
                      EMI <FormatPrice price={property.emi} />
                      /m
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2]">
                      <div
                        className={`${
                          property.propertyCategory === "FarmLand"
                            ? "hidden"
                            : "flex"
                        } py-1 px-3 gap-1 text-[#5E23DC] bg-[#5E23DC47] rounded-xl `}
                      >
                        <IoMdDoneAll className="w-[15px] h-[15px] text-[#5E23DC]" />
                        <span className="text-xs">
                          {property.propertyApprovedBy}
                        </span>
                      </div>

                      <div
                        className={`py-1 px-3 gap-1 items-center justify-center text-[#5E23DC] bg-[#5E23DC47] rounded-xl ${
                          ["NewFlat", "NewPlot"].includes(
                            property.propertyCategory,
                          )
                            ? "flex"
                            : "hidden"
                        }`}
                      >
                        <IoMdDoneAll className="w-[15px] h-[15px] text-[#5E23DC]" />
                        <span className="text-xs">RERA Approved</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2]">
                      <div className="py-1 px-3 text-[10px] bg-[#0000000F] rounded-xl ">
                        {property.distanceFromCityCenter} KM Distance from city
                        center
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end justify-end text-black group-hover:text-white text-sm lg:text-base ">
                    <span className="text-[#00000066] group-hover:text-white line-through text-xs font-medium ">
                      <FormatPrice
                        price={Math.floor(property.totalSalesPrice)}
                      />
                    </span>
                    <FormatPrice price={property.totalOfferPrice} />
                    <span
                      onClick={() => {
                        setShowPriceSummery(true);
                        setPriceSummery(property);
                      }}
                      className="text-[#00000066] underline text-xs font-medium cursor-pointer group-hover:text-white "
                    >
                      +Other Charged
                    </span>
                  </div>
                </div>
              </div>

              <hr className="text-[#F0EFFB]" />
              <div className="w-full flex px-4 justify-between">
                <img src="/assets/projectPartner/assured-tag.png" alt="" className="w-30" />
                <div className={`flex gap-[8px] items-center justify-center`}>
                  <div
                    onClick={() => {
                      //window.open(URI + property?.videoFile, "_blank");
                      setVideoURL(property?.videoLink);
                      setShowPlayVideo(true);
                    }}
                    className={`${
                      property?.videoLink ? "block" : "hidden"
                    } relative overflow-hidden p-[5px] z-10 text-white bg-[#107c0b] rounded-lg cursor-pointer`}
                  >
                    <div className="overflow-hidden relative z-10 flex items-center justify-center animate-blink">
                      <MdOutlinePlayCircleOutline className="w-5 h-5" />
                      <span className="absolute shine-layer"></span>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = URI + property?.brochureFile;
                      link.download = property?.brochureFile.split("/").pop();
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className={`${
                      property?.brochureFile ? "block" : "hidden"
                    } p-[5px] text-white bg-[#107c0b] rounded-lg cursor-pointer relative overflow-hidden`}
                  >
                    <div className="overflow-hidden relative z-10 flex items-center justify-center animate-blink">
                      <MdOutlineFileDownload className="w-5 h-5" />
                      <span className="absolute shine-layer"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-wrap gap-2 items-center justify-start py-1 pb-4 px-3 rounded-bl-lg rounded-br-lg address text-[10px] md:text-xs font-normal text-[#808080] group-hover:text-[#e2e2e2] border-t-1 border-[#F0EFFB]">
                <img src="/assets/projectPartner/location-icon.png" alt="location" />
                <div className="flex flex-col items-start">
                  <p className="text-[#808080] ">
                    {property?.location?.length > 25
                      ? `${property.location.slice(0, 24)}...`
                      : property?.location || ""}
                    {property?.city ? `, ${property.city}` : ""}
                  </p>
                  <p
                    className={`${
                      property.projectBy && property.projectBy !== "null"
                        ? "flex font-semibold text-[#000000]"
                        : "hidden"
                    }`}
                  >
                    Project By : {property.projectBy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1
        className={`${
          properties.length == 0 ? "block" : "hidden"
        } text-xl sm:text-2xl font-bold m-4`}
      >
        No Properties Found In {selectedCity}
      </h1>
    </div>
  );
}

export default PropertySection;

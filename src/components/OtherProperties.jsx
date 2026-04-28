import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineKingBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaDiamond } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import propertyPicture from "../assets/property/propertyPicture.svg";
import cardAssuredTag from "../assets/property/cardAssuredTag.svg";
import populerTag from "../assets/property/populerTag.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormatPrice from "./FormatPrice";
import { useAuth } from "../store/auth";
import { FaFire } from "react-icons/fa6";

function OtherProperties({ propertyCity, propertyCategory, propertyId }) {
  const navigate = useNavigate();
  const {
    URI,
    setPriceSummery,
    setShowPriceSummery,
    setVideoURL,
    setShowPlayVideo,
  } = useAuth();
  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    try {
      let url = `${URI}/frontend/properties?`;
      const params = [];

      if (propertyCity && propertyCity.trim() !== "") {
        params.push(`city=${encodeURIComponent(propertyCity)}`);
      }

      if (propertyCategory && propertyCategory.trim() !== "") {
        params.push(`propertyCategory=${encodeURIComponent(propertyCategory)}`);
      }

      url += params.join("&");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      const filtered = data.filter((p) => p.seoSlug !== propertyId);
      setProperties(filtered);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [propertyCategory]);

   const ImageUri = import.meta.env.VITE_S3_IMAGE_URL

  return (
    <div className="otherProperties w-full overflow-scroll scrollbar-hide grid grid-flow-col gap-6 py-4 sm:p-5">
      {properties.map((property) => (
        <div
          key={property.seoSlug}
          className="relative w-[350px] sm:w-[375px] border border-[#00000033] rounded-2xl shadow-md bg-white overflow-hidden"
        >
          <div className="absolute w-[65px] h-[40px] p-2 top-[10px] left-[10px] flex gap-1 items-center justify-center bg-red-600 rounded-md">
            <FaFire className="text-white" />
            <span className="text-white text-xs font-semibold">Hot Deal</span>
          </div>
          <img
            onClick={() => navigate(`/property-info/${property.seoSlug}`)}
            src={(() => {
              try {
                const images = JSON.parse(property.frontView || "[]");
                return images.length > 0
                  ? `${ImageUri}${images[0]}`
                  : `${propertyPicture}`;
              } catch {
                return `${propertyPicture}`;
              }
            })()}
            alt={property.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${propertyPicture}`;
            }}
            className="object-cover h-[200px] w-full bg-[#00000020]"
          />
          <div className="relative flex flex-col gap-2">
            {property.likes > 500 && (
              <img
                src={populerTag}
                className="absolute top-[-15px] left-[-8px]"
              ></img>
            )}

            {/* Read More ... */}
            <div
              onClick={() => navigate(`/property-info/${property.seoSlug}`)}
              className="overflow-hidden absolute top-[-30px] right-[0px] flex items-center justify-center px-4 py-1 h-[30px] bg-[#076300] text-white text-sm rounded-tl-xl shadow cursor-pointer hover:font-medium border-t-2 border-l-[1.5px] "
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

            <div className="w-full flex px-4 gap-2  text-[15px] font-semibold">
              <span className="text-[#076300] group-hover:text-white">
                {property.propertyCategory}
              </span>
              <div className="flex flex-wrap gap-2 text-black text-xs group-hover:text-white">
                {property.propertyType?.map((type, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 rounded-xl"
                  >
                    {type?.length > 18 ? `${type.slice(0, 17)}...` : type}
                    {index < property.propertyType.length - 1 && ""}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full px-4 flex flex-col items-center justify-between">
              <div className="w-full flex justify-between gap-2 text-base lg:text-xl font-extrabold">
                <div
                  className={`${
                    property.propertyCategory === "RentalFlat" ||
                    property.propertyCategory === "RentalShop" ||
                    property.propertyCategory === "RentalOffice" ||
                    property.loanAvailability === "No"
                      ? "hidden"
                      : "flex"
                  } text-black group-hover:text-white gap-1 items-center justify-center `}
                >
                  EMI <FormatPrice price={property.emi} />
                  /m
                </div>
                <div className="text-black group-hover:text-white flex flex-col gap-1 items-start justify-center ">
                  <span className="text-[#00000066] group-hover:text-white line-through text-xs font-medium ">
                    <FormatPrice price={Math.floor(property.totalSalesPrice)} />
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

            <div className="flex flex-wrap gap-2 px-4 text-[10px] md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2] mt-2">
              <div
                className={`${
                  property.propertyCategory === "FarmLand" ? "hidden" : "flex"
                } py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl `}
              >
                <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
                <span>{property.propertyApprovedBy}</span>
              </div>

              <div
                className={`py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl ${
                  ["NewFlat", "NewPlot"].includes(property.propertyCategory)
                    ? "flex"
                    : "hidden"
                }`}
              >
                <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
                <span>RERA Approved</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 px-4 text-[10px] md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2]">
              <div className="py-1 px-3 bg-[#0000000F] rounded-xl ">
                {property.distanceFromCityCenter} KM Distance from city center
              </div>
            </div>

            <hr className="text-[#F0EFFB] my-2 " />
            <div className="w-full flex px-4 justify-between mb-1">
              <img src={cardAssuredTag} alt="" className="w-40" />
              <div className={`flex gap-[8px] items-center justidy-center`}>
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
                    link.href = ImageUri + property?.brochureFile;
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

            <div className="w-full flex flex-wrap gap-2 items-center justify-start py-3 px-4 rounded-bl-lg rounded-br-lg address text-[10px] md:text-xs lg:text-sm font-normal text-[#808080] group-hover:text-[#e2e2e2] border-t-1 border-[#F0EFFB]">
              <CiLocationOn className="text-[#076300] group-hover:text-white w-5 h-5" />
              <div className="flex flex-col">
                <p className="text-[#808080] ">
                  {property.location.length > 25
                    ? `${property.location.slice(0, 24)}...`
                    : property.location}
                  , {property.city}
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
  );
}

export default OtherProperties;

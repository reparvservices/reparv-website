import { useState, useEffect } from "react";
import { FaRupeeSign, FaVectorSquare } from "react-icons/fa";
import { useAuth } from "../../store/auth";
import FormatPrice from "../FormatPrice";
import BrochureAndVideo from "./BrochureAndVideo";
import { IoShareSocial } from "react-icons/io5";

function TypeWisePricing({
  propertyId,
  propertyCategory,
  propertyType,
  brochureFile,
  videoLink,
}) {
  const { URI, setLoading, setShowSharePopup } = useAuth();
  const [isActive, setIsActive] = useState(propertyType?.[0] || "");
  const [propertyData, setPropertyData] = useState({});

  // add this helper above overviewData
  const isValid = (value) => {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== 0 &&
      value !== "0"
    );
  };

  const overviewData = [
    {
      icon: FaVectorSquare,
      label: "Built-Up Area",
      value: propertyData?.builtuparea,
      show:
        !["NewPlot", "CommercialPlot"].includes(propertyCategory) &&
        isValid(propertyData?.builtuparea),
    },
    {
      icon: FaVectorSquare,
      label: "Super Built-Up Area",
      value: propertyData?.superbuiltuparea,
      show:
        !["NewPlot", "CommercialPlot"].includes(propertyCategory) &&
        isValid(propertyData?.superbuiltuparea),
    },
    {
      icon: FaVectorSquare,
      label: "Carpet Area",
      value: propertyData?.carpetarea,
      show:
        !["NewPlot", "CommercialPlot"].includes(propertyCategory) &&
        isValid(propertyData?.carpetarea),
    },
    {
      icon: FaVectorSquare,
      label: "Additional Area",
      value: propertyData?.additionalarea,
      show:
        !["NewPlot", "CommercialPlot"].includes(propertyCategory) &&
        isValid(propertyData?.additionalarea),
    },
    {
      icon: FaVectorSquare,
      label: "Plot Size",
      value: propertyData?.plotsize,
      show:
        !["NewFlat", "CommercialFlat"].includes(propertyCategory) &&
        isValid(propertyData?.plotsize),
    },
    {
      icon: FaVectorSquare,
      label: "Payable Area",
      value: propertyData?.payablearea,
      show: isValid(propertyData?.payablearea),
    },
    {
      icon: FaRupeeSign,
      label: "Total Price",
      value: <FormatPrice price={parseFloat(propertyData?.totalcost)} />,
      show: isValid(propertyData?.totalcost),
    },
  ];

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URI}/frontend/properties/additionalinfo/data/get/${propertyId}?type=${encodeURIComponent(
          isActive,
        )}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch Property Data.");

      const data = await response.json();
      setPropertyData(data);
    } catch (err) {
      console.error("Error fetching Property Data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isActive) fetchData();
  }, [isActive, propertyId]);

  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg p-4 md:p-6">
      <div className="w-full flex gap-4 items-center justify-between">
        <h2 className="text-black text-lg sm:text-xl lg:text-2xl mb-3 font-semibold mx-1">
          {propertyCategory}
        </h2>
        <div className="flex gap-3 mb-3">
          <BrochureAndVideo brochureFile={brochureFile} videoLink={videoLink} />
        </div>
      </div>

      {/* Property Type Selector */}
      <div className="w-full flex flex-wrap gap-3 md:gap-4">
        {propertyType?.map((item, index) => (
          <div
            key={index}
            onClick={() => setIsActive(item)}
            className={`${
              isActive === item
                ? "border-[#8A38F5] bg-[#8A38F5] text-white"
                : "border-gray-300"
            } active:scale-95 cursor-pointer
             flex items-center justify-center px-2 py-1 text-sm font-semibold
             border-[1.5px] rounded-lg `}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Overview Data */}
      {isActive && (
        <div className="w-full px-1 mt-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 text-sm">
          {overviewData
            .filter((item) => item.show)
            .map(({ icon: Icon, label, value }, index) => (
              <div key={index} className="flex items-start space-x-3">
                {Icon && <Icon className="text-lg text-black mt-1" />}
                <div>
                  <div className="text-[#00000066] text-xs">{label}</div>
                  <div className="font-normal text-black whitespace-pre-line">
                    {value}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TypeWisePricing;

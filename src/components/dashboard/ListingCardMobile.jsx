import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaEdit, FaHeart } from "react-icons/fa";
import { IoLocationOutline, IoCheckmarkCircle } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BiArea } from "react-icons/bi";
import { RiBuildingLine } from "react-icons/ri";
import { useAuth } from "../../store/auth";
import propertyPicture from "../../assets/property/propertyPicture.svg";
import { getImageURI } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export default function ListingCardMobile({ property, delProperty }) {
  const { URI } = useAuth();
  const ImageUri = import.meta.env.VITE_S3_IMAGE_URL;
  const navigate = useNavigate();

  const statusColor = {
    Active: "text-green-600",
    Pending: "text-orange-500",
  };

  const imageSrc = (() => {
    try {
      const images = JSON.parse(property?.frontView || "[]");
      return images.length > 0
        ? `${getImageURI(images[0])}`
        : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
    } catch {
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
    }
  })();

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={property?.seoSlug || property?.propertyName}
          className="w-full h-44 object-cover"
        />

        <button className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow">
          <FiMoreVertical className="text-lg" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* TITLE + STATUS */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base">
            {property?.propertyName || "Property Name"}
          </h3>

          {property?.status && (
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                statusColor[property.status]
              }`}
            >
              <IoCheckmarkCircle className="text-lg" />
              {property.status}
            </span>
          )}
        </div>

        {/* LOCATION */}
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <IoLocationOutline className="text-lg" />
          {property?.address || "Property Location"}
        </p>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <RiBuildingLine />
            {property?.propertyCategory || "-"}
          </div>

          <span className="flex items-center gap-1">
            <BiArea />
            {property?.carpetArea ? `${property.carpetArea} sq.ft` : "—"}
          </span>
        </div>

        {/* STATS + ACTION */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1 text-blue-500">
              <AiOutlineEye /> {property?.views || 0}
            </span>

            <span className="flex items-center gap-1 text-green-600">
              <HiOutlineMail /> {property?.share || 0}
            </span>

            <span className="flex items-center gap-1 text-orange-500">
              <FaHeart /> {property?.likes || 0}
            </span>
          </div>

          <button
            onClick={() => {
              window.open(`/edit-property/${property?.propertyid}`, "_blank");
            }}
            className="flex items-center gap-2 bg-[#5323DC] text-white text-sm px-4 py-2 rounded-lg"
          >
            Edit <FaEdit />
          </button>
        </div>
      </div>
    </div>
  );
}

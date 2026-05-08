"use client"

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiShare2, FiTrash2 } from "react-icons/fi";
import { TiLocationOutline } from "react-icons/ti";
import { BiArea } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { RiBuildingLine } from "react-icons/ri";
import { useAuth } from "../../store/auth";
import propertyPicture from "../../assets/property/propertyPicture.svg";
import { getImageURI } from "../../utils/helper";
export default function ListingCard({ property, delProperty }) {
  const { URI, setShowSharePopup, setPropertySlug } = useAuth();
  const router = useRouter();
  const imageURI = import.meta.env.VITE_S3_IMAGE_URL;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const statusColor = {
    Active: "text-green-500",
    Pending: "text-orange-500",
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#D9D9D9] flex gap-5 relative">
      {/* Image */}
      <img
        src={(() => {
          try {
            const images = JSON.parse(property?.frontView || "[]");
            return images.length > 0
              ? `${getImageURI(images[0])}`
              : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
          } catch {
            return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
          }
        })()}
        alt={property?.seoSlug || property?.propertyName}
        onError={(e) => {
          e.currentTarget.src = propertyPicture;
        }}
        className="w-40 h-28 object-cover rounded-lg"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-bold text-base">{property?.propertyName}</h3>

        <p className="flex items-center gap-1 text-[#868686] mt-1">
          <TiLocationOutline className="w-5 h-5" /> {property?.address}
        </p>

        <div className="flex gap-4 text-sm text-[#868686] mt-3">
          <div className="flex items-center gap-2">
            <RiBuildingLine /> {property?.propertyCategory}
          </div>
          <span className="flex items-center gap-2">
            <BiArea /> {property?.carpetArea + " sq.ft"}
          </span>
        </div>

        <div className="flex gap-6 text-xs mt-3">
          <span className="flex items-center gap-1 text-[#2196F3]">
            <AiOutlineEye /> {property?.views || "0"}
          </span>
          <span className="flex items-center gap-1 text-[#04972B]">
            <HiOutlineMail /> {property?.share || "0"}
          </span>
          <span className="flex items-center gap-1 text-[#FF9800]">
            <FaHeart /> {property?.likes || "0"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between gap-3 relative">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              window.open(`/edit-property/${property?.propertyid}`, "_blank");
            }}
            className="flex items-center gap-2 bg-[#5323DC] text-white px-4 py-2 rounded-lg text-sm"
          >
            <FiEdit2 /> Edit Property
          </button>

          {/* 3 Dot Menu */}
          <div className="relative" ref={menuRef}>
            <FiMoreVertical
              onClick={() => setOpenMenu(!openMenu)}
              className="cursor-pointer text-xl"
            />

            {openMenu && (
              <div className="absolute right-0 top-8 w-36 bg-white border border-[#D9D9D9] rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  onClick={() => {
                    window.open(
                      "/property-info/" + property?.seoSlug,
                      "_blank"
                    );
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <AiOutlineEye /> View
                </button>

                <button
                  onClick={() => {
                    delProperty(property?.propertyid);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {property?.status && (
          <span
            className={`text-sm font-medium ${statusColor[property?.status]}`}
          >
            {property?.status}
          </span>
        )}
      </div>
    </div>
  );
}

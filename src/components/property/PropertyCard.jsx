import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../store/auth";
import propertyPicture from "../../assets/property/propertyPicture.svg";
import populerTag from "../../assets/property/populerTag.svg";
import { TiLocationOutline } from "react-icons/ti";
import { RiBuildingLine } from "react-icons/ri";
import { FaFire, FaHeart } from "react-icons/fa6";
import FormatPrice from "../FormatPrice";
import { getImageURI } from "../../utils/helper";
function PropertyCard({ property, top = false }) {
  const router = useRouter();
  const { URI, user, setShowLogin, setShowAlert } = useAuth();

  const addLike = async () => {
    if (!user?.id) {
      setShowLogin(true);
    }

    if (!property?.propertyid) return;

    try {
      const response = await fetch(`${URI}/user/activity/property-like`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ property_id: property?.propertyid }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Like failed");
      }
      setShowAlert({
        ...setShowAlert,
        show: true,
        type: "success",
        message: data?.message,
      });
      return data;
    } catch (error) {
      setShowAlert({
        ...setShowAlert,
        show: true,
        type: "error",
        message: error,
      });
      console.error("Property like error:", error);
      return null;
    }
  };

  /* -------------------- derived values (no UI change) -------------------- */

  const approvedBy = useMemo(
    () => property?.reparvAssured?.trim(),
    [property?.reparvAssured],
  );

  const category = useMemo(
    () => property?.propertyCategory?.trim(),
    [property?.propertyCategory],
  );

  const isRental = useMemo(
    () => ["RentalFlat", "RentalOffice", "RentalShop"].includes(category),
    [category],
  );

  const frontImage = useMemo(() => {
    try {
      const images = JSON.parse(property?.frontView || "[]");
      return images.length > 0 ? getImageURI(images[0]) : propertyPicture;
    } catch {
      return propertyPicture;
    }
  }, [property?.frontView]);

  const locationText = useMemo(() => {
    if (!property?.location) return "";
    return property.location.length > 21
      ? `${property.location.slice(0, 20)}... (${
          property.distanceFromCityCenter
        }KM )`
      : `${property.location} ( ${property.distanceFromCityCenter}KM )`;
  }, [property?.location, property?.distanceFromCityCenter]);

  const propertyName = useMemo(() => {
    if (!property?.propertyName) return "";
    return property.propertyName.length > 26
      ? `${property.propertyName.slice(0, 25)}...`
      : property.propertyName;
  }, [property?.propertyName]);

  /* -------------------- JSX (UNCHANGED UI) -------------------- */

  return (
    <Link href={`/property-info/${property?.seoSlug}`}>
      <div
        key={property?.seoSlug}
        //onClick={() => router.push(`/property-info/${property?.seoSlug}`)}
        className={`${
          top ? "w-full min-w-[350px]" : "w-auto"
        } relative border border-[#00000033] rounded-2xl shadow-md bg-white overflow-hidden`}
      >
        {/* Hot Deal */}
        {property?.hotDeal === "Active" && (
          <div className="absolute w-[65px] h-[40px] p-2 top-[10px] right-[10px] flex gap-1 items-center justify-center bg-red-600 rounded-md">
            <FaFire className="text-white" />
            <span className="text-white text-xs font-semibold">Hot Deal</span>
          </div>
        )}

        {/* Approved Badge */}
        {approvedBy === "Active" && (
          <span className="absolute top-3 left-3 bg-[#8A38F5] text-white font-bold text-[10px] px-2 py-1 rounded-md">
            Reparv Assured
          </span>
        )}

        {/* Recommended Badge */}
        {property?.recommended && (
          <span
            className={`absolute ${
              approvedBy ? "top-10" : "top-3"
            } left-3 bg-[#8A38F5] text-white font-bold text-[10px] px-2 py-1 rounded-md`}
          >
            Recommended
          </span>
        )}

        {/* Image */}

        <img
          src={frontImage}
          alt={property?.seoSlug || property?.propertyName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = propertyPicture;
          }}
          loading="lazy"
          decoding="async"
          className="object-contain h-[180px] bg-[#00000020] w-full"
        />

        <div className="relative flex flex-col gap-2">
          {/* Popular tag */}
          {property?.likes > 500 && (
            <img
              src={populerTag}
              className="absolute top-[-15px] left-[-8px]"
              alt="Popular"
            />
          )}

          {/* Content */}
          <div className="p-4 space-y-2 bg-white">
            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-[#868686]">
              <TiLocationOutline size={24} />
              {locationText}
            </div>

            {/* Property Name */}
            <h3 className="font-bold text-sm ml-1">{propertyName}</h3>

            {/* Category & Price */}
            <div className="w-full flex gap-2 items-center justify-between">
              <div className="flex items-center gap-2 ml-1 py-2 px-5 rounded-2xl bg-[#8a38f520] text-[#8A38F5]">
                <RiBuildingLine className="w-4 h-4" />
                <span className="font-bold text-xs">{category}</span>
              </div>

              <div className="flex flex-col pr-2">
                <p className="relative font-extrabold text-xs ml-1 line-through text-[#868686]">
                  {isRental ? (
                    <FormatPrice price={property?.totalSalesPrice} />
                  ) : (
                    <>
                      {property?.totalSalesPrice > 10000000 ? (
                        <>
                          <FormatPrice
                            price={property?.totalSalesPrice / 10000000}
                          />{" "}
                          Cr
                        </>
                      ) : (
                        <>
                          <FormatPrice
                            price={property?.totalSalesPrice / 100000}
                          />{" "}
                          Lac
                        </>
                      )}
                    </>
                  )}
                </p>
                <p className="font-extrabold text-lg ml-1">
                  {isRental ? (
                    <FormatPrice price={property?.totalOfferPrice} />
                  ) : (
                    <>
                      {property?.totalOfferPrice > 10000000 ? (
                        <>
                          <FormatPrice
                            price={property?.totalOfferPrice / 10000000}
                          />{" "}
                          Cr
                        </>
                      ) : (
                        <>
                          <FormatPrice
                            price={property?.totalOfferPrice / 100000}
                          />{" "}
                          Lac
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Owner */}
            <div className="flex justify-between items-center border-t-[#D9D9D9] border-t pt-1">
              <div className="flex items-center gap-2">
                <FaHeart
                  onClick={(e) => {
                    e.stopPropagation();
                    //addLike(property?.propertyid);
                  }}
                  className="w-8 h-8 text-[#8A38F5] cursor-pointer"
                />
                <div className="text-[10px] text-[#868686]">
                  <div className="text-xs text-black font-bold">
                    {property?.likes + property?.views > 0 &&
                      property?.likes + property?.views}
                  </div>
                  <div>Likes</div>
                </div>
              </div>

              <button className="px-4 py-[6px] text-sm font-bold flex items-center justify-center bg-[#8A38F5] text-white rounded-lg cursor-pointer">
                Show Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;

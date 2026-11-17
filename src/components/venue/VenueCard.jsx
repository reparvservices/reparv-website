import Link from "next/link";
import { useMemo } from "react";
import { TiLocationOutline } from "react-icons/ti";
import { RiBuildingLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import FormatPrice from "../FormatPrice";

const FALLBACK_IMAGE = "/assets/property/propertyPicture.svg";

/** Same card as PropertyCard, fed with a bookable venue (villa, hall, farmhouse...). */
function VenueCard({ venue }) {
  const image = venue?.images?.[0] || FALLBACK_IMAGE;

  const locationText = useMemo(() => {
    const text = [venue?.address, venue?.city].filter(Boolean).join(", ");
    return text.length > 28 ? `${text.slice(0, 27)}...` : text;
  }, [venue?.address, venue?.city]);

  const name = useMemo(() => {
    if (!venue?.title) return "";
    return venue.title.length > 26 ? `${venue.title.slice(0, 25)}...` : venue.title;
  }, [venue?.title]);

  const unit = venue?.price_model === "night" ? "night" : "slot";
  const showWeekend =
    venue?.weekend_price && Number(venue.weekend_price) > Number(venue.base_price);

  return (
    <Link href={`/venues/${venue?.id}`}>
      <div className="w-auto relative border border-[#00000033] rounded-2xl shadow-md bg-white overflow-hidden">
        <span className="absolute z-10 top-3 left-3 bg-[#8A38F5] text-white font-bold text-[10px] px-2 py-1 rounded-md">
          Reparv Assured
        </span>

        <img
          loading="lazy"
          decoding="async"
          src={image}
          alt={venue?.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="block h-[180px] w-full object-cover object-center bg-[#00000020]"
        />

        <div className="relative flex flex-col gap-2">
          <div className="p-4 space-y-2 bg-white">
            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-[#868686]">
              <TiLocationOutline size={24} />
              <span className="capitalize">{locationText}</span>
            </div>

            {/* Name */}
            <h3 className="font-bold text-sm ml-1">{name}</h3>

            {/* Type & Price */}
            <div className="w-full flex gap-2 items-center justify-between">
              <div className="flex items-center gap-2 ml-1 py-2 px-5 rounded-2xl bg-[#8a38f520] text-[#8A38F5]">
                <RiBuildingLine className="w-4 h-4" />
                <span className="font-bold text-xs capitalize">{venue?.type_label || venue?.type}</span>
              </div>

              <div className="flex flex-col pr-2">
                {showWeekend ? (
                  <p className="font-extrabold text-xs ml-1 text-[#868686]">
                    Weekend <FormatPrice price={venue.weekend_price} />
                  </p>
                ) : null}
                <p className="font-extrabold text-lg ml-1">
                  <FormatPrice price={venue?.base_price} />
                  <span className="text-[10px] font-semibold text-[#868686]"> / {unit}</span>
                </p>
              </div>
            </div>

            {/* Capacity + action */}
            <div className="flex justify-between items-center border-t-[#D9D9D9] border-t pt-1">
              <div className="flex items-center gap-2">
                <FaHeart className="w-8 h-8 text-[#8A38F5]" />
                <div className="text-[10px] text-[#868686]">
                  <div className="text-xs text-black font-bold">{venue?.capacity}</div>
                  <div>Guests</div>
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

export default VenueCard;

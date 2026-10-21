import { classificationFromProperty } from "../../utils/propertyListing";

// "For Sale / For Rent" + property type for a listing
export default function ListingBadges({ property, className = "" }) {
  if (!property?.propertyCategory) return null;
  const { listingType, propertyKind } = classificationFromProperty(property);
  const tone =
    listingType === "Rent"
      ? "bg-sky-50 text-sky-700 border-sky-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${tone}`}>
        {listingType === "Rent" ? "For Rent" : "For Sale"}
      </span>
      <span className="px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-[11px] font-semibold">
        {propertyKind === "Agriculture" ? "Agriculture / Land" : propertyKind}
      </span>
    </div>
  );
}

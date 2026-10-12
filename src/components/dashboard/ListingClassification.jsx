"use client";

import {
  LISTING_TYPES,
  PROPERTY_KINDS,
  SALE_CONDITIONS,
  categoriesFor,
  categoryLabel,
} from "../../utils/propertyListing";

const tabCls = (active) =>
  `px-5 sm:px-6 py-2 rounded-lg font-semibold border transition ${
    active
      ? "bg-[#8A38F5] text-white border-[#8A38F5]"
      : "border-gray-300 text-gray-700 hover:border-[#8A38F5]"
  }`;

/**
 * Sell / Buy / Rent → (New Launch / Resale) → Residential / Commercial /
 * Agriculture → category. Same flow as the partner portal and app.
 *
 * value    : { listingType, condition, propertyKind, propertyCategory }
 * onChange : fn(nextValue) — upper-level changes clear an invalid category
 */
export default function ListingClassification({ value, onChange }) {
  const update = (patch) => {
    const next = { ...value, ...patch };
    if (!("propertyCategory" in patch)) {
      const stillValid = categoriesFor(next).some(
        (c) => c.value === next.propertyCategory,
      );
      if (!stillValid) next.propertyCategory = "";
    }
    onChange(next);
  };

  const types = categoriesFor(value);
  // Keep an older/unlisted stored category visible in edit mode
  const showStored =
    value.propertyCategory &&
    !types.some((c) => c.value === value.propertyCategory);

  return (
    <div className="mb-6 sm:mb-8">
      {/* Sell / Buy / Rent */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
        What do you want to do? <span className="text-red-500">*</span>
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 max-w-[560px]">
        {LISTING_TYPES.map(({ key, label, hint }) => {
          const active = value.listingType === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => update({ listingType: key })}
              className={`rounded-lg border p-3 text-left transition ${
                active
                  ? "bg-[#8A38F5] text-white border-[#8A38F5]"
                  : "border-gray-300 text-gray-700 hover:border-[#8A38F5]"
              }`}
            >
              <span className="block font-semibold">{label}</span>
              <span
                className={`block text-[11px] leading-tight mt-0.5 ${
                  active ? "text-purple-100" : "text-[#868686]"
                }`}
              >
                {hint}
              </span>
            </button>
          );
        })}
      </div>

      {/* New Launch / Resale (Sell & Buy) */}
      {value.listingType !== "Rent" && (
        <>
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-black">
            {value.listingType === "Buy" ? "Looking for" : "Property is"}
          </h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {SALE_CONDITIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => update({ condition: key })}
                className={tabCls(value.condition === key)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Residential / Commercial / Agriculture */}
      <h3 className="text-base sm:text-lg font-semibold mb-3 text-black">
        Property Type <span className="text-red-500">*</span>
      </h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {PROPERTY_KINDS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => update({ propertyKind: key })}
            className={tabCls(value.propertyKind === key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category */}
      <h3 className="text-base sm:text-lg font-semibold mb-1 text-black">
        Category <span className="text-red-500">*</span>
      </h3>
      <p className="text-sm hidden sm:block mb-4 text-[#868686]">
        Select the category that best describes the property
      </p>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
        {showStored && (
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm bg-[#8A38F5] text-white font-bold border-[#8A38F5]"
          >
            {categoryLabel(value.propertyCategory)} (current)
          </button>
        )}
        {types.map(({ label, value: category, icon: Icon }) => {
          const active = value.propertyCategory === category;
          return (
            <button
              type="button"
              key={category}
              onClick={() => update({ propertyCategory: category })}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                active
                  ? "bg-[#8A38F5] text-white font-bold border-[#8A38F5]"
                  : "border-[#D9D9D9] text-[#868686] hover:border-[#8A38F5]"
              }`}
            >
              <Icon size={16} color={active ? "#FFFFFF" : "#868686"} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

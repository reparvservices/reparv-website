"use client";

import { LuGitCompareArrows } from "react-icons/lu";
import {
  areaModeFor,
  basicDetailFieldsFor,
  parseLandArea,
  LAND_UNITS,
} from "../../utils/propertyListing";

const PURPLE = "#8A38F5";
const GRAY = "#868686";
const inputCls = "w-full rounded-lg px-4 py-2 border outline-none text-black";
const BORDER = { borderColor: "#E0E0E0" };

/** Area column that must be filled for the property's type */
export const requiredAreaField = (property) =>
  areaModeFor(property) === "land" ? "builtUpArea" : "carpetArea";

/**
 * Basic information that changes with the property type
 * (Residential / Commercial / Agriculture-Land):
 *  - built: carpet + built-up area   - plot: plot area   - land: area + unit
 *  - showDetails: furnishing / floors / facing / water / ownership … by type
 */
export default function PropertyBasicDetails({
  newProperty,
  setNewProperty,
  showDetails = true,
}) {
  const mode = areaModeFor(newProperty);
  const set = (patch) => setNewProperty({ ...newProperty, ...patch });
  const land = parseLandArea(newProperty?.builtUpArea);

  return (
    <>
      {/* Property Area */}
      <div className="mb-8 max-w-[400px]">
        <h3 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
          <LuGitCompareArrows color={PURPLE} />{" "}
          {mode === "land" ? "Land Area" : mode === "plot" ? "Plot Area" : "Property Area"}{" "}
          <span className="text-red-500">*</span>
        </h3>

        {mode === "built" && (
          <>
            <div className="flex gap-3 text-black">
              <input
                type="number"
                min="0"
                placeholder="Enter carpet area"
                value={newProperty?.carpetArea || ""}
                onChange={(e) => set({ carpetArea: e.target.value })}
                className={inputCls}
                style={BORDER}
              />
              <select disabled className="rounded-lg px-4 py-2 border appearance-none" style={BORDER}>
                <option>sq.ft</option>
              </select>
            </div>
            <p className="text-xs mt-2 ml-1" style={{ color: GRAY }}>
              Enter the total carpet area
            </p>
            <input
              type="number"
              min="0"
              placeholder="Built up area (sq.ft) — optional"
              value={newProperty?.builtUpArea || ""}
              onChange={(e) => set({ builtUpArea: e.target.value })}
              className={`${inputCls} mt-3`}
              style={BORDER}
            />
          </>
        )}

        {mode === "plot" && (
          <>
            <div className="flex gap-3 text-black">
              <input
                type="number"
                min="0"
                placeholder="Enter plot area"
                value={newProperty?.carpetArea || newProperty?.builtUpArea || ""}
                onChange={(e) =>
                  set({ carpetArea: e.target.value, builtUpArea: e.target.value })
                }
                className={inputCls}
                style={BORDER}
              />
              <select disabled className="rounded-lg px-4 py-2 border appearance-none" style={BORDER}>
                <option>sq.ft</option>
              </select>
            </div>
            <p className="text-xs mt-2 ml-1" style={{ color: GRAY }}>
              Enter the total plot area
            </p>
          </>
        )}

        {mode === "land" && (
          <>
            <div className="flex gap-3 text-black">
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Enter land area"
                value={land.value}
                onChange={(e) =>
                  set({
                    builtUpArea: e.target.value ? `${e.target.value} ${land.unit}` : "",
                    carpetArea: "",
                  })
                }
                className={inputCls}
                style={BORDER}
              />
              <select
                value={land.unit}
                onChange={(e) =>
                  set({
                    builtUpArea: land.value ? `${land.value} ${e.target.value}` : "",
                    carpetArea: "",
                  })
                }
                className="rounded-lg px-4 py-2 border text-black"
                style={BORDER}
              >
                {LAND_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs mt-2 ml-1" style={{ color: GRAY }}>
              Enter the total land area and choose the unit
            </p>
          </>
        )}
      </div>

      {/* Type-specific details */}
      {showDetails && (
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
            {mode === "land" ? "Land Details" : "Property Details"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicDetailFieldsFor(newProperty).map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium mb-1 ml-1">{f.label}</label>
                {f.type === "select" ? (
                  <select
                    value={newProperty?.[f.key] || ""}
                    onChange={(e) => set({ [f.key]: e.target.value })}
                    className={inputCls}
                    style={BORDER}
                  >
                    <option value="">Select</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    min="0"
                    placeholder={f.placeholder}
                    value={newProperty?.[f.key] || ""}
                    onChange={(e) => set({ [f.key]: e.target.value })}
                    className={inputCls}
                    style={BORDER}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

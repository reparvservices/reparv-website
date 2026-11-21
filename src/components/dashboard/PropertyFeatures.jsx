"use client";

import { FaBuilding, FaCouch, FaShieldAlt, FaRupeeSign } from "react-icons/fa";
import { FieldLabel, FieldInput, PillSelect, PillMultiSelect, Grid2, Grid3 } from "./FormUI";

const PURPLE = "#8A38F5";

/** The optional listing details the partner and admin forms have: charges, specs, features, benefits. */
export const FEATURE_DEFAULTS = {
  stampDuty: "", registrationFee: "", gst: "", advocateFee: "", msebWater: "", maintenance: "", other: "", tags: "",
  possessionDate: "", builtYear: "", ownershipType: "", totalFloors: "", floorNo: "", parkingAvailability: "",
  loanAvailability: "", propertyFacing: "", reraRegistered: "", furnishing: "", waterSupply: "", powerBackup: "",
  locationFeature: [], sizeAreaFeature: "", parkingFeature: "", terraceFeature: "", ageOfPropertyFeature: "",
  amenitiesFeature: [], propertyStatusFeature: "", smartHomeFeature: [],
  securityBenefit: [], primeLocationBenefit: [], rentalIncomeBenefit: [], qualityBenefit: [],
  capitalAppreciationBenefit: [], ecofriendlyBenefit: [],
};
export const FEATURE_KEYS = Object.keys(FEATURE_DEFAULTS);

const CHARGES = [
  ["stampDuty", "Stamp Duty"], ["registrationFee", "Registration Fee"], ["gst", "GST"], ["advocateFee", "Advocate Fee"],
  ["msebWater", "MSEB / Water Charges"], ["maintenance", "Maintenance"], ["other", "Other Charges"],
];
const YES_NO = ["Yes", "No"];
const STATUS = ["Ready to Move", "Under Construction", "New Launch", "Resale"];

const HIGHLIGHTS = [
  ["locationFeature", "Location Features", ["Near School", "Near Hospital", "Near Market", "Near Railway Station", "Near Bus Stop", "Near Airport", "Near Mall", "Near Park"]],
  ["amenitiesFeature", "Amenities", ["Gym", "Swimming Pool", "Clubhouse", "Children's Play Area", "Garden", "Lift", "Power Backup", "Security", "Indoor Games", "Jogging Track", "Community Hall", "CCTV"]],
  ["smartHomeFeature", "Smart Home Features", ["Smart Locks", "Smart Lighting", "Video Door Phone", "Home Automation", "Smart Thermostat"]],
];
const BENEFITS = [
  ["securityBenefit", "Security", ["24x7 Security Guard", "CCTV Surveillance", "Gated Community", "Fire Safety"]],
  ["primeLocationBenefit", "Prime Location", ["Prime Location", "Well Connected", "Close to IT Hub", "Close to Highway"]],
  ["rentalIncomeBenefit", "Rental Income", ["High Rental Demand", "Good Rental Yield", "Furnished for Rent"]],
  ["qualityBenefit", "Quality", ["Premium Construction", "Branded Fittings", "Earthquake Resistant"]],
  ["capitalAppreciationBenefit", "Capital Appreciation", ["High Growth Area", "Upcoming Infrastructure", "Investment Hotspot"]],
  ["ecofriendlyBenefit", "Eco-Friendly", ["Solar Panels", "Rainwater Harvesting", "Green Building", "EV Charging"]],
];

const Heading = ({ icon, children }) => (
  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 text-black">
    {icon} {children}
  </h3>
);

/** value: the property object; onChange(patch) merges fields; builtUp = floors/furnishing/parking apply */
export default function PropertyFeatures({ value, onChange, builtUp = true }) {
  const set = (key) => (e) => onChange({ [key]: e.target.value });
  const pick = (key) => (val) => onChange({ [key]: val });
  const text = (key, label, props = {}) => (
    <div key={key}>
      <FieldLabel>{label}</FieldLabel>
      <FieldInput value={value[key] ?? ""} onChange={set(key)} {...props} />
    </div>
  );
  const pills = (key, label, options) => (
    <div className="mt-4" key={key}>
      <FieldLabel>{label}</FieldLabel>
      <PillSelect options={options} value={value[key] ?? ""} onChange={pick(key)} />
    </div>
  );
  const multi = (key, label, options) => (
    <div className="mb-4" key={key}>
      <FieldLabel>{label}</FieldLabel>
      <PillMultiSelect options={options} value={value[key] || []} onChange={pick(key)} />
    </div>
  );

  return (
    <>
      <div className="mb-8">
        <Heading icon={<FaRupeeSign color={PURPLE} />}>Charges &amp; Tags</Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHARGES.map(([key, label]) => text(key, label, { type: "number", placeholder: "₹ 00" }))}
          <div className="sm:col-span-2">
            {text("tags", "Tags (comma separated)", { placeholder: "e.g. spacious, well-lit, corner-plot" })}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Heading icon={<FaBuilding color={PURPLE} />}>Property Specifications</Heading>
        <Grid2>
          {text("possessionDate", "Possession Date", { type: "date" })}
          {builtUp && text("builtYear", "Built Year", { type: "number", placeholder: "e.g. 2015" })}
        </Grid2>
        <Grid2>
          {pills("reraRegistered", "RERA Registered", YES_NO)}
          {pills("loanAvailability", "Loan Availability", YES_NO)}
        </Grid2>
      </div>

      <div className="mb-8">
        <Heading icon={<FaCouch color={PURPLE} />}>Feature Highlights</Heading>
        {HIGHLIGHTS.map(([key, label, options]) => multi(key, label, options))}
        <Grid3>
          {text("sizeAreaFeature", "Size / Area Highlight", { placeholder: "e.g. Spacious 3BHK" })}
          {text("parkingFeature", "Parking Highlight", { placeholder: "e.g. Covered Parking" })}
          {text("terraceFeature", "Terrace Highlight", { placeholder: "e.g. Private Terrace" })}
        </Grid3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {text("ageOfPropertyFeature", "Age of Property", { placeholder: "e.g. 5 years old" })}
          <div>
            <FieldLabel>Property Status</FieldLabel>
            <PillSelect options={STATUS} value={value.propertyStatusFeature ?? ""} onChange={pick("propertyStatusFeature")} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Heading icon={<FaShieldAlt color={PURPLE} />}>Benefits &amp; Highlights</Heading>
        {BENEFITS.map(([key, label, options]) => multi(key, label, options))}
      </div>
    </>
  );
}

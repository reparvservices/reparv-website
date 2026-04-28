import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";
import FormatPrice from "../FormatPrice";

const PriceSummery = () => {
  const { priceSummery, setShowPriceSummery } = useAuth();
  const parse = (val) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };
  console.log(priceSummery);

  const basePrice = parse(priceSummery?.totalOfferPrice);

  const stampDuty = (parse(priceSummery?.stampDuty) * basePrice) / 100;
  const registrationFee = (parse(priceSummery?.registrationFee) * basePrice) / 100; 
  const gst = (parse(priceSummery?.gst) * basePrice) / 100;

  const advocateFee = parse(priceSummery?.advocateFee);
  const msebWater = parse(priceSummery?.msebWater);
  const maintenance = parse(priceSummery?.maintenance);
  const other = parse(priceSummery?.other);

  const totalPrice =
    basePrice +
    stampDuty +
    registrationFee +
    gst +
    advocateFee +
    msebWater +
    maintenance +
    other;

  return (
    <div className="absolute bottom-0 sm:top-25 max-w-3xl overflow-scroll scrollbar-hide mx-auto h-[90vh] sm:h-[75vh] bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-xl shadow-xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-5 ">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Price Summery</h2>
          <p className="text-sm text-gray-500">
            Check Your complete price breakup
          </p>
        </div>

        <RxCross2
          onClick={() => {
            setShowPriceSummery(false);
          }}
          className="w-5 h-5 sm:w-7 sm:h-7 cursor-pointer hover:text-[#076300] active:scale-95"
        />
      </div>

      <div className="px-4 py-2 font-medium bg-[#FAFAFA] rounded-xl">
        <div className="flex justify-between py-3">
          <span>Base Price</span>
          <span>{<FormatPrice price={basePrice} />}</span>
        </div>

        <div className="py-2">
          <div className="flex justify-between">
            <span>Stamp Duty</span>
            <span>{priceSummery.stampDuty}%</span>
          </div>
          <p className="w-2/3 text-xs text-[#00000066] mt-1">
            Stamp duty is a state government tax paid by the buyer to legally
            register property ownership. In Maharashtra, it ranges from 5% to 7%
            of the property value
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between">
            <span>Registration Fee</span>
            <span>{priceSummery.registrationFee}%</span>
          </div>
          <p className="w-2/3 text-xs text-[#00000066] mt-1">
            Property registration charges are government fees paid to legally
            record a property in the buyer’s name. Women buyers receive a 1%
            concession.
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between">
            <span>GST</span>
            <span>{priceSummery.gst}%</span>
          </div>
          <p className="w-2/3 text-xs text-[#00000066] mt-1">
            GST on property is applicable at 5% for under-construction homes
            (without ITC benefit) and 1% for affordable housing, while no GST is
            charged on ready-to-move-in properties.
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between py-2">
            <span>Advocate Fee</span>
            <span>{<FormatPrice price={parse(priceSummery.advocateFee)} />}</span>
          </div>
          <p className="w-2/3 text-xs text-[#00000066] mt-1">
            Advocate fees for property purchase covering legal due diligence,
            agreement drafting, and registration assistance.
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between py-2">
            <span>MSEB & Water</span>
            <span>{<FormatPrice price={parse(priceSummery.msebWater)} />}</span>
          </div>
          <p className="w-2/3 text-xs text-[#00000066] mt-1">
            MSEB (electricity) and water connection fees are government charges
            paid during property possession.
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between py-2">
            <span>Maintainance</span>
            <span>{<FormatPrice price={parse(priceSummery.maintenance)} />}</span>
          </div>
          <p className="w-2/3 text-xs text-[#00000066] mt-1">
            Maintenance charges are monthly fees paid by property owners for
            upkeep of common areas and amenities
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between">
            <span>Other</span>
            <span>{<FormatPrice price={parse(priceSummery.other)} />}</span>
          </div>
          <p className="w-2/3 text-xs text-gray-500 mt-1">
            Other charges in property transactions can include society formation
            fees, parking fees, legal charges, etc.
          </p>
        </div>
      </div>

      <div className="flex justify-between font-bold text-lg pt-4">
        <span>Total Property Price</span>
        <span>{<FormatPrice price={totalPrice} />}</span>
      </div>
    </div>
  );
};

export default PriceSummery;

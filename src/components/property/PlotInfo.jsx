import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";
import FormatPrice from "../FormatPrice";

const PlotInfo = () => {
  const {
    URI,
    setLoading,
    propertyInfoId,
    setPropertyInfoId,
    setShowPlotInfoPopup,
  } = useAuth();
  const [plot, setPlot] = useState({});

  //Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URI}/frontend/properties/additionalinfo/plot/get/${propertyInfoId}`,
        {
          method: "GET",
          credentials: "include", //  Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Plot Data.");
      const data = await response.json();
      //console.log(data);
      setPlot(data);
    } catch (err) {
      console.error("Error fetching Property Plot Data :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [propertyInfoId]);

  return (
    <div className="absolute bottom-0 md:top-[150px] max-w-4xl overflow-scroll scrollbar-hide mx-auto w-full md:w-[600px] lg:w-[800px] max-h-[90vh] sm:max-h-[70vh] bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-xl shadow-xl p-4 pt-6 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-5 ">
        <h2 className="text-lg font-semibold">Property Details</h2>
        <RxCross2
          onClick={() => {
            setShowPlotInfoPopup(false);
          }}
          className="w-5 h-5 sm:w-7 sm:h-7 cursor-pointer hover:text-[#8A38F5] active:scale-95"
        />
      </div>
      {/* Data */}
      <div className="grid gap-2 lg:gap-x-8 lg:gap-y-3 grid-cols-1 lg:grid-cols-2">
        <div className="w-full lg:col-span-2 flex items-center justify-between">
          <span className="text-gray-700 font-medium">Mouza</span>
          <span className="text-black font-semibold">{plot.mouza}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Khasra No</span>
          <span className="text-black font-semibold">{plot.khasrano}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">plot Number</span>
          <span className="text-black font-semibold">{plot.plotno || 0}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">plot Facing</span>
          <span className="text-black font-semibold">{plot.plotfacing}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Plot Size</span>
          <span className="text-black font-semibold">{plot.plotsize}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Plot Area</span>
          <span className="text-black font-semibold">
            {plot.payablearea} sq.ft.
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Sqft Price</span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseInt(plot.sqftprice)} />
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Stamp Duty</span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseInt(plot.stampduty)} />
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Registration</span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseInt(plot.registration || 0)} />
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Advocate Fee</span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseInt(plot.advocatefee || 0)} />
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Maintenance</span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseInt(plot.maintenance || 0)} />
          </span>
        </div>

        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">GST</span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseInt(plot.gst || 0)} />
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-gray-700 font-medium">Other</span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseInt(plot.other || 0)} />
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex flex-col gap-2 pb-4">
        <div className="lg:col-span-2 border border-gray-700" />
        <div className="w-full flex items-center justify-between">
          <span className="text-base text-black font-semibold">
            Total Price
          </span>
          <span className="text-black font-semibold">
            <FormatPrice price={parseFloat(plot.totalcost)} />
          </span>
        </div>
        <div className="lg:col-span-2 border border-gray-700" />
      </div>
    </div>
  );
};

export default PlotInfo;

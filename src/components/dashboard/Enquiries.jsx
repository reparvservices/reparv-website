import { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { getImageURI } from "../../utils/helper";

export default function Enquiries({ enquiries }) {

  const [visibleEnquiriesCount, setVisibleEnquiriesCount] = useState(3);
  const visibleEnquiries = enquiries?.slice(0, visibleEnquiriesCount);

  return (
    <div className="md:bg-white md:rounded-xl md:border border-[#D9D9D9] md:p-4">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">Recent Enquiries</h2>

      {/* List */}
      <div className="space-y-4 w-full">
        {visibleEnquiries?.map((item) => (
          <div
            key={item?.enquirersid}
            className="w-full flex flex-col gap-2 md:flex-row items-center justify-between border border-[#D9D9D9] rounded-xl p-4"
          >
            {/* Left */}
            <div className="w-full flex md:items-center gap-4">
              <div className="w-14 h-14">
                <img
                  src={(() => {
                    try {
                      const images = JSON.parse(item?.frontView || "[]");
                      return images.length > 0
                        ? `${getImageURI(images[0])}`
                        : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
                    } catch {
                      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
                    }
                  })()}
                  alt={item?.seoSlug || item?.propertyName}
                  onError={(e) => {
                    e.currentTarget.src = propertyPicture;
                  }}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold text-base">{item?.propertyName}</h3>
                <p className="flex flex-col md:flex-row text-[#828282] text-xs mt-1">
                  <span>{item?.email || "123@abc.com"}</span>{" "}
                  <span className="mx-2 hidden md:block">•</span>{" "}
                  <span>{item?.contact || "+91XXXXXXX..."}</span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="w-full flex md:flex-col items-center justify-between md:items-end gap-2">
              <div className="text-xs text-gray-400">{item.created_at}</div>

              <button className="flex items-center gap-2 bg-[#5323DC] text-xs text-white px-4 py-2 rounded-lg hover:bg-[#5423dcf6] transition">
                Reply <IoMdSend />
              </button>
            </div>
          </div>
        ))}

        {/* Load more Properties Button */}
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => {
              setVisibleEnquiriesCount((c) => c + 3);
            }}
            className="px-6 py-2 border border-[#8A38F5] font-semibold rounded-full bg-white text-[#8A38F5] hover:bg-purple-50 shadow cursor-pointer"
          >
            Load More Enquiries
          </button>
        </div>
      </div>
    </div>
  );
}

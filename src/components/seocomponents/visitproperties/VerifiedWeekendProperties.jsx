import propertyImg from "../../../assets/seopageassets/visitproperties/property-image.jpg";
import locationIcon from "../../../assets/seopageassets/visitproperties/location.svg";
import userIcon from "../../../assets/seopageassets/visitproperties/profile.svg";

export default function VerifiedWeekendProperties() {
  const properties = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    title: "3 BHK MarlBoro House",
    location: "Property Location (5KM)",
    price: "₹15Lakh",
    oldPrice: "₹20Lakh",
    tag: "New Flat",
    owner: "Lucky",
  }));

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1380px] mx-auto px-4">
        {/* HEADER */}
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-black mb-12">
          Verified Properties Available for Weekend{" "}
          <br className="hidden sm:block" />
          visits in Nagpur
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={propertyImg}
                  alt={item.title}
                  className="w-full h-[200px] object-cover"
                />

                {/* BADGE */}
                <span className="absolute top-3 left-3 bg-[#7C3AED] text-white text-xs px-3 py-1 rounded-full">
                  EMI Matched
                </span>

                {/* HEART */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                  ❤️
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                {/* LOCATION */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <img src={locationIcon} alt="" className="w-4 h-4" />
                  {item.location}
                </div>

                {/* TITLE */}
                <h4 className="font-semibold text-black">{item.title}</h4>

                {/* TAG + PRICE */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs bg-[#F3ECFF] text-[#7C3AED] px-3 py-1 rounded-full">
                    🏢 {item.tag}
                  </span>

                  <div className="text-right">
                    <p className="text-xs text-gray-400 line-through">
                      {item.oldPrice}
                    </p>
                    <p className="text-lg font-bold text-black">{item.price}</p>
                  </div>
                </div>

                <hr />

                {/* FOOTER */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <img src={userIcon} alt="" className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{item.owner}</p>
                      <p className="text-xs text-gray-500">Owner</p>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

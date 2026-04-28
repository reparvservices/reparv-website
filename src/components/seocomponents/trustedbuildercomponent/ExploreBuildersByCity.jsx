import mumbaiIcon from "../../../assets/seopageassets/turstedbuilder/mumbai-icon.svg";
import delhiIcon from "../../../assets/seopageassets/turstedbuilder/delhi-icon.svg";
import bangaloreIcon from "../../../assets/seopageassets/turstedbuilder/bangalore-icon.svg";
import puneIcon from "../../../assets/seopageassets/turstedbuilder/pune-icon.svg";

export default function ExploreBuildersByCity() {
  const cities = [
    { name: "Mumbai", icon: mumbaiIcon },
    { name: "Delhi", icon: delhiIcon },
    { name: "Bangalore", icon: bangaloreIcon },
    { name: "Pune", icon: puneIcon },
  ];

  return (
    <section className="bg-white py-7 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        {/* HEADER */}
        <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
          Explore Builders by City
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-3">
          Find trusted builders in your preferred location
        </p>

        {/* CITY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {cities.map((city) => (
            <div
              key={city.name}
              className="border border-[#D0D0D0] rounded-2xl p-8 bg-white hover:shadow-md transition text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F4EEFF] flex items-center justify-center">
                <img src={city.icon} alt={city.name} className="w-9 h-9" />
              </div>

              <h4 className="text-xl font-bold text-black">{city.name}</h4>

              <p className="text-sm text-gray-500 mt-2">85 Builders</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

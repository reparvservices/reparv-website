import projectImg from "../../../assets/seopageassets/turstedbuilder/property-image.jpg";
import locationIcon from "../../../assets/seopageassets/turstedbuilder/location.svg";
import heartIcon from "../../../assets/seopageassets/turstedbuilder/heart.svg";

export default function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "Prestige Lakeside Habitat",
      builder: "Prestige Group",
      location: "City, state",
      image: projectImg,
    },
    {
      id: 2,
      title: "Prestige Lakeside Habitat",
      builder: "Prestige Group",
      location: "City, state",
      image: projectImg,
    },
    {
      id: 3,
      title: "Prestige Lakeside Habitat",
      builder: "Prestige Group",
      location: "City, state",
      image: projectImg,
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl mx-auto">
            Discover premium residential and commercial projects from verified
            builders across India
          </p>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-[0_12px_40px_#00000014] overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-[200px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {/* HEART ICON */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                  <img src={heartIcon} alt="wishlist" className="w-4 h-4" />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-semibold text-sm mb-1">{project.title}</h4>

                <p className="text-xs text-gray-500 mb-2">
                  by {project.builder}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <img src={locationIcon} alt="location" className="w-4 h-4" />
                  {project.location}
                </div>

                <button className="mt-auto w-full h-[40px] bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="flex justify-center mt-10">
          <button className="px-8 h-[44px] border border-[#7C3AED] text-[#7C3AED] rounded-lg font-semibold hover:bg-[#7C3AED] hover:text-white transition">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

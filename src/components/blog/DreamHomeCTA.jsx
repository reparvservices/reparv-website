import { FaSearch, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DreamHomeCTA() {
  const navigate = useNavigate();
  return (
    <section className="w-full max-[1380px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div
        className="relative overflow-hidden rounded-2xl px-6 sm:px-10 lg:px-20 py-12 sm:py-16 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg, #2B1A66 0%, #5B2EEA 55%, #A78BFA 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 -right-28 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            Ready to Find Your Dream Home?
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Explore thousands of verified properties or download our app for the
            best mobile experience
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <button
              onClick={() => {
                navigate("/properties");
              }}
              className="flex items-center gap-3 bg-white text-[#5B2EEA] font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
            >
              <FaSearch />
              Explore Properties
            </button>

            <button onClick={()=>{window.open(
                "https://play.google.com/store/apps/details?id=com.reparvcustomer",
                "_blank"
              );}} className="flex items-center gap-3 border border-white/70 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 hover:scale-105 transition">
              <FaDownload />
              Download Our App
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

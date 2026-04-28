import badgeIcon from "../../../assets/seopageassets/verify712/badge.svg";
import docImage from "../../../assets/seopageassets/verify712/banner-image.svg";

export default function Verify712Hero() {
  return (
    <section className="bg-white py-4 sm:py-6">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold text-black leading-tight">
            Verify <span class="text-[#7C3AED]">7/12 Utara</span> Online
          </h1>

          <p className="text-base sm:text-lg mt-3 text-black">
            Maharashtra Land Records Made Simple
          </p>

          <p className="text-sm sm:text-base text-gray-500 mt-4 max-w-xl mx-auto lg:mx-0">
            Access and verify authentic land records from the Maharashtra
            government portal. Get instant information about property ownership,
            cultivation details, and land rights.
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6 text-sm sm:text-base">
            {["Official Records", "Instant Verification", "100% Secure"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <img src={badgeIcon} alt="" className="w-4 h-4" />
                  <span className="font-semibold">{item}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* RIGHT IMAGE — DESKTOP ONLY */}
        <div className="hidden lg:flex justify-end">
          <img src={docImage} alt="7/12 Document" className="w-full max-w-md" />
        </div>
      </div>
    </section>
  );
}

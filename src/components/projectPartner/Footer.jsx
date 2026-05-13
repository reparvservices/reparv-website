import { useState } from "react";

const tabs = [
  {
    id: "real-estate",
    label: "REAL ESTATE",
    title: "Find Properties for Sale",
    items: [
      "Flats in Mumbai",
      "Flats in Bengaluru",
      "Flats in Hyderabad",
      "Flats in Pune",
      "Flats in Chennai",
      "Flats in Delhi",
      "Flats in Gurgaon",
      "Flats in Noida",
      "Flats in Kolkata",
      "Flats in Ahmedabad",
      "Flats in Thane",
      "Flats in Navi Mumbai",
      "Flats in Faridabad",
      "Flats in Ghaziabad",
      "Flats in Coimbatore",
      "Properties in India",
      "Agricultural Lands in India",
      "Plots in India",
    ],
  },
  {
    id: "rentals",
    label: "RENTALS",
    title: "Find Properties for Rent",
    items: [
      "Flats for Rent in Mumbai",
      "Flats for Rent in Bengaluru",
      "Flats for Rent in Delhi",
      "Flats for Rent in Pune",
      "Flats for Rent in Hyderabad",
      "Houses for Rent in Gurgaon",
      "PG & Co-living in Noida",
      "1 BHK for Rent in Chennai",
    ],
  },
  {
    id: "projects",
    label: "PROJECTS",
    title: "New Projects & Launches",
    items: [
      "New Projects in Mumbai",
      "Upcoming Projects in Bengaluru",
      "Ready to Move Projects in Pune",
      "Under Construction in Delhi NCR",
      "Luxury Projects in Hyderabad",
    ],
  },
  {
    id: "city-data",
    label: "CITY DATA",
    title: "Explore City Insights",
    items: [
      "Property Rates in Mumbai",
      "Price Trends in Bengaluru",
      "Locality Reviews in Delhi",
      "Best Areas to Live in Pune",
      "Rental Yield in Hyderabad",
    ],
  },
  {
    id: "popular",
    label: "POPULAR SEARCHES",
    title: "Popular Property Searches",
    items: [
      "3 BHK Flats in Mumbai",
      "Villas in Bengaluru",
      "Apartments in Pune",
      "Plots in Hyderabad",
      "Luxury Homes in Delhi NCR",
    ],
  },
];

export default function Footer() {
  const [activeTab, setActiveTab] = useState("real-estate");
  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <footer className="bg-[#111111] text-white">
      {/* Top Tabs */}
      <div className="border-b border-[#333333]">
        <div className="px-4 overflow-x-auto scrollbar-hide">
          <nav className="flex gap-8 py-5 text-[11px] md:text-xs font-medium uppercase tracking-[0.12em] whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 border-b-2 transition-all duration-300 flex-shrink-0 ${
                  activeTab === tab.id
                    ? "border-white text-white font-bold"
                    : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Property Links Section */}
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs md:text-sm">
          <div>
            <h4 className="font-semibold mb-4 text-white">
              {currentTab.title}
            </h4>
            <ul className="space-y-2 text-gray-300">
              {currentTab.items.slice(0, 5).map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <ul className="space-y-2 text-gray-300 mt-10">
              {currentTab.items.slice(5, 10).map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <ul className="space-y-2 text-gray-300 mt-10">
              {currentTab.items.slice(10, 15).map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <ul className="space-y-2 text-gray-300 mt-10">
              {currentTab.items.slice(15).map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MOBILE: Banner First + Full Width */}
      <div className="lg:hidden px-4 py-8 border-t border-[#333333]">
        <img
          src="/assets/projectPartner/footer-banner.png"
          alt="Come home to Greatness"
          className="w-full rounded-md shadow-lg"
        />
      </div>

      {/* MOBILE: Company / Partner / Explore / App Section */}
      <div className="lg:hidden px-4 pb-10 space-y-8 text-xs text-gray-300">
        <div>
          <h4 className="font-bold text-white mb-3">COMPANY</h4>
          <p>
            Careers | About Us | For Partners | Terms | Annual Return | Privacy
            Policy | Contact Us | Unsubscribe | Merger Hearing Advertisement
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">PARTNER SITES</h4>
          <p>realestate.com.au | realtor.com | 99.co | collinsdictionary.com</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">EXPLORE</h4>
          <p>News | Home Loans | Sitemap | International</p>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider mb-4">
              Experience Housing App on Mobile
            </h4>
            <div className="flex gap-4">
              <img src="/assets/app-store.png" alt="App Store" className="h-10" />
              <img src="/assets/google-play.png" alt="Google Play" className="h-10" />
            </div>
          </div>
          <div className="flex gap-5 items-start">
            <div className="w-16 h-16 bg-white p-1 rounded flex-shrink-0">
              <img
                src="/assets/projectPartner/qrcode.png"
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[11px] leading-snug">
              Open camera & scan the QR code to download the app.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider mb-4">
              FOLLOW
            </h4>
            <div className="flex gap-6 text-2xl">
              <i className="bi bi-facebook hover:text-white cursor-pointer transition" />
              <i className="bi bi-instagram hover:text-white cursor-pointer transition" />
              <i className="bi bi-twitter hover:text-white cursor-pointer transition" />
              <i className="bi bi-linkedin hover:text-white cursor-pointer transition" />
              <i className="bi bi-youtube hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP: Banner (~30%) + Links (~70%) Side by Side */}
      <div className="hidden lg:block border-t border-[#333333]">
        <div className="px-4 py-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-12 gap-10 items-start">
            {/* Banner - ~30% width */}
            <div className="col-span-4">
              <img
                src="/assets/projectPartner/footer-banner.png"
                alt="Come home to Greatness"
                className="w-full rounded-md shadow-lg"
              />
            </div>

            {/* Right Side Links - ~70% */}
            <div className="col-span-8 grid grid-cols-4 gap-8 text-xs">
              {/* COMPANY */}
              <div>
                <h4 className="font-bold text-white mb-4">COMPANY</h4>
                <ul className="space-y-2 text-gray-300">
                  {[
                    "Careers",
                    "About Us",
                    "For Partners",
                    "Terms",
                    "Annual Return",
                    "Privacy Policy",
                    "Contact Us",
                    "Unsubscribe",
                    "Merger Hearing Advertisement",
                  ].map((item) => (
                    <li
                      key={item}
                      className="hover:text-white cursor-pointer transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* PARTNER SITES */}
              <div>
                <h4 className="font-bold text-white mb-4">PARTNER SITES</h4>
                <ul className="space-y-2 text-gray-300">
                  {[
                    "realestate.com.au",
                    "realtor.com",
                    "99.co",
                    "collinsdictionary.com",
                  ].map((site) => (
                    <li
                      key={site}
                      className="hover:text-white cursor-pointer transition"
                    >
                      {site}
                    </li>
                  ))}
                </ul>
              </div>

              {/* EXPLORE */}
              <div>
                <h4 className="font-bold text-white mb-4">EXPLORE</h4>
                <ul className="space-y-2 text-gray-300">
                  {["News", "Home Loans", "Sitemap", "International"].map(
                    (item) => (
                      <li
                        key={item}
                        className="hover:text-white cursor-pointer transition"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* App + QR + Social */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-4">
                    Experience Housing App on Mobile
                  </h4>
                  <div className="flex gap-4">
                    <img src="/assets/app-store.png" alt="App Store" className="h-10" />
                    <img
                      src="/assets/google-play.png"
                      alt="Google Play"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-16 h-16 bg-white p-1 rounded flex-shrink-0">
                    <img
                      src="/assets/projectPartner/qrcode.png"
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-gray-300 leading-snug">
                    Open camera & scan the QR code to download the app.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-4">
                    FOLLOW
                  </h4>
                  <div className="flex gap-6 text-2xl text-gray-300">
                    <i className="bi bi-facebook hover:text-white cursor-pointer transition" />
                    <i className="bi bi-instagram hover:text-white cursor-pointer transition" />
                    <i className="bi bi-twitter hover:text-white cursor-pointer transition" />
                    <i className="bi bi-linkedin hover:text-white cursor-pointer transition" />
                    <i className="bi bi-youtube hover:text-white cursor-pointer transition" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#0D0D0D] py-6 border-t border-[#222222]">
        <div className="px-4 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-400">
          <p>© 2012-2025 reparv Pvt. Ltd. All Rights Reserved</p>
          <div className="flex gap-6 mt-4 md:mt-0 text-lg">
            <i className="bi bi-facebook hover:text-white cursor-pointer" />
            <i className="bi bi-instagram hover:text-white cursor-pointer" />
            <i className="bi bi-twitter hover:text-white cursor-pointer" />
            <i className="bi bi-linkedin hover:text-white cursor-pointer" />
            <i className="bi bi-youtube hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </footer>
  );
}

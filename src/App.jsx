import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";

import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

// privacy Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PropertyDetails from "./pages/PropertyDetails";
import Blog from "./pages/Blog";

//import BlogDetails from "./pages/BlogDetails";
import BlogDetails from "./pages/BlogDetails";
import ErrorPage from "./pages/ErrorPage";
import CheckEligibility from "./pages/CheckEligibility";

// useAuth Gobal Variables
import { useAuth } from "./store/auth";

import ProjectPartner from "./pages/ProjectPartner";
import SellOldProperty from "./pages/SellOldProperty";
import RentProperty from "./pages/RentProperty";
import BuyNewProperty from "./pages/BuyNewProperty";
import BuyResaleProperty from "./pages/BuyResaleProperty";

import RentalProperty from "./pages/RentalProperty";

import Dashboard from "./pages/Dashboard";
import SellProperty from "./components/dashboard/SellProperty";
import EditProperty from "./components/dashboard/EditProperty";
import Profile from "./components/dashboard/Profile";
import MyListingsMobile from "./components/dashboard/MyListingsMobile";
import EditProfile from "./components/dashboard/EditProfile";
import HomeLoan from "./components/dashboard/HomeLoan";
import HomeLoanForm from "./pages/HomeLoanForm";
import Activity from "./pages/Activity";
import NewsPage from "./pages/NewsSection";
import NewsDetailsPage from "./pages/NewsDetailsPage";

// SEO Pages
import EmiCalculator from "./pages/EmiCalculator";
import CostCalculator from "./pages/CostCalculator";
import ReraProperty from "./pages/ReraProperty";
import Verify712 from "./pages/Verify712";
import TrustedBuilder from "./pages/TrustedBuilder";
import VisitPropertiesOnWeekend from "./pages/VisitPropertiesOnWeekend";
import SuccessScreen from "./pages/SuccessScreen";

function App() {
  const { propertyType, selectedCity } = useAuth();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/project-partner/:contact" element={<ProjectPartner />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sell-old-property" element={<SellOldProperty />} />
          <Route path="/rent-property" element={<RentProperty />} />
          <Route path="/buy-new-property" element={<BuyNewProperty />} />
          <Route path="/buy-resale-property" element={<BuyResaleProperty />} />
          <Route path="/rental-property" element={<RentalProperty />} />

          <Route path="/properties" element={<Properties />} />
          <Route
            path="/properties/type/:listingType"
            element={<Properties />}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sell-properties" element={<SellProperty />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />

          <Route path="/activities" element={<Activity />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<EditProfile />} />
          <Route path="/my-listings" element={<MyListingsMobile />} />
          <Route path="/home-loan" element={<HomeLoan />} />
          <Route path="/home-loan-application" element={<HomeLoanForm />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/cost-calculator" element={<CostCalculator />} />
          <Route path="/rera-properties" element={<ReraProperty />} />
          <Route path="/verify-7-12" element={<Verify712 />} />
          <Route path="/trusted-builders" element={<TrustedBuilder />} />
          <Route
            path="/visit-properties-on-week-ends"
            element={<VisitPropertiesOnWeekend />}
          />

          <Route path="/properties/:slug" element={<Properties />} />
          <Route
            path="/:bhkType/:propertyCategory/in/:city"
            element={<Properties />}
          />
          <Route path="/:slug" element={<Properties />} />

          <Route path="/property-info/:id" element={<PropertyDetails />} />
          <Route path="/property-details" element={<PropertyDetails />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/cancellation-policy" element={<RefundPolicy />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:newsId" element={<NewsDetailsPage />} />
          <Route path="/thank-you" element={<SuccessScreen />} />
        </Route>
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

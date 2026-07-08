import HeroSection from "../components/seoPages/budgetJourneyPage/HeroSection.jsx";
import WhyStressful from "../components/seoPages/budgetJourneyPage/WhyStressful.jsx";
import BudgetDilemmas from "../components/seoPages/budgetJourneyPage/BudgetDilemmas.jsx";
import BuyerStories from "../components/seoPages/budgetJourneyPage/BuyerStories.jsx";
import BudgetShift from "../components/seoPages/budgetJourneyPage/BudgetShift.jsx";
import SmartChoices from "../components/seoPages/budgetJourneyPage/SmartChoices.jsx";
import FAQSection from "../components/seoPages/budgetJourneyPage/FaqSection.jsx";
import AdvertisementCard from "../components/AdvertisementCard";

export default function BudgetJourneyPage({
  initialPageData = null,
  initialFaqs = [],
}) {
  const city = initialPageData?.city || "Nagpur";

  return (
    <main className="min-h-screen font-sans antialiased">
      <HeroSection pageData={initialPageData} />
      <WhyStressful />
      <BudgetDilemmas />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard variant="seoDisplay" />
      </div>
      <BuyerStories pageData={initialPageData} />
      <BudgetShift pageData={initialPageData} />
      <SmartChoices city={city} pageData={initialPageData} />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard variant="seoInFeed" />
      </div>
      <FAQSection initialFaqs={initialFaqs} pageData={initialPageData} />
    </main>
  );
}

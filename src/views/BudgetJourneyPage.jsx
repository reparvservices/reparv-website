import HeroSection from "../components/seoPages/budgetJourneyPage/HeroSection.jsx";
import WhyStressful from "../components/seoPages/budgetJourneyPage/WhyStressful.jsx";
import BudgetDilemmas from "../components/seoPages/budgetJourneyPage/BudgetDilemmas.jsx";
import BuyerStories from "../components/seoPages/budgetJourneyPage/BuyerStories.jsx";
import BudgetShift from "../components/seoPages/budgetJourneyPage/BudgetShift.jsx";
import SmartChoices from "../components/seoPages/budgetJourneyPage/SmartChoices.jsx";
import FAQSection from "../components/seoPages/budgetJourneyPage/FAQSection.jsx";

export default function BudgetJourneyPage() {
  return (
    <main className="min-h-screen font-sans antialiased">
      <HeroSection />
      <WhyStressful />
      <BudgetDilemmas />
      <BuyerStories />
      <BudgetShift />
      <SmartChoices />
      <FAQSection />
    </main>
  );
}

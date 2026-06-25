import Hero from "../components/seoPages/seoPage1/Hero.jsx";
import HeartOfJourney from "../components/seoPages/seoPage1/HeartOfJourney.jsx";
import FindAStory from "../components/seoPages/seoPage1/FindAStory.jsx";
import FeaturedNarratives from "../components/seoPages/seoPage1/FeatureNarratives.jsx";
import ReparvPath from "../components/seoPages/seoPage1/ReparvPath.jsx";
import UniversalFears from "../components/seoPages/seoPage1/UnivarsalFears.jsx";
import FamilyChecklist from "../components/seoPages/seoPage1/FamilyChecklist.jsx";
import ReparvStandard from "../components/seoPages/seoPage1/ReparvStandard.jsx";
import CTASection from "../components/seoPages/seoPage1/CtaSection.jsx";
import Faq from "../components/seoPages/seoPage1/Faq.jsx";
export default function SeoPage1() {
  return (
    <>
      <main>
        <Hero />
        <HeartOfJourney />
        <FindAStory />
        <FeaturedNarratives />
        <ReparvPath />
        <UniversalFears />
        <FamilyChecklist />
        <ReparvStandard />
        <CTASection /> 
        <Faq/>
      </main>
    </>
  );
}

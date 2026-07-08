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
import AdvertisementCard from "../components/AdvertisementCard";
export default function SeoPage1({ initialPageData = null }) {
  return (
    <>
      <main>
        <Hero pageData={initialPageData} />
        <HeartOfJourney />
        <FindAStory />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard variant="seoDisplay" />
        </div>
        <FeaturedNarratives />
        <ReparvPath />
        <UniversalFears />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard variant="seoInFeed" />
        </div>
        <FamilyChecklist />
        <ReparvStandard />
        <CTASection /> 
        <Faq/>
      </main>
    </>
  );
}

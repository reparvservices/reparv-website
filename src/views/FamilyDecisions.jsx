"use client"

import Hero from "../components/seoPages/FamilyDecisions/Hero.jsx";
import WhyHard from "../components/seoPages/FamilyDecisions/WhyHard.jsx";
import WhereDifferent from "../components/seoPages/FamilyDecisions/WhereDifferent.jsx";
import StoryCard from "../components/seoPages/FamilyDecisions/StoryCard.jsx";

const stories = [
  {
    meta: ["Parents", "Budget", "Pune"],
    title: "Parents Wanted Space, We Needed Affordability",
    priorities: [
      "Parents preferred a larger home",
      "Couple wanted manageable EMIs",
      "Need for future flexibility",
    ],
    stressPoints: [
      "Family disagreements",
      "Budget concerns",
      "Pressure to decide quickly",
    ],
    clarityMoment:
      "The family compared long-term financial impact rather than focusing only on square footage.",
    clarityOutcome:
      "Everyone agreed on a home that balanced comfort and affordability.",
    seed: 0,
  },
  {
    meta: ["Kids", "Schools", "Location"],
    title: "Choosing Schools Without Sacrificing Lifestyle",
    priorities: [
      "Children's education",
      "Commute convenience",
      "Neighborhood quality",
    ],
    stressPoints: [
      "Different opinions about location",
      "Fear of missing better options",
    ],
    clarityMoment:
      "They ranked priorities together and focused on what mattered most over the next five years.",
    clarityOutcome:
      "The family found a location that supported both education and lifestyle goals.",
    seed: 1,
  },
  {
    meta: ["Safety", "Price", "Family"],
    title: "Balancing Safety Expectations With Budget Reality",
    priorities: [
      "Safe neighborhood",
      "Affordable purchase price",
      "Future appreciation potential",
    ],
    stressPoints: [
      "Conflicting expectations",
      "Emotional pressure from relatives",
    ],
    clarityMoment:
      "They compared multiple communities instead of focusing on a single project.",
    clarityOutcome:
      "A balanced choice emerged that everyone felt comfortable with.",
    seed: 2,
  },
];

export default function FamilyDecisionStoriesPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Why Family Decisions Are Hard */}
      <WhyHard />

      {/* Common Conflicts */}
      <WhereDifferent />

      {/* Stories Section */}
      <section className="bg-[#F8F6FF] px-4 py-14 sm:px-6 lg:px-6 lg:py-20">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Real Family Decision Stories
            </h2>

            <p className="text-base leading-7 text-gray-600">
              Discover how real families overcame disagreements, balanced
              priorities, and reached confident home-buying decisions.
            </p>
          </div>

          <div>
            {stories.map((story, index) => (
              <StoryCard
                key={story.title}
                story={story}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
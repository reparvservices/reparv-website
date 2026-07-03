export { dynamic } from "@/lib/ssr";

import Home from "@/views/Home";
import { fetchHomePageData } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("home");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/",
  });
}

export default async function Page() {
  const homeData = await fetchHomePageData("Nagpur");

  return (
    <Home
      initialRentalProperties={homeData.rentalProperties}
      initialTrendingProperties={homeData.trendingProperties}
      initialTopPicks={homeData.topPicks}
      initialBlogs={homeData.blogs}
      initialTestimonials={homeData.testimonials}
      initialFaqs={homeData.faqs}
    />
  );
}

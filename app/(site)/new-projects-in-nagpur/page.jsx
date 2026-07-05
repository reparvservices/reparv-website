export { dynamic } from "@/lib/ssr";

import NewProjects from "@/views/NewProjects";
import { fetchNewProjectsPageData, fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchNewProjectsPageData("Nagpur");
  const count = pageData?.stats?.projectCount || 100;

  return buildPageMetadata({
    title: "New Residential Projects in Nagpur | Verified | Reparv.in",
    description: `Discover ${count}+ verified new launch and under-construction projects in Nagpur. RERA-registered listings, flexible payment plans, and expert guidance.`,
    path: "/new-projects-in-nagpur",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv New Projects Page",
      includeArticles: false,
    }),
    fetchNewProjectsPageData("Nagpur"),
  ]);

  return <NewProjects initialPageData={pageData} initialFaqs={faqs} />;
}

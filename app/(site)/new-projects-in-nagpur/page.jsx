export { dynamic } from "@/lib/ssr";

import NewProjects from "@/views/NewProjects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "New Residential Projects in Nagpur | Verified | Reparv.in",
  description: "Discover the latest new launch residential projects in Nagpur by trusted builders. RERA-registered listings, pre-launch offers. Explore & book your dream home!",
  path: "/new-projects-in-nagpur",
});

export default function Page() {
  return <NewProjects />;
}

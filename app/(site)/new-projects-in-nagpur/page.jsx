import NewProjects from "@/views/NewProjects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "New Projects in Nagpur",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/new-projects-in-nagpur",
});

export default function Page() {
  return <NewProjects />;
}

import ProjectPartner from "@/views/ProjectPartner";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { contact } = params;
  return buildPageMetadata({
    title: "Project partner",
    description:
      "Explore project partner listings and verified developments on Reparv.",
    path: `/project-partner/${contact}`,
  });
}

export default function ProjectPartnerPage() {
  return <ProjectPartner />;
}

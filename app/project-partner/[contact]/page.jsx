import ProjectPartner from "@/views/ProjectPartner";
import { buildPageMetadata } from "@/lib/seo";
import { getBackendUrl, getS3ImageUrl } from "@/lib/env";

export async function generateMetadata({ params }) {
  const { contact } = await params;

  const res = await fetch(
    `${getBackendUrl()}/frontend/project-partner/get/${contact}`,
    { cache: "no-store" },
  );

  const projectPartner = await res.json();
  const logo = projectPartner?.businessLogo?.replace(/^\/+/, "");

  return buildPageMetadata({
    title:
      projectPartner?.seoTitle || `${projectPartner?.businessName} | Reparv`,

    description:
      projectPartner?.seoDescription ||
      "Explore verified project partner listings on Reparv.",

    keywords: projectPartner?.seoKeywords,

    canonical: `https://www.reparv.in/project-partner/${contact}`,

    openGraph: {
      images: logo
        ? [{ url: `${getS3ImageUrl()}/${logo}` }]
        : undefined,
    },

    twitter: {
      site: projectPartner?.twitterSite || "@reparv",
      description:
        projectPartner?.twitterDescription || projectPartner?.seoDescription,
    },
  });
}

export default function ProjectPartnerPage() {
  return <ProjectPartner />;
}

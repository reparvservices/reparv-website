import ProjectPartner from "@/views/ProjectPartner";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { contact } = await params;

  const res = await fetch(
    `${process.env.VITE_BACKEND_URL}/frontend/project-partner/get/${contact}`,
    { cache: "no-store" },
  );

  const projectPartner = await res.json();

  return buildPageMetadata({
    title:
      projectPartner?.seoTitle || `${projectPartner?.businessName} | Reparv`,

    description:
      projectPartner?.seoDescription ||
      "Explore verified project partner listings on Reparv.",

    keywords: projectPartner?.seoKeywords,

    canonical: `https://www.reparv.in/project-partner/${contact}`,

    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}${projectPartner?.businessLogo}`,
        },
      ],
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

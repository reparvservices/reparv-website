import PropertyDetails from "@/views/PropertyDetails";
import { buildPageMetadata } from "@/lib/seo";
import { getBackendUrl } from "@/lib/env";

async function getPropertyDetails(id) {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/propertyinfo/${id}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Property SEO Fetch Error:", error);
    return null;
  }
}

function getPropertyImage(property) {
  try {
    const images = JSON.parse(property?.frontView || "[]");

    if (images?.length > 0) {
      return images[0];
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const property = await getPropertyDetails(params.id);

  if (!property) {
    return buildPageMetadata({
      title: "Property Details",
      description:
        "View photos, pricing and location for this listing on Reparv.",
      path: `/property-info/${params.id}`,
    });
  }

  console.log("Property Metadata:", property);

  return buildPageMetadata({
    title:
      property?.seoTittle ||
      property?.propertyTitle ||
      property?.projectName ||
      "Property Details",

    description: property?.seoDescription,
    keywords: property?.tags || "Property",
    image: getPropertyImage(property),
    type: "article",

    path: `/property-info/${property?.seoSlug || params.id}`,
  });
}

export default function Page() {
  return <PropertyDetails />;
}

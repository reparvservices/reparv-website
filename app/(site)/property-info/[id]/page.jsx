import PropertyDetails from "@/views/PropertyDetails";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildRealEstateListingSchema } from "@/lib/seo";
import {
  fetchPropertyDetailsCached,
  fetchPropertyImagesCached,
} from "@/lib/serverApi";
import {
  DETAIL_PAGE_REVALIDATE,
  generatePropertyStaticParams,
} from "@/lib/staticParams";

export const revalidate = DETAIL_PAGE_REVALIDATE;
export const dynamicParams = true;

export async function generateStaticParams() {
  return generatePropertyStaticParams();
}

function getPropertyImage(property) {
  try {
    const images = JSON.parse(property?.frontView || "[]");
    if (images?.length > 0) return images[0];
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const property = await fetchPropertyDetailsCached(params.id);

  if (!property) {
    return buildPageMetadata({
      title: "Property Details",
      description:
        "View photos, pricing and location for this listing on Reparv.",
      path: `/property-info/${params.id}`,
    });
  }

  return buildPageMetadata({
    title:
      property?.seoTittle ||
      property?.propertyTitle ||
      property?.projectName ||
      "Property Details",
    description:
      property?.seoDescription ||
      "View photos, pricing and location for this listing on Reparv.",
    keywords: property?.tags || "Property",
    image: getPropertyImage(property),
    type: "article",
    path: `/property-info/${property?.seoSlug || params.id}`,
  });
}

export default async function Page({ params }) {
  const [initialPropertyInfo, initialPropertyImages] = await Promise.all([
    fetchPropertyDetailsCached(params.id),
    fetchPropertyImagesCached(params.id),
  ]);

  const path = `/property-info/${initialPropertyInfo?.seoSlug || params.id}`;
  const listingSchema = buildRealEstateListingSchema(
    initialPropertyInfo,
    path,
  );

  return (
    <>
      <JsonLd data={listingSchema} />
      <PropertyDetails
        initialPropertyInfo={initialPropertyInfo}
        initialPropertyImages={initialPropertyImages}
      />
    </>
  );
}

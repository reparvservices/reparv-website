import EditProperty from "@/components/dashboard/EditProperty";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { id } = params;
  return buildPageMetadata({
    title: "Edit property",
    description: "Update your property listing on Reparv.",
    path: `/edit-property/${id}`,
  });
}

export default function Page() {
  return <EditProperty />;
}

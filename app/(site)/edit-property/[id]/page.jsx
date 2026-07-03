export { dynamic } from "@/lib/ssr";

import EditProperty from "@/components/dashboard/EditProperty";
import { buildNoIndexMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { id } = params;
  return buildNoIndexMetadata({
    title: "Edit property",
    description: "Update your property listing on Reparv.",
    path: `/edit-property/${id}`,
  });
}

export default function Page() {
  return <EditProperty />;
}

export { dynamic } from "@/lib/ssr";

import EditVenue from "@/components/dashboard/EditVenue";
import { buildNoIndexMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { id } = params;
  return buildNoIndexMetadata({
    title: "Edit venue",
    description: "Update your venue listing on Reparv.",
    path: `/edit-venue/${id}`,
  });
}

export default function Page() {
  return <EditVenue />;
}

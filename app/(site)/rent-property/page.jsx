import RentProperty from "@/views/RentProperty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Rent out your property",
  description: "Rent your property to verified tenants with Reparv.",
  path: "/rent-property",
});

export default function Page() {
  return <RentProperty />;
}

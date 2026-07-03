export { dynamic } from "@/lib/ssr";

import ReadyToMovePropertiesInNagpur from "@/views/ReadyToMovePropertiesInNagpur";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Ready to Move Properties in Nagpur | No Wait | Reparv.in",
  description:
    "Find verified ready-to-move flats & houses in Nagpur. Clear ownership, instant possession, zero brokerage. Compare options & book a free site visit on Reparv!",
  path: "/ready-to-move-properties-in-nagpur",
});

export default function Page() {
  return <ReadyToMovePropertiesInNagpur />;
}

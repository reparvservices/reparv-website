export { dynamic } from "@/lib/ssr";

import Activity from "@/views/Activity";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Activity",
  description: "Your recent activity on Reparv.",
  path: "/activities",
});

export default function Page() {
  return <Activity />;
}

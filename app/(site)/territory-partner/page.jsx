export { dynamic } from "@/lib/ssr";

import JoinOurTeam from "@/views/JoinOurTeam";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Territory partner",
  description: "Become a territory partner with Reparv.",
  path: "/territory-partner",
});

export default function Page() {
  return <JoinOurTeam />;
}

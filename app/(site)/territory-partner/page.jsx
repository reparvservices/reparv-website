import JoinOurTeam from "@/views/JoinOurTeam";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Territory partner",
  description: "Territory partner program at Reparv.",
  path: "/territory-partner",
});

export default function Page() {
  return <JoinOurTeam />;
}

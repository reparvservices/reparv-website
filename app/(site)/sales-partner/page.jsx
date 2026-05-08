import JoinOurTeam from "@/views/JoinOurTeam";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sales partner",
  description: "Become a sales partner with Reparv.",
  path: "/sales-partner",
});

export default function Page() {
  return <JoinOurTeam />;
}

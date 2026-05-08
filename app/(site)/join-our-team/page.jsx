import JoinOurTeam from "@/views/JoinOurTeam";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Join our team",
  description: "Partner and career opportunities at Reparv.",
  path: "/join-our-team",
});

export default function Page() {
  return <JoinOurTeam />;
}

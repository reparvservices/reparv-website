import Activity from "@/views/Activity";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Activity",
  description: "Your recent activity on Reparv.",
  path: "/activities",
});

export default function Page() {
  return <Activity />;
}

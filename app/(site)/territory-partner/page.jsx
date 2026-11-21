export { dynamic } from "@/lib/ssr";

// Territory Partner page hidden for now: the route returns 404.
// import JoinOurTeam from "@/views/JoinOurTeam";
// import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

// export const metadata = buildPageMetadata({
//   title: "Territory partner",
//   description: "Become a territory partner with Reparv.",
//   path: "/territory-partner",
// });

export default function Page() {
  notFound();
  // return <JoinOurTeam />;
}

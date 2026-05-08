import Home from "@/views/Home";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Home",
  description: "Reparv home — discover properties across India.",
  path: "/home",
});

export default function Page() {
  return <Home />;
}

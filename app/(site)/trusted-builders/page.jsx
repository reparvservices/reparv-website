import TrustedBuilder from "@/views/TrustedBuilder";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Trusted builders",
  description: "Discover trusted builder partners on Reparv.",
  path: "/trusted-builders",
});

export default function Page() {
  return <TrustedBuilder />;
}

import Verify712 from "@/views/Verify712";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Verify 7/12",
  description: "Verify land records and 7/12 extracts.",
  path: "/verify-7-12",
});

export default function Page() {
  return <Verify712 />;
}

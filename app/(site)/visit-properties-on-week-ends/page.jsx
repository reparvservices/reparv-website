import VisitPropertiesOnWeekend from "@/views/VisitPropertiesOnWeekend";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Visit properties on weekends",
  description: "Schedule weekend site visits.",
  path: "/visit-properties-on-week-ends",
});

export default function Page() {
  return <VisitPropertiesOnWeekend />;
}

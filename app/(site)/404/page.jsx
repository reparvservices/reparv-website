import ErrorPage from "@/views/ErrorPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Page not found",
  description: "This page could not be found.",
  path: "/404",
});

export default function Page() {
  return <ErrorPage />;
}

import ErrorPage from "@/views/ErrorPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Page not found",
  description: "The page you requested could not be found on Reparv.",
  path: "/404",
});

export default function NotFound() {
  return <ErrorPage />;
}

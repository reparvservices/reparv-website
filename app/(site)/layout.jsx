import SiteLayout from "@/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";

export default function SiteLayoutWrapper({ children }) {
  return (
    <SiteLayout>
      <ScrollToTop />
      {children}
    </SiteLayout>
  );
}

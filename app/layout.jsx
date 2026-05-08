import "../src/index.css";
import "../src/App.css";
import "../src/components/projectPartner/PropertySlider.css";

import AppProviders from "@/providers/AppProviders";

export const metadata = {
  metadataBase: new URL("https://www.reparv.in"),
  title: {
    default: "Reparv — Buy, Rent & Sell Verified Property in India",
    template: "%s | Reparv",
  },
  description:
    "Explore verified property listings across India. Buy, rent, or sell homes, flats, plots and commercial spaces with Reparv.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Reparv",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

import "../src/index.css";
import "../src/App.css";
import "../src/components/projectPartner/PropertySlider.css";

import Script from "next/script";
import AppProviders from "@/providers/AppProviders";

export const metadata = {
  metadataBase: new URL("https://www.reparv.in"),

  title: {
    default: "Reparv — Buy, Rent & Sell Verified Property in India",
    //template: "%s | Reparv",
  },

  description:
    "Explore verified property listings across India. Buy, rent, or sell homes, flats, plots and commercial spaces with Reparv.",

  keywords: [
    "property",
    "real estate",
    "buy property",
    "rent property",
    "sell property",
    "plots",
    "apartments",
    "commercial property",
    "Reparv",
  ],

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "ljuUpc_Iz8dw9DlYDd4293W-E9IF6emIzNrGbV2G17I",
  },

  other: {
    "google-adsense-account": "ca-pub-8914733371473026",
    "msvalidate.01": "DCC60D60392DD48243D50DE82B7ECBA2",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Reparv",
    title: "Reparv — Buy, Rent & Sell Verified Property in India",
    description:
      "Explore verified property listings across India. Buy, rent, or sell homes, flats, plots and commercial spaces with Reparv.",
    url: "https://www.reparv.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Reparv — Buy, Rent & Sell Verified Property in India",
    description:
      "Explore verified property listings across India. Buy, rent, or sell homes, flats, plots and commercial spaces with Reparv.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/reparvIcon.ico",
    shortcut: "/reparvIcon.ico",
    apple: "/reparvIcon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8914733371473026"
        />

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TS7MCZ58');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tq3ck2ke0t");
          `}
        </Script>

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Reparv",
              url: "https://www.reparv.in",
              logo: "https://www.reparv.in/reparvLogo.ico",
            }),
          }}
        />
      </head>

      <body>
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TS7MCZ58"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Watchly - Hindi Web Series Oracle",
  description:
    "Find the perfect Hindi web series to watch tonight in under 10 seconds.",
  keywords: [
    "Hindi web series",
    "what to watch tonight",
    "OTT recommendations",
    "underrated Hindi web series",
    "Hindi OTT discovery",
    "shows like Asur",
    "best Hindi thrillers",
  ],
  authors: [{ name: "Watchly" }],
  creator: "Watchly",
  metadataBase: new URL("https://watchly.rugwed.in"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Watchly - Hindi Web Series Oracle",
    description:
      "Stop scrolling OTT apps. Find the perfect Hindi web series in under 10 seconds.",
    url: "https://watchly.rugwed.in/",
    siteName: "Watchly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Watchly — Hindi Web Series Oracle",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Watchly — Hindi Web Series Oracle",
    description:
      "Find the perfect Hindi web series to watch tonight in under 10 seconds.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics Tag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-GPEQVCRC4N`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GPEQVCRC4N', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="bg-arcade-bg min-h-screen antialiased">{children}</body>
    </html>
  );
}
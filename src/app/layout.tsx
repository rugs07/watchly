import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Watchly — Hindi Web Series Oracle",
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
  metadataBase: new URL("https://tonight-watch.vercel.app/"), 

  openGraph: {
    title: "Watchly — Hindi Web Series Oracle",
    description:
      "Stop scrolling OTT apps. Find the perfect Hindi web series in under 10 seconds.",
    url: "https://tonight-watch.vercel.app/",
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
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
      </head>
      <body className="bg-arcade-bg min-h-screen antialiased">{children}</body>
    </html>
  );
}
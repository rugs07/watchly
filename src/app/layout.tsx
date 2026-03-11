import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tonight Watch — Hindi Web Series Oracle",
  description: "Find the perfect Hindi web series to watch tonight in under 10 seconds.",
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

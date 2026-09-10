import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "K-Pop Radar - Never Miss Your Favorite Idol's Updates",
    template: "%s | K-Pop Radar",
  },
  description:
    "Track real-time K-Pop updates, social media drops, comeback schedules, Weverse posts, and YouTube releases across all platforms in one clean feed.",
  keywords: [
    "K-Pop",
    "K-Pop Radar",
    "Idol Updates",
    "Comeback Tracker",
    "Kpop News",
    "BTS",
    "BLACKPINK",
    "TWICE",
    "Stray Kids",
    "NewJeans",
    "Weverse",
    "K-Pop Schedule",
  ],
  authors: [{ name: "K-Pop Radar Team" }],
  creator: "K-Pop Radar",
  publisher: "K-Pop Radar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "K-Pop Radar - Never Miss Your Favorite Idol's Updates",
    description:
      "Track real-time K-Pop updates, social media drops, comeback schedules, Weverse posts, and YouTube releases across all platforms in one clean feed.",
    url: baseUrl,
    siteName: "K-Pop Radar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K-Pop Radar - Never Miss Your Favorite Idol's Updates",
    description:
      "Track real-time K-Pop updates, social media drops, comeback schedules, Weverse posts, and YouTube releases in one clean feed.",
    creator: "@kpopradar",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "K-Pop Radar",
  "operatingSystem": "All",
  "applicationCategory": "EntertainmentApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "description":
    "Track real-time K-Pop idol updates, social media drops, comeback schedules, and YouTube releases in one clean feed.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} dark h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col font-sans">
        {children}
        <Toaster theme="dark" position="top-right" closeButton />
      </body>
    </html>
  );
}

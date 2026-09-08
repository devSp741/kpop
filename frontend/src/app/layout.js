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

export const metadata = {
  title: "K-Pop Radar - Theme System & UI Components",
  description: "Centralized theme design system and form controls for K-Pop Radar",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col font-sans">
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          closeButton
        />
      </body>
    </html>
  );
}

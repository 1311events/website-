import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, EB_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.1311events.com"),
  title: {
    default: "Thirteen Eleven Events | 1311 Events — Hawaii Event Production",
    template: "%s | 1311 Events",
  },
  description:
    "1311 Events (Thirteen Eleven Events) is Hawaii's premier full-service event partner — production, luxury rentals, catering, bar services, and coordination.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "1311 Events",
    title: "Thirteen Eleven Events | 1311 Events — Hawaii Event Production",
    description:
      "Hawaii's premier event partner for production, rentals, catering, and coordination.",
    url: "https://www.1311events.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "1311 Events — Thirteen Eleven Events",
    description: "Hawaii's premier full-service event partner.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} ${ebGaramond.variable}`}>
        <CartProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

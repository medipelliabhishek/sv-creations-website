import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getContactContent, getSiteContent } from "@/lib/content";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteContent();
  return {
    title: {
      default: site.siteTitle,
      template: `%s | ${site.businessName}`,
    },
    description: site.siteDescription,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSiteContent();
  const contact = getContactContent();

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <Navbar businessName={site.businessName} logo={site.logo} />
        <main>{children}</main>
        <Footer businessName={site.businessName} tagline={site.tagline} contact={contact} />
        <WhatsAppButton number={contact.whatsapp} businessName={site.businessName} />
      </body>
    </html>
  );
}

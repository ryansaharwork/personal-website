import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.introLine,
};

export const viewport: Viewport = {
  themeColor: "#0b0a09", // must equal --color-ink (globals.css)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        {children}
        {/* Without JS, scroll-in content would stay hidden. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-photo-full]{opacity:1!important}[data-photo-placeholder]{opacity:0!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}

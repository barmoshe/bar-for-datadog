import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import DatadogApp from "@/src/marketing/datadog/DatadogApp";

// Type trio chosen to match datadoghq.com: Manrope for display (a clean, slightly
// rounded geometric sans close to Datadog's marketing headline type), Inter for
// body, and JetBrains Mono for dashboard metrics / query labels. Exposed as
// --font-dd-* for datadog.css.
const display = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dd-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dd-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dd-mono",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "Software Engineer · AI
// Developer Workflows" application to Datadog (Tel Aviv, Req R19628). Built in
// Datadog's own visual language (cosmic-purple field, the signature #632CA6
// purple, mono trace labels). Not part of the public site map, noindex so it
// stays a private, shareable link sent to the Datadog team.
const ogTitle = "Bar Moshe × Datadog · AI Developer Workflows";
const ogDescription =
  "Bar Moshe, software engineer. I build agent tooling, MCP servers, and developer workflows in Go, Python, and TypeScript. A few things I have shipped, mapped to the AI Developer Workflows role.";

// noindex (private, shareable link) but a rich share card still renders for
// direct shares (email / DM / LinkedIn). The og:image / twitter:image tags are
// generated from the colocated opengraph-image.tsx; here we set the copy, card
// type, and handle so the preview reads correctly.
export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function DatadogPage() {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <DatadogApp />
    </div>
  );
}

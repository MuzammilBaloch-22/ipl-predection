import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Bracket } from "@/components/site/Bracket";
import { Stars } from "@/components/site/Stars";
import { OrangeCap, PurpleCap } from "@/components/site/CapCards";
import { Matches } from "@/components/site/Matches";
import { Blogs } from "@/components/site/Blogs";
import { Poll } from "@/components/site/Poll";
import { Stats } from "@/components/site/Stats";
import { Footer } from "@/components/site/Footer";

const SITE_URL = "https://ipl2026-predection.vercel.app/";
const OG_IMAGE =
  "https://raw.githubusercontent.com/MuzammilBaloch-22/ipl-predection/main/src/assets/muzammil.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      // SEO TITLE
      {
        title: "Muzammil Baloch - IPL 2026 Predictions | Cricket Analysis",
      },
      {
        name: "title",
        content: "Muzammil Baloch - IPL 2026 Predictions | Cricket Analysis",
      },
      {
        name: "description",
        content:
          "IPL 2026 predictions, playoff analysis, Orange Cap & Purple Cap race, fan blogs, polls and match insights by Muzammil Baloch.",
      },
      {
        name: "keywords",
        content:
          "IPL 2026, IPL predictions, cricket analysis, Orange Cap, Purple Cap, IPL blogs, cricket polls, Muzammil Baloch",
      },
      {
        name: "author",
        content: "Muzammil Baloch",
      },

      // OPEN GRAPH (WHATSAPP / FACEBOOK)
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      {
        property: "og:title",
        content: "Muzammil Baloch - IPL 2026 Predictions",
      },
      {
        property: "og:description",
        content:
          "IPL 2026 playoff predictions, match analysis, fan polls, Orange & Purple Cap race updates.",
      },
      {
        property: "og:image",
        content: OG_IMAGE,
      },
      {
        property: "og:image:secure_url",
        content: OG_IMAGE,
      },
      {
        property: "og:image:type",
        content: "image/jpeg",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: "Muzammil Baloch IPL 2026 Predictions Banner",
      },
      {
        property: "og:site_name",
        content: "IPL 2026 Predictions",
      },
      {
        property: "og:locale",
        content: "en_US",
      },

      // TWITTER CARD
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Muzammil Baloch - IPL 2026 Predictions",
      },
      {
        name: "twitter:description",
        content:
          "IPL 2026 predictions, analysis, polls and cricket insights.",
      },
      {
        name: "twitter:image",
        content: OG_IMAGE,
      },

      // EXTRA SEO
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "revisit-after",
        content: "7 days",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: SITE_URL,
      },
      {
        rel: "icon",
        href: "/logo.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo.png",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#03081a] text-slate-100">
      <Navbar />
      <Hero />
      <Bracket />
      <Stars />
      <OrangeCap />
      <PurpleCap />
      <Matches />
      <Blogs />
      <Poll />
      <Stats />
      <Footer />
    </main>
  );
}

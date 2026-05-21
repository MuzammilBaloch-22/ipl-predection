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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Muzammil Baloch - IPL 2026 Predictions" },
      {
        name: "description",
        content:
          "Muzammil Baloch's IPL 2026 prediction website - playoffs, final predictions, Orange Cap, Purple Cap, fan blogs, and polls.",
      },
      { property: "og:title", content: "Muzammil Baloch - IPL 2026 Predictions" },
      { property: "og:description", content: "IPL 2026 playoff forecast with match analysis, fan polls, official predictions aur team insights." },
      { property: "og:image", content: "https://ipl2026-predection.vercel.app/muzammil.jpeg" },
      { property: "og:url", content: "https://ipl2026-predection.vercel.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Muzammil Baloch - IPL 2026 Predictions" },
      { name: "twitter:description", content: "IPL 2026 playoff forecast with match analysis, fan polls, and final predictions." },
      { name: "twitter:image", content: "https://ipl2026-predection.vercel.app/og-image.png" },
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

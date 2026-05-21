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
      { title: "Muzammil Baloch's IPL 2026 Playoffs & Final Predictions" },
      {
        name: "description",
        content:
          "Cinematic IPL 2026 playoff predictions, Orange Cap, Purple Cap, match analysis, fan blogs and live polls by Muzammil Baloch.",
      },
      { property: "og:title", content: "IPL 2026 Playoffs Predictions Hub" },
      { property: "og:description", content: "Match-by-match predictions, brackets, fan blogs and polls." },
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

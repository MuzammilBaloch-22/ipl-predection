import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
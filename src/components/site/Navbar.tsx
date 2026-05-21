import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import iplLogo from "@/assets/IPL-Logo.avif";

const links = [
  { href: "#home", label: "Home" },
  { href: "#playoffs", label: "Playoffs" },
  { href: "#predictions", label: "Predictions" },
  { href: "#orange", label: "Orange Cap" },
  { href: "#purple", label: "Purple Cap" },
  { href: "#blogs", label: "Blogs" },
  { href: "#polls", label: "Polls" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#03081a]/70 border-b border-cyan-400/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#home" className="flex items-center gap-2">
          <img 
            src={iplLogo} 
            alt="IPL Logo" 
            className="h-12 w-12 object-contain"
          />
          <div className="leading-none">
            <div className="font-display text-xl tracking-wider text-glow-cyan">IPL 2026</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/80">Predictions Hub</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-200/90 transition-all hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#playoffs"
          className="hidden lg:inline-flex items-center rounded-md bg-gradient-to-r from-[#1e6bff] to-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#03081a] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60 transition-shadow"
        >
          View Bracket
        </a>
        <button
          className="lg:hidden rounded-md border border-cyan-400/30 px-3 py-2 text-cyan-300"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-cyan-400/20 bg-[#03081a]/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-slate-200/90 hover:text-cyan-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
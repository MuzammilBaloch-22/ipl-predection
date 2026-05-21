import { Github, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-cyan-400/15 bg-[#03081a]/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-display text-2xl text-glow-cyan">Muzammil Baloch</div>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">IPL Predictions Hub</div>
          <p className="mt-3 text-sm text-slate-400">
            Cinematic IPL 2026 playoff coverage — predictions, stats, fan blogs and polls in one place.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-200">Quick Links</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#playoffs" className="hover:text-cyan-300">Playoffs</a></li>
            <li><a href="#predictions" className="hover:text-cyan-300">Match Predictions</a></li>
            <li><a href="#orange" className="hover:text-cyan-300">Orange Cap</a></li>
            <li><a href="#purple" className="hover:text-cyan-300">Purple Cap</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-200">Community</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#blogs" className="hover:text-cyan-300">Fan Blogs</a></li>
            <li><a href="#polls" className="hover:text-cyan-300">Polls</a></li>
            <li><a href="#about" className="hover:text-cyan-300">About</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-200">Follow</div>
          <div className="flex gap-3">
            {[Instagram, Twitter, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/25 text-cyan-200 transition hover:bg-cyan-400/15 hover:scale-110"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Disclaimer: This is an unofficial fan-made IPL prediction site. Not affiliated with BCCI or IPL.
          </p>
        </div>
      </div>
      <div className="border-t border-cyan-400/10 py-4 text-center text-xs text-slate-500">
        © 2026 Muzammil Baloch | IPL Predictions Hub
      </div>
    </footer>
  );
}
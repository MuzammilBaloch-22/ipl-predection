import { motion } from "framer-motion";
import rcbLogo from "@/assets/rcb-logo.jpg";
import srhLogo from "@/assets/srh-logo.avif";
import gtLogo from "@/assets/gt-logo.jpg";
import kkrLogo from "@/assets/kkr-logo.jpg";
import { SectionTitle } from "./SectionTitle";

const teamLogos: Record<string, string> = {
  SRH: srhLogo,
  RCB: rcbLogo,
  GT: gtLogo,
  KKR: kkrLogo,
};

const teamChances = [
  { code: "SRH", color: "#ff7a00", pct: 34 },
  { code: "RCB", color: "#e8262d", pct: 27 },
  { code: "KKR", color: "#7b3fb7", pct: 22 },
  { code: "GT", color: "#3b6cb2", pct: 17 },
];
const powerplay = [
  { code: "SRH", color: "#ff7a00", pct: 92 },
  { code: "RCB", color: "#e8262d", pct: 78 },
  { code: "GT", color: "#3b6cb2", pct: 74 },
  { code: "KKR", color: "#7b3fb7", pct: 71 },
];
const finishers = [
  { name: "Heinrich Klaasen", rating: 96 },
  { name: "Rinku Singh", rating: 91 },
  { name: "Shreyas Iyer", rating: 84 },
  { name: "Tim David", rating: 82 },
];

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, #00e5ff)`, boxShadow: `0 0 10px ${color}` }}
      />
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-strong neon-border rounded-2xl p-6"
    >
      <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">{title}</div>
      {children}
    </motion.div>
  );
}

export function Stats() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle eyebrow="Analytics" title="DATA & PREDICTIONS DASHBOARD" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Panel title="Team Win Chances">
            <ul className="space-y-3">
              {teamChances.map((t) => (
                <li key={t.code}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <img
                        src={teamLogos[t.code]}
                        alt={`${t.code} logo`}
                        className="h-6 w-6 rounded-full object-cover"
                        style={{ boxShadow: `0 0 10px ${t.color}` }}
                      />
                      <span className="font-display">{t.code}</span>
                    </div>
                    <span className="text-slate-400">{t.pct}%</span>
                  </div>
                  <Bar pct={t.pct} color={t.color} />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Powerplay Ratings">
            <ul className="space-y-3">
              {powerplay.map((t) => (
                <li key={t.code}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <img
                        src={teamLogos[t.code]}
                        alt={`${t.code} logo`}
                        className="h-6 w-6 rounded-full object-cover"
                        style={{ boxShadow: `0 0 10px ${t.color}` }}
                      />
                      <span className="font-display">{t.code}</span>
                    </div>
                    <span className="text-slate-400">{t.pct}/100</span>
                  </div>
                  <Bar pct={t.pct} color={t.color} />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Finisher Rankings">
            <ul className="space-y-3">
              {finishers.map((f, i) => (
                <li key={f.name} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#f5c43a] to-[#ff7a00] font-display text-[#03081a]">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{f.name}</div>
                    <div className="text-[11px] uppercase tracking-widest text-slate-400">Clutch rating</div>
                  </div>
                  <div className="font-display text-2xl text-glow-gold">{f.rating}</div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Most Runs (Predicted)">
            <div className="font-display text-4xl text-glow-cyan">Abhishek Sharma</div>
            <div className="mt-1 text-sm text-slate-400">Sunrisers Hyderabad</div>
            <div className="mt-4 font-display text-6xl text-glow-gold">712</div>
            <div className="text-xs uppercase tracking-widest text-slate-400">Total Runs</div>
          </Panel>
          <Panel title="Most Wickets (Predicted)">
            <div className="font-display text-4xl text-glow-cyan">Bhuvneshwar Kumar</div>
            <div className="mt-1 text-sm text-slate-400">Royal Challengers Bengaluru</div>
            <div className="mt-4 font-display text-6xl text-glow-gold">28</div>
            <div className="text-xs uppercase tracking-widest text-slate-400">Total Wickets</div>
          </Panel>
          <Panel title="About Muzammil">
            <p className="text-sm text-slate-300">
              IPL super-fan and predictor sharing cinematic, data-driven takes on every playoff match. Drop a blog,
              cast a vote, and join the conversation.
            </p>
            <div className="mt-4 flex gap-2 text-xs">
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-cyan-200">#IPL2026</span>
              <span className="rounded-full bg-yellow-400/15 px-3 py-1 text-yellow-200">#Predictions</span>
              <span className="rounded-full bg-pink-400/15 px-3 py-1 text-pink-200">#Cricket</span>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
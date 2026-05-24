import { motion } from "framer-motion";
import rcbLogo from "@/assets/rcb-logo.jpg";
import srhLogo from "@/assets/srh-logo.avif";
import gtLogo from "@/assets/gt-logo.jpg";
import rrLogo from "@/assets/rr-logo.avif";
import kkrLogo from "@/assets/kkr-logo.jpg";
import { SectionTitle } from "./SectionTitle";

const teamLogos: Record<string, string> = {
  SRH: srhLogo,
  RCB: rcbLogo,
  GT: gtLogo,
  RR: rrLogo,
  KKR: kkrLogo,
};

type Cap = {
  name: string;
  team: string;
  jersey: string;
  color: string;
  stat: number;
  statLabel: string;
  rank: number;
};

function Card({ p, accent }: { p: Cap; accent: "orange" | "purple" }) {
  const accentColor = accent === "orange" ? "#ff8a00" : "#a855f7";
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl glass-strong neon-border p-5 transition hover:-translate-y-1.5"
      style={{ boxShadow: `0 0 30px ${accentColor}33` }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl"
           style={{ background: accentColor }} />
      <div className="flex items-center gap-4">
        <img
          src={teamLogos[p.jersey]}
          alt={`${p.jersey} logo`}
          className="h-20 w-20 shrink-0 rounded-xl object-cover"
          style={{ boxShadow: `0 0 24px ${p.color}` }}
        />
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: p.color }}>
            {p.jersey} • #{p.rank}
          </div>
          <div className="font-display text-2xl leading-tight">{p.name}</div>
          <div className="text-xs text-slate-400">{p.team}</div>
        </div>
      </div>
      <div className="mt-5 rounded-xl bg-black/30 p-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{p.statLabel}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-5xl" style={{ color: accentColor, textShadow: `0 0 18px ${accentColor}` }}>
            {p.stat}
          </span>
          <span className="text-xs text-slate-400">predicted</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.min(100, (p.stat / (accent === "orange" ? 800 : 30)) * 100)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accentColor}, #00e5ff)` }}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 shine" />
    </motion.div>
  );
}

export function OrangeCap() {
  const players: Cap[] = [
    { name: "Shubman Gill", team: "Gujarat Titans", jersey: "GT", color: "#3b6cb2", stat: 740 , statLabel: "Predicted Runs", rank: 1 },
    { name: "Sai Sudharsan", team: "Gujarat Titans", jersey: "GT", color: "#3b6cb2", stat: 710, statLabel: "Predicted Runs", rank: 2 },
    { name: "Heinrich Klaasen", team: "Sunrisers Hyderabad", jersey: "SRH", color: "#ff7a00", stat: 670, statLabel: "Predicted Runs", rank: 3 },
  ];
  return (
    <section id="orange" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle eyebrow="Top Scorers" title="ORANGE CAP PREDICTIONS" accent="gold" />
        <div className="grid gap-6 md:grid-cols-3">
          {players.map((p) => <Card key={p.name} p={p} accent="orange" />)}
        </div>
      </div>
    </section>
  );
}

export function PurpleCap() {
  const players: Cap[] = [
       { name: "Kagiso Rabada", team: "Gujarat Titans", jersey: "GT", color: "#3b6cb2", stat: 28, statLabel: "Predicted Wickets", rank: 1 },
    { name: "Bhuvneshwar Kumar", team: "Royal Challengers", jersey: "RCB", color: "#e8262d", stat: 27, statLabel: "Predicted Wickets", rank: 2 },
    { name: "Jofra Archer", team: "Rajasthan Royals", jersey: "RR", color: "#e8262d", stat: 25, statLabel: "Predicted Wickets", rank: 3 },
  ];
  return (
    <section id="purple" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle eyebrow="Top Bowlers" title="PURPLE CAP PREDICTIONS" accent="blue" />
        <div className="grid gap-6 md:grid-cols-3">
          {players.map((p) => <Card key={p.name} p={p} accent="purple" />)}
        </div>
      </div>
    </section>
  );
}
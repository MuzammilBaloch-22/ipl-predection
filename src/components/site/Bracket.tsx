import { motion } from "framer-motion";
import trophy from "@/assets/trophy.png";
import rcbLogo from "@/assets/rcb-logo.jpg";
import srhLogo from "@/assets/srh-logo.avif";
import gtLogo from "@/assets/gt-logo.jpg";
import kkrLogo from "@/assets/kkr-logo.jpg";
import { SectionTitle } from "./SectionTitle";

type Team = { code: string; name: string; color: string; logo: string };
const teams: Record<string, Team> = {
  SRH: { code: "SRH", name: "Sunrisers Hyderabad", color: "#ff7a00", logo: srhLogo },
  RCB: { code: "RCB", name: "Royal Challengers", color: "#e8262d", logo: rcbLogo },
  GT: { code: "GT", name: "Gujarat Titans", color: "#3b6cb2", logo: gtLogo },
  KKR: { code: "KKR", name: "Kolkata Knight Riders", color: "#7b3fb7", logo: kkrLogo },
};

function TeamPill({ t, winner }: { t: Team; winner?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
        winner ? "bg-gradient-to-r from-cyan-400/20 to-yellow-300/10 border border-cyan-300/50" : "bg-white/5 border border-white/10"
      }`}
    >
      <img
        src={t.logo}
        alt={`${t.code} logo`}
        className="h-7 w-7 rounded-full object-cover"
        style={{ boxShadow: `0 0 14px ${t.color}` }}
      />
      <div className="flex-1">
        <div className="font-display text-lg leading-none">{t.code}</div>
        <div className="text-[10px] uppercase tracking-widest text-slate-400">{t.name}</div>
      </div>
      {winner && <span className="text-xs font-bold text-cyan-300">WIN</span>}
    </div>
  );
}

function Match({
  label,
  a,
  b,
  winner,
}: {
  label: string;
  a: Team;
  b: Team;
  winner: "a" | "b";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-strong neon-border rounded-2xl p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">{label}</span>
        <span className="text-[10px] text-slate-400">Predicted</span>
      </div>
      <div className="space-y-2">
        <TeamPill t={a} winner={winner === "a"} />
        <TeamPill t={b} winner={winner === "b"} />
      </div>
    </motion.div>
  );
}

export function Bracket() {
  return (
    <section id="playoffs" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle
          eyebrow="Playoff Bracket"
          title="THE ROAD TO THE FINAL"
          subtitle="Predicted flow through Qualifier 1, Eliminator, Qualifier 2, and the Grand Final."
        />
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="space-y-4">
            <Match label="Qualifier 1" a={teams.SRH} b={teams.RCB} winner="a" />
            <Match label="Eliminator" a={teams.GT} b={teams.KKR} winner="a" />
          </div>
          <div className="space-y-4 lg:pt-16">
            <Match label="Qualifier 2" a={teams.RCB} b={teams.GT} winner="a" />
          </div>
          <div className="space-y-4 lg:pt-32">
            <Match label="Final" a={teams.SRH} b={teams.RCB} winner="a" />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(245,196,58,0.4),transparent_70%)] blur-2xl" />
              <img
                src={trophy}
                alt="IPL Trophy"
                width={300}
                height={400}
                className="relative trophy-glow w-44 lg:w-56"
                loading="lazy"
              />
            </div>
            <div className="mt-4 font-display text-2xl text-glow-gold">SRH</div>
            <div className="text-sm uppercase tracking-[0.3em] text-yellow-200/80">Predicted Champions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
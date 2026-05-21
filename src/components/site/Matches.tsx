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

type Match = {
  stage: string;
  a: { code: string; color: string; win: number };
  b: { code: string; color: string; win: number };
  toss: string;
  keyPlayer: string;
  pitch: string;
  winner: string;
};

const matches: Match[] = [
  {
    stage: "Qualifier 1",
    a: { code: "SRH", color: "#ff7a00", win: 62 },
    b: { code: "RCB", color: "#e8262d", win: 38 },
    toss: "Bowl first",
    keyPlayer: "Heinrich Klaasen",
    pitch: "Flat batting deck, dew expected",
    winner: "SRH",
  },
  {
    stage: "Eliminator",
    a: { code: "GT", color: "#3b6cb2", win: 44 },
    b: { code: "KKR", color: "#7b3fb7", win: 56 },
    toss: "Bat first",
    keyPlayer: "Sunil Narine",
    pitch: "Slow turner, spin friendly",
    winner: "KKR",
  },
  {
    stage: "Qualifier 2",
    a: { code: "RCB", color: "#e8262d", win: 58 },
    b: { code: "KKR", color: "#7b3fb7", win: 42 },
    toss: "Bowl first",
    keyPlayer: "Virat Kohli",
    pitch: "True bounce, fast outfield",
    winner: "RCB",
  },
  {
    stage: "Final",
    a: { code: "SRH", color: "#ff7a00", win: 55 },
    b: { code: "RCB", color: "#e8262d", win: 45 },
    toss: "Bowl first",
    keyPlayer: "Abhishek Sharma",
    pitch: "Belter, 200+ par score",
    winner: "SRH",
  },
];

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, #00e5ff)`, boxShadow: `0 0 12px ${color}` }}
      />
    </div>
  );
}

export function Matches() {
  return (
    <section id="predictions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle eyebrow="Match Center" title="PLAYOFF MATCH PREDICTIONS" />
        <div className="grid gap-6 md:grid-cols-2">
          {matches.map((m, i) => (
            <motion.div
              key={m.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass-strong neon-border rounded-2xl p-6 transition hover:-translate-y-1"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">{m.stage}</span>
                <span className="rounded-full bg-cyan-400/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-200">
                  Winner: {m.winner}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <img
                    src={teamLogos[m.a.code]}
                    alt={`${m.a.code} logo`}
                    className="mx-auto h-14 w-14 rounded-full object-cover"
                    style={{ boxShadow: `0 0 22px ${m.a.color}` }}
                  />
                  <div className="mt-1 font-display text-xl">{m.a.code}</div>
                  <div className="text-xs text-slate-400">{m.a.win}%</div>
                </div>
                <div className="font-display text-3xl text-slate-500">VS</div>
                <div className="text-center">
                  <img
                    src={teamLogos[m.b.code]}
                    alt={`${m.b.code} logo`}
                    className="mx-auto h-14 w-14 rounded-full object-cover"
                    style={{ boxShadow: `0 0 22px ${m.b.color}` }}
                  />
                  <div className="mt-1 font-display text-xl">{m.b.code}</div>
                  <div className="text-xs text-slate-400">{m.b.win}%</div>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Bar pct={m.a.win} color={m.a.color} />
                <Bar pct={m.b.win} color={m.b.color} />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-black/30 p-3">
                  <dt className="uppercase tracking-widest text-slate-500">Toss Impact</dt>
                  <dd className="mt-1 text-slate-200">{m.toss}</dd>
                </div>
                <div className="rounded-lg bg-black/30 p-3">
                  <dt className="uppercase tracking-widest text-slate-500">Key Player</dt>
                  <dd className="mt-1 text-slate-200">{m.keyPlayer}</dd>
                </div>
                <div className="col-span-2 rounded-lg bg-black/30 p-3">
                  <dt className="uppercase tracking-widest text-slate-500">Pitch</dt>
                  <dd className="mt-1 text-slate-200">{m.pitch}</dd>
                </div>
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
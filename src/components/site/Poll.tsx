import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import rcbLogo from "@/assets/rcb-logo.jpg";
import srhLogo from "@/assets/srh-logo.avif";
import gtLogo from "@/assets/gt-logo.jpg";
import kkrLogo from "@/assets/kkr-logo.jpg";
import { supabase } from "@/integrations/supabase/client";
import { SectionTitle } from "./SectionTitle";

const options = [
  { code: "SRH", color: "#ff7a00", logo: srhLogo },
  { code: "RCB", color: "#e8262d", logo: rcbLogo },
  { code: "GT", color: "#3b6cb2", logo: gtLogo },
  { code: "KKR", color: "#7b3fb7", logo: kkrLogo },
];

const VOTED_KEY = "ipl2026_poll_voted";

export function Poll() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("poll_votes").select("option");
    if (!data) return;
    const map: Record<string, number> = {};
    for (const r of data) map[r.option] = (map[r.option] || 0) + 1;
    setCounts(map);
  };

  useEffect(() => {
    load();
    setVoted(typeof window !== "undefined" ? localStorage.getItem(VOTED_KEY) : null);
    const ch = supabase
      .channel("public-poll")
      .on("postgres_changes", { event: "*", schema: "public", table: "poll_votes" }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const total = useMemo(() => Object.values(counts).reduce((a, b) => a + b, 0), [counts]);

  const vote = async (opt: string) => {
    if (voted) return;
    // Optimistic update so the UI moves immediately
    setCounts((c) => ({ ...c, [opt]: (c[opt] || 0) + 1 }));
    localStorage.setItem(VOTED_KEY, opt);
    setVoted(opt);
    const { error } = await supabase.from("poll_votes").insert({ option: opt });
    if (error) {
      console.error("poll vote failed", error);
      // rollback
      setCounts((c) => ({ ...c, [opt]: Math.max(0, (c[opt] || 1) - 1) }));
      localStorage.removeItem(VOTED_KEY);
      setVoted(null);
      return;
    }
    // Refresh from server in case realtime isn't connected
    load();
  };

  return (
    <section id="polls" className="relative py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <SectionTitle eyebrow="Fan Poll" title="WHO WINS IPL 2026?" />
        <div className="glass-strong neon-border rounded-2xl p-6 md:p-8">
          <div className="mb-6 text-center text-sm uppercase tracking-[0.3em] text-cyan-300">
            {total} {total === 1 ? "vote" : "votes"} · live
          </div>
          <div className="space-y-4">
            {options.map((o) => {
              const c = counts[o.code] || 0;
              const pct = total ? Math.round((c / total) * 100) : 0;
              const isMine = voted === o.code;
              return (
                <button
                  key={o.code}
                  onClick={() => vote(o.code)}
                  disabled={!!voted}
                  className={`group relative block w-full overflow-hidden rounded-xl border bg-black/30 px-4 py-4 text-left transition ${
                    voted ? "cursor-default" : "hover:scale-[1.01]"
                  } ${isMine ? "border-cyan-300" : "border-white/10"}`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 -z-0"
                    style={{
                      background: `linear-gradient(90deg, ${o.color}55, ${o.color}22)`,
                      boxShadow: `inset 0 0 30px ${o.color}55`,
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={o.logo}
                        alt={`${o.code} logo`}
                        className="h-8 w-8 rounded-full object-cover"
                        style={{ boxShadow: `0 0 14px ${o.color}` }}
                      />
                      <span className="font-display text-xl">{o.code}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl">{pct}%</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400">
                        {c} {c === 1 ? "vote" : "votes"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {voted && (
            <div className="mt-4 text-center text-xs text-cyan-300">Thanks for voting — your pick is locked in.</div>
          )}
        </div>
      </div>
    </section>
  );
}
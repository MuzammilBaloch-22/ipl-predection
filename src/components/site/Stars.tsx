import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import red from "@/assets/player-red.jpg";
import blue from "@/assets/player-blue.jpg";
import yellow from "@/assets/player-yellow.jpg";

const stars = [
  { name: "Virat Kohli", team: "RCB", img: red, color: "#e8262d" },
  { name: "Rohit Sharma", team: "Mumbai Indians", img: blue, color: "#00aaff" },
  { name: "MS Dhoni", team: "CSK", img: yellow, color: "#f5c43a" },
];

export function Stars() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle eyebrow="Superstars" title="THE LEGENDS OF THE LEAGUE" />
        <div className="grid gap-6 md:grid-cols-3">
          {stars.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass-strong neon-border transition hover:-translate-y-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-60 mix-blend-color"
                  style={{ background: `linear-gradient(180deg, transparent 40%, ${s.color}66)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03081a] via-[#03081a]/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: s.color }}>
                  {s.team}
                </div>
                <div className="font-display text-3xl">{s.name}</div>
              </div>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 60px ${s.color}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  accent = "cyan",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: "cyan" | "gold" | "blue";
}) {
  const accentClass =
    accent === "gold"
      ? "text-glow-gold from-[#f5c43a] to-[#ffe388]"
      : accent === "blue"
        ? "text-glow-cyan from-[#1e6bff] to-[#00e5ff]"
        : "text-glow-cyan from-[#00e5ff] via-[#1e6bff] to-[#f5c43a]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      {eyebrow && (
        <div className="mb-3 text-xs uppercase tracking-[0.4em] text-cyan-300/90">{eyebrow}</div>
      )}
      <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r ${accentClass} bg-clip-text text-transparent`}>
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-slate-300/90">{subtitle}</p>}
    </motion.div>
  );
}
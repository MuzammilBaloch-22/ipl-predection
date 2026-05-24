import { motion } from "framer-motion";
import muzammil from "@/assets/muzammil.jpeg";
import stadium from "@/assets/stadium.jpg";
import rcbLogo from "@/assets/rcb-logo.jpg";
import srhLogo from "@/assets/srh-logo.avif";
import gtLogo from "@/assets/gt-logo.jpg";
import rrLogo from "@/assets/rr-logo.avif";
import { Particles } from "./Particles";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${stadium})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#001828]/80 via-[#03081a]/75 to-[#03081a]" />
      <div className="absolute inset-0 spotlight" />
      <Particles count={40} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative mx-auto w-full max-w-[360px]"
        >
          <img
            src={muzammil}
            alt="Muzammil"
            className="w-full rounded-2xl object-cover"
            style={{ aspectRatio: "3/4" }}
          />
        </motion.div>

        {/* RIGHT */}
        <motion.div className="relative text-center lg:text-left">

          <h1 className="leading-[0.95]">
            <span className="block text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-white">
              Muzammil Baloch’s
            </span>

            <span className="block text-[clamp(2.4rem,5.5vw,4.8rem)] font-bold bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
              IPL 2026 Playoffs
            </span>

            <span className="block text-[clamp(2.2rem,5vw,4rem)] font-bold text-white">
              & Final Predictions
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-cyan-100/70">
            Match analysis, predictions, Orange Cap & Purple Cap battles.
          </p>

          {/* CTA */}
          <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
            <a className="rounded-lg px-6 py-3 text-sm font-bold bg-cyan-400 text-black">
              View Predictions →
            </a>
            <a className="rounded-lg px-6 py-3 text-sm font-bold border border-cyan-400/30 text-cyan-200">
              Explore Playoffs
            </a>
          </div>

          {/* TEAM CARDS (FIXED RESPONSIVE + DESKTOP CLEAN) */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5 lg:gap-6">

            {[
              { t: "RCB", c: "#e8262d", logo: rcbLogo },
              { t: "SRH", c: "#ff7a00", logo: srhLogo },
              { t: "GT", c: "#4a90d9", logo: gtLogo },
              { t: "RR", c: "#7b3fb7", logo: rrLogo },
            ].map((x) => (
              <div
                key={x.t}
                className="
                  group flex flex-col items-center justify-center
                  rounded-2xl
                  py-5 px-4
                  min-h-[140px]
                  bg-white/5
                  border border-white/10
                  transition-all duration-300
                  hover:scale-[1.05]
                  hover:border-opacity-40
                "
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* LOGO */}
                <div
                  className="flex items-center justify-center rounded-full overflow-hidden mb-3"
                  style={{
                    width: 56,
                    height: 56,
                    border: `2px solid ${x.c}66`,
                    boxShadow: `0 0 18px ${x.c}55`,
                  }}
                >
                  <img src={x.logo} alt={x.t} className="w-full h-full object-cover" />
                </div>

                {/* TEXT */}
                <div
                  className="text-lg tracking-widest font-bold text-white/90 group-hover:text-white transition"
                >
                  {x.t}
                </div>
              </div>
            ))}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
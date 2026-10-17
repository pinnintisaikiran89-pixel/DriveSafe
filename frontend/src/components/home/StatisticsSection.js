
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    label: "Risk factors",
    value: "AI",
    description: "Assisted analysis",
    icon: Activity,
  },
  {
    label: "Road insights",
    value: "Map",
    description: "Hotspot exploration",
    icon: MapPin,
  },
  {
    label: "Safer choices",
    value: "Plan",
    description: "Before you travel",
    icon: ShieldCheck,
  },
];

function StatisticsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-4 py-7 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.10] bg-gradient-to-br from-[#0d0d10] via-[#171114] to-[#260d13] p-5 text-white shadow-[0_16px_45px_rgba(0,0,0,0.25)] sm:p-7"
      >
        <div className="pointer-events-none absolute -right-12 -top-16 -z-10 h-44 w-44 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 -z-10 h-40 w-40 rounded-full bg-red-500/[0.09] blur-3xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300">
            <Sparkles size={21} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-300">
              Built for awareness
            </p>

            <h2 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl">
              Better information for every journey.
            </h2>

            <p className="mt-2 text-xs leading-5 text-white/50">
              Explore available insights and make thoughtful travel
              decisions.
            </p>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 10 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
                className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 transition-colors hover:border-red-400/25 hover:bg-white/[0.065] sm:p-4"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/15 bg-red-500/10 text-red-300">
                  <Icon size={18} strokeWidth={1.9} />
                </div>

                <p className="break-words text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[11px] font-bold leading-4 text-white sm:text-xs">
                  {stat.label}
                </p>

                <p className="mt-1.5 text-[10px] leading-4 text-white/40 sm:text-[11px]">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="relative mt-5 flex gap-2.5 border-t border-white/[0.09] pt-4">
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-red-300"
          />

          <p className="text-[11px] leading-[18px] text-white/45">
            Predictions are estimates, not guarantees. Always follow
            traffic rules, road signs, and real-time safety instructions.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default StatisticsSection;

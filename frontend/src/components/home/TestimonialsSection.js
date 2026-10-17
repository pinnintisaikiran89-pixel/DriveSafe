
import { motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  Map,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    title: "Know the risks",
    description:
      "Review available risk estimates before making travel decisions.",
    icon: Eye,
  },
  {
    title: "Explore road hotspots",
    description:
      "Use available map data to understand reported accident areas.",
    icon: Map,
  },
  {
    title: "Stay safety-conscious",
    description:
      "Use road information alongside traffic signs and official guidance.",
    icon: ShieldCheck,
  },
];

function TestimonialsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-7 sm:px-6">
      <div className="pointer-events-none absolute -right-20 top-24 h-48 w-48 rounded-full bg-red-600/[0.055] blur-[90px]" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="relative mb-5"
      >
        <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-400">
          <Sparkles size={13} />
          Why DriveSafe
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          Safety in every step
        </h2>

        <p className="mt-1 text-sm leading-5 text-white/50">
          Make awareness part of every journey.
        </p>
      </motion.div>

      <div className="relative space-y-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <motion.article
              key={benefit.title}
              initial={
                reduceMotion ? false : { opacity: 0, y: 14 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              className="group relative flex items-start gap-3.5 overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.035] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors duration-300 hover:border-red-400/25 hover:bg-white/[0.05] sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-red-400/20 bg-red-500/[0.09] text-red-300 transition-all duration-300 group-hover:border-red-400/40 group-hover:bg-red-500/15">
                <Icon size={22} strokeWidth={1.9} />
              </div>

              <div className="min-w-0 flex-1 py-0.5">
                <h3 className="text-sm font-bold leading-5 text-white">
                  {benefit.title}
                </h3>

                <p className="mt-1.5 text-xs leading-[19px] text-white/50">
                  {benefit.description}
                </p>
              </div>

              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.035] text-white/35 transition-colors group-hover:border-red-400/20 group-hover:bg-red-500/10 group-hover:text-red-300">
                <ArrowUpRight size={15} />
              </span>

              <span className="absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-red-500 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="relative mt-5 overflow-hidden rounded-[25px] border border-red-400/15 bg-gradient-to-br from-red-500/[0.10] via-white/[0.025] to-transparent p-5"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/[0.09] blur-2xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-300">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">
              Your safety comes first.
            </h3>

            <p className="mt-1.5 text-xs leading-[19px] text-white/55">
              Use DriveSafe as a decision-support tool. Stay attentive,
              obey traffic laws, and follow official road safety guidance.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;

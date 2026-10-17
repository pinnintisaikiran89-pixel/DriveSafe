
import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter your details",
    description:
      "Provide the trip or road conditions needed for the selected tool.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Analyze the risk",
    description:
      "DriveSafe processes the available information to estimate risk.",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Make informed choices",
    description:
      "Use the results as guidance while following road rules.",
    icon: ShieldCheck,
  },
];

function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-7 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-20 h-48 w-48 rounded-full bg-red-600/[0.055] blur-[90px]" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="relative mb-6"
      >
        <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-400">
          <Sparkles size={13} />
          Simple process
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          How DriveSafe works
        </h2>

        <p className="mt-1 text-sm leading-5 text-white/50">
          Three simple steps toward more informed journeys.
        </p>
      </motion.div>

      <div className="relative space-y-3">
        <div
          aria-hidden="true"
          className="absolute bottom-12 left-[39px] top-12 w-px bg-gradient-to-b from-red-500/50 via-red-500/15 to-transparent"
        />

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.article
              key={step.number}
              initial={
                reduceMotion ? false : { opacity: 0, x: -12 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
              className="group relative flex gap-4 rounded-[24px] border border-white/[0.09] bg-white/[0.035] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors duration-300 hover:border-red-400/25 hover:bg-white/[0.05] sm:p-5"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-red-400/20 bg-red-500/[0.09] text-red-300 transition-all duration-300 group-hover:border-red-400/40 group-hover:bg-red-500/15">
                <Icon size={22} strokeWidth={1.9} />
              </div>

              <div className="min-w-0 flex-1 py-0.5 pr-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-[0.17em] text-red-400">
                    STEP {step.number}
                  </span>

                  {index === 0 && (
                    <span className="rounded-full border border-red-400/15 bg-red-500/[0.08] px-2 py-0.5 text-[9px] font-bold text-red-300">
                      START HERE
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-sm font-bold leading-5 text-white">
                  {step.title}
                </h3>

                <p className="mt-1.5 text-xs leading-[19px] text-white/50">
                  {step.description}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 text-2xl font-black leading-none tracking-tight text-white/[0.045] transition-colors group-hover:text-red-400/[0.10]"
              >
                {step.number}
              </span>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5">
        <ShieldCheck
          size={17}
          className="mt-0.5 shrink-0 text-red-300"
        />

        <p className="text-xs leading-[19px] text-white/55">
          DriveSafe provides estimates and guidance. Stay attentive
          and follow traffic signs and road rules.
        </p>
      </div>
    </section>
  );
}

export default HowItWorksSection;

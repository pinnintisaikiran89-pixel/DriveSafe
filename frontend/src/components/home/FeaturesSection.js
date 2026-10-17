
import { motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  MapPinned,
  ShieldAlert,
  Route,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Predict Risk",
    description: "AI-assisted accident risk estimates",
    icon: BrainCircuit,
    href: "/predict",
    accent: "text-red-400 bg-red-500/10 border-red-400/15",
  },
  {
    title: "Risk Map",
    description: "Explore accident hotspots",
    icon: MapPinned,
    href: "/map",
    accent: "text-orange-300 bg-orange-400/10 border-orange-300/15",
  },
  {
    title: "Report Accident",
    description: "Submit an incident report",
    icon: ShieldAlert,
    href: "/report-accident",
    accent: "text-rose-300 bg-rose-400/10 border-rose-300/15",
  },
  {
    title: "Safe Routes",
    description: "Review route safety",
    icon: Route,
    href: "/route-safety",
    accent: "text-emerald-300 bg-emerald-400/10 border-emerald-300/15",
  },
];

function FeaturesSection() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-4 py-7 sm:px-6">
      <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-red-600/[0.07] blur-[90px]" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="relative mb-5 flex items-end justify-between gap-3"
      >
        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-400">
            <Sparkles size={13} />
            DriveSafe tools
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
            Your safety tools
          </h2>

          <p className="mt-1 text-sm text-white/50">
            Everything important, within reach.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-red-400/20 bg-red-500/[0.08] px-3 py-1.5 text-[10px] font-bold tracking-wider text-red-300">
          04 TOOLS
        </span>
      </motion.div>

      <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.button
              key={feature.title}
              type="button"
              onClick={() => navigate(feature.href)}
              initial={
                reduceMotion ? false : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : index * 0.07,
              }}
              whileHover={
                reduceMotion ? undefined : { y: -3 }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="group relative flex min-h-[178px] flex-col items-start overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.035] p-4 text-left shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors duration-300 hover:border-red-400/25 hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 sm:p-5"
            >
              <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.025] transition-colors duration-300 group-hover:bg-red-500/[0.08]" />

              <span
                className={`relative flex h-12 w-12 items-center justify-center rounded-[16px] border ${feature.accent} transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon size={22} strokeWidth={1.9} />
              </span>

              <span className="relative mt-5 flex w-full items-center justify-between gap-1">
                <span className="text-[13px] font-bold leading-5 text-white sm:text-sm">
                  {feature.title}
                </span>

                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-white/25 transition-colors group-hover:text-red-300"
                />
              </span>

              <span className="relative mt-1.5 text-xs leading-[19px] text-white/45">
                {feature.description}
              </span>

              <span className="absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-red-500 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturesSection;

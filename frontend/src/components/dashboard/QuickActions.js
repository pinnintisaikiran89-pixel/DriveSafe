
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Route,
  Map,
  BrainCircuit,
  History,
  ArrowUpRight,
} from "lucide-react";

const actions = [
  {
    name: "Route Safety",
    description: "Plan a safer route",
    path: "/route-safety",
    icon: Route,
    glow: "bg-emerald-500/10 text-emerald-300 border-emerald-400/15",
  },
  {
    name: "Explore Map",
    description: "View road locations",
    path: "/map",
    icon: Map,
    glow: "bg-blue-500/10 text-blue-300 border-blue-400/15",
  },
  {
    name: "Predict Risk",
    description: "Assess driving risk",
    path: "/predict",
    icon: BrainCircuit,
    glow: "bg-red-500/10 text-red-300 border-red-400/15",
  },
  {
    name: "History",
    description: "Review past activity",
    path: "/history",
    icon: History,
    glow: "bg-violet-500/10 text-violet-300 border-violet-400/15",
  },
];

function QuickActions() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.path}
            type="button"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.25,
              delay: reduceMotion ? 0 : index * 0.05,
            }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => navigate(action.path)}
            className="group relative isolate min-w-0 overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0d111c]/90 p-4 text-left shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-white/[0.16] focus:outline-none focus:ring-2 focus:ring-red-400/40 sm:p-5"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-red-500/[0.05] blur-3xl transition-colors group-hover:bg-red-500/10" />

            <div className="relative flex items-start justify-between gap-2">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-200 group-hover:bg-red-500/15 sm:h-12 sm:w-12 ${action.glow}`}
              >
                <Icon size={22} strokeWidth={2} />
              </div>

              <ArrowUpRight
                size={18}
                className="mt-1 shrink-0 text-slate-500 transition-colors group-hover:text-red-300"
              />
            </div>

            <h3 className="relative mt-4 break-words text-sm font-extrabold text-white">
              {action.name}
            </h3>

            <p className="relative mt-1 text-xs leading-5 text-slate-400">
              {action.description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}

export default QuickActions;

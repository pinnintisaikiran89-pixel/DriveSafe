
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Cloud,
  Gauge,
  ArrowRight,
  Clock3,
  FileClock,
  History,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function getRiskStyle(level = "") {
  const value = String(level).toLowerCase();

  if (
    value.includes("high") ||
    value.includes("fatal") ||
    value.includes("serious")
  ) {
    return "border-red-400/20 bg-red-500/10 text-red-300";
  }

  if (value.includes("medium") || value.includes("moderate")) {
    return "border-amber-400/20 bg-amber-500/10 text-amber-300";
  }

  return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";
}

function PredictionHistory() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("driveSafeHistory") || "[]"
      );

      setHistory(Array.isArray(stored) ? stored.slice(0, 5) : []);
    } catch (error) {
      console.error("Unable to read prediction history:", error);
      setHistory([]);
    }
  }, []);

  if (history.length === 0) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative isolate overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0d111c]/90 p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-6"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-red-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 text-red-300">
            <FileClock size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold text-white">
              No saved predictions yet
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Your recent risk assessments will appear here after you save a
              prediction.
            </p>

            <button
              type="button"
              onClick={() => navigate("/predict")}
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl text-sm font-bold text-red-300 transition hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400/50"
            >
              Make a prediction
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative space-y-3">
      {history.map((item, index) => (
        <motion.div
          key={`${item.date || "prediction"}-${index}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.25,
            delay: reduceMotion ? 0 : index * 0.04,
          }}
          className="group relative isolate overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0d111c]/90 p-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-white/[0.14] sm:p-5"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/[0.07] blur-3xl" />

          <div className="relative flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 text-red-300">
              <ShieldAlert size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="break-words text-sm font-extrabold text-white">
                  {item.prediction || "Risk prediction"}
                </h3>

                {item.risk_level && (
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${getRiskStyle(
                      item.risk_level
                    )}`}
                  >
                    {item.risk_level}
                  </span>
                )}
              </div>

              {item.date && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock3 size={13} className="shrink-0 text-slate-500" />
                  <span>{item.date}</span>
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.07] pt-3">
                {item.risk_score !== undefined &&
                  item.risk_score !== null && (
                    <span className="text-xs text-slate-400">
                      Score{" "}
                      <strong className="font-extrabold text-slate-200">
                        {item.risk_score}
                      </strong>
                    </span>
                  )}

                {item.weather && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Cloud size={14} className="shrink-0 text-sky-300" />
                    {item.weather}
                  </span>
                )}

                {item.speed !== undefined && item.speed !== null && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Gauge size={14} className="shrink-0 text-blue-300" />
                    {item.speed}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <button
        type="button"
        onClick={() => navigate("/history")}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-red-400/30 hover:bg-red-500/[0.07] hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400/40"
      >
        <History size={16} />
        View full history
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default PredictionHistory;

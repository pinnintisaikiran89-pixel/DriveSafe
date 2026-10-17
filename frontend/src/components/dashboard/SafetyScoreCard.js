
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Gauge,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function SafetyScoreCard() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("Not assessed");

  useEffect(() => {
    try {
      const savedRisk = localStorage.getItem("driveSafeRisk");

      if (!savedRisk) {
        setScore(null);
        setStatus("Not assessed");
        return;
      }

      const riskData = JSON.parse(savedRisk);
      const riskScore = Number(riskData?.risk_score);

      if (!Number.isFinite(riskScore)) {
        setScore(null);
        setStatus("Not assessed");
        return;
      }

      const safetyScore = Math.max(
        0,
        Math.min(100, Math.round(100 - riskScore))
      );

      setScore(safetyScore);

      if (riskScore >= 65) {
        setStatus("High Risk");
      } else if (riskScore >= 35) {
        setStatus("Moderate");
      } else {
        setStatus("Excellent");
      }
    } catch (error) {
      console.error("Unable to read saved safety score:", error);
      setScore(null);
      setStatus("Not assessed");
    }
  }, []);

  const assessed = score !== null;
  const highRisk = status === "High Risk";
  const moderate = status === "Moderate";

  const statusColor = highRisk
    ? "text-red-300"
    : moderate
    ? "text-amber-300"
    : "text-emerald-300";

  const statusPanel = highRisk
    ? "border-red-400/20 bg-red-500/10"
    : moderate
    ? "border-amber-400/20 bg-amber-500/10"
    : "border-emerald-400/20 bg-emerald-500/10";

  const progressColor = highRisk
    ? "from-red-500 to-rose-400"
    : moderate
    ? "from-amber-400 to-orange-400"
    : "from-emerald-400 to-teal-300";

  const iconPanel = highRisk
    ? "bg-red-500/10 text-red-300 ring-red-400/20"
    : moderate
    ? "bg-amber-500/10 text-amber-300 ring-amber-400/20"
    : "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20";

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.25 }}
      className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0d111c]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6"
      aria-label="Driving safety overview"
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-red-500/[0.13] blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-blue-500/[0.10] blur-3xl"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 rounded-full border border-white/[0.04]" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/15 bg-red-500/10 text-red-300">
                <Gauge size={19} />
              </div>

              <p className="text-sm font-semibold tracking-wide text-slate-300">
                Safety Overview
              </p>
            </div>

            <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {assessed ? "Your Safety Score" : "Ready to assess?"}
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
              {assessed
                ? "Based on your latest saved risk assessment."
                : "Assess your driving risk to see your safety score."}
            </p>
          </div>

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${iconPanel}`}
          >
            {highRisk ? (
              <ShieldAlert size={24} />
            ) : (
              <ShieldCheck size={24} />
            )}
          </div>
        </div>

        {assessed ? (
          <>
            {/* Score */}
            <div className="mt-7 flex flex-wrap items-end gap-x-2 gap-y-3">
              <span className="text-6xl font-black tracking-[-0.06em] text-white sm:text-7xl">
                {score}
              </span>

              <span className="mb-2 text-base font-semibold text-slate-500">
                / 100
              </span>

              <span
                className={`mb-2 ml-auto rounded-full border px-3 py-1.5 text-xs font-bold ${statusPanel} ${statusColor}`}
              >
                {status}
              </span>
            </div>

            {/* Progress bar */}
            <div
              className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/[0.07]"
              role="progressbar"
              aria-label="Safety score"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={score}
            >
              <motion.div
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full bg-gradient-to-r ${progressColor}`}
              />
            </div>

            <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-500">
              <span>Needs attention</span>
              <span>Excellent</span>
            </div>

            {/* High-risk guidance */}
            {highRisk && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.07] p-3.5">
                <ShieldAlert
                  size={18}
                  className="mt-0.5 shrink-0 text-red-300"
                />

                <p className="text-xs leading-5 text-red-200/90">
                  Your latest assessment indicates elevated risk. Review the
                  results and take extra care before travelling.
                </p>
              </div>
            )}

            {/* Reassess button */}
            <button
              type="button"
              onClick={() => navigate("/predict")}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition duration-200 hover:from-red-500 hover:to-rose-400 focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:ring-offset-2 focus:ring-offset-[#0d111c] active:scale-[0.99]"
            >
              Reassess driving risk
              <ArrowRight size={17} />
            </button>
          </>
        ) : (
          <>
            {/* Empty state */}
            <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Sparkles size={17} className="text-red-300" />
                Your safety insights start here
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Complete a risk assessment to view your score and understand
                your current driving risk.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/predict")}
              className="mt-5 flex min-h-12 w-full items-center justify-between rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition duration-200 hover:from-red-500 hover:to-rose-400 focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:ring-offset-2 focus:ring-offset-[#0d111c] active:scale-[0.99]"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={17} />
                Start risk assessment
              </span>

              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </motion.section>
  );
}

export default SafetyScoreCard;

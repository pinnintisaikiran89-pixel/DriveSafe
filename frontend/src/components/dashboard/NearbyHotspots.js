
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  MapPin,
  TriangleAlert,
  RefreshCw,
  MapPinned,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

function getHotspotRiskStyle(risk = "") {
  const value = String(risk).toLowerCase();

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

function NearbyHotspots() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHotspots = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://drivesafe-n587.onrender.com/hotspots"
      );

      const data = response.data;
      const list = Array.isArray(data) ? data : data?.hotspots;

      setHotspots(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Hotspots Error:", err);
      setError("Unable to load accident hotspots right now.");
      setHotspots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotspots();
  }, [fetchHotspots]);

  if (loading) {
    return (
      <div className="space-y-3" aria-label="Loading accident hotspots">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="relative isolate overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0d111c]/90 p-4"
          >
            <div className="flex gap-3">
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-2xl bg-red-500/10" />

              <div className="min-w-0 flex-1">
                <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.08]" />
                <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-white/[0.05]" />
                <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-white/[0.05]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="relative isolate overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0d111c]/90 p-5 shadow-lg shadow-black/10 backdrop-blur-xl sm:p-6"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 text-red-300">
            <TriangleAlert size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold text-white">
              Hotspots unavailable
            </h3>

            <p className="mt-1 text-sm leading-5 text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchHotspots}
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/15 focus:outline-none focus:ring-2 focus:ring-red-400/40"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (hotspots.length === 0) {
    return (
      <div className="relative isolate overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0d111c]/90 px-5 py-7 text-center shadow-lg shadow-black/10 sm:py-8">
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-blue-500/[0.08] blur-3xl" />

        <div className="relative">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/15 bg-blue-500/10 text-blue-300">
            <MapPinned size={23} />
          </div>

          <h3 className="mt-4 font-extrabold text-white">
            No hotspot data available
          </h3>

          <p className="mx-auto mt-1 max-w-xs text-sm leading-6 text-slate-400">
            There are no hotspot entries to display at the moment.
          </p>

          <button
            type="button"
            onClick={fetchHotspots}
            className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/[0.08] focus:outline-none focus:ring-2 focus:ring-red-400/40"
          >
            <RefreshCw size={15} />
            Refresh data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {hotspots.slice(0, 5).map((spot, index) => (
        <motion.div
          key={`${spot.name || "hotspot"}-${index}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.25,
            delay: reduceMotion ? 0 : index * 0.04,
          }}
          className="group relative isolate overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0d111c]/90 p-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-white/[0.14] sm:p-5"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/[0.07] blur-3xl" />

          <div className="relative flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 text-red-300">
              <MapPin size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="break-words text-sm font-extrabold leading-5 text-white">
                  {spot.name || "Unnamed hotspot"}
                </h3>

                {spot.risk && (
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${getHotspotRiskStyle(
                      spot.risk
                    )}`}
                  >
                    {spot.risk}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/15 bg-amber-500/[0.08] px-2.5 py-1.5 text-xs font-semibold text-amber-300">
                  <TriangleAlert size={14} />
                  {spot.accidents ?? 0} reported accidents
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs leading-5 text-slate-400">
                <ShieldCheck size={14} className="shrink-0 text-emerald-300" />
                <span>
                  Stay alert when travelling through this area
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <button
        type="button"
        onClick={() => navigate("/map")}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-red-400/30 hover:bg-red-500/[0.07] hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400/40"
      >
        Explore all hotspots
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default NearbyHotspots;

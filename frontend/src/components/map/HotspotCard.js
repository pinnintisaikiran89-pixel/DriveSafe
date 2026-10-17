
import { AlertTriangle, MapPin } from "lucide-react";
import GlassCard from "../common/GlassCard";

function HotspotCard({ hotspot = {} }) {
  const risk = String(hotspot.risk || "Low");
  const normalizedRisk = risk.toLowerCase();

  const riskStyles =
    normalizedRisk === "high"
      ? "border-red-400/20 bg-red-500/10 text-red-300"
      : normalizedRisk === "medium"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

  const iconColor =
    normalizedRisk === "high"
      ? "text-red-400"
      : normalizedRisk === "medium"
        ? "text-amber-300"
        : "text-emerald-300";

  return (
    <GlassCard className="mb-3 p-4 transition duration-200 hover:border-white/15">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-4 w-4 shrink-0 ${iconColor}`} />

            <h3 className="truncate text-base font-bold text-white">
              {hotspot.name || "Unknown location"}
            </h3>
          </div>

          <p className="mt-2 text-sm text-white/50">
            {Number(hotspot.accidents) || 0} accidents reported
          </p>
        </div>

        <span
          className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold ${riskStyles}`}
        >
          {risk}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3 text-xs text-white/40">
        <MapPin className="h-4 w-4 shrink-0" />
        <span>Monitored safety zone</span>
      </div>
    </GlassCard>
  );
}

export default HotspotCard;

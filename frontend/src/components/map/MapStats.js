
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Radar,
} from "lucide-react";

import StatCard from "../cards/StatCard";

function MapStats({ hotspotCount = 0 }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      <StatCard
        title="Hotspots"
        value={hotspotCount}
        icon={<AlertTriangle />}
        color="bg-red-500/10 text-red-400"
      />

      <StatCard
        title="AI Accuracy"
        value="96%"
        icon={<ShieldCheck />}
        color="bg-emerald-500/10 text-emerald-400"
      />

      <StatCard
        title="Live Alerts"
        value="8"
        icon={<Activity />}
        color="bg-amber-500/10 text-amber-300"
      />

      <StatCard
        title="Tracking"
        value="Live"
        icon={<Radar />}
        color="bg-blue-500/10 text-blue-300"
      />
    </div>
  );
}

export default MapStats;

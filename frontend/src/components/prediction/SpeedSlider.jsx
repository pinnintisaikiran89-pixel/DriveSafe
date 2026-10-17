
import { Gauge } from "lucide-react";

function SpeedSlider({
  speed,
  setSpeed,
  label = "Speed Limit",
}) {
  return (
    <div className="mb-6 rounded-2xl border border-white/[0.08] bg-[#111722]/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="speed-slider"
          className="flex items-center gap-2 text-sm font-semibold text-white/75"
        >
          <Gauge className="h-4 w-4 text-red-400" />
          {label}
        </label>

        <span className="rounded-full border border-red-400/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-300">
          Speed
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-center gap-2">
        <span className="text-5xl font-bold tracking-tight text-white tabular-nums">
          {speed}
        </span>
        <span className="text-sm font-medium text-white/45">km/h</span>
      </div>

      <input
        id="speed-slider"
        type="range"
        min="20"
        max="140"
        step="5"
        value={speed}
        onChange={(event) => setSpeed(Number(event.target.value))}
        aria-label={`${label}: ${speed} kilometres per hour`}
        className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-red-500"
      />

      <div className="mt-2 flex justify-between text-[11px] text-white/35">
        <span>20 km/h</span>
        <span>80 km/h</span>
        <span>140 km/h</span>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/40">
        Set the speed you expect to travel at or the relevant road speed limit.
      </p>
    </div>
  );
}

export default SpeedSlider;


import { MapPinned, ShieldCheck } from "lucide-react";

function MapHeader() {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-300">
              AI Monitoring
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            Smart Hotspots
          </h1>

          <p className="mt-2 max-w-xs text-sm leading-5 text-white/45">
            Explore accident-prone roads and safety zones.
          </p>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
          <MapPinned className="h-7 w-7 text-blue-300" />
        </div>
      </div>
    </header>
  );
}

export default MapHeader;

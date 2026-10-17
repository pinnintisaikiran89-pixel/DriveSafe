
import { LocateFixed, SlidersHorizontal } from "lucide-react";

function FloatingButtons() {
  return (
    <div className="fixed bottom-28 right-4 z-40 flex flex-col gap-3">
      <button
        type="button"
        aria-label="Locate my position"
        title="Locate my position"
        onClick={() =>
          window.dispatchEvent(new Event("drivesafe:locate"))
        }
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500 text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400 active:scale-95"
      >
        <LocateFixed size={21} />
      </button>

      <button
        type="button"
        aria-label="Map settings"
        title="Map settings"
        onClick={() =>
          window.dispatchEvent(new Event("drivesafe:map-settings"))
        }
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#151b27] text-white shadow-lg shadow-black/20 transition hover:bg-[#202838] active:scale-95"
      >
        <SlidersHorizontal size={21} />
      </button>
    </div>
  );
}

export default FloatingButtons;

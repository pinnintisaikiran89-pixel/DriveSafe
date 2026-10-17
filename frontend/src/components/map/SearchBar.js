
import { Search, X } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="mb-5">
      <label htmlFor="hotspot-search" className="sr-only">
        Search hotspots
      </label>

      <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 transition focus-within:border-red-400/40 focus-within:ring-4 focus-within:ring-red-500/[0.07]">
        <Search className="h-5 w-5 shrink-0 text-white/40" />

        <input
          id="hotspot-search"
          type="text"
          placeholder="Search places or hotspots..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

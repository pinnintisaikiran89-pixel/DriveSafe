
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Search,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Activity,
} from "lucide-react";

import PageLayout from "../layouts/PageLayout";
import TopHeader from "../components/common/TopHeader";
import GoogleMapComponent from "../components/GoogleMapComponent";

const API_URL = "http://127.0.0.1:8000/hotspots";

function MapPage() {
  const [hotspots, setHotspots] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHotspots = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL, { timeout: 8000 });
      const data = response.data;
      const list = Array.isArray(data) ? data : data?.hotspots;
      setHotspots(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(
        err.code === "ECONNABORTED"
          ? "The hotspot service took too long to respond."
          : "Unable to load hotspots. Check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotspots();
  }, []);

  const filteredHotspots = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return hotspots;

    return hotspots.filter((spot) =>
      String(spot.name || spot.location || spot.place || "")
        .toLowerCase()
        .includes(term)
    );
  }, [hotspots, search]);

  const accidentCount = hotspots.reduce(
    (sum, spot) => sum + (Number(spot.accidents) || 0),
    0
  );

  const highRiskCount = hotspots.filter((spot) => {
    const risk = String(spot.risk || spot.risk_level || "").toLowerCase();
    return risk.includes("high") || risk.includes("critical");
  }).length;

  return (
    <PageLayout>
      <TopHeader
        greeting="Drive Safe"
        name="Road Safety Map"
        subtitle="Explore accident hotspots and plan safer journeys."
      />

      <section className="mt-7">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
            <MapPin className="h-5 w-5 text-red-400" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold">Accident hotspots</h1>
            <p className="mt-1 text-xs text-white/45">
              Explore higher-risk locations
            </p>
          </div>

          <button
            type="button"
            onClick={fetchHotspots}
            disabled={loading}
            aria-label="Refresh hotspots"
            className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white/70 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <Stat label="Hotspots" value={loading ? "—" : hotspots.length} />
          <Stat label="Accidents" value={loading ? "—" : accidentCount} />
          <Stat label="High risk" value={loading ? "—" : highRiskCount} />
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-[#111722] px-4 py-3.5 focus-within:border-red-400/40">
          <Search className="h-4 w-4 shrink-0 text-white/40" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search accident hotspots..."
            aria-label="Search accident hotspots"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs text-white/50"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-white/[0.09] bg-[#11141b] p-3.5">
        <div className="mb-3 flex items-center gap-3 px-1">
          <Activity className="h-5 w-5 text-red-400" />
          <div>
            <h2 className="text-sm font-bold">Live safety map</h2>
            <p className="mt-1 text-[11px] text-white/40">
              Accident-prone locations
            </p>
          </div>
        </div>

        <div className="min-h-[300px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1018]">
          <GoogleMapComponent hotspots={filteredHotspots} />
        </div>

        <p className="mt-3 px-1 text-[11px] leading-5 text-white/40">
          Map information depends on the hotspot data available from your backend.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold">Nearby hotspots</h2>
        <p className="mt-1 text-xs text-white/40">
          {loading ? "Loading locations..." : `${filteredHotspots.length} locations found`}
        </p>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/[0.07] p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
              <div>
                <p className="text-sm font-semibold">Unable to load hotspots</p>
                <p className="mt-1 text-xs leading-5 text-white/50">{error}</p>
                <button
                  onClick={fetchHotspots}
                  className="mt-3 rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && hotspots.length === 0 && !error && (
          <p className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm text-white/50">
            Loading accident locations...
          </p>
        )}

        {!loading && !error && filteredHotspots.length === 0 && (
          <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center">
            <MapPin className="mx-auto h-7 w-7 text-white/30" />
            <p className="mt-3 text-sm font-semibold">
              {search ? "No matching hotspots" : "No hotspots available"}
            </p>
            <p className="mt-1 text-xs text-white/40">
              {search ? "Try another location name." : "Hotspot data will appear here when available."}
            </p>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {filteredHotspots.map((spot, index) => (
            <HotspotItem
              key={spot.id || spot._id || `${spot.name || "spot"}-${index}`}
              spot={spot}
            />
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-red-400/15 bg-red-500/[0.06] p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <h3 className="text-sm font-semibold">Drive with awareness</h3>
            <p className="mt-1 text-xs leading-5 text-white/45">
              Maintain a safe speed and follow road signs, especially in unfamiliar areas.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
      <p className="text-xl font-bold">{value}</p>
      <p className="mt-1 text-[10px] font-medium text-white/40">{label}</p>
    </div>
  );
}

function HotspotItem({ spot }) {
  const name = spot.name || spot.location || spot.place || "Accident hotspot";
  const accidents = Number(spot.accidents) || 0;
  const risk = String(spot.risk || spot.risk_level || "Unknown");
  const value = risk.toLowerCase();

  const riskClass =
    value.includes("high") || value.includes("critical")
      ? "border-red-400/20 bg-red-500/10 text-red-300"
      : value.includes("medium") || value.includes("moderate")
      ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
      : "border-white/10 bg-white/[0.05] text-white/60";

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/[0.08]">
          <MapPin className="h-5 w-5 text-red-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{name}</h3>
          <p className="mt-1 text-xs text-white/40">
            {accidents} recorded accident{accidents === 1 ? "" : "s"}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${riskClass}`}>
          {risk}
        </span>
      </div>
    </div>
  );
}

export default MapPage;

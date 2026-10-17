
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  MapPin,
  Navigation,
  ShieldAlert,
  Route as RouteIcon,
  Clock3,
  ArrowLeftRight,
  Sparkles,
  LoaderCircle,
  AlertTriangle,
  LocateFixed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "../components/navigation/BottomNavigation";

// Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const inputClass =
  "w-full min-w-0 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-white/30";

function AutoZoom({ startPos, endPos }) {
  const map = useMap();

  useEffect(() => {
    if (startPos && endPos) {
      map.fitBounds([startPos, endPos], {
        padding: [35, 35],
      });
    } else if (startPos) {
      map.setView(startPos, 8);
    }
  }, [map, startPos, endPos]);

  return null;
}

function RouteSafety() {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [risk, setRisk] = useState("");
  const [startPos, setStartPos] = useState([20.5937, 78.9629]);
  const [endPos, setEndPos] = useState(null);
  const [nearestHotspot, setNearestHotspot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const geocodeLocation = async (place) => {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          q: place,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.data?.length) {
      throw new Error(`Location not found: ${place}`);
    }

    return [
      Number(response.data[0].lat),
      Number(response.data[0].lon),
    ];
  };

  const saveToHistory = ({
    source,
    destination,
    distance,
    duration,
    risk,
    nearestHotspot,
  }) => {
    try {
      // Keep the existing history key used by this route screen.
      const oldHistory =
        JSON.parse(localStorage.getItem("drivesafe_history") || "[]");

      const riskLevel =
        risk === "High Risk"
          ? "High"
          : risk === "Moderate Risk"
          ? "Medium"
          : "Low";

      const historyItem = {
        title: "Route Safety Analysis",
        date: new Date().toLocaleString(),
        source,
        destination,
        distance,
        duration,
        risk_level: riskLevel,
        risk_score:
          riskLevel === "High"
            ? 75
            : riskLevel === "Medium"
            ? 50
            : 20,
        nearest_hotspot: nearestHotspot || null,
      };

      localStorage.setItem(
        "drivesafe_history",
        JSON.stringify([historyItem, ...oldHistory].slice(0, 20))
      );
    } catch (error) {
      console.error("Could not save route history:", error);
    }
  };

  const calculateRoute = async () => {
    setErrorMessage("");

    if (!source.trim() || !destination.trim()) {
      setErrorMessage("Enter both a starting point and destination.");
      return;
    }

    if (source.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setErrorMessage("Choose two different locations.");
      return;
    }

    setLoading(true);

    try {
      const start = await geocodeLocation(source.trim());
      const end = await geocodeLocation(destination.trim());

      setStartPos(start);
      setEndPos(end);
      setRouteCoords([]);
      setDistance("");
      setDuration("");
      setRisk("");
      setNearestHotspot(null);

      const routeResponse = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}`,
        {
          params: {
            overview: "full",
            geometries: "geojson",
          },
        }
      );

      const route = routeResponse.data?.routes?.[0];

      if (!route) {
        throw new Error("No driving route was found for these locations.");
      }

      const coords = route.geometry.coordinates.map(([lng, lat]) => [
        lat,
        lng,
      ]);

      setRouteCoords(coords);

      const km = Number(route.distance / 1000);
      const distanceValue = `${km.toFixed(1)} km`;
      const mins = Math.round(route.duration / 60);

      const durationValue =
        mins >= 60
          ? `${Math.floor(mins / 60)} hr ${mins % 60} min`
          : `${mins} min`;

      setDistance(distanceValue);
      setDuration(durationValue);

      let hotspotData = null;

      try {
        const riskResponse = await axios.post(
          "http://127.0.0.1:8000/risk",
          {
            latitude: start[0],
            longitude: start[1],
            ml_prediction: "Minor",
            ml_confidence: 50,
            weather: "Clear",
            road_condition: "Dry",
            lighting: "Daylight",
            traffic: "Moderate",
            speed: 60,
          }
        );

        hotspotData = riskResponse.data?.nearest_hotspot || null;
        setNearestHotspot(hotspotData);
      } catch (riskError) {
        console.error("Route risk API error:", riskError);
      }

      // Preserves the original distance-based route classification.
      // Distance alone is not a complete measure of actual road safety.
      const riskLevel =
        km > 250
          ? "High Risk"
          : km > 100
          ? "Moderate Risk"
          : "Safe";

      setRisk(riskLevel);

      saveToHistory({
        source: source.trim(),
        destination: destination.trim(),
        distance: distanceValue,
        duration: durationValue,
        risk: riskLevel,
        nearestHotspot: hotspotData,
      });
    } catch (error) {
      console.error("Route Error:", error);
      setErrorMessage(
        error.message || "Unable to calculate this route. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyle = () => {
    if (risk === "High Risk") {
      return {
        text: "text-red-300",
        badge: "border-red-400/20 bg-red-500/10",
        label: "High Risk",
      };
    }

    if (risk === "Moderate Risk") {
      return {
        text: "text-amber-300",
        badge: "border-amber-400/20 bg-amber-400/10",
        label: "Moderate Risk",
      };
    }

    return {
      text: "text-emerald-300",
      badge: "border-emerald-400/20 bg-emerald-400/10",
      label: "Lower Distance-Based Risk",
    };
  };

  const riskStyle = getRiskStyle();

  const swapLocations = () => {
    setSource(destination);
    setDestination(source);
    setErrorMessage("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b12] text-white">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-[42%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <main className="relative mx-auto w-full max-w-lg px-4 pb-32 pt-6 sm:px-6">
        {/* Header */}
        <header className="mb-7">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition hover:text-white"
          >
            <Navigation className="h-4 w-4 -rotate-90" />
            Dashboard
          </button>

          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
              <RouteIcon className="h-6 w-6 text-red-400" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                Smart route planning
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Route Safety
              </h1>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Plan your journey and review route information before you travel.
              </p>
            </div>
          </div>
        </header>

        {/* Location inputs */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Your journey</h2>
            <span className="text-xs text-white/35">Start to destination</span>
          </div>

          <div className="relative space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111722] px-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                <MapPin className="h-4 w-4 text-emerald-300" />
              </div>

              <input
                type="text"
                value={source}
                onChange={(event) => setSource(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") calculateRoute();
                }}
                placeholder="Enter starting location"
                aria-label="Starting location"
                className={inputClass}
              />
            </div>

            <div className="absolute right-4 top-[42px] z-10">
              <button
                type="button"
                onClick={swapLocations}
                aria-label="Swap source and destination"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#202735] text-white/65 transition hover:text-white"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111722] px-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-400/10">
                <Navigation className="h-4 w-4 text-red-300" />
              </div>

              <input
                type="text"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") calculateRoute();
                }}
                placeholder="Enter destination"
                aria-label="Destination"
                className={inputClass}
              />
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mt-4 flex gap-2 rounded-xl border border-red-400/20 bg-red-500/[0.08] p-3 text-sm leading-5 text-red-200"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="button"
            onClick={calculateRoute}
            disabled={loading}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Analyzing route...
              </>
            ) : (
              <>
                <RouteIcon className="h-5 w-5" />
                Analyze Route
              </>
            )}
          </button>
        </section>

        {/* Map */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Route map</h2>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <LocateFixed className="h-3.5 w-3.5" />
              Interactive
            </span>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-2 shadow-xl shadow-black/20">
            <div className="overflow-hidden rounded-2xl">
              <MapContainer
                center={startPos}
                zoom={5}
                scrollWheelZoom
                style={{
                  height: "320px",
                  width: "100%",
                  borderRadius: "16px",
                  background: "#111722",
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {endPos && (
                  <AutoZoom startPos={startPos} endPos={endPos} />
                )}

                <Marker position={startPos}>
                  <Popup>Start: {source || "Starting point"}</Popup>
                </Marker>

                {endPos && (
                  <Marker position={endPos}>
                    <Popup>Destination: {destination}</Popup>
                  </Marker>
                )}

                {routeCoords.length > 0 && (
                  <Polyline
                    positions={routeCoords}
                    pathOptions={{
                      color: "#ef4444",
                      weight: 5,
                      opacity: 0.9,
                    }}
                  />
                )}
              </MapContainer>
            </div>
          </div>

          <p className="mt-2 text-xs leading-5 text-white/35">
            Map data © OpenStreetMap contributors. Route estimates may change
            with road conditions and routing data.
          </p>
        </section>

        {/* Route results */}
        {distance && (
          <section className="mt-7">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                Analysis complete
              </p>
              <h2 className="mt-1 text-xl font-bold">Your route summary</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/10">
                  <RouteIcon className="h-4 w-4 text-blue-300" />
                </div>
                <p className="mt-4 text-xs text-white/45">Route distance</p>
                <p className="mt-1 text-xl font-bold">{distance}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-400/10">
                  <Clock3 className="h-4 w-4 text-purple-300" />
                </div>
                <p className="mt-4 text-xs text-white/45">Estimated time</p>
                <p className="mt-1 text-xl font-bold">{duration}</p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                    <ShieldAlert className={`h-5 w-5 ${riskStyle.text}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Route assessment</p>
                    <p className="mt-1 text-xs text-white/40">
                      Based on the current distance rule
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${riskStyle.badge} ${riskStyle.text}`}
                >
                  {risk}
                </span>
              </div>

              <p className="mt-4 text-xs leading-5 text-white/40">
                This classification uses route distance only. It does not
                represent a complete assessment of accident probability.
              </p>
            </div>

            {nearestHotspot && (
              <div className="mt-3 rounded-2xl border border-red-400/15 bg-red-500/[0.05] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                    <MapPin className="h-5 w-5 text-red-300" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">Nearest risk area</h3>
                    <p className="mt-2 break-words text-sm text-white/75">
                      {nearestHotspot.name || "Nearby hotspot"}
                    </p>

                    {nearestHotspot.distance_km != null && (
                      <p className="mt-1 text-xs text-white/45">
                        {nearestHotspot.distance_km} km away
                      </p>
                    )}

                    {nearestHotspot.risk && (
                      <p className="mt-2 text-sm text-white/60">
                        Risk:{" "}
                        <span className="font-semibold text-red-300">
                          {nearestHotspot.risk}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10">
                  <Sparkles className="h-5 w-5 text-blue-300" />
                </div>

                <div>
                  <h3 className="font-semibold">DriveSafe recommendation</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {risk === "High Risk"
                      ? "This route is longer than 250 km under the current distance rule. Plan rest stops and check road and weather conditions before leaving."
                      : risk === "Moderate Risk"
                      ? "This route is longer than 100 km under the current distance rule. Stay alert and review conditions along the journey."
                      : "This route is within 100 km under the current distance rule. Continue to follow traffic signs and drive according to road conditions."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <p className="mt-7 text-center text-xs leading-5 text-white/30">
          DriveSafe · Plan ahead. Stay alert. Arrive safely.
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
}

export default RouteSafety;

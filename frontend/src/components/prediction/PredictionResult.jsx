
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  MapPin,
  BrainCircuit,
  Gauge,
  Car,
  CloudSun,
  Construction,
  TrafficCone,
  Lightbulb,
  Sparkles,
} from "lucide-react";

function PredictionResult({ result }) {
  const reduceMotion = useReducedMotion();

  if (!result) return null;

  const riskLevel = String(result.risk_level || "Unknown");
  const normalizedRisk = riskLevel.toLowerCase();

  const isHigh = normalizedRisk === "high";
  const isMedium = normalizedRisk === "medium";
  const isKnown = isHigh || isMedium || normalizedRisk === "low";

  const riskStyle = isHigh
    ? {
        text: "text-red-300",
        border: "border-red-400/20",
        background: "bg-red-500/10",
        bar: "bg-red-500",
        icon: ShieldAlert,
      }
    : isMedium
    ? {
        text: "text-amber-300",
        border: "border-amber-400/20",
        background: "bg-amber-400/10",
        bar: "bg-amber-400",
        icon: ShieldAlert,
      }
    : {
        text: "text-emerald-300",
        border: "border-emerald-400/20",
        background: "bg-emerald-400/10",
        bar: "bg-emerald-400",
        icon: ShieldCheck,
      };

  const RiskIcon = riskStyle.icon;
  const score = Math.max(
    0,
    Math.min(100, Number(result.risk_score ?? 0) || 0)
  );

  const confidence = Math.max(
    0,
    Math.min(100, Number(result.confidence ?? 0) || 0)
  );

  const components = result.components;

  const riskRows = [
    {
      label: "Weather",
      value: components?.weather_score,
      icon: CloudSun,
    },
    {
      label: "Road condition",
      value: components?.road_score,
      icon: Construction,
    },
    {
      label: "Traffic",
      value: components?.traffic_score,
      icon: TrafficCone,
    },
    {
      label: "Lighting",
      value: components?.lighting_score,
      icon: Lightbulb,
    },
    {
      label: "Speed",
      value: components?.speed_score,
      icon: Gauge,
    },
    {
      label: "Hotspot",
      value: components?.hotspot_score,
      icon: MapPin,
    },
  ];

  const recommendation = isHigh
    ? "The model indicates elevated risk. Consider delaying travel if conditions are unsafe, reduce speed, and avoid risky manoeuvres."
    : isMedium
    ? "The model indicates moderate risk. Stay alert, keep a safe following distance, and adapt your speed to road conditions."
    : isKnown
    ? "The model indicates lower risk under the supplied conditions. Continue following traffic rules and remain alert."
    : "The model did not return a recognized risk category. Review the prediction details and exercise caution.";

  const getFactorStyle = (value) => {
    const number = Number(value ?? 0);

    if (number >= 65) {
      return {
        bar: "bg-red-500",
        text: "text-red-300",
      };
    }

    if (number >= 35) {
      return {
        bar: "bg-amber-400",
        text: "text-amber-300",
      };
    }

    return {
      bar: "bg-emerald-400",
      text: "text-emerald-300",
    };
  };

  const formatCoordinate = (value) => {
    if (typeof value === "number") return value.toFixed(5);
    return value ?? "Unavailable";
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 18,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="mt-5 space-y-4"
    >
      {/* Main risk card */}
      <section
        className={`overflow-hidden rounded-3xl border ${riskStyle.border} bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl`}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                Accident prediction
              </p>

              <h2 className={`mt-3 text-3xl font-bold ${riskStyle.text}`}>
                {riskLevel} Risk
              </h2>

              <p className="mt-2 text-xs leading-5 text-white/45">
                Assessment based on the supplied driving conditions and
                available risk-engine data.
              </p>
            </div>

            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${riskStyle.border} ${riskStyle.background}`}
            >
              <RiskIcon className={`h-7 w-7 ${riskStyle.text}`} />
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm text-white/55">
                Overall risk score
              </span>
              <span className="text-lg font-bold tabular-nums text-white">
                {score.toFixed(0)}
                <span className="ml-1 text-xs font-medium text-white/35">
                  /100
                </span>
              </span>
            </div>

            <div
              className="h-2.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Overall risk score"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={score}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.65 }}
                className={`h-full rounded-full ${riskStyle.bar}`}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-white/30">
              <span>0 · Lower score</span>
              <span>100 · Higher score</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prediction and confidence */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={BrainCircuit}
          label="ML prediction"
          value={result.prediction || "N/A"}
          accent="text-purple-300"
        />

        <MetricCard
          icon={Gauge}
          label="Confidence"
          value={`${confidence}%`}
          accent="text-blue-300"
        />
      </div>

      {/* Risk factors */}
      {components && (
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-white">Risk factors</h3>
            <p className="mt-1 text-xs text-white/40">
              Scores returned by the risk engine.
            </p>
          </div>

          <div className="space-y-5">
            {riskRows.map(({ label, value, icon: Icon }) => {
              if (value == null) return null;

              const factorScore = Math.max(
                0,
                Math.min(100, Number(value) || 0)
              );

              const factorStyle = getFactorStyle(factorScore);

              return (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-white/45" />
                      <span className="truncate text-sm text-white/65">
                        {label}
                      </span>
                    </div>

                    <span
                      className={`text-sm font-bold tabular-nums ${factorStyle.text}`}
                    >
                      {factorScore}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${factorStyle.bar}`}
                      style={{ width: `${factorScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Current location */}
      {result.location && (
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10">
              <MapPin className="h-5 w-5 text-blue-300" />
            </div>

            <div>
              <h3 className="font-semibold text-white">Current location</h3>
              <p className="mt-1 text-xs text-white/40">
                GPS coordinates used for this assessment
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <CoordinateCard
              label="Latitude"
              value={formatCoordinate(result.location.latitude)}
            />
            <CoordinateCard
              label="Longitude"
              value={formatCoordinate(result.location.longitude)}
            />
          </div>
        </section>
      )}

      {/* Nearest hotspot */}
      {result.nearest_hotspot && (
        <section className="rounded-3xl border border-red-400/15 bg-red-500/[0.05] p-5 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
              <ShieldAlert className="h-5 w-5 text-red-300" />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-white">Nearest risk area</h3>
              <p className="mt-1 break-words text-sm text-white/55">
                {result.nearest_hotspot.name || "Nearby hotspot"}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <CoordinateCard
              label="Distance"
              value={
                result.nearest_hotspot.distance_km != null
                  ? `${result.nearest_hotspot.distance_km} km`
                  : "Unavailable"
              }
            />

            <CoordinateCard
              label="Recorded accidents"
              value={result.nearest_hotspot.accidents ?? "Unavailable"}
            />
          </div>

          {result.nearest_hotspot.risk != null && (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3">
              <span className="text-sm text-white/50">Area risk</span>
              <span className="text-sm font-semibold text-red-300">
                {result.nearest_hotspot.risk}
              </span>
            </div>
          )}
        </section>
      )}

      {/* Recommendation */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10">
            <Sparkles className="h-5 w-5 text-blue-300" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Safety recommendation
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/55">
              {recommendation}
            </p>
          </div>
        </div>
      </section>

      <div className="flex items-start gap-2 px-1 text-xs leading-5 text-white/35">
        <Car className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          This is a model-based estimate, not a guarantee of safety. Actual
          road risk can change with traffic, weather, road layout and driver
          behaviour.
        </p>
      </div>
    </motion.div>
  );
}

function MetricCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <Icon className={`mb-3 h-5 w-5 ${accent}`} />

      <p className="text-xs text-white/45">{label}</p>

      <p className="mt-1 break-words text-lg font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function CoordinateCard({ label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.06] bg-black/10 p-3">
      <p className="text-[11px] text-white/40">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-white/80">
        {value}
      </p>
    </div>
  );
}

export default PredictionResult;

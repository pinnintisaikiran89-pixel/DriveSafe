import { motion } from "framer-motion";

import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Map,
  Clock3,
  Sparkles
} from "lucide-react";

import GlassCard from "../common/GlassCard";

function RouteResult({ routeResult }) {

  if (!routeResult) {
    return null;
  }

  const safetyScore =
    Number(
      routeResult.safetyScore ??
      routeResult.safety_score ??
      routeResult.risk_score ??
      0
    );

  const riskLevel =
    routeResult.risk_level ||
    routeResult.riskLevel ||
    "Unknown";

  const distance =
    routeResult.distance ||
    routeResult.distance_km ||
    "N/A";

  const duration =
    routeResult.duration ||
    routeResult.duration_minutes ||
    "N/A";

  const recommendation =
    routeResult.recommendation ||
    "Drive carefully and follow the recommended safe route.";

  const getRiskStyle = () => {

    if (
      riskLevel === "High" ||
      riskLevel === "Critical"
    ) {

      return {
        text: "text-red-600",
        bg: "bg-red-100",
        icon: (
          <ShieldAlert
            size={34}
          />
        )
      };

    }

    if (riskLevel === "Medium") {

      return {
        text: "text-yellow-600",
        bg: "bg-yellow-100",
        icon: (
          <AlertTriangle
            size={34}
          />
        )
      };

    }

    return {
      text: "text-green-600",
      bg: "bg-green-100",
      icon: (
        <ShieldCheck
          size={34}
        />
      )
    };
  };

  const style = getRiskStyle();

  /*
   * Convert risk score into safety score.
   * If backend already sends safetyScore, use it.
   */
  const finalSafetyScore =
    routeResult.safetyScore !== undefined
      ? Number(routeResult.safetyScore)
      : Math.max(
          0,
          Math.min(
            100,
            100 - safetyScore
          )
        );

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      className="mt-6"
    >

      <GlassCard className="p-6">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">
              AI Route Analysis
            </p>

            <h2
              className={`text-3xl font-black mt-2 ${style.text}`}
            >
              {finalSafetyScore}% Safe
            </h2>

            <p className="mt-2 font-semibold text-slate-600">
              Risk Level:{" "}
              <span className={style.text}>
                {riskLevel}
              </span>
            </p>

          </div>

          <div
            className={`
              w-16
              h-16
              rounded-2xl
              flex
              items-center
              justify-center
              ${style.bg}
              ${style.text}
            `}
          >
            {style.icon}
          </div>

        </div>

        {/* Safety Progress */}

        <div className="mt-6">

          <div className="flex justify-between mb-2">

            <span className="text-slate-500">
              Route Safety
            </span>

            <span className="font-bold">
              {finalSafetyScore}%
            </span>

          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

            <motion.div
              initial={{
                width: 0
              }}
              animate={{
                width: `${finalSafetyScore}%`
              }}
              transition={{
                duration: 1
              }}
              className={`h-full rounded-full ${
                finalSafetyScore >= 65
                  ? "bg-green-500"
                  : finalSafetyScore >= 35
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="bg-slate-50 rounded-2xl p-4">

            <Map
              className="text-blue-600 mb-2"
              size={22}
            />

            <p className="text-slate-500 text-sm">
              Distance
            </p>

            <h3 className="font-bold text-xl">
              {distance}
            </h3>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <Clock3
              className="text-orange-500 mb-2"
              size={22}
            />

            <p className="text-slate-500 text-sm">
              Duration
            </p>

            <h3 className="font-bold text-xl">
              {duration}
            </h3>

          </div>

        </div>

        {/* Risk Components */}

        {routeResult.components && (

          <div className="mt-8">

            <h3 className="font-bold mb-3">
              Risk Analysis
            </h3>

            <div className="grid grid-cols-2 gap-3">

              {Object.entries(
                routeResult.components
              ).map(([key, value]) => (

                <div
                  key={key}
                  className="bg-slate-50 rounded-2xl p-3"
                >

                  <p className="text-xs text-slate-500 capitalize">
                    {key.replaceAll("_", " ")}
                  </p>

                  <p className="font-bold text-lg">
                    {value}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Nearest Hotspot */}

        {routeResult.nearest_hotspot && (

          <div className="mt-6 bg-red-50 rounded-2xl p-4">

            <p className="text-sm text-slate-500">
              Nearest Accident Hotspot
            </p>

            <h3 className="font-bold text-lg mt-1">
              {routeResult.nearest_hotspot.name}
            </h3>

            <p className="text-sm mt-1">
              Distance:{" "}
              <strong>
                {routeResult.nearest_hotspot.distance_km} km
              </strong>
            </p>

            <p className="text-sm">
              Accidents:{" "}
              <strong>
                {routeResult.nearest_hotspot.accidents}
              </strong>
            </p>

            <p className="text-sm">
              Risk:{" "}
              <strong>
                {routeResult.nearest_hotspot.risk}
              </strong>
            </p>

          </div>

        )}

        {/* Recommendation */}

        <div className="mt-8">

          <div className="flex items-center gap-2 mb-3">

            <Sparkles
              className="text-blue-600"
              size={20}
            />

            <h3 className="font-bold">
              AI Recommendation
            </h3>

          </div>

          <div className="bg-blue-50 rounded-2xl p-4">

            <p className="text-slate-700">
              {recommendation}
            </p>

          </div>

        </div>

      </GlassCard>

    </motion.div>
  );
}

export default RouteResult;
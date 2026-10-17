
import { useState } from "react";
import axios from "axios";
import {
  Search,
  CloudRain,
  Sun,
  CloudFog,
  Cloud,
  CloudLightning,
  ShieldAlert,
  MapPin,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  RefreshCw,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function WeatherCard() {
  const reduceMotion = useReducedMotion();

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const getWeather = async (event) => {
    event?.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    if (!API_KEY) {
      setError(
        "Weather API key is missing. Configure it in your frontend .env file."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim()
        )}&appid=${API_KEY}&units=metric`
      );

      setWeatherData(response.data);
    } catch (err) {
      console.error("Weather Error:", err);
      setWeatherData(null);

      if (err.response?.status === 401) {
        setError("Weather service authentication failed. Check the API key.");
      } else if (err.response?.status === 404) {
        setError("City not found. Please enter a valid city name.");
      } else {
        setError("Unable to fetch weather. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = () => {
    if (!weatherData) return "";

    const condition = weatherData.weather?.[0]?.main || "";
    const visibility = weatherData.visibility ?? 10000;
    const windSpeed = weatherData.wind?.speed ?? 0;

    if (condition === "Thunderstorm" || condition === "Rain") {
      return "High Risk";
    }

    if (visibility < 1000) return "High Risk";

    if (["Fog", "Mist", "Haze"].includes(condition)) {
      return "Moderate Risk";
    }

    if (windSpeed > 12) return "Moderate Risk";

    return "Safe";
  };

  const risk = getRiskLevel();

  const riskStyle =
    risk === "High Risk"
      ? {
          text: "text-red-300",
          panel: "border-red-400/20 bg-red-500/[0.08]",
          icon: "bg-red-500/10 text-red-300",
          label: "Take extra care",
        }
      : risk === "Moderate Risk"
      ? {
          text: "text-amber-300",
          panel: "border-amber-400/20 bg-amber-500/[0.08]",
          icon: "bg-amber-500/10 text-amber-300",
          label: "Stay alert",
        }
      : {
          text: "text-emerald-300",
          panel: "border-emerald-400/20 bg-emerald-500/[0.08]",
          icon: "bg-emerald-500/10 text-emerald-300",
          label: "Favourable conditions",
        };

  const getWeatherIcon = () => {
    const condition = weatherData?.weather?.[0]?.main || "";
    const iconClass = "h-9 w-9";

    if (condition === "Rain" || condition === "Drizzle") {
      return <CloudRain className={`${iconClass} text-sky-300`} />;
    }

    if (condition === "Thunderstorm") {
      return <CloudLightning className={`${iconClass} text-violet-300`} />;
    }

    if (["Fog", "Mist", "Haze", "Smoke", "Dust"].includes(condition)) {
      return <CloudFog className={`${iconClass} text-slate-300`} />;
    }

    if (condition === "Clouds") {
      return <Cloud className={`${iconClass} text-slate-300`} />;
    }

    return <Sun className={`${iconClass} text-amber-300`} />;
  };

  const getVisibility = () => {
    if (weatherData?.visibility === undefined) return "N/A";
    return `${(weatherData.visibility / 1000).toFixed(1)} km`;
  };

  return (
    <section className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d111c]/90 p-4 shadow-xl shadow-black/10 backdrop-blur-2xl sm:p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-red-500/[0.09] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-blue-500/[0.08] blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-400/15 bg-sky-500/10 text-sky-300">
            <CloudRain size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="font-extrabold tracking-tight text-white">
              Weather Risk Check
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Check current conditions before you travel
            </p>
          </div>
        </div>

        <form onSubmit={getWeather} className="flex min-w-0 gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-3 transition focus-within:border-red-400/40 focus-within:bg-white/[0.05] focus-within:ring-2 focus-within:ring-red-400/10">
            <MapPin size={17} className="shrink-0 text-slate-500" />
            <input
              type="text"
              placeholder="Enter city name"
              aria-label="City name"
              autoComplete="address-level2"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-label="Search weather"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-lg shadow-red-950/25 transition hover:from-red-500 hover:to-rose-400 focus:outline-none focus:ring-2 focus:ring-red-400/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <RefreshCw size={19} className="animate-spin" />
            ) : (
              <Search size={20} />
            )}
          </button>
        </form>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-3 text-sm leading-5 text-red-200"
          >
            {error}
          </div>
        )}

        {!weatherData && !error && !loading && (
          <div className="mt-4 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-4 py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.04] text-slate-400">
              <Thermometer size={23} />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-200">
              Weather at a glance
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Search for a city to view its current weather and driving
              indicator.
            </p>
          </div>
        )}

        {weatherData && (
          <motion.div
            key={`${weatherData.id}-${weatherData.dt}`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="mt-4"
          >
            <div className="relative isolate overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5">
              <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-red-500/[0.08] blur-2xl" />

              <div className="relative flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    Current weather
                  </p>
                  <h4 className="mt-2 break-words text-xl font-black text-white">
                    {weatherData.name}
                  </h4>
                  <p className="mt-1 text-sm capitalize text-slate-400">
                    {weatherData.weather?.[0]?.description || "Unknown"}
                  </p>
                </div>

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
                  {getWeatherIcon()}
                </div>
              </div>

              <div className="relative mt-5 flex items-end gap-3">
                <span className="text-5xl font-black tracking-tighter text-white">
                  {Math.round(weatherData.main.temp)}°
                </span>
                <div className="pb-1">
                  <p className="text-sm font-bold text-slate-300">Celsius</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Feels like {Math.round(weatherData.main.feels_like)}°C
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <WeatherMetric
                icon={<Droplets size={17} />}
                label="Humidity"
                value={`${weatherData.main.humidity}%`}
                iconClass="bg-sky-500/10 text-sky-300"
              />

              <WeatherMetric
                icon={<Wind size={17} />}
                label="Wind"
                value={`${weatherData.wind?.speed ?? 0} m/s`}
                iconClass="bg-emerald-500/10 text-emerald-300"
              />

              <WeatherMetric
                icon={<Eye size={17} />}
                label="Visibility"
                value={getVisibility()}
                iconClass="bg-violet-500/10 text-violet-300"
              />
            </div>

            <div className={`mt-3 rounded-2xl border p-4 ${riskStyle.panel}`}>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${riskStyle.icon}`}
                >
                  <ShieldAlert size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-400">
                    Weather-based driving indicator
                  </p>
                  <p className={`mt-1 font-extrabold ${riskStyle.text}`}>
                    {risk}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {riskStyle.label}
                  </p>
                </div>
              </div>

              <p className="mt-3 border-t border-white/[0.08] pt-3 text-xs leading-5 text-slate-400">
                This is a basic weather indicator, not a guarantee of road
                safety. Always follow local advisories and road conditions.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function WeatherMetric({ icon, label, value, iconClass }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
      <div
        className={`mb-3 flex h-8 w-8 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-extrabold text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default WeatherCard;

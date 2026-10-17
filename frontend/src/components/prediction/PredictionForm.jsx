
import { useState } from "react";
import axios from "axios";
import { AlertTriangle, LoaderCircle, Sparkles } from "lucide-react";

import SpeedSlider from "./SpeedSlider";
import CustomSelect from "./CustomSelect";

function PredictionForm({ setResult }) {
  const [speed, setSpeed] = useState(60);
  const [weather, setWeather] = useState("Sunny");
  const [roadType, setRoadType] = useState("Highway");
  const [roadCondition, setRoadCondition] = useState("Dry");
  const [lighting, setLighting] = useState("Daylight");
  const [traffic, setTraffic] = useState("Moderate");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          const message =
            error.code === 1
              ? "Location permission was denied. Please allow location access and try again."
              : error.code === 3
              ? "Getting your location took too long. Please try again."
              : "Unable to get your current location. Check your location settings.";

          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });

  const saveHistory = (data) => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("driveSafeHistory") || "[]"
      );

      const oldHistory = Array.isArray(stored) ? stored : [];

      const newRecord = {
        prediction: data.prediction || "Unknown",
        risk_level: data.risk_level || "Unknown",
        risk_score: Number(data.risk_score ?? 0),
        weather,
        speed: `${speed} km/h`,
        date: new Date().toLocaleString(),
      };

      localStorage.setItem(
        "driveSafeHistory",
        JSON.stringify([newRecord, ...oldHistory].slice(0, 10))
      );
    } catch (error) {
      // A storage failure should not discard a successful prediction.
      console.error("Could not save prediction history:", error);
    }
  };

  const predictAccident = async (event) => {
    event?.preventDefault();

    if (loading) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const location = await getLocation();

      const predictionResponse = await axios.post(
        "https://drivesafe-n587.onrender.com/predict",
        {
          weather,
          road_type: roadType,
          road_condition: roadCondition,
          lighting,
          traffic_control: traffic,
          speed_limit: Number(speed),
          age: 30,
          gender: "Male",
          license_status: "Valid",
          alcohol: "No",
          vehicle_type: "Two-Wheeler",
        },
        { timeout: 30000 }
      );

      const prediction = predictionResponse.data;

      if (!prediction || !prediction.prediction) {
        throw new Error("The prediction service returned an invalid result.");
      }

      const riskResponse = await axios.post(
        "https://drivesafe-n587.onrender.com/risk",
        {
          ml_prediction: prediction.prediction,
          ml_confidence: prediction.confidence,
          latitude: location.latitude,
          longitude: location.longitude,
          weather,
          road_condition: roadCondition,
          lighting,
          traffic,
          speed: Number(speed),
        },
        { timeout: 30000 }
      );

      const risk = riskResponse.data || {};

      const finalResult = {
        ...prediction,
        ...risk,
        location,
      };

      console.log("FINAL RESULT", finalResult);

      saveHistory(finalResult);
      setResult(finalResult);
    } catch (error) {
      console.error("Prediction Error:", error);

      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Prediction failed. Please try again.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={predictAccident}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5"
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
          <Sparkles className="h-5 w-5 text-red-400" />
        </div>

        <div>
          <h2 className="font-semibold text-white">Driving conditions</h2>
          <p className="mt-1 text-xs leading-5 text-white/45">
            Select the conditions that best describe your journey.
          </p>
        </div>
      </div>

      <SpeedSlider speed={speed} setSpeed={setSpeed} />

      <CustomSelect
        label="Weather"
        value={weather}
        onChange={(event) => setWeather(event.target.value)}
        options={[
          "Sunny",
          "Cloudy",
          "Rainy",
          "Foggy",
          "Stormy",
          "Hazy",
          "Clear",
        ]}
      />

      <CustomSelect
        label="Road Type"
        value={roadType}
        onChange={(event) => setRoadType(event.target.value)}
        options={["Highway", "City", "Village"]}
      />

      <CustomSelect
        label="Road Condition"
        value={roadCondition}
        onChange={(event) => setRoadCondition(event.target.value)}
        options={["Dry", "Wet", "Damaged", "Under Construction"]}
      />

      <CustomSelect
        label="Lighting"
        value={lighting}
        onChange={(event) => setLighting(event.target.value)}
        options={["Daylight", "Dusk", "Dark"]}
      />

      <CustomSelect
        label="Traffic"
        value={traffic}
        onChange={(event) => setTraffic(event.target.value)}
        options={["Low", "Moderate", "High"]}
      />

      {errorMessage && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-500/[0.08] p-3 text-sm leading-5 text-red-200"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-4 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Analyzing Risk...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Predict Accident Risk
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[11px] leading-5 text-white/35">
        Location access is needed to calculate nearby hotspot risk.
      </p>
    </form>
  );
}

export default PredictionForm;

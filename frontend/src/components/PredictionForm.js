import { useState } from "react";
import API from "../services/api";

import {
  AlertTriangle,
  ShieldCheck,
  Car,
  CloudRain,
  Route,
  Wine,
  Activity,
} from "lucide-react";

function PredictionForm() {

  const [formData, setFormData] = useState({
    weather: 0,
    road_type: 0,
    speed: "",
    age: "",
    alcohol: 0,
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Predict Function
  const predictRisk = async () => {

    try {

      setLoading(true);

      const response = await API.post(
        "/predict",
        formData
      );

      console.log("Backend Response:", response.data);

      const predictionResult =
        response.data.accident_severity ||
        response.data.prediction ||
        response.data.result ||
        "Minor";

      setResult(String(predictionResult));

    } catch (error) {

      console.log(error);

      alert("API Connection Failed");

    } finally {

      setLoading(false);
    }
  };

  // Result Styling
  const getResultStyles = () => {

    if (result === "Fatal") {

      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-600",
        icon: <AlertTriangle size={60} />,
        meter: "w-full bg-red-500",
        title: "FATAL RISK",
        description:
          "Extreme accident probability detected. Drive carefully and avoid overspeeding.",
      };
    }

    if (result === "Serious") {

      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-600",
        icon: <AlertTriangle size={60} />,
        meter: "w-2/3 bg-yellow-500",
        title: "SERIOUS RISK",
        description:
          "Moderate accident risk detected. Stay alert and follow road safety rules.",
      };
    }

    return {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      icon: <ShieldCheck size={60} />,
      meter: "w-1/3 bg-green-500",
      title: "LOW RISK",
      description:
        "Current conditions appear relatively safe for driving.",
    };
  };

  const resultStyles = getResultStyles();

  return (

    <div className="min-h-screen bg-[#f8fafc] px-4 py-6 md:px-8">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500 font-medium">

            AI Road Safety System

          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">

            Accident Risk Prediction

          </h1>

        </div>

        {/* Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">

          <h1 className="text-2xl font-bold text-slate-900">

            D

          </h1>

        </div>

      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">

        {/* Left Panel */}
        <div className="lg:col-span-3 bg-white rounded-[28px] border border-slate-200 p-6 md:p-8 shadow-sm">

          <div className="mb-8">

            <h2 className="text-2xl font-semibold text-slate-900">

              Journey Information

            </h2>

            <p className="text-slate-500 mt-2">

              Enter driving conditions to analyze accident severity risk.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Weather */}
            <div>

              <label className="flex items-center gap-2 text-slate-700 font-medium mb-3">

                <CloudRain size={18} />

                Weather

              </label>

              <select
                name="weather"
                value={formData.weather}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
              >

                <option value="0">

                  Clear

                </option>

                <option value="1">

                  Rain

                </option>

                <option value="2">

                  Fog

                </option>

              </select>

            </div>

            {/* Road Type */}
            <div>

              <label className="flex items-center gap-2 text-slate-700 font-medium mb-3">

                <Route size={18} />

                Road Type

              </label>

              <select
                name="road_type"
                value={formData.road_type}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
              >

                <option value="0">

                  Highway

                </option>

                <option value="1">

                  City Road

                </option>

                <option value="2">

                  Rural Road

                </option>

              </select>

            </div>

            {/* Speed */}
            <div>

              <label className="flex items-center gap-2 text-slate-700 font-medium mb-3">

                <Car size={18} />

                Vehicle Speed

              </label>

              <input
                type="number"
                name="speed"
                placeholder="Enter Speed"
                value={formData.speed}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Age */}
            <div>

              <label className="flex items-center gap-2 text-slate-700 font-medium mb-3">

                <Activity size={18} />

                Driver Age

              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Alcohol */}
            <div className="md:col-span-2">

              <label className="flex items-center gap-2 text-slate-700 font-medium mb-3">

                <Wine size={18} />

                Alcohol Involvement

              </label>

              <select
                name="alcohol"
                value={formData.alcohol}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
              >

                <option value="0">

                  No

                </option>

                <option value="1">

                  Yes

                </option>

              </select>

            </div>

          </div>

          {/* Button */}
          <button
            onClick={predictRisk}
            disabled={loading}
            className="w-full mt-8 h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition duration-300"
          >

            {
              loading
                ? "Analyzing Risk..."
                : "Predict Accident Risk"
            }

          </button>

        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-[28px] border border-slate-200 p-6 md:p-8 shadow-sm h-full">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold text-slate-900">

                  AI Result

                </h2>

                <p className="text-slate-500 mt-1">

                  Real-time prediction output

                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">

                <ShieldCheck
                  className="text-slate-700"
                  size={22}
                />

              </div>

            </div>

            {
              result ? (

                <div
                  className={`${resultStyles.bg} ${resultStyles.border} border rounded-[28px] p-8 transition-all duration-500`}
                >

                  {/* Icon */}
                  <div
                    className={`${resultStyles.text} mb-6`}
                  >

                    {resultStyles.icon}

                  </div>

                  {/* Title */}
                  <h1
                    className={`text-3xl font-bold ${resultStyles.text}`}
                  >

                    {resultStyles.title}

                  </h1>

                  {/* Description */}
                  <p className="text-slate-600 leading-8 mt-4">

                    {resultStyles.description}

                  </p>

                  {/* Meter */}
                  <div className="mt-8">

                    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${resultStyles.meter}`}
                      ></div>

                    </div>

                  </div>

                  {/* Risk Label */}
                  <div className="mt-5 flex items-center justify-between text-sm text-slate-500">

                    <span>

                      Low

                    </span>

                    <span>

                      Moderate

                    </span>

                    <span>

                      High

                    </span>

                  </div>

                </div>

              ) : (

                <div className="h-[320px] rounded-[28px] border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">

                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">

                    <ShieldCheck
                      className="text-slate-500"
                      size={40}
                    />

                  </div>

                  <h3 className="text-xl font-semibold text-slate-800">

                    No Prediction Yet

                  </h3>

                  <p className="text-slate-500 mt-3 max-w-xs leading-7">

                    Fill the journey information and run AI analysis to view accident risk prediction.

                  </p>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default PredictionForm;
import { useState } from "react";
import API from "../services/api";

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

      const response = await API.post("/predict", formData);

      console.log("Backend Response:", response.data);

      // Get prediction safely
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

  return (

    <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-gray-800">

      {/* Heading */}

      <h2 className="text-4xl font-black mb-10 text-center text-blue-400 tracking-wide">

        AI Accident Severity Prediction

      </h2>

      {/* Form Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Weather */}

        <div>

          <label className="block mb-3 text-gray-300 text-lg font-semibold">

            Weather

          </label>

          <select
            name="weather"
            value={formData.weather}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
          >

            <option value="0">Clear</option>
            <option value="1">Rain</option>
            <option value="2">Fog</option>

          </select>

        </div>

        {/* Road Type */}

        <div>

          <label className="block mb-3 text-gray-300 text-lg font-semibold">

            Road Type

          </label>

          <select
            name="road_type"
            value={formData.road_type}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
          >

            <option value="0">Highway</option>
            <option value="1">City Road</option>
            <option value="2">Rural Road</option>

          </select>

        </div>

        {/* Speed */}

        <div>

          <label className="block mb-3 text-gray-300 text-lg font-semibold">

            Speed

          </label>

          <input
            type="number"
            name="speed"
            placeholder="Enter Speed"
            value={formData.speed}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
          />

        </div>

        {/* Driver Age */}

        <div>

          <label className="block mb-3 text-gray-300 text-lg font-semibold">

            Driver Age

          </label>

          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
          />

        </div>

        {/* Alcohol */}

        <div className="md:col-span-2">

          <label className="block mb-3 text-gray-300 text-lg font-semibold">

            Alcohol Involvement

          </label>

          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none transition"
          >

            <option value="0">No</option>
            <option value="1">Yes</option>

          </select>

        </div>

      </div>

      {/* Predict Button */}

      <button
        onClick={predictRisk}
        disabled={loading}
        className="w-full mt-10 bg-blue-600 hover:bg-blue-700 p-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg hover:scale-[1.02]"
      >

        {loading ? "Analyzing Risk..." : "Predict Accident Risk"}

      </button>

      {/* Animated Result Section */}

      {
        result && (

          <div
            className={`mt-10 rounded-3xl p-10 shadow-2xl text-center border transition-all duration-700 animate-pulse

            ${
              result === "Fatal"
                ? "bg-gradient-to-br from-red-700 to-red-950 border-red-400"
                : result === "Serious"
                ? "bg-gradient-to-br from-yellow-500 to-orange-700 border-yellow-300"
                : "bg-gradient-to-br from-green-500 to-green-800 border-green-300"
            }`}
          >

            {/* Title */}

            <h3 className="text-4xl font-black mb-8 text-white tracking-wide">

              Accident Prediction Result

            </h3>

            {/* Animated Icon */}

            <div className="flex justify-center items-center mb-8">

              {
                result === "Fatal" ? (

                  <div className="text-8xl animate-bounce">

                    🚨

                  </div>

                ) : result === "Serious" ? (

                  <div className="text-8xl animate-pulse">

                    ⚠️

                  </div>

                ) : (

                  <div className="text-8xl animate-bounce">

                    ✅

                  </div>

                )
              }

            </div>

            {/* Prediction Text */}

            <h1 className="text-6xl font-extrabold text-white mb-8 tracking-widest">

              {
                result === "Fatal"
                  ? "FATAL"
                  : result === "Serious"
                  ? "SERIOUS"
                  : "MINOR"
              }

            </h1>

            {/* Description */}

            <p className="text-xl text-white/90 leading-9 max-w-2xl mx-auto">

              {
                result === "Fatal"
                  ? "Extreme accident risk detected. Avoid overspeeding and drive with maximum caution."
                  : result === "Serious"
                  ? "Moderate accident risk detected. Stay alert and follow all traffic rules carefully."
                  : "Low accident risk detected. Current driving conditions appear relatively safe."
              }

            </p>

            {/* Risk Meter */}

            <div className="mt-10">

              <div className="w-full bg-black/20 rounded-full h-6 overflow-hidden">

                <div
                  className={`h-6 rounded-full transition-all duration-1000

                  ${
                    result === "Fatal"
                      ? "w-full bg-red-300"
                      : result === "Serious"
                      ? "w-2/3 bg-yellow-200"
                      : "w-1/3 bg-green-200"
                  }`}
                ></div>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
}

export default PredictionForm;
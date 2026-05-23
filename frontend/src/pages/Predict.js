import { useState } from "react";
import axios from "axios";

function Predict() {

  // Form States
  const [weather, setWeather] = useState("");
  const [speed, setSpeed] = useState("");
  const [vehicles, setVehicles] = useState("");

  // Prediction State
  const [prediction, setPrediction] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  // Predict Function
  const handlePredict = async () => {

    if (!weather || !speed || !vehicles) {

      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      // API Request
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
          weather,
          speed,
          vehicles
        }
      );

      console.log("API Response:", response.data);

      // Prediction Result
      const result =
        response.data.prediction ||
        response.data.accident_severity ||
        "";

      setPrediction(result);

    } catch (error) {

      console.log(error);

      alert("Prediction Failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-5xl font-black">
            AI Prediction
          </h1>

          <p className="text-gray-400 mt-2">
            Smart Accident Risk Analysis
          </p>

        </div>

        {/* Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">

          <h1 className="text-black text-3xl font-black">
            D
          </h1>

        </div>

      </div>

      {/* Form Card */}
      <div className="bg-[#111111] border border-gray-800 rounded-[2rem] p-8 shadow-2xl">

        <h2 className="text-4xl font-black mb-10">
          Enter Journey Conditions
        </h2>

        <div className="space-y-7">

          {/* Weather */}
          <div>

            <label className="block text-lg mb-3 text-gray-300">
              Weather Condition
            </label>

            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-blue-500"
            >

              <option value="">
                Select Weather
              </option>

              <option value="Sunny">
                Sunny
              </option>

              <option value="Rainy">
                Rainy
              </option>

              <option value="Foggy">
                Foggy
              </option>

              <option value="Cloudy">
                Cloudy
              </option>

            </select>

          </div>

          {/* Speed */}
          <div>

            <label className="block text-lg mb-3 text-gray-300">
              Vehicle Speed (km/h)
            </label>

            <input
              type="number"
              placeholder="Enter Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-blue-500"
            />

          </div>

          {/* Vehicles */}
          <div>

            <label className="block text-lg mb-3 text-gray-300">
              Number of Vehicles
            </label>

            <input
              type="number"
              placeholder="Enter Number of Vehicles"
              value={vehicles}
              onChange={(e) => setVehicles(e.target.value)}
              className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-blue-500"
            />

          </div>

          {/* Button */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 py-5 rounded-2xl text-2xl font-black transition-all duration-300"
          >

            {
              loading
                ? "Analyzing..."
                : "Predict Accident Risk"
            }

          </button>

        </div>

      </div>

      {/* Result Section */}
      {
        prediction && (

          <div
            className={`mt-10 rounded-[2rem] p-10 shadow-2xl transition-all duration-700 transform animate-pulse

            ${
              prediction === "Fatal"
                ? "bg-gradient-to-br from-red-600 to-red-900"
                : prediction === "Serious"
                ? "bg-gradient-to-br from-yellow-400 to-orange-600"
                : "bg-gradient-to-br from-green-400 to-green-700"
            }`}
          >

            <p className="text-black text-xl font-bold">
              AI Prediction Result
            </p>

            {/* Icon */}
            <div className="flex justify-center mt-8">

              {
                prediction === "Fatal" ? (

                  <div className="text-8xl animate-bounce">
                    🚨
                  </div>

                ) : prediction === "Serious" ? (

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

            {/* Main Result */}
            <h1 className="text-7xl font-black text-center text-black mt-8 tracking-widest">

              {
                prediction === "Fatal"
                  ? "FATAL"
                  : prediction === "Serious"
                  ? "SERIOUS"
                  : "MINOR"
              }

            </h1>

            {/* Description */}
            <p className="text-black text-xl text-center mt-8 leading-9 max-w-4xl mx-auto">

              {
                prediction === "Fatal"
                  ? "Extreme accident risk detected. Overspeeding and heavy traffic may cause severe accidents."
                  : prediction === "Serious"
                  ? "Moderate accident risk detected. Drive carefully and follow traffic rules."
                  : "Low accident risk detected. Current road and traffic conditions appear relatively safe."
              }

            </p>

            {/* Risk Meter */}
            <div className="mt-10">

              <div className="w-full h-6 bg-black/20 rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all duration-1000

                  ${
                    prediction === "Fatal"
                      ? "w-full bg-red-300"
                      : prediction === "Serious"
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

export default Predict;
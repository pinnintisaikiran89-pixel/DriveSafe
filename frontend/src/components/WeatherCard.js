import { useState } from "react";
import axios from "axios";

function WeatherCard() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "5ea53b4cf421074ad221665439560288";

  const getWeather = async () => {

    if (!city) {

      alert("Enter city name");
      return;
    }

    try {

      const response = await axios.get(

        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

      );

      setWeatherData(response.data);

    } catch (error) {

      console.log(error);

      alert("City not found");
    }
  };

  // Risk Detection
  const getRiskLevel = () => {

    if (!weatherData) return "";

    const condition = weatherData.weather[0].main;

    if (
      condition === "Rain" ||
      condition === "Thunderstorm"
    ) {

      return "High Risk";
    }

    if (
      condition === "Fog" ||
      condition === "Mist" ||
      condition === "Haze"
    ) {

      return "Moderate Risk";
    }

    return "Low Risk";
  };

  return (

    <div className="bg-[#111111] border border-gray-800 rounded-[2rem] p-8 shadow-2xl">

      <h1 className="text-4xl font-black mb-8">

        Live Weather Risk Detection

      </h1>

      {/* Input */}
      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-5 rounded-2xl bg-black border border-gray-700 text-white outline-none"
        />

        <button
          onClick={getWeather}
          className="bg-blue-500 hover:bg-blue-600 px-8 rounded-2xl text-black font-bold"
        >

          Check

        </button>

      </div>

      {/* Weather Result */}
      {
        weatherData && (

          <div
            className={`rounded-3xl p-8 transition-all duration-500

            ${
              getRiskLevel() === "High Risk"
                ? "bg-gradient-to-br from-red-500 to-red-800"
                : getRiskLevel() === "Moderate Risk"
                ? "bg-gradient-to-br from-yellow-400 to-orange-600"
                : "bg-gradient-to-br from-green-400 to-green-700"
            }`}
          >

            <h1 className="text-5xl font-black text-black">

              {weatherData.name}

            </h1>

            <p className="text-black text-2xl mt-4">

              {weatherData.weather[0].main}

            </p>

            <p className="text-black text-6xl font-black mt-6">

              {Math.round(weatherData.main.temp)}°C

            </p>

            {/* Risk */}
            <div className="mt-8">

              <h2 className="text-3xl font-black text-black">

                {getRiskLevel()}

              </h2>

              <p className="text-black/70 text-lg mt-4">

                AI analyzed current weather conditions
                and estimated driving safety risk.

              </p>

            </div>

          </div>

        )
      }

    </div>
  );
}

export default WeatherCard;
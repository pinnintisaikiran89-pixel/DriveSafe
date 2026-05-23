import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

import L from "leaflet";

import axios from "axios";

// Fix marker issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function RouteSafety() {

  const [start, setStart] = useState("");

  const [destination, setDestination] = useState("");

  const [routeCoords, setRouteCoords] = useState([]);

  const [startCoords, setStartCoords] = useState(null);

  const [destCoords, setDestCoords] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  // Convert city name to coordinates
  const geocodePlace = async (place) => {

    const response = await axios.get(

      `https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`
    );

    return response.data[0];
  };

  // Route Analyzer
  const analyzeRoute = async () => {

    if (!start || !destination) {

      alert("Please enter both locations");

      return;
    }

    setLoading(true);

    try {

      // Get Coordinates
      const startData = await geocodePlace(start);

      const destData = await geocodePlace(destination);

      const startLat = parseFloat(startData.lat);

      const startLon = parseFloat(startData.lon);

      const destLat = parseFloat(destData.lat);

      const destLon = parseFloat(destData.lon);

      setStartCoords([startLat, startLon]);

      setDestCoords([destLat, destLon]);

      // Get Route
      const routeResponse = await axios.get(

        `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${destLon},${destLat}?overview=full&geometries=geojson`
      );

      const coordinates =
        routeResponse.data.routes[0].geometry.coordinates;

      // Convert [lon,lat] → [lat,lon]
      const formattedCoords = coordinates.map(coord => [

        coord[1],
        coord[0]
      ]);

      setRouteCoords(formattedCoords);

      // Fake AI Risk Logic
      let risk = "SAFE";

      if (
        start.toLowerCase().includes("hyderabad") ||
        destination.toLowerCase().includes("hyderabad")
      ) {

        risk = "HIGH RISK";

      } else if (
        start.toLowerCase().includes("vijayawada") ||
        destination.toLowerCase().includes("vijayawada")
      ) {

        risk = "MEDIUM RISK";
      }

      setResult(risk);

    } catch (error) {

      console.log(error);

      alert("Location not found");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-5xl font-black">

            Route Safety

          </h1>

          <p className="text-gray-400 mt-2">

            AI Powered Safe Route Detection

          </p>

        </div>

      </div>

      {/* Input Card */}
      <div className="bg-[#111111]/90 border border-gray-800 rounded-[2rem] p-8 shadow-2xl mb-10">

        <h2 className="text-3xl font-black mb-8">

          Enter Journey Route

        </h2>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Start Location"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black border border-gray-700"
          />

          <button
            onClick={analyzeRoute}
            className="w-full bg-green-500 hover:bg-green-600 text-black py-5 rounded-2xl text-xl font-black"
          >

            {
              loading
                ? "Analyzing Route..."
                : "Find Safe Route"
            }

          </button>

        </div>

      </div>

      {/* Map */}
      <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-800">

        <MapContainer
          center={[16.5062, 80.6480]}
          zoom={7}
          style={{
            height: "600px",
            width: "100%"
          }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {
            startCoords && (

              <Marker position={startCoords}>

                <Popup>

                  Start Location

                </Popup>

              </Marker>
            )
          }

          {
            destCoords && (

              <Marker position={destCoords}>

                <Popup>

                  Destination

                </Popup>

              </Marker>
            )
          }

          {
            routeCoords.length > 0 && (

              <Polyline
                positions={routeCoords}
                color="lime"
              />
            )
          }

        </MapContainer>

      </div>

      {/* Result */}
      {
        result && (

          <div
            className={`mt-10 rounded-[2rem] p-10 text-center

            ${
              result === "HIGH RISK"
                ? "bg-red-600"
                : result === "MEDIUM RISK"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >

            <h1 className="text-5xl font-black text-black">

              {result}

            </h1>

          </div>
        )
      }

    </div>
  );
}

export default RouteSafety;
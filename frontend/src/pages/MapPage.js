import { useEffect, useState } from "react";
import axios from "axios";

import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";

function MapPage() {

  const [hotspots, setHotspots] = useState([]);

  // Google Maps Loader
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",

    googleMapsApiKey:
      "AIzaSyBrCwp1IQXYoIUDbhHaM6z5kI2CzaFiWn0",

    libraries: ["places"],
  });

  // Andhra Pradesh Center
  const mapCenter = {
    lat: 15.9129,
    lng: 79.7400
  };

  useEffect(() => {

    fetchHotspots();

  }, []);

  // Fetch Backend Hotspots
  const fetchHotspots = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/hotspots"
      );

      setHotspots(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // Loading Screen
  if (!isLoaded) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold">

          Loading Map...

        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6">

        <div>

          <h1 className="text-5xl font-black">

            Smart Hotspots

          </h1>

          <p className="text-gray-400 mt-2">

            AI Accident Monitoring System

          </p>

        </div>

        {/* Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">

          <h1 className="text-black text-3xl font-black">

            D

          </h1>

        </div>

      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-8">

        <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8">

          <h1 className="text-5xl font-black text-red-400">

            {hotspots.length}

          </h1>

          <p className="text-gray-400 mt-4 text-lg">

            Active Hotspots

          </p>

        </div>

        <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8">

          <h1 className="text-5xl font-black text-green-400">

            24/7

          </h1>

          <p className="text-gray-400 mt-4 text-lg">

            AI Monitoring

          </p>

        </div>

        <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8">

          <h1 className="text-5xl font-black text-blue-400">

            AI

          </h1>

          <p className="text-gray-400 mt-4 text-lg">

            Smart Risk Detection

          </p>

        </div>

      </div>

      {/* Hotspot List */}
      <div className="px-6 mb-8">

        <div className="bg-[#111111]/90 border border-gray-800 rounded-[2rem] p-6">

          <h2 className="text-3xl font-black mb-6">

            Dangerous Areas

          </h2>

          <div className="space-y-4">

            {
              hotspots.map((spot, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between bg-black border border-gray-800 rounded-2xl p-5"
                >

                  <div>

                    <h2 className="text-2xl font-bold">

                      {spot.name}

                    </h2>

                    <p className="text-gray-400 mt-1">

                      Accident Risk Zone

                    </p>

                  </div>

                  <div
                    className={`px-5 py-2 rounded-xl font-bold text-lg
                    ${
                      spot.risk === "High"
                        ? "bg-red-500 text-black"
                        : "bg-yellow-400 text-black"
                    }`}
                  >

                    {spot.risk}

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

      {/* Google Map */}
      <div className="px-6 pb-8">

        <div className="overflow-hidden rounded-[2rem] border border-gray-800 shadow-2xl">

          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "70vh"
            }}
            center={mapCenter}
            zoom={7}
          >

            {
              hotspots.map((spot, index) => (

                <Marker
                  key={index}
                  position={{
                    lat: spot.lat,
                    lng: spot.lng
                  }}
                  title={`${spot.name} - ${spot.risk}`}
                />

              ))
            }

          </GoogleMap>

        </div>

      </div>

    </div>
  );
}

export default MapPage;
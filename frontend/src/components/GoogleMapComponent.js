import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";


// ============================================================
// GOOGLE MAP LIBRARIES
// ============================================================

const libraries = ["places"];


// ============================================================
// MAP COMPONENT
// ============================================================

function GoogleMapComponent() {

  // ==========================================================
  // STATES
  // ==========================================================

  const [hotspots, setHotspots] = useState([]);

  const [selectedSpot, setSelectedSpot] = useState(null);

  const [locationRisk, setLocationRisk] = useState(null);

  const [loadingHotspots, setLoadingHotspots] = useState(true);

  const [riskLoading, setRiskLoading] = useState(false);


  // ==========================================================
  // GOOGLE MAP LOADER
  // ==========================================================

  const { isLoaded, loadError } = useJsApiLoader({

    id: "google-map-script",

    googleMapsApiKey:
      "AIzaSyBrCwp1IQXYoIUDbhHaM6z5kI2CzaFiWn0",

    libraries,

  });


  // ==========================================================
  // DEFAULT MAP CENTER
  // ==========================================================

  const center = {

    lat: 15.9129,

    lng: 79.7400,

  };


  // ==========================================================
  // MAP STYLE
  // ==========================================================

  const containerStyle = {

    width: "100%",

    height: "500px",

    borderRadius: "24px",

  };


  // ==========================================================
  // FETCH HOTSPOTS
  // ==========================================================

  const fetchHotspots = useCallback(async () => {

    try {

      setLoadingHotspots(true);

      const response = await axios.get(
        "https://drivesafe-n587.onrender.com/hotspots"
      );

      console.log(
        "Dashboard Hotspots:",
        response.data
      );


      if (Array.isArray(response.data)) {

        setHotspots(response.data);

      } else {

        setHotspots([]);

      }

    } catch (error) {

      console.log(
        "Hotspot Fetch Error:",
        error
      );

      setHotspots([]);

    } finally {

      setLoadingHotspots(false);

    }

  }, []);


  // ==========================================================
  // CALCULATE LOCATION RISK
  // ==========================================================

  const calculateLocationRisk = useCallback(
    async (spot) => {

      try {

        setRiskLoading(true);

        console.log(
          "Calculating risk for:",
          spot
        );


        // ----------------------------------------------------
        // Determine scores from hotspot information
        // ----------------------------------------------------

        let hotspotScore = 0;


        if (spot.risk === "Critical") {

          hotspotScore = 100;

        } else if (spot.risk === "High") {

          hotspotScore = 80;

        } else if (spot.risk === "Medium") {

          hotspotScore = 50;

        } else {

          hotspotScore = 20;

        }


        // ----------------------------------------------------
        // Send risk request
        // ----------------------------------------------------

        const response = await axios.post(

          "https://drivesafe-n587.onrender.com/risk",

          {

            ml_prediction: "Serious",

            ml_confidence: 60,

            hotspot_count: spot.accidents || 0,

            weather: "Clear",

            road_condition: "Dry",

            lighting: "Daylight",

            traffic: "Moderate",

            speed: 60,

            hotspot_score: hotspotScore,

          }

        );


        console.log(
          "Location Risk:",
          response.data
        );


        if (response.data.success) {

          setLocationRisk({

            ...response.data,

            hotspot: spot.name,

          });

        }

      } catch (error) {

        console.log(
          "Location Risk Error:",
          error
        );

        setLocationRisk(null);

      } finally {

        setRiskLoading(false);

      }

    },
    []
  );


  // ==========================================================
  // LOAD HOTSPOTS
  // ==========================================================

  useEffect(() => {

    fetchHotspots();

  }, [fetchHotspots]);


  // ==========================================================
  // MARKER CLICK
  // ==========================================================

  const handleMarkerClick = (spot) => {

    setSelectedSpot(spot);

    setLocationRisk(null);

    calculateLocationRisk(spot);

  };


  // ==========================================================
  // CLOSE INFO WINDOW
  // ==========================================================

  const handleCloseInfo = () => {

    setSelectedSpot(null);

    setLocationRisk(null);

  };


  // ==========================================================
  // GOOGLE MAP ERROR
  // ==========================================================

  if (loadError) {

    return (

      <div
        className="
          w-full
          h-[500px]
          rounded-[2rem]
          bg-red-50
          flex
          flex-col
          items-center
          justify-center
          p-6
          text-center
        "
      >

        <h1 className="text-xl font-black text-red-600">

          Google Maps Failed to Load

        </h1>

        <p className="text-slate-600 mt-2">

          Please check your Google Maps API key
          and internet connection.

        </p>

      </div>

    );

  }


  // ==========================================================
  // MAP LOADING
  // ==========================================================

  if (!isLoaded) {

    return (

      <div
        className="
          w-full
          h-[500px]
          rounded-[2rem]
          bg-slate-900
          flex
          items-center
          justify-center
        "
      >

        <h1 className="text-white text-2xl font-bold">

          Loading Live Map...

        </h1>

      </div>

    );

  }


  // ==========================================================
  // HOTSPOT LOADING
  // ==========================================================

  if (loadingHotspots) {

    return (

      <div
        className="
          w-full
          h-[500px]
          rounded-[2rem]
          bg-slate-100
          flex
          items-center
          justify-center
        "
      >

        <h1 className="text-slate-600 text-xl font-bold">

          Loading Accident Hotspots...

        </h1>

      </div>

    );

  }


  // ==========================================================
  // MAIN MAP
  // ==========================================================

  return (

    <GoogleMap

      mapContainerStyle={containerStyle}

      center={center}

      zoom={7}

      options={{

        streetViewControl: false,

        mapTypeControl: false,

        fullscreenControl: true,

        zoomControl: true,

      }}

    >

      {/* ====================================================
          HOTSPOT MARKERS
          ==================================================== */}

      {hotspots.map((spot, index) => (

        <Marker

          key={`${spot.name}-${index}`}

          position={{

            lat: Number(spot.lat),

            lng: Number(spot.lng),

          }}

          onClick={() =>
            handleMarkerClick(spot)
          }

          title={spot.name}

        />

      ))}


      {/* ====================================================
          INFO WINDOW
          ==================================================== */}

      {selectedSpot && (

        <InfoWindow

          position={{

            lat: Number(
              selectedSpot.lat
            ),

            lng: Number(
              selectedSpot.lng
            ),

          }}

          onCloseClick={
            handleCloseInfo
          }

        >

          <div
            className="
              text-black
              min-w-[230px]
              p-1
            "
          >

            {/* ---------------------------------------------
                CITY NAME
                --------------------------------------------- */}

            <h2 className="font-black text-xl">

              {selectedSpot.name}

            </h2>


            {/* ---------------------------------------------
                HOTSPOT RISK
                --------------------------------------------- */}

            <div className="mt-3">

              <p className="text-sm text-slate-500">

                Hotspot Risk

              </p>

              <p
                className={`
                  font-black
                  text-lg
                  ${
                    selectedSpot.risk === "Critical"
                      ? "text-red-700"
                      : selectedSpot.risk === "High"
                      ? "text-red-600"
                      : selectedSpot.risk === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                `}
              >

                {selectedSpot.risk}

              </p>

            </div>


            {/* ---------------------------------------------
                ACCIDENT COUNT
                --------------------------------------------- */}

            <div className="mt-3">

              <p className="text-sm text-slate-500">

                Recorded Accidents

              </p>

              <p className="font-black text-lg">

                {selectedSpot.accidents}

              </p>

            </div>


            {/* ---------------------------------------------
                AI LOCATION RISK
                --------------------------------------------- */}

            <div className="mt-4 pt-3 border-t border-slate-200">

              <p className="text-sm text-slate-500">

                DriveSafe AI Risk

              </p>


              {riskLoading ? (

                <p className="font-bold text-blue-600 mt-1">

                  Analyzing...

                </p>

              ) : locationRisk ? (

                <>

                  <p
                    className={`
                      font-black
                      text-xl
                      mt-1
                      ${
                        locationRisk.risk_level === "High"
                          ? "text-red-600"
                          : locationRisk.risk_level === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    `}
                  >

                    {locationRisk.risk_level}

                  </p>


                  <div className="mt-2">

                    <p className="text-xs text-slate-500">

                      Risk Score

                    </p>

                    <p className="font-bold">

                      {locationRisk.risk_score}

                      /100

                    </p>

                  </div>

                </>

              ) : (

                <p className="text-slate-500 mt-1">

                  Risk analysis unavailable

                </p>

              )}

            </div>

          </div>

        </InfoWindow>

      )}

    </GoogleMap>

  );

}


export default GoogleMapComponent;
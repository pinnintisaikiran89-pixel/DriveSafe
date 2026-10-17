import { useState } from "react";
import axios from "axios";

import GlassCard from "../common/GlassCard";
import PrimaryButton from "../common/PrimaryButton";

import LocationInput from "./LocationInput";
import PreferenceSwitch from "./PreferenceSwitch";

function RouteForm({ setRouteResult }) {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [avoidHighRisk, setAvoidHighRisk] = useState(true);
  const [avoidTraffic, setAvoidTraffic] = useState(true);
  const [wellLitRoads, setWellLitRoads] = useState(true);

  const [loading, setLoading] = useState(false);

  const findRoute = async () => {

    if (!source.trim() || !destination.trim()) {
      alert("Please enter both locations.");
      return;
    }

    setLoading(true);
    setRouteResult(null);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/route/analyze",
        {
          source: source.trim(),
          destination: destination.trim(),

          avoidHighRisk,
          avoidTraffic,
          wellLitRoads
        }
      );

      console.log("ROUTE ANALYSIS:", response.data);

      if (response.data.success === false) {
        alert(
          response.data.error ||
          "Unable to calculate route."
        );

        return;
      }

      setRouteResult(response.data);

    } catch (error) {

      console.error(
        "Route Analysis Error:",
        error
      );

      if (error.response) {

        alert(
          error.response.data?.error ||
          "Route analysis failed."
        );

      } else {

        alert(
          "Unable to connect to DriveSafe backend."
        );
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <GlassCard className="p-6">

      <LocationInput
        label="Current Location"
        value={source}
        onChange={(e) =>
          setSource(e.target.value)
        }
        placeholder="Enter current location"
      />

      <LocationInput
        label="Destination"
        value={destination}
        onChange={(e) =>
          setDestination(e.target.value)
        }
        placeholder="Enter destination"
      />

      {/* Route Preferences */}

      <div className="mt-6 mb-6">

        <h3 className="font-bold text-lg mb-3">
          Route Preferences
        </h3>

        <PreferenceSwitch
          label="Avoid High Risk Roads"
          checked={avoidHighRisk}
          onChange={(e) =>
            setAvoidHighRisk(e.target.checked)
          }
        />

        <PreferenceSwitch
          label="Avoid Heavy Traffic"
          checked={avoidTraffic}
          onChange={(e) =>
            setAvoidTraffic(e.target.checked)
          }
        />

        <PreferenceSwitch
          label="Prefer Well Lit Roads"
          checked={wellLitRoads}
          onChange={(e) =>
            setWellLitRoads(e.target.checked)
          }
        />

      </div>

      <PrimaryButton
        title={
          loading
            ? "Analyzing Route..."
            : "Find Safe Route"
        }
        onClick={findRoute}
      />

    </GlassCard>
  );
}

export default RouteForm;
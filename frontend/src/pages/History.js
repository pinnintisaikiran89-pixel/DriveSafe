import { useEffect, useState } from "react";
import { History as HistoryIcon, ShieldCheck, MapPin } from "lucide-react";

import BottomNavigation from "../components/navigation/BottomNavigation";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const savedHistory =
      JSON.parse(
        localStorage.getItem("drivesafe_history")
      ) || [];

    setHistory(savedHistory);

  }, []);

  const getRiskColor = (risk) => {

    if (risk === "High") {
      return "text-red-600 bg-red-100";
    }

    if (risk === "Medium") {
      return "text-yellow-600 bg-yellow-100";
    }

    return "text-green-600 bg-green-100";

  };

  return (

    <div className="min-h-screen bg-slate-100 pb-28">

      <div className="max-w-md mx-auto px-5 pt-8">

        {/* Header */}

        <div className="mb-6">

          <p className="text-slate-500">
            Your activity
          </p>

          <h1 className="text-3xl font-black text-slate-900">
            Travel History
          </h1>

        </div>


        {/* Empty State */}

        {history.length === 0 ? (

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center">

              <HistoryIcon
                size={32}
                className="text-blue-600"
              />

            </div>

            <h2 className="font-bold text-xl mt-5">
              No History Yet
            </h2>

            <p className="text-slate-500 mt-2">
              Your analyzed routes and predictions
              will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {history.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-sm"
              >

                <div className="flex justify-between items-start">

                  <div className="flex gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                      <ShieldCheck
                        size={25}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold">
                        {item.title || "Route Analysis"}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.date || "Recent"}
                      </p>

                    </div>

                  </div>


                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(
                      item.risk_level
                    )}`}
                  >
                    {item.risk_level || "Low"}
                  </span>

                </div>


                {/* Location */}

                {item.source && item.destination && (

                  <div className="mt-5 space-y-2">

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={17}
                        className="text-blue-600"
                      />

                      <span className="text-sm text-slate-600">
                        {item.source}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={17}
                        className="text-red-500"
                      />

                      <span className="text-sm text-slate-600">
                        {item.destination}
                      </span>

                    </div>

                  </div>

                )}


                {/* Score */}

                {item.risk_score !== undefined && (

                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between">

                    <span className="text-slate-500">
                      Risk Score
                    </span>

                    <span className="font-black">
                      {item.risk_score}
                    </span>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>


      <BottomNavigation />

    </div>

  );

}

export default History;
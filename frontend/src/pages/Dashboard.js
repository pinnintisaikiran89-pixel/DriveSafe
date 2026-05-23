import GoogleMapComponent from "../components/GoogleMapComponent";
import WeatherCard from "../components/WeatherCard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {

  const data = [

    {
      name: "Minor",
      accidents: 400,
    },

    {
      name: "Serious",
      accidents: 300,
    },

    {
      name: "Fatal",
      accidents: 200,
    },
  ];

  return (

    <div className="min-h-screen bg-black text-white px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-12">

        <div>

          <h1 className="text-5xl font-black">

            Dashboard

          </h1>

          <p className="text-gray-400 mt-2 text-lg">

            AI Powered Accident Analytics

          </p>

        </div>

        {/* Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">

          <h1 className="text-black text-3xl font-black">

            D

          </h1>

        </div>

      </div>

      {/* Analytics Hero */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2rem] p-10 shadow-2xl mb-12">

        <p className="text-black text-xl font-medium">

          Real-Time AI Monitoring

        </p>

        <h1 className="text-6xl font-black text-black mt-5 leading-tight">

          Smart
          <br />
          Accident
          <br />
          Analytics

        </h1>

        <p className="text-black/70 text-lg mt-6 max-w-2xl leading-8">

          Analyze accident severity trends, monitor high-risk
          zones, and improve road safety using intelligent
          AI-powered insights and live hotspot tracking.

        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        {/* Total Accidents */}
        <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-blue-500 transition">

          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">

            <span className="text-3xl">

              🚗

            </span>

          </div>

          <h2 className="text-gray-400 text-lg">

            Total Accidents

          </h2>

          <p className="text-5xl font-black mt-4 text-white">

            12,540

          </p>

        </div>

        {/* Fatal Cases */}
        <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-red-500 transition">

          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">

            <span className="text-3xl">

              🚨

            </span>

          </div>

          <h2 className="text-gray-400 text-lg">

            Fatal Cases

          </h2>

          <p className="text-5xl font-black mt-4 text-red-400">

            2,340

          </p>

        </div>

        {/* High Risk Roads */}
        <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-yellow-500 transition">

          <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6">

            <span className="text-3xl">

              ⚠️

            </span>

          </div>

          <h2 className="text-gray-400 text-lg">

            High Risk Roads

          </h2>

          <p className="text-5xl font-black mt-4 text-yellow-400">

            145

          </p>

        </div>

        {/* AI Accuracy */}
        <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-green-500 transition">

          <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">

            <span className="text-3xl">

              🤖

            </span>

          </div>

          <h2 className="text-gray-400 text-lg">

            AI Accuracy

          </h2>

          <p className="text-5xl font-black mt-4 text-green-400">

            89%

          </p>

        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-[#111111] border border-gray-800 rounded-[2rem] p-8 shadow-2xl mb-12">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-4xl font-black text-white">

              Accident Distribution

            </h2>

            <p className="text-gray-400 mt-2">

              Severity analysis using AI predictions

            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">

            <span className="text-3xl">

              📊

            </span>

          </div>

        </div>

        <ResponsiveContainer width="100%" height={400}>

          <BarChart data={data}>

            <XAxis dataKey="name" stroke="#9CA3AF" />

            <YAxis stroke="#9CA3AF" />

            <Tooltip />

            <Bar
              dataKey="accidents"
              fill="#3B82F6"
              radius={[12, 12, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Map Section */}
      <div className="bg-[#111111] border border-gray-800 rounded-[2rem] p-8 shadow-2xl">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-4xl font-black text-white">

              Accident Hotspots

            </h2>

            <p className="text-gray-400 mt-2">

              Live dangerous zones and AI-monitored roads

            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">

            <span className="text-3xl">

              📍

            </span>

          </div>

        </div>

        <GoogleMapComponent />

      </div>
      <div className="mt-12">

        <WeatherCard />

      </div>
    </div>
  );
}

export default Dashboard;
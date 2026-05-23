import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="min-h-screen bg-black text-white px-6 py-8">

      {/* Top Navbar */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-black">

            DriveSafe

          </h1>

          <p className="text-gray-400 mt-1">

            Smart AI Navigation

          </p>

        </div>

        {/* Logo */}
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">

          <h1 className="text-black text-3xl font-black">

            D

          </h1>

        </div>

      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-[2rem] p-8 shadow-2xl mb-10">

        <p className="text-black text-lg font-medium">

          AI Powered Route Analysis

        </p>

        <h1 className="text-5xl font-black text-black mt-4 leading-tight">

          Safer
          <br />
          Smarter
          <br />
          Travel

        </h1>

        <p className="text-black/70 text-lg mt-6 max-w-md">

          Predict accidents, detect dangerous routes,
          and travel safely using intelligent AI navigation.

        </p>

        <Link
          to="/route-safety"
          className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
        >

          Start Journey

        </Link>

      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-bold mb-6">

        Quick Actions

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="bg-[#111111] border border-gray-800 p-8 rounded-3xl hover:border-purple-500 transition hover:scale-105"
        >

          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">

            <span className="text-3xl">

              📊

            </span>

          </div>

          <h2 className="text-2xl font-bold mb-3">

            Dashboard

          </h2>

          <p className="text-gray-400 leading-relaxed">

            View accident analytics, charts, and hotspot monitoring.

          </p>

        </Link>

        {/* Prediction */}
        <Link
          to="/predict"
          className="bg-[#111111] border border-gray-800 p-8 rounded-3xl hover:border-blue-500 transition hover:scale-105"
        >

          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">

            <span className="text-3xl">

              🚗

            </span>

          </div>

          <h2 className="text-2xl font-bold mb-3">

            Accident Prediction

          </h2>

          <p className="text-gray-400 leading-relaxed">

            Predict accident severity using Machine Learning.

          </p>

        </Link>

        {/* Hotspots */}
        <Link
          to="/map"
          className="bg-[#111111] border border-gray-800 p-8 rounded-3xl hover:border-red-500 transition hover:scale-105"
        >

          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">

            <span className="text-3xl">

              📍

            </span>

          </div>

          <h2 className="text-2xl font-bold mb-3">

            Hotspot Detection

          </h2>

          <p className="text-gray-400 leading-relaxed">

            View dangerous accident-prone zones on maps.

          </p>

        </Link>

        {/* Route Safety */}
        <Link
          to="/route-safety"
          className="bg-[#111111] border border-gray-800 p-8 rounded-3xl hover:border-green-500 transition hover:scale-105"
        >

          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">

            <span className="text-3xl">

              🛣️

            </span>

          </div>

          <h2 className="text-2xl font-bold mb-3">

            Route Safety

          </h2>

          <p className="text-gray-400 leading-relaxed">

            Analyze safest travel routes using AI prediction.

          </p>

        </Link>

      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-[#111111] rounded-3xl p-6 border border-gray-800">

          <h1 className="text-4xl font-black text-green-400">

            95%

          </h1>

          <p className="text-gray-400 mt-3">

            Route Accuracy

          </p>

        </div>

        <div className="bg-[#111111] rounded-3xl p-6 border border-gray-800">

          <h1 className="text-4xl font-black text-blue-400">

            24/7

          </h1>

          <p className="text-gray-400 mt-3">

            AI Monitoring

          </p>

        </div>

        <div className="bg-[#111111] rounded-3xl p-6 border border-gray-800">

          <h1 className="text-4xl font-black text-red-400">

            500+

          </h1>

          <p className="text-gray-400 mt-3">

            Hotspots

          </p>

        </div>

        <div className="bg-[#111111] rounded-3xl p-6 border border-gray-800">

          <h1 className="text-4xl font-black text-yellow-400">

            AI

          </h1>

          <p className="text-gray-400 mt-3">

            Smart Navigation

          </p>

        </div>

      </div>

    </div>
  );
}

export default Home;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {

  const navigate = useNavigate();

  useEffect(() => {

    setTimeout(() => {

      navigate("/home");

    }, 3000);

  }, [navigate]);

  return (

    <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden">

      {/* Logo Circle */}
      <div className="w-36 h-36 rounded-3xl bg-white flex items-center justify-center shadow-2xl animate-bounce">

        <h1 className="text-6xl font-black text-black">

          D

        </h1>

      </div>

      {/* App Name */}
      <h1 className="text-white text-5xl font-black mt-8 tracking-wide">

        DriveSafe

      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-lg mt-4">

        AI Powered Smart Transportation

      </p>

      {/* Loading Animation */}
      <div className="flex gap-3 mt-10">

        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>

        <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-150"></div>

        <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-300"></div>

      </div>

    </div>
  );
}

export default SplashScreen;
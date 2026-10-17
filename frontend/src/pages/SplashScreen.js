
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function DriveSafeLogo() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DriveSafe shield and car"
    >
      <defs>
        <linearGradient id="shieldRed" x1="30" y1="15" x2="130" y2="145">
          <stop offset="0%" stopColor="#FF7777" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>

      <path
        d="M80 13 132 34V70c0 35-22 60-52 76C50 130 28 105 28 70V34L80 13Z"
        stroke="url(#shieldRed)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M80 27 119 43V70c0 26-16 46-39 60C57 116 41 96 41 70V43L80 27Z"
        stroke="#EF4444"
        strokeOpacity=".25"
        strokeWidth="1.5"
      />
      <path
        d="M51 79 61 64c2-4 5-5 9-5h20c4 0 7 1 9 5l10 15"
        stroke="white"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M43 83c0-4 3-6 7-6h60c4 0 7 2 7 6v13c0 4-3 6-7 6H50c-4 0-7-2-7-6V83Z"
        fill="#F4F4F5"
      />
      <path
        d="M64 65h32l7 12H57l7-12Z"
        fill="#18181B"
      />
      <path
        d="M48 86h7m50 0h7"
        stroke="#EF4444"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="50" y="97" width="14" height="8" rx="3" fill="#080808" />
      <rect x="96" y="97" width="14" height="8" rx="3" fill="#080808" />
      <path
        d="m72 113 6 6 12-13"
        stroke="#FF7777"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem("user");
      navigate(savedUser ? "/dashboard" : "/home", {
        replace: true,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-black px-5 text-white">
      {/* Subtle cinematic red glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/20 blur-[85px]"
      />

      {/* Medium-sized app logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 h-32 w-32 sm:h-36 sm:w-36"
      >
        <motion.div
          animate={{
            filter: [
              "drop-shadow(0 0 8px rgba(239,68,68,0.15))",
              "drop-shadow(0 0 24px rgba(239,68,68,0.4))",
              "drop-shadow(0 0 8px rgba(239,68,68,0.15))",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="h-full w-full"
        >
          <DriveSafeLogo />
        </motion.div>
      </motion.div>

      {/* Cinematic, bold wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mt-7 text-center"
      >
        <h1 className="whitespace-nowrap text-[2.35rem] font-black uppercase leading-none tracking-[-0.065em] sm:text-5xl">
          <span className="text-white">DRIVE</span>
          <span
            className="text-red-600"
            style={{
              textShadow: "0 0 22px rgba(229,9,20,0.16)",
            }}
          >
            SAFE
          </span>
        </h1>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Your safety. Every journey.
        </p>
      </motion.div>

      {/* Loading dots */}
      <div className="relative z-10 mt-12 flex items-center gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: dot * 0.2,
            }}
            className="h-1.5 w-1.5 rounded-full bg-red-600"
          />
        ))}
      </div>

      <p className="absolute bottom-8 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
        Drive smart. Arrive safe.
      </p>
    </main>
  );
}

export default SplashScreen;

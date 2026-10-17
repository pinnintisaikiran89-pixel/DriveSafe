
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, LogIn, UserPlus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[80svh] flex-col overflow-hidden bg-[#080b12] text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#080b12]/75 via-[#080b12]/85 to-[#080b12]" />
      <div className="absolute -right-24 top-28 -z-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-left"
          aria-label="DriveSafe home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl sm:h-11 sm:w-11">
            <ShieldCheck className="h-6 w-6 text-red-400" />
          </div>

          <div>
            <span className="block text-lg font-bold tracking-tight">
              Drive<span className="text-red-400">Safe</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.22em] text-white/50">
              Smarter journeys
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/[0.13]"
        >
          <LogIn className="h-4 w-4" />
          Login
        </button>
      </header>

      {/* Introduction */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-14 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="w-full max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-sm text-red-200 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-red-400" />
            AI-powered road safety
          </div>

          <h1 className="mt-7 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Every journey
            <br />
            deserves a
            <br />
            <span className="text-red-400">safer route.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Make smarter travel decisions with AI-powered accident-risk
            predictions, accident hotspot awareness, and safer-route insights.
          </p>

          <div className="mt-9 flex flex-col gap-3 min-[400px]:flex-row">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-red-400"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-7 py-3.5 font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
            >
              <UserPlus className="h-5 w-5" />
              Create Account
            </button>
          </div>

          <p className="mt-5 text-sm text-white/45">
            Your journey to safer driving starts here.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

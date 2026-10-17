
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  House,
  Brain,
  Route,
  User,
  Plus,
} from "lucide-react";

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isReportActive = location.pathname === "/report-accident";

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-24px)] max-w-lg -translate-x-1/2 rounded-[26px] border border-white/[0.10] bg-[#0a0a0a]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
    >
      {/* Subtle red ambient glow */}
      <div
        className="pointer-events-none absolute -left-8 -top-8 h-20 w-20 rounded-full bg-red-500/[0.10] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-around gap-1">
        {/* Home */}
        <NavLink
          to="/dashboard"
          aria-label="Home"
          className={({ isActive }) =>
            `relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[18px] px-1 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400/50 ${
              isActive
                ? "bg-white/[0.07] text-red-400"
                : "text-white/45 hover:bg-white/[0.05] hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <House size={21} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold leading-4 sm:text-[11px]">
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* Predict */}
        <NavLink
          to="/predict"
          aria-label="Predict"
          className={({ isActive }) =>
            `relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[18px] px-1 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400/50 ${
              isActive
                ? "bg-white/[0.07] text-red-400"
                : "text-white/45 hover:bg-white/[0.05] hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Brain size={21} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold leading-4 sm:text-[11px]">
                Predict
              </span>
            </>
          )}
        </NavLink>

        {/* Center Report Accident button */}
        <button
          type="button"
          onClick={() => navigate("/report-accident")}
          aria-label="Report an accident"
          aria-current={isReportActive ? "page" : undefined}
          className="group relative -mt-7 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border-[4px] border-[#0a0a0a] bg-gradient-to-br from-red-500 to-red-700 text-white shadow-[0_0_25px_rgba(239,68,68,0.30)] transition duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(239,68,68,0.45)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <Plus
            size={29}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          <span className="absolute -bottom-6 whitespace-nowrap text-[9px] font-bold text-white/70">
            Report
          </span>
        </button>

        {/* Route */}
        <NavLink
          to="/route-safety"
          aria-label="Route"
          className={({ isActive }) =>
            `relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[18px] px-1 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400/50 ${
              isActive
                ? "bg-white/[0.07] text-red-400"
                : "text-white/45 hover:bg-white/[0.05] hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Route size={21} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold leading-4 sm:text-[11px]">
                Route
              </span>
            </>
          )}
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          aria-label="Profile"
          className={({ isActive }) =>
            `relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[18px] px-1 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400/50 ${
              isActive
                ? "bg-white/[0.07] text-red-400"
                : "text-white/45 hover:bg-white/[0.05] hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <User size={21} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold leading-4 sm:text-[11px]">
                Profile
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default BottomNavigation;

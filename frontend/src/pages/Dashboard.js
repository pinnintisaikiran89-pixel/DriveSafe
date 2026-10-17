
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LogOut, Route, ShieldCheck } from "lucide-react";

import { auth } from "../firebase";
import PageLayout from "../layouts/PageLayout";
import TopHeader from "../components/common/TopHeader";
import SafetyScoreCard from "../components/dashboard/SafetyScoreCard";
import QuickActions from "../components/dashboard/QuickActions";
import WeatherCard from "../components/dashboard/WeatherCard";
import NearbyHotspots from "../components/dashboard/NearbyHotspots";
import PredictionHistory from "../components/dashboard/PredictionHistory";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <PageLayout>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <TopHeader
            greeting="Welcome back"
            name={auth.currentUser?.displayName || "Driver"}
            subtitle="Your driving dashboard"
          />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-red-400/30 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-red-400/15 bg-red-500/[0.06] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
            <ShieldCheck className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold">DriveSafe protection</p>
            <p className="mt-1 text-xs text-white/45">
              Check conditions before every journey.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/route-safety")}
          aria-label="Open route safety"
          className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white/70"
        >
          <Route className="h-4 w-4" />
        </button>
      </div>

      <section className="mt-6">
        <SafetyScoreCard />
      </section>

      <section className="mt-6">
        <QuickActions />
      </section>

      <section className="mt-6">
        <WeatherCard />
      </section>

      <section className="mt-6">
        <NearbyHotspots />
      </section>

      <section className="mt-6">
        <PredictionHistory />
      </section>

      <p className="mt-6 text-center text-xs leading-5 text-white/30">
        Drive responsibly. Risk estimates are informational and do not replace
        road signs or your own judgment.
      </p>
    </PageLayout>
  );
}

export default Dashboard;

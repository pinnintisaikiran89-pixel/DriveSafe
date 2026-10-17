
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  ShieldCheck,
  LogOut,
  CircleUserRound,
} from "lucide-react";

import { auth } from "../firebase";
import PageLayout from "../layouts/PageLayout";
import TopHeader from "../components/common/TopHeader";
import GlassCard from "../components/common/GlassCard";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  const displayName = user?.displayName || "Driver";
  const initial = displayName.trim().charAt(0).toUpperCase() || "D";

  return (
    <PageLayout>
      <TopHeader
        greeting="Welcome"
        name={displayName}
        subtitle="Manage your account and profile."
      />

      <section className="mt-7">
        <GlassCard className="overflow-hidden border border-white/[0.08] bg-[#11141b] p-6 text-center sm:p-7">
          <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-red-400/30 bg-gradient-to-br from-red-500/20 to-blue-500/20 text-4xl font-bold text-white">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              initial
            )}
          </div>

          <h1 className="mt-5 break-words text-2xl font-bold tracking-tight">
            {displayName}
          </h1>

          <p className="mt-2 break-all text-sm text-white/45">
            {user?.email || "No email available"}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3.5 py-2 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            DriveSafe Driver
          </div>

          <div className="my-6 border-t border-white/[0.08]" />

          <div className="space-y-3 text-left">
            <ProfileDetail
              icon={<UserRound className="h-4 w-4" />}
              label="Full name"
              value={displayName}
            />
            <ProfileDetail
              icon={<Mail className="h-4 w-4" />}
              label="Email address"
              value={user?.email || "Not available"}
            />
          </div>

          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-red-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-red-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </GlassCard>
      </section>

      <section className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
            <CircleUserRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Account information</h2>
            <p className="mt-1 text-xs leading-5 text-white/40">
              Your profile details are linked to your signed-in account.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-6 text-center text-xs leading-5 text-white/30">
        DriveSafe helps you make informed decisions on the road. Always drive
        responsibly.
      </p>
    </PageLayout>
  );
}

function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
      <div className="mt-0.5 text-white/40">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-white/40">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-white/85">
          {value}
        </p>
      </div>
    </div>
  );
}

export default Profile;

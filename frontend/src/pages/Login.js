
import { ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import AppLayout from "../layouts/AppLayout";
import SectionHeader from "../components/common/SectionHeader";
import LoginForm from "../components/forms/LoginForm";

function Login() {
  return (
    <AppLayout showBottomNavigation={false}>
      <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505] px-4 py-10 sm:px-6">
        {/* Ambient red glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-red-600/[0.10] blur-[120px] sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-red-950/20 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Brand */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-[24px] border border-red-400/20 bg-gradient-to-br from-red-500/[0.15] to-red-950/20 shadow-[0_0_45px_rgba(239,68,68,0.10)]"
            >
              <ShieldCheck
                className="h-9 w-9 text-red-400"
                strokeWidth={1.7}
              />
            </motion.div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.32em] text-red-400">
              DriveSafe
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Welcome back
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-white/50">
              Sign in to access your driving safety dashboard.
            </p>
          </div>

          {/* Login glass card */}
          <section className="rounded-[28px] border border-white/[0.09] bg-[#111111]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.50)] backdrop-blur-2xl sm:p-7">
            <SectionHeader
              title="Sign in"
              subtitle="Enter your account details to continue."
            />

            <div className="mt-6">
              <LoginForm />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.08] pt-5">
              <ShieldCheck className="h-4 w-4 text-red-400/80" />

              <p className="text-[11px] tracking-wide text-white/40">
                Secure access to your DriveSafe account
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-6 flex items-start justify-center gap-2 px-3 text-center">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />

            <p className="text-xs leading-5 text-white/45">
              Your safer journey starts here. Drive carefully and stay alert.
            </p>
          </div>
        </motion.div>
      </main>
    </AppLayout>
  );
}

export default Login;

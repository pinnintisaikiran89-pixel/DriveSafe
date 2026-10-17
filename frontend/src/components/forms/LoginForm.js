
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

import PrimaryButton from "../common/PrimaryButton";
import GoogleButton from "../common/GoogleButton";

import {
  loginWithEmail,
  loginWithGoogle,
  resetPassword,
} from "../../services/authService";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleEmailLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginWithEmail(
        email.trim(),
        password
      );

      if (!result) {
        toast.error("Unable to sign in. Please try again.");
        return;
      }

      const user = result.user ?? result;

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Email login error:", error);
      toast.error(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result = await loginWithGoogle();

      if (!result) {
        toast.error("Google sign-in was not completed.");
        return;
      }

      const user = result.user ?? result;

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Signed in with Google!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      toast.error("Enter your email address first.");
      return;
    }

    try {
      setResetLoading(true);

      await resetPassword(email.trim());

      toast.success("Password reset email sent.");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Unable to reset password.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Email and password form */}
      <form onSubmit={handleEmailLogin} className="space-y-5">
        {/* Email field */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            />

            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-xl border border-white/[0.10] bg-[#151515] py-3.5 pl-11 pr-4 text-sm text-white caret-red-400 outline-none transition placeholder:text-white/35 hover:border-white/[0.16] focus:border-red-400/70 focus:ring-2 focus:ring-red-500/10"
            />
          </div>
        </div>

        {/* Password field */}
        <div>
          <label
            htmlFor="login-password"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            />

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/[0.10] bg-[#151515] py-3.5 pl-11 pr-12 text-sm text-white caret-red-400 outline-none transition placeholder:text-white/35 hover:border-white/[0.16] focus:border-red-400/70 focus:ring-2 focus:ring-red-500/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/45 hover:bg-white/[0.06] hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Forgot password */}
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={resetLoading}
              className="text-xs font-medium text-red-400 hover:text-red-300 disabled:opacity-50"
            >
              {resetLoading ? "Sending..." : "Forgot password?"}
            </button>
          </div>
        </div>

        {/* Sign in */}
        <PrimaryButton
          type="submit"
          disabled={loading || googleLoading}
          className="w-full"
        >
          {loading ? (
            "Signing in..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Sign in
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </PrimaryButton>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.09]" />

        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
          Or continue with
        </span>

        <div className="h-px flex-1 bg-white/[0.09]" />
      </div>

      {/* Google button */}
      <GoogleButton
        onClick={handleGoogleLogin}
        loading={googleLoading}
      />

      {/* Create account */}
      <p className="pt-1 text-center text-sm text-white/50">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-red-400 transition hover:text-red-300"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;

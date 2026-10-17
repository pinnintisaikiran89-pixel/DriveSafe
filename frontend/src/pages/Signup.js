
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ShieldCheck,
  UserRound,
  Mail,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { auth, db, googleProvider } from "../firebase";
import AppLayout from "../layouts/AppLayout";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const saveProfile = async (user, displayName) => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        displayName: displayName || user.displayName || "Driver",
        email: user.email || "",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(result.user, {
        displayName: name.trim(),
      });

      await saveProfile(result.user, name.trim());

      toast.success("Account created successfully!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveProfile(result.user, result.user.displayName);

      toast.success("Signed in successfully!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error(error.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout showBottomNavigation={false}>
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-4 py-8 sm:px-6">
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-red-400/20 bg-red-500/10">
            <ShieldCheck className="h-8 w-8 text-red-400" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
            DriveSafe
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Create your account
          </h1>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/45">
            Join DriveSafe and make safer driving decisions.
          </p>
        </div>

        <section className="rounded-3xl border border-white/[0.08] bg-[#11141b]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
          <form onSubmit={handleSignup} className="space-y-4">
            <Field
              label="Full name"
              icon={<UserRound className="h-4 w-4" />}
              type="text"
              value={name}
              onChange={setName}
              placeholder="Enter your name"
              autoComplete="name"
            />

            <Field
              label="Email address"
              icon={<Mail className="h-4 w-4" />}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
            />

            <Field
              label="Password"
              icon={<LockKeyhole className="h-4 w-4" />}
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />

            <Field
              label="Confirm password"
              icon={<LockKeyhole className="h-4 w-4" />}
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-red-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-red-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/35">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08] disabled:opacity-60"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-white/45">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-400 hover:text-red-300"
            >
              Sign in
            </Link>
          </p>
        </section>

        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-white/30">
          <Sparkles className="h-4 w-4" />
          Drive safely. Stay protected.
        </p>
      </main>
    </AppLayout>
  );
}

function Field({
  label,
  icon,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-white/65">
        {label}
      </span>

      <span className="flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-[#0b1018] px-4 py-3.5 transition focus-within:border-red-400/40">
        <span className="text-white/35">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
        />
      </span>
    </label>
  );
}

export default Signup;

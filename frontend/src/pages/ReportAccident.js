
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  AlertTriangle,
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Send,
  ShieldCheck,
  Car,
  Users,
  FileText,
  ArrowLeft,
} from "lucide-react";

import { auth, db } from "../firebase";
import BottomNavigation from "../components/navigation/BottomNavigation";

const initialForm = {
  title: "",
  location: "",
  accidentDate: new Date().toLocaleDateString("en-CA"),
  accidentTime: new Date().toTimeString().slice(0, 5),
  severity: "Minor",
  accidentType: "Vehicle Collision",
  vehiclesInvolved: "1",
  injuries: "0",
  description: "",
  latitude: null,
  longitude: null,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-white/10 bg-[#111722] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-red-400/60 focus:ring-4 focus:ring-red-500/10";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-semibold text-white/80";

function ReportAccident() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const update = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;

        setForm((previous) => ({
          ...previous,
          latitude,
          longitude,
          location:
            previous.location ||
            `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
        }));

        setMessage("GPS coordinates captured successfully.");
      },
      (error) => {
        console.error("Location error:", error);
        setMessage(
          "Unable to get location. Allow location permission or enter it manually."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const user = auth.currentUser;

    if (!user) {
      setMessage("Please log in before reporting an accident.");
      navigate("/login");
      return;
    }

    if (!form.title.trim() || !form.location.trim()) {
      setMessage("Please enter the accident title and location.");
      return;
    }

    if (
      !form.accidentDate ||
      !form.accidentTime ||
      !form.description.trim()
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    const vehicles = Number(form.vehiclesInvolved);
    const injuries = Number(form.injuries);

    if (
      !Number.isInteger(vehicles) ||
      vehicles < 1 ||
      !Number.isInteger(injuries) ||
      injuries < 0
    ) {
      setMessage("Enter valid vehicle and injury counts.");
      return;
    }

    setLoading(true);

    try {
      const accidentData = {
        title: form.title.trim(),
        location: form.location.trim(),
        accidentDate: form.accidentDate,
        accidentTime: form.accidentTime,
        severity: form.severity,
        accidentType: form.accidentType,
        vehiclesInvolved: vehicles,
        injuries,
        description: form.description.trim(),
        latitude: form.latitude,
        longitude: form.longitude,
        reportedBy: user.uid,
        reporterEmail: user.email || "",
        status: "Pending Review",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "accidents"), accidentData);

      setMessage("Accident report submitted successfully.");

      setForm({
        ...initialForm,
        accidentDate: new Date().toLocaleDateString("en-CA"),
        accidentTime: new Date().toTimeString().slice(0, 5),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Accident registration error:", error);

      setMessage(
        error.code === "permission-denied"
          ? "Permission denied. Please check your Firestore security rules."
          : "Could not submit the report. Check your internet connection and Firebase configuration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b12] text-white">
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-[45%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#080b12]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </button>

          <span className="text-lg font-bold tracking-tight">
            Drive<span className="text-red-400">Safe</span>
          </span>
        </div>
      </header>

      <main className="relative mx-auto max-w-lg px-4 pb-32 pt-7 sm:px-6 sm:pt-9">
        <div className="mb-7">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
            <AlertTriangle className="h-7 w-7 text-red-400" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
            Community road safety
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Report an Accident
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/55">
            Share accurate accident details to support road-safety analysis
            and help identify areas that may need attention.
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="border-b border-white/[0.08] bg-gradient-to-r from-red-500/[0.10] to-transparent px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-red-400" />

              <div>
                <h2 className="font-semibold text-white">
                  Accident details
                </h2>
                <p className="mt-1 text-xs text-white/45">
                  Fields marked with * are required.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
            <div>
              <label htmlFor="title" className={labelClass}>
                Accident title *
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={update}
                required
                maxLength={120}
                placeholder="e.g. Accident near a traffic junction"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>
                <MapPin className="h-4 w-4 text-red-400" />
                Accident location *
              </label>

              <input
                id="location"
                name="location"
                value={form.location}
                onChange={update}
                required
                maxLength={250}
                placeholder="Road, area or city"
                className={inputClass}
              />

              <button
                type="button"
                onClick={captureLocation}
                className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/[0.14]"
              >
                <Navigation className="h-4 w-4" />
                Capture Current GPS Location
              </button>

              {form.latitude !== null && (
                <p className="mt-2 break-words text-xs text-emerald-300">
                  Coordinates: {form.latitude.toFixed(5)},{" "}
                  {form.longitude.toFixed(5)}
                </p>
              )}

              <p className="mt-2 text-xs leading-5 text-white/40">
                GPS captures your current device position. Confirm that it
                matches the accident location.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 min-[380px]:grid-cols-2">
              <div>
                <label htmlFor="accidentDate" className={labelClass}>
                  <CalendarDays className="h-4 w-4 text-red-400" />
                  Accident date *
                </label>
                <input
                  id="accidentDate"
                  type="date"
                  name="accidentDate"
                  value={form.accidentDate}
                  onChange={update}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="accidentTime" className={labelClass}>
                  <Clock className="h-4 w-4 text-red-400" />
                  Accident time *
                </label>
                <input
                  id="accidentTime"
                  type="time"
                  name="accidentTime"
                  value={form.accidentTime}
                  onChange={update}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 min-[380px]:grid-cols-2">
              <div>
                <label htmlFor="severity" className={labelClass}>
                  Severity *
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={form.severity}
                  onChange={update}
                  required
                  className={inputClass}
                >
                  <option value="Minor">Minor</option>
                  <option value="Serious">Serious</option>
                  <option value="Fatal">Fatal</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label htmlFor="accidentType" className={labelClass}>
                  Accident type *
                </label>
                <select
                  id="accidentType"
                  name="accidentType"
                  value={form.accidentType}
                  onChange={update}
                  required
                  className={inputClass}
                >
                  <option value="Vehicle Collision">Vehicle Collision</option>
                  <option value="Vehicle-Pedestrian">Vehicle-Pedestrian</option>
                  <option value="Single Vehicle">Single Vehicle</option>
                  <option value="Road Hazard">Road Hazard</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 min-[380px]:grid-cols-2">
              <div>
                <label htmlFor="vehiclesInvolved" className={labelClass}>
                  <Car className="h-4 w-4 text-red-400" />
                  Vehicles involved *
                </label>
                <input
                  id="vehiclesInvolved"
                  type="number"
                  name="vehiclesInvolved"
                  value={form.vehiclesInvolved}
                  onChange={update}
                  min="1"
                  step="1"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="injuries" className={labelClass}>
                  <Users className="h-4 w-4 text-red-400" />
                  People injured *
                </label>
                <input
                  id="injuries"
                  type="number"
                  name="injuries"
                  value={form.injuries}
                  onChange={update}
                  min="0"
                  step="1"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                <FileText className="h-4 w-4 text-red-400" />
                Accident description *
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={update}
                required
                maxLength={2000}
                rows={5}
                placeholder="Describe what happened, road conditions and other relevant details..."
                className={`${inputClass} resize-y`}
              />

              <p className="mt-1 text-right text-xs text-white/35">
                {form.description.length}/2000 characters
              </p>
            </div>

            <div className="flex gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-amber-300" />

              <div>
                <p className="text-sm font-semibold text-amber-200">
                  Verification required
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-100/65">
                  Your report will be marked Pending Review and should be
                  verified before being used for hotspot or risk calculations.
                </p>
              </div>
            </div>

            {message && (
              <div
                role="status"
                className={`break-words rounded-xl border p-3 text-sm ${
                  message.includes("successfully")
                    ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                    : "border-red-400/20 bg-red-500/[0.08] text-red-200"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-4 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-5 w-5" />
              {loading ? "Submitting report..." : "Submit Accident Report"}
            </button>
          </form>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-white/30">
          DriveSafe · Road safety starts with accurate reporting.
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
}

export default ReportAccident;

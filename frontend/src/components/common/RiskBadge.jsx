function RiskBadge({ risk }) {
  const value = String(risk || "Unknown");
  const normalized = value.toLowerCase();

  let styles = "border-slate-200 bg-slate-50 text-slate-600";

  if (
    normalized.includes("high") ||
    normalized.includes("fatal") ||
    normalized.includes("serious")
  ) {
    styles = "border-red-100 bg-red-50 text-red-700";
  } else if (
    normalized.includes("medium") ||
    normalized.includes("moderate")
  ) {
    styles = "border-amber-100 bg-amber-50 text-amber-700";
  } else if (
    normalized.includes("low") ||
    normalized.includes("safe") ||
    normalized.includes("minor")
  ) {
    styles = "border-emerald-100 bg-emerald-50 text-emerald-700";
  }

  const label = normalized.includes("risk") ? value : `${value} Risk`;

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-[11px] font-extrabold leading-4 ${styles}`}
    >
      {label}
    </span>
  );
}

export default RiskBadge;
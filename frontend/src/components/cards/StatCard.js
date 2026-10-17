
function StatCard({ title, value, icon, color = "bg-white/5 text-white" }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 shadow-sm backdrop-blur-xl transition duration-200 hover:border-white/15">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-white/50">{title}</p>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}
        >
          <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        </div>
      </div>

      <p className="mt-4 break-words text-2xl font-bold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}

export default StatCard;


function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/[0.08] bg-white/[0.04] shadow-sm backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export default GlassCard;

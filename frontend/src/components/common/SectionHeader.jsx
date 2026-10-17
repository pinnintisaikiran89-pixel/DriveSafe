
function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <h2 className="!text-xl !font-bold !text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="!text-sm !text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;

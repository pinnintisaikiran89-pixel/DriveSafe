
function CustomSelect({ label, value, onChange, options }) {
  const id = `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-white/75"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={onChange}
        className="h-14 w-full rounded-2xl border border-white/10 bg-[#111722] px-4 text-sm text-white outline-none transition focus:border-red-400/60 focus:ring-4 focus:ring-red-500/10"
      >
        {options.map((item) => (
          <option
            key={item}
            value={item}
            className="bg-[#111722] text-white"
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;

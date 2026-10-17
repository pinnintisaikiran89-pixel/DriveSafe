function PreferenceSwitch({
  label,
  checked,
  onChange
}) {
  return (
    <label className="flex items-center justify-between py-3">
      <span className="text-slate-700">
        {label}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-blue-600"
      />
    </label>
  );
}

export default PreferenceSwitch;
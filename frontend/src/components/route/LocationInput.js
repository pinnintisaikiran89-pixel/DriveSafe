import { MapPin } from "lucide-react";

function LocationInput({
  label,
  value,
  onChange,
  placeholder
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-semibold text-slate-700">
        {label}
      </label>

      <div className="flex items-center bg-white rounded-2xl border border-slate-200 px-4 h-14">
        <MapPin
          className="text-blue-600 mr-3"
          size={20}
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent"
        />
      </div>
    </div>
  );
}

export default LocationInput;
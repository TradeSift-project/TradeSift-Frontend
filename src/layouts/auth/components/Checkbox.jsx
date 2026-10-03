
const Checkbox = ({
  checked,
  onChange,
  label,
  error,
  setError,
}) => {
  return (
    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-neutral-800">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            onChange(e.target.checked);

            if (error) {
              setError("");
            }
          }}
          className="h-4 w-4 rounded border-neutral-300 text-neutral-900 accent-neutral-900 transition-all duration-200 hover:border-neutral-400 focus:scale-[1.01] focus:shadow-lg focus:shadow-black/5 focus:ring-neutral-900 checked:bg-amber-500"
        />

        {label}
      </label>
    </div>
  );
};

export default Checkbox;
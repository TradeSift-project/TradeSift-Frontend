
const TextInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  onKeyDown,
  optional = false,
}) => {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-medium text-neutral-800"
      >
        {label}
        {optional && (
          <span className="ml-1 text-neutral-400">(Optional)</span>
        )}
      </label>

      <div className="relative mt-1 flex items-center">
        {Icon && (
          <Icon className="absolute left-3.5 h-4 w-4 text-neutral-400" />
        )}

        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-neutral-200 py-2 text-sm outline-none transition-all duration-200
          placeholder:text-neutral-400
          focus:border-neutral-400
          focus:ring-1
          focus:ring-neutral-400
          hover:border-neutral-400
          focus:scale-[1.01]
          focus:shadow-lg
          focus:shadow-black/5
          ${Icon ? "pl-11 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
};

export default TextInput;
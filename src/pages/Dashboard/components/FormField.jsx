const inputClass =
  "input input-bordered w-full bg-white focus:border-blue-500 focus:outline-none";
const textareaClass =
  "textarea textarea-bordered w-full min-h-24 bg-white focus:border-blue-500 focus:outline-none";
const selectClass =
  "select select-bordered w-full bg-white focus:border-blue-500 focus:outline-none";

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  hint,
  placeholder,
  options = [],
  min,
  max,
  rows = 4,
  required,
}) => {
  const id = name || label?.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          className={textareaClass}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          className={selectClass}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          min={min}
          max={max}
          className={inputClass}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(type === "number" ? Number(e.target.value) : e.target.value)
          }
        />
      )}
    </div>
  );
};

export default FormField;

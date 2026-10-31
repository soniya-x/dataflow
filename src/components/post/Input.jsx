
import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  rows = 5,
  error,
  className = "",
}) => {

  const inputClasses = `
    w-full rounded-lg border border-slate-300
    px-4 py-3 outline-none
    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100
    ${className}
  `;

  return (
    <div>
      {/* Label */}
      <label
        htmlFor={name}
        className="mb-2 block font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Input or Textarea */}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${inputClasses} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
        />
      )}

      {/* Error */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "create",
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) => {
  const baseClasses = `
    rounded-lg px-6 py-3 font-semibold
    transition duration-200
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const variants = {
    create: "bg-cyan-600 text-white hover:bg-cyan-700",

    cancel: "border border-slate-300 text-slate-700 hover:bg-slate-100",

    delete: "bg-red-600 text-white hover:bg-red-700",

    saving: "bg-green-600 text-white hover:bg-green-700",
    album:"bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant] || variants.create} ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;

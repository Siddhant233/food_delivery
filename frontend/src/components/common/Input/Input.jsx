import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(({
  label,
  error,
  hint,
  type = "text",
  placeholder,
  icon: Icon,
  className = "",
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon size={16} />
          </span>
        )}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full bg-white border rounded-xl px-4 py-3 text-sm
            placeholder-neutral-400 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent
            ${error ? "border-red-400 bg-red-50" : "border-neutral-200"}
            ${Icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-500 transition-colors duration-150"
          >
            {/* Eye = password is hidden → click to show. EyeOff = visible → click to hide */}
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;

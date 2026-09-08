"use client";

import React, { useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function CustomInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  disabled = false,
  required = false,
  className = "",
  name,
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const backupId = useId();
  const inputId = id || name || backupId;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text-main)] flex items-center gap-1">
          {label}
          {required && <span className="text-[var(--color-primary)]">*</span>}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] pointer-events-none flex items-center justify-center shrink-0 z-10">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full py-2.5 bg-[var(--color-surface)] text-[var(--color-text-main)] border ${
            error ? "border-[var(--color-error)] focus:ring-[var(--color-error-bg)]" : "border-[var(--color-border)] hover:border-[var(--color-border-hover)] focus:border-[var(--color-primary)]"
          } rounded-[var(--radius-md)] text-sm transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] disabled:opacity-50 disabled:cursor-not-allowed`}
          style={{
            paddingLeft: Icon ? "2.5rem" : "0.875rem",
            paddingRight: isPassword ? "2.5rem" : "0.875rem",
          }}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] hover:text-[var(--color-text-main)] transition-colors focus:outline-none z-10 flex items-center justify-center"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
      {!error && helperText && <span className="text-xs text-[var(--color-text-muted)]">{helperText}</span>}
    </div>
  );
}

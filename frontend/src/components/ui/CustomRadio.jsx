"use client";

import React, { useId } from "react";

export default function CustomRadio({
  label,
  description,
  checked = false,
  onChange,
  value,
  name,
  disabled = false,
  className = "",
  id,
  ...props
}) {
  const backupId = useId();
  const radioId = id || `radio-${backupId}`;

  return (
    <label
      htmlFor={radioId}
      className={`inline-flex items-start gap-3 cursor-pointer select-none group ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative flex items-center mt-0.5 shrink-0">
        <input
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => !disabled && onChange && onChange(e.target.value, e)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
            checked
              ? "bg-[var(--color-surface)] border-[var(--color-primary)] shadow-[var(--shadow-glow)]"
              : "bg-[var(--color-surface)] border-[var(--color-border-hover)] group-hover:border-[var(--color-primary)]"
          }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] transition-transform duration-150 ${
              checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col text-sm">
          {label && (
            <span className="font-medium text-[var(--color-text-main)] group-hover:text-white transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--color-text-muted)] mt-0.5">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}

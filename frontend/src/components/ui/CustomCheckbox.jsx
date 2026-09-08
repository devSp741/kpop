"use client";

import React, { useId } from "react";
import { Check } from "lucide-react";

export default function CustomCheckbox({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  className = "",
  id,
  name,
  ...props
}) {
  const backupId = useId();
  const checkboxId = id || name || backupId;

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-start gap-3 cursor-pointer select-none group ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          onChange={(e) => !disabled && onChange && onChange(e.target.checked, e)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={`w-5 h-5 rounded-[var(--radius-xs)] border flex items-center justify-center transition-all ${
            checked
              ? "bg-[var(--color-primary)] border-[var(--color-primary)] shadow-[var(--shadow-glow)]"
              : "bg-[var(--color-surface)] border-[var(--color-border-hover)] group-hover:border-[var(--color-primary)]"
          }`}
        >
          <Check
            className={`w-3.5 h-3.5 text-white stroke-[3] transition-transform duration-150 ${
              checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
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

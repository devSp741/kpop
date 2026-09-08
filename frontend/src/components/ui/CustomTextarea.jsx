"use client";

import React, { useId } from "react";

export default function CustomTextarea({
  label,
  placeholder = "",
  value = "",
  onChange,
  rows = 4,
  maxLength,
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
  name,
  id,
  ...props
}) {
  const backupId = useId();
  const textareaId = id || name || backupId;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={textareaId} className="text-sm font-medium text-[var(--color-text-main)] flex items-center gap-1">
            {label}
            {required && <span className="text-[var(--color-primary)]">*</span>}
          </label>
          {maxLength && (
            <span className="text-xs text-[var(--color-text-dim)]">
              {(value || "").length}/{maxLength}
            </span>
          )}
        </div>
      )}

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full p-3 bg-[var(--color-surface)] text-[var(--color-text-main)] border ${
          error ? "border-[var(--color-error)] focus:ring-[var(--color-error-bg)]" : "border-[var(--color-border)] hover:border-[var(--color-border-hover)] focus:border-[var(--color-primary)]"
        } rounded-[var(--radius-md)] text-sm transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] resize-y min-h-[80px] disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
      />

      {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
      {!error && helperText && <span className="text-xs text-[var(--color-text-muted)]">{helperText}</span>}
    </div>
  );
}

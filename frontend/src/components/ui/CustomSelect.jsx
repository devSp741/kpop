"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({
  label,
  options = [], // [{ value: '1', label: 'Option 1' }]
  value,
  onChange,
  placeholder = "Select an option",
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-[var(--color-text-main)] flex items-center gap-1">
          {label}
          {required && <span className="text-[var(--color-primary)]">*</span>}
        </label>
      )}

      {/* Select Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 bg-[var(--color-surface)] text-sm rounded-[var(--radius-md)] border ${
          error
            ? "border-[var(--color-error)]"
            : isOpen
            ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary-light)]"
            : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
        } text-left transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className={selectedOption ? "text-[var(--color-text-main)]" : "text-[var(--color-text-dim)]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--color-text-dim)] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[var(--color-primary)]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 max-h-60 overflow-y-auto bg-[var(--color-surface)] border border-[var(--color-border-hover)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] py-1.5">
          {options.length === 0 ? (
            <div className="px-3.5 py-2 text-sm text-[var(--color-text-dim)]">No options available</div>
          ) : (
            options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left transition-colors ${
                    isSelected
                      ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold"
                      : "text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[var(--color-primary)]" />}
                </button>
              );
            })
          )}
        </div>
      )}

      {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
      {!error && helperText && <span className="text-xs text-[var(--color-text-muted)]">{helperText}</span>}
    </div>
  );
}

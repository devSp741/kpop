"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";

export default function SearchableSelect({
  label,
  options = [], // [{ value: '1', label: 'BTS', subtitle: 'HYBE Labels' }]
  value,
  onChange,
  placeholder = "Search & select...",
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  const backupId = useId();
  const selectId = id || backupId;

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

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()) ||
    (opt.subtitle && opt.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (val) => {
    if (onChange) onChange(val);
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) onChange("");
    setSearch("");
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full relative ${className}`} ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-text-main)] flex items-center gap-1">
          {label}
          {required && <span className="text-[var(--color-primary)]">*</span>}
        </label>
      )}

      {/* Trigger Field */}
      <div
        id={selectId}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 bg-[var(--color-surface)] border ${
          error
            ? "border-[var(--color-error)]"
            : isOpen
            ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary-light)]"
            : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
        } rounded-[var(--radius-md)] cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <Search className="w-4 h-4 text-[var(--color-text-dim)] shrink-0" />
          <span
            className={`text-sm truncate ${
              selectedOption ? "text-[var(--color-text-main)] font-medium" : "text-[var(--color-text-dim)]"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-[var(--color-text-dim)]">
          {selectedOption && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:text-[var(--color-error)] transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[var(--color-primary)]" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-[var(--color-surface)] border border-[var(--color-border-hover)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] p-2">
          {/* Live Search Input */}
          <div className="mb-2 relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] z-10 pointer-events-none" />
            <input
              type="text"
              placeholder="Type to filter options..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-3 py-1.5 text-xs bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-[var(--radius-sm)] focus:border-[var(--color-primary)] outline-none"
              style={{ paddingLeft: "2.25rem" }}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-56 overflow-y-auto flex flex-col gap-0.5">
            {filteredOptions.length === 0 ? (
              <div className="px-3.5 py-4 text-xs text-center text-[var(--color-text-dim)]">
                No results found for &quot;{search}&quot;
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(opt.value);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-[var(--radius-sm)] transition-colors text-left ${
                      isSelected
                        ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold"
                        : "text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{opt.label}</span>
                      {opt.subtitle && (
                        <span className="text-xs text-[var(--color-text-dim)] font-normal">
                          {opt.subtitle}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[var(--color-primary)]" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
      {!error && helperText && <span className="text-xs text-[var(--color-text-muted)]">{helperText}</span>}
    </div>
  );
}

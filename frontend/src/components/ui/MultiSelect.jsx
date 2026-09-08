"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, X, Check, Search } from "lucide-react";

export default function MultiSelect({
  label,
  options = [], // [{ value: 'bts', label: 'BTS' }]
  value = [], // Array of selected values ['bts', 'blackpink']
  onChange,
  placeholder = "Select multiple...",
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  const backupId = useId();
  const selectId = id || backupId;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedItems = options.filter((opt) => value.includes(opt.value));
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (val) => {
    let updated;
    if (value.includes(val)) {
      updated = value.filter((item) => item !== val);
    } else {
      updated = [...value, val];
    }
    if (onChange) onChange(updated);
  };

  const removeTag = (e, val) => {
    e.stopPropagation();
    const updated = value.filter((item) => item !== val);
    if (onChange) onChange(updated);
  };

  const clearAll = (e) => {
    e.stopPropagation();
    if (onChange) onChange([]);
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full relative ${className}`} ref={containerRef}>
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-text-main)] flex items-center gap-1">
            {label}
            {required && <span className="text-[var(--color-primary)]">*</span>}
          </label>
          {selectedItems.length > 0 && (
            <span className="text-xs text-[var(--color-primary)] font-medium">
              {selectedItems.length} selected
            </span>
          )}
        </div>
      )}

      {/* Input / Pills Container */}
      <div
        id={selectId}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between min-h-[42px] px-3 py-1.5 bg-[var(--color-surface)] border ${
          error
            ? "border-[var(--color-error)]"
            : isOpen
            ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary-light)]"
            : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
        } rounded-[var(--radius-md)] cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div className="flex flex-wrap gap-1.5 items-center flex-1 pr-2">
          {selectedItems.length === 0 ? (
            <span className="text-sm text-[var(--color-text-dim)] py-1">{placeholder}</span>
          ) : (
            selectedItems.map((item) => (
              <span
                key={item.value}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 rounded-[var(--radius-sm)]"
              >
                {item.label}
                <button
                  type="button"
                  onClick={(e) => removeTag(e, item.value)}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>

        <div className="flex items-center gap-1 text-[var(--color-text-dim)]">
          {selectedItems.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="p-1 hover:text-[var(--color-error)] transition-colors"
              title="Clear all"
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
          {/* Search box inside dropdown */}
          <div className="relative mb-2 flex items-center">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] z-10 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-3 py-1.5 text-xs bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-[var(--radius-sm)] focus:border-[var(--color-primary)] outline-none"
              style={{ paddingLeft: "2.25rem" }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-52 overflow-y-auto flex flex-col gap-0.5">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-xs text-center text-[var(--color-text-dim)]">
                No items match search
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isChecked = value.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(opt.value);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-[var(--radius-sm)] transition-colors text-left ${
                      isChecked
                        ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium"
                        : "text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isChecked && <Check className="w-4 h-4 text-[var(--color-primary)]" />}
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

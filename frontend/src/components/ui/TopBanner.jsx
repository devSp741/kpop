"use client";

import React, { useState } from "react";
import { X, ArrowRight } from "lucide-react";

export default function TopBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="w-full bg-slate-900 text-slate-100 border-b border-slate-800 px-4 py-2.5 text-xs sm:text-sm relative z-50 flex items-center justify-between">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-center gap-2 text-center pr-6">
        <span className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold tracking-wide shrink-0">
          FEATURE
        </span>
        <span className="text-slate-300 font-medium truncate">
          Real-time comeback alerts & multi-platform idol feeds are live
        </span>
        <a
          href="#supported-idols"
          className="hidden sm:inline-flex items-center gap-1 text-white hover:text-slate-300 font-semibold underline underline-offset-4 transition-colors ml-1 shrink-0"
        >
          View Idols
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss banner"
        className="text-slate-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

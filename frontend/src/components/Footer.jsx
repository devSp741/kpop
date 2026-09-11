"use client";

import React from "react";
import { Music } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const handleNotice = (e, title) => {
    e.preventDefault();
    toast.info(`${title} section - KpopRadar is free & open for all Kpop fans!`);
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-900">
      <div className="max-w-screen-xl px-6 mx-auto py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Music className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 stroke-[2.2]" />
          <span className="font-bold text-base sm:text-lg tracking-tight" style={{ color: "#0f172a" }}>
            KpopRadar
          </span>
        </div>

        {/* Center: Copyright */}
        <p className="text-xs sm:text-sm font-normal text-center" style={{ color: "#64748b" }}>
          © 2026 KpopRadar. All rights reserved.
        </p>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center gap-6 text-xs sm:text-sm shrink-0" style={{ color: "#64748b" }}>
          <button onClick={(e) => handleNotice(e, "Privacy")} className="hover:text-slate-900 transition-colors cursor-pointer">
            Privacy
          </button>
          <button onClick={(e) => handleNotice(e, "Terms")} className="hover:text-slate-900 transition-colors cursor-pointer">
            Terms
          </button>
          <button onClick={(e) => handleNotice(e, "Contact")} className="hover:text-slate-900 transition-colors cursor-pointer">
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}

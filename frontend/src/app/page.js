"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Palette, Radio, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-screen w-screen bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col justify-between overflow-hidden relative selection:bg-[var(--color-primary)] selection:text-white">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(230,0,70,0.18)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Top Header Bar */}
      <header className="relative z-10 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]/80 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-[var(--shadow-glow)] shrink-0">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white font-heading">
              K-POP RADAR
            </span>
          </div>

          <Link
            href="/theme-showcase"
            className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-2"
          >
            <Palette className="w-3.5 h-3.5" /> UI Theme Showcase
          </Link>
        </div>
      </header>

      {/* Single Viewport Centered Content (No Scroll) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-primary)]/30 text-xs font-semibold text-[var(--color-primary)]">
            <Sparkles className="w-3.5 h-3.5" /> Centralized Design System Active
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Theme & UI Components Ready
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
            Single source of truth in <code className="text-[var(--color-primary)] font-mono">globals.css</code>. All typography, custom scrollbars, form controls (Input, Textarea, Checkbox, Radio, Select, MultiSelect, SearchableSelect), and Sonner Toasts are configured.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/theme-showcase"
              className="btn-primary py-3 px-7 text-xs sm:text-sm shadow-[var(--shadow-glow)] w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              Explore Theme Showcase <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Fixed Footer Bar */}
      <footer className="relative z-10 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]/80 py-3 text-center text-xs text-[var(--color-text-dim)] shrink-0">
        K-Pop Radar Starter Template • Centralized Theme Configured
      </footer>
    </div>
  );
}

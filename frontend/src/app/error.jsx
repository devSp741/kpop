"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Music, AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col justify-between font-sans selection:bg-[var(--color-primary)] selection:text-white">
      {/* Header */}
      <header className="w-full border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(230,0,70,0.3)]">
              <Music className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              KpopRadar
            </span>
          </Link>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium text-xs sm:text-sm transition-all shadow-[var(--shadow-glow)] active:scale-98"
          >
            Go to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center mb-6">
            <AlertCircle className="w-6 h-6 stroke-[2]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Something went wrong
          </h1>

          <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed mb-8">
            An unexpected application error occurred while loading this page. Please try refreshing or return home.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-sm transition-all shadow-[var(--shadow-glow)] active:scale-98"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-white font-semibold text-sm transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] text-xs py-6 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 KpopRadar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

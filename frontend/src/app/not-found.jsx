"use client";

import React from "react";
import Link from "next/link";
import { Music, ArrowRight, Home, Users, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col justify-between font-sans selection:bg-[var(--color-primary)] selection:text-white">
      {/* Brand Header Navbar */}
      <header className="w-full border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(230,0,70,0.3)]">
              <Music className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              KpopRadar
            </span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link href="/" className="text-[var(--color-text-muted)] hover:text-white transition-colors hidden sm:block">
              Home
            </Link>
            <Link href="/theme-showcase" className="text-[var(--color-text-muted)] hover:text-white transition-colors hidden sm:block">
              Theme Showcase
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-xs sm:text-sm transition-all shadow-[var(--shadow-glow)] active:scale-98"
            >
              Go to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl w-full text-center flex flex-col items-center relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>Error 404</span>
          </div>

          {/* Large 404 Number */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-2 drop-shadow-md">
            404
          </h1>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-[var(--color-text-muted)] text-xs sm:text-sm max-w-md leading-relaxed mb-8">
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.
          </p>

          {/* Quick Action Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full text-left max-w-3xl">
            <Link
              href="/"
              className="group p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/50 transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-white flex items-center justify-center mb-3 group-hover:bg-[var(--color-primary)] transition-colors">
                  <Home className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1 truncate group-hover:text-[var(--color-primary-hover)] transition-colors">
                  Landing Page
                </h3>
                <p className="text-[var(--color-text-muted)] text-xs leading-normal line-clamp-2">
                  Return to the main homepage & features.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-[var(--color-text-muted)] group-hover:text-white transition-all">
                <span>Go to home</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/#supported-idols"
              className="group p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/50 transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-white flex items-center justify-center mb-3 group-hover:bg-[var(--color-primary)] transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1 truncate group-hover:text-[var(--color-primary-hover)] transition-colors">
                  Supported Idols
                </h3>
                <p className="text-[var(--color-text-muted)] text-xs leading-normal line-clamp-2">
                  Explore tracked K-Pop groups & artists.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-[var(--color-text-muted)] group-hover:text-white transition-all">
                <span>Browse idols</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/theme-showcase"
              className="group p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/50 transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-white flex items-center justify-center mb-3 group-hover:bg-[var(--color-primary)] transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1 truncate group-hover:text-[var(--color-primary-hover)] transition-colors">
                  Theme Showcase
                </h3>
                <p className="text-[var(--color-text-muted)] text-xs leading-normal line-clamp-2">
                  View design system & UI components.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-[var(--color-text-muted)] group-hover:text-white transition-all">
                <span>View components</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] text-xs py-5 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 KpopRadar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

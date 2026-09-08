"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowRight,
  Bell,
  Heart,
  ChevronRight,
  Check,
  CheckCircle2,
  Palette,
  Play,
} from "lucide-react";

export default function KpopRadarLandingPage() {
  const [followedIdols, setFollowedIdols] = useState(["bts", "blackpink"]);

  const toggleFollow = (id, name) => {
    if (followedIdols.includes(id)) {
      setFollowedIdols(followedIdols.filter((item) => item !== id));
      toast.info(`Unfollowed ${name}`, {
        description: "Removed from your active radar tracking.",
      });
    } else {
      setFollowedIdols([...followedIdols, id]);
      toast.success(`Followed ${name}!`, {
        description: "Added to your unified chronological inbox.",
      });
    }
  };

  // Idols Grid Data
  const idolsList = [
    { id: "bts", name: "BTS", members: "7 members", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80" },
    { id: "blackpink", name: "BLACKPINK", members: "4 members", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80" },
    { id: "straykids", name: "Stray Kids", members: "8 members", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80" },
    { id: "twice", name: "TWICE", members: "9 members", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80" },
    { id: "seventeen", name: "SEVENTEEN", members: "13 members", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80" },
    { id: "aespa", name: "aespa", members: "4 members", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80" },
    { id: "ateez", name: "ATEEZ", members: "8 members", image: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=600&auto=format&fit=crop&q=80" },
    { id: "ive", name: "IVE", members: "6 members", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80" },
    { id: "enhypen", name: "ENHYPEN", members: "7 members", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80" },
    { id: "lesserafim", name: "LE SSERAFIM", members: "5 members", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80" },
    { id: "txt", name: "TXT", members: "5 members", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80" },
    { id: "idle", name: "(G)I-DLE", members: "5 members", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-black text-sm shadow-[var(--shadow-glow)]">
              K
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white font-heading">
              KpopRadar
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-text-muted)] font-medium">
            <a href="#artists" className="hover:text-white transition-colors">
              Artists
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it works
            </a>
            <a href="#platforms" className="hover:text-white transition-colors">
              Platforms
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/theme-showcase"
              className="btn-secondary text-xs py-2 px-3.5 border-[var(--color-border-hover)] hover:border-[var(--color-primary)]"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--color-primary)]" /> UI Theme Guide
            </Link>
            <button
              type="button"
              onClick={() => toast.success("Welcome to KpopRadar!", { description: "Setting up your free account..." })}
              className="btn-primary text-xs py-2 px-4 rounded-full font-semibold"
            >
              Get started free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Video/Gradient Backdrop */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-12 pb-24">
        {/* Background Radial Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--color-primary-light)]/20 via-[var(--color-bg)] to-[var(--color-bg)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-primary)]/30 text-xs font-semibold text-[var(--color-primary)]">
            <Sparkles className="w-3.5 h-3.5" /> All Idol Posts In One Unified Inbox
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-heading max-w-4xl mx-auto">
            Keep up with your favorite <span className="text-gradient-accent">Kpop group</span> in one place
          </h1>

          <p className="text-base sm:text-xl font-normal text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            Instagram, TikTok, Weverse, YouTube, X, Spotify. Your idol posts everywhere. KpopRadar pulls it all into one place so you never miss a comeback, a live, or a random 2am selfie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <button
              type="button"
              onClick={() => toast.success("Radar Active!", { description: "Welcome to KpopRadar free plan." })}
              className="btn-primary py-3.5 px-8 rounded-full text-base font-semibold shadow-[var(--shadow-glow-lg)] w-full sm:w-auto"
            >
              Get started free
            </button>
            <a
              href="#how-it-works"
              className="btn-secondary py-3.5 px-8 rounded-full text-base font-semibold border-white/20 text-white hover:border-white/50 w-full sm:w-auto"
            >
              See how it works
            </a>
          </div>

          {/* Interactive Mobile Inbox Mockup Card */}
          <div className="pt-10 max-w-xs sm:max-w-sm mx-auto">
            <div className="relative rounded-[2.5rem] border-[6px] border-[var(--color-border-hover)] bg-[var(--color-surface)] shadow-2xl overflow-hidden text-left p-4 space-y-3">
              {/* Phone Status Header */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--color-text-dim)] border-b border-[var(--color-border)] pb-2 px-1">
                <span>9:41</span>
                <span className="text-[var(--color-primary)] font-bold">KpopRadar</span>
                <span>100%</span>
              </div>

              <div className="px-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                  KpopRadar Inbox
                </p>
                <h3 className="text-sm font-bold text-white leading-tight">
                  All your platforms, one inbox
                </h3>
              </div>

              {/* Platform Badges Line */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="px-2 py-1 rounded-md bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-bold">YouTube</span>
                <span className="px-2 py-1 rounded-md bg-pink-600/20 text-pink-400 border border-pink-500/30 text-[10px] font-bold">Instagram</span>
                <span className="px-2 py-1 rounded-md bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">TikTok</span>
                <span className="px-2 py-1 rounded-md bg-green-600/20 text-green-400 border border-green-500/30 text-[10px] font-bold">Spotify</span>
                <span className="px-2 py-1 rounded-md bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">Weverse</span>
              </div>

              {/* Live Inbox Feed Mock Items */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] space-y-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-red-400">YouTube</span>
                    <span className="text-[var(--color-text-dim)]">Just now</span>
                  </div>
                  <p className="text-white font-medium truncate">JIMIN posted: &apos;Who&apos; Official MV</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] space-y-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-pink-400">Instagram</span>
                    <span className="text-[var(--color-text-dim)]">2m ago</span>
                  </div>
                  <p className="text-white font-medium truncate">V shared a new story</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] space-y-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-emerald-400">Weverse</span>
                    <span className="text-[var(--color-text-dim)]">18m ago</span>
                  </div>
                  <p className="text-white font-medium truncate">Jungkook is live now! 🔴</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Strip */}
      <section id="platforms" className="py-12 border-y border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-dim)]">
            All your platforms in one place
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm font-bold text-white">
            <span className="px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">Instagram</span>
            <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">TikTok</span>
            <span className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">YouTube</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">Weverse</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-500/10 border border-slate-500/30 text-slate-300">X (Twitter)</span>
            <span className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">Spotify</span>
          </div>
        </div>
      </section>

      {/* Artist Spotlight Section */}
      <section id="artists" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              For the real ones
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-heading">
              Follow the artists you actually care about
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              Build your personal radar with any idol, group, or soloist. From BTS to NewJeans, ATEEZ to aespa. We track their activity across every major platform so you get a single, clean timeline of everything they post.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden h-48 bg-slate-900 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
                alt="BTS"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-slate-900 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80"
                alt="BLACKPINK"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-slate-900 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
                alt="Stray Kids"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-slate-900 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80"
                alt="NewJeans"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Idols 12-Grid Section */}
      <section className="py-20 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              200+ ARTISTS AND COUNTING
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Your favorite idols, supported
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              From the biggest groups to rising soloists. If they post, we track it.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {idolsList.map((idol) => {
              const isFollowing = followedIdols.includes(idol.id);
              return (
                <div
                  key={idol.id}
                  onClick={() => toggleFollow(idol.id, idol.name)}
                  className="group relative rounded-2xl overflow-hidden h-52 cursor-pointer border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all shadow-md"
                >
                  <img
                    src={idol.image}
                    alt={idol.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-end justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{idol.name}</h3>
                      <p className="text-xs text-[var(--color-text-muted)]">{idol.members}</p>
                    </div>
                    <span className={`p-1.5 rounded-full text-xs transition-colors ${
                      isFollowing ? "bg-[var(--color-primary)] text-white" : "bg-white/20 text-white group-hover:bg-[var(--color-primary)]"
                    }`}>
                      {isFollowing ? <Check className="w-3.5 h-3.5" /> : "+"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm font-semibold text-[var(--color-text-dim)]">and more...</p>
        </div>
      </section>

      {/* How It Works Workflow: Three steps. Zero effort. */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-md mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Three steps. Zero effort.
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Set it up once and your feed stays current forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="theme-card p-6 text-center space-y-4 border-[var(--color-border)] hover:border-[var(--color-primary)]/40">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 flex items-center justify-center font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Pick your idols</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Search for any artist and add them to your radar. Groups, soloists, producers, dancers. If they&apos;re in K-pop, they&apos;re on here.
            </p>
          </div>

          <div className="theme-card p-6 text-center space-y-4 border-[var(--color-border)] hover:border-[var(--color-primary)]/40">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 flex items-center justify-center font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="text-xl font-bold text-white">Get a unified feed</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Their Instagram, TikTok, Weverse, YouTube, X, and Spotify activity shows up in one chronological timeline.
            </p>
          </div>

          <div className="theme-card p-6 text-center space-y-4 border-[var(--color-border)] hover:border-[var(--color-primary)]/40">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 flex items-center justify-center font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="text-xl font-bold text-white">Never miss a thing</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Turn on smart alerts for comebacks, live streams, new releases, and surprise drops. We notify you the second it happens.
            </p>
          </div>
        </div>
      </section>

      {/* Built by fans, for fans Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="theme-card p-8 sm:p-12 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-bg-alt)] to-[var(--color-surface)] border border-[var(--color-primary)]/40 relative overflow-hidden shadow-2xl flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white max-w-2xl font-heading">
            Built by fans, for fans
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-lg">
            Whether you follow one group or fifty, KpopRadar keeps you connected to the content that matters most.
          </p>
          <button
            type="button"
            onClick={() => toast.success("Welcome aboard!", { description: "Joining the KpopRadar community." })}
            className="btn-primary py-3 px-8 text-sm rounded-full font-semibold"
          >
            Join the community
          </button>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 border-t border-[var(--color-border)] text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white max-w-3xl mx-auto font-heading">
          Your bias deserves better than a missed post
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
          Free to use. Takes under a minute to set up. Never scroll through five apps again.
        </p>
        <button
          type="button"
          onClick={() => toast.success("Account Created!", { description: "Setting up your bias tracking timeline." })}
          className="btn-primary py-3.5 px-10 rounded-full text-base font-semibold shadow-[var(--shadow-glow-lg)]"
        >
          Get started free
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-alt)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-dim)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-white">KpopRadar</span>
            <span>• © 2026 KpopRadar. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/theme-showcase" className="hover:text-[var(--color-primary)] transition-colors font-semibold">
              UI Theme Guide
            </Link>
            <a href="#artists" className="hover:text-white transition-colors">
              Artists
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it works
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

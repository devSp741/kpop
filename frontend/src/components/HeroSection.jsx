"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchActivityFeed, fetchFollowingFeed } from "@/services/api";
import { formatTimeAgo } from "@/utils/formatTime";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import { Globe, Heart, Lock, Check } from "lucide-react";

// Media Assets
const demoVideo = "/assets/demo-video-B_b7c4Gx.mp4";
const shapesFull = "/assets/shapes-full-Dioh5wVH.svg";
const shapesTablet = "/assets/shapes-tablet-k91Wsh10.svg";
const shapesMobile = "/assets/shapes-mobile-B-8oJFTG.svg";

// Brand Platform SVG Icons
const YouTubeIcon = ({ className = "w-5 h-5", colored = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill={colored ? "#FF0000" : "currentColor"}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon = ({ className = "w-5 h-5", colored = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill={colored ? "#000000" : "currentColor"}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5", colored = false }) => (
  <svg className={className} viewBox="0 0 24 24">
    {colored ? (
      <>
        <defs>
          <linearGradient id="ig-gradient-hero-v5" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="25%" stopColor="#F77737" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="75%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-gradient-hero-v5)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
        />
      </>
    ) : (
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    )}
  </svg>
);

const WeverseIcon = ({ className = "w-5 h-5", colored = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill={colored ? "#0FCEA6" : "currentColor"}>
    <path d="M2.93 6.727 6.633 17.91h.11l2.468-7.47h1.066l2.469 7.47h.109L16.557 6.727h1.151l-4.288 12.546h-1.065L9.93 12.21h-.108l-2.424 7.063H6.333L2.044 6.727zm16.068 0h3.16c.26 0 .474.08.642.242.168.161.252.378.252.65v1.84c0 .272-.084.49-.252.651a.875.875 0 0 1-.642.242h-3.16a.875.875 0 0 1-.642-.242 .903.903 0 0 1-.252-.65V7.618c0-.273.084-.49.252-.651a.875.875 0 0 1 .642-.242z" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5", colored = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill={colored ? "#000000" : "currentColor"}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SpotifyIcon = ({ className = "w-5 h-5", colored = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill={colored ? "#1DB954" : "currentColor"}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5", colored = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill={colored ? "#1877F2" : "currentColor"}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LogoMark = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const platformBadges = [
  { id: "youtube", name: "YouTube", icon: YouTubeIcon, color: "hsl(0 72% 51%)" },
  { id: "facebook", name: "Facebook", icon: FacebookIcon, color: "#1877F2" },
  { id: "instagram", name: "Instagram", icon: InstagramIcon, color: "hsl(330 80% 55%)" },
  { id: "tiktok", name: "TikTok", icon: TikTokIcon, color: "#000000" },
  { id: "spotify", name: "Spotify", icon: SpotifyIcon, color: "hsl(141 73% 42%)" },
  { id: "weverse", name: "Weverse", icon: WeverseIcon, color: "hsl(160 60% 45%)" },
  { id: "twitter", name: "X", icon: XIcon, color: "hsl(0 0% 10%)" }
];

export default function HeroSection() {
  const { user, openRegisterModal, openLoginModal } = useAuth();
  const [feedItems, setFeedItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activePlatform, setActivePlatform] = React.useState("all");
  const [feedMode, setFeedMode] = React.useState("global"); // 'global' | 'following'

  React.useEffect(() => {
    let isMounted = true;

    async function loadFeed(isInitial = false) {
      try {
        if (isInitial) setLoading(true);
        let response;
        if (feedMode === "following" && user) {
          response = await fetchFollowingFeed({ platform: activePlatform, limit: 6 });
        } else {
          response = await fetchActivityFeed({ platform: activePlatform, limit: 6 });
        }

        if (isMounted && response?.data) {
          setFeedItems(response.data);
        }
      } catch (err) {
        if (isInitial) {
          console.error("Failed to load live activity feed:", err);
          if (isMounted) setFeedItems([]);
        }
      } finally {
        if (isMounted && isInitial) setLoading(false);
      }
    }

    loadFeed(true);

    // Silent background auto-polling every 15 seconds (bina page refresh ke live data auto-update)
    const pollInterval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        loadFeed(false);
      }
    }, 15000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [activePlatform, feedMode, user]);

  const getPlatformMeta = (platformName) => {
    const key = (platformName || "").toLowerCase();
    switch (key) {
      case "youtube":
        return { name: "YouTube", icon: YouTubeIcon, color: "hsl(0 72% 51%)" };
      case "facebook":
        return { name: "Facebook", icon: FacebookIcon, color: "#1877F2" };
      case "instagram":
        return { name: "Instagram", icon: InstagramIcon, color: "hsl(330 80% 55%)" };
      case "tiktok":
        return { name: "TikTok", icon: TikTokIcon, color: "#000000" };
      case "spotify":
        return { name: "Spotify", icon: SpotifyIcon, color: "hsl(141 73% 42%)" };
      case "weverse":
        return { name: "Weverse", icon: WeverseIcon, color: "hsl(160 60% 45%)" };
      case "twitter":
      case "x":
        return { name: "X", icon: XIcon, color: "hsl(0 0% 10%)" };
      default:
        return { name: platformName || "KPOP", icon: LogoMark, color: "#0f172a" };
    }
  };

  return (
    <div className="w-full relative">
      {/* Background Decorative Shapes Layer */}
      <div className="absolute top-0 bottom-0 mx-auto left-1/2 transform -translate-x-1/2 z-0 w-full md:w-[1200px] lg:w-[1600px] max-w-screen pointer-events-none">
        <img src={shapesFull} className="hidden lg:block w-full h-full object-cover" alt="" />
        <img src={shapesTablet} className="hidden md:block lg:hidden w-full h-full object-cover" alt="" />
        <img src={shapesMobile} className="md:hidden w-full h-full object-cover" alt="" />
      </div>

      {/* Top Video Area */}
      <section className="relative w-full min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex flex-col justify-start pt-14 sm:pt-16 md:pt-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={demoVideo}
          />
          {/* Smooth dark to white gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white" />
        </div>

        {/* Centered Hero Headline & Buttons */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-white drop-shadow-lg mb-4 sm:mb-6 px-2"
          >
            Keep up with your favorite Kpop group in one place
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl font-normal text-white/90 md:max-w-xl md:mx-auto mb-6 sm:mb-8 leading-relaxed drop-shadow px-2"
          >
            Instagram, TikTok, Weverse, YouTube, X, Spotify. Your idol posts everywhere. KpopRadar pulls it all into one place so you never miss a comeback, a live, or a random 2am selfie.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 w-full max-w-[280px] sm:max-w-none mx-auto"
          >
            <button
              onClick={() => user ? (window.location.hash = '#supported-idols') : openRegisterModal()}
              className="w-full sm:w-auto text-center rounded-full bg-white px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-slate-900 hover:opacity-90 transition-opacity shadow-md cursor-pointer"
            >
              {user ? `Welcome, ${user.name}` : "Get started free"}
            </button>
            <Link
              href="#supported-idols"
              className="w-full sm:w-auto text-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              See how it works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Centered Phone Inbox Mockup */}
      <section className="relative z-20 -mt-24 sm:-mt-28 md:-mt-36 px-3 sm:px-6 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-[300px] xs:w-[320px] sm:w-[360px]"
        >
          <div className="relative rounded-[2.6rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-slate-900 bg-white shadow-2xl overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] sm:w-[120px] h-[24px] sm:h-[28px] bg-slate-900 rounded-b-2xl z-20" />

            {/* Inner Phone Screen */}
            <div className="pt-8 sm:pt-10 pb-6 sm:pb-8 px-3.5 sm:px-4 min-h-[560px] sm:min-h-[600px] bg-white text-slate-900">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-2 mb-3 sm:mb-4">
                <span className="text-xs font-semibold text-slate-500" style={{ color: "#64748b" }}>
                  9:41
                </span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-4 h-2.5 rounded-sm border border-slate-400 relative">
                    <div className="absolute inset-[1px] right-[2px] bg-slate-600 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Inbox Title Header & Mode Switcher */}
              <div className="mb-2.5 sm:mb-3 px-1 text-left flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: "#64748b" }}
                    >
                      KpopRadar • Live Auto-Sync
                    </p>
                  </div>
                  <h3
                    className="font-bold leading-snug"
                    style={{ color: "#0f172a", fontSize: "clamp(1.2rem, 1.4vw, 1.6rem)" }}
                  >
                    {feedMode === "following" ? "My Followed Bias Feed" : "All Platforms Inbox"}
                  </h3>
                </div>
              </div>

              {/* Feed Mode Switcher (All Idols vs My Bias Feed) */}
              <div className="flex bg-slate-100 p-1 rounded-xl mb-3">
                <button
                  onClick={() => setFeedMode("global")}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    feedMode === "global" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>All Idols</span>
                </button>
                <button
                  onClick={() => {
                    if (!user) {
                      openLoginModal();
                    } else {
                      setFeedMode("following");
                    }
                  }}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    feedMode === "following" ? "bg-emerald-500 text-white shadow-xs font-bold" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${feedMode === "following" ? "fill-current" : ""}`} />
                  <span>My Feed</span>
                  {!user ? (
                    <Lock className="w-3 h-3 opacity-70" />
                  ) : (
                    <Check className="w-3 h-3 text-emerald-100" />
                  )}
                </button>
              </div>

              {/* Platform Filter Badges Row */}
              <div className="flex items-center gap-1.5 mb-3 sm:mb-4 flex-wrap">
                <button
                  onClick={() => setActivePlatform("all")}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    activePlatform === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All
                </button>
                {platformBadges.map((badge) => {
                  const IconComp = badge.icon;
                  const isActive = activePlatform === badge.id;
                  return (
                    <motion.button
                      key={badge.id}
                      onClick={() => setActivePlatform(isActive ? "all" : badge.id)}
                      whileTap={{ scale: 0.95 }}
                      className={`w-6 sm:w-7 h-6 sm:h-7 rounded-lg flex items-center justify-center shrink-0 cursor-pointer transition-transform ${
                        isActive ? "ring-2 ring-slate-900 scale-110" : "opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: badge.color }}
                      title={`Filter by ${badge.name}`}
                    >
                      <IconComp className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
                    </motion.button>
                  );
                })}
              </div>

              <div className="h-px bg-slate-200 mb-3 mx-1" />

              {/* Notification Feed Cards (Dynamic from Backend API) */}
              <div className="space-y-2 text-left">
                {loading ? (
                  <Loader text="Loading live feed..." size="sm" className="py-10" />
                ) : feedItems.length === 0 ? (
                  <div className="py-12 px-4 text-center">
                    <p className="text-xs text-slate-500 font-medium">
                      {feedMode === "following"
                        ? "You haven't followed any idols yet! Follow your bias below to build your feed."
                        : "No updates found for this platform filter."}
                    </p>
                    {feedMode === "following" && (
                      <Link
                        href="#supported-idols"
                        className="inline-block mt-3 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold"
                      >
                        Find Idols to Follow
                      </Link>
                    )}
                  </div>
                ) : (
                  feedItems.map((item, idx) => {
                    const meta = getPlatformMeta(item.platform);
                    const IconComp = meta.icon || LogoMark;
                    const artistName = item.artistName || item.artist_name;
                    const summaryTitle = item.summaryTitle || item.summary_title;
                    const bodyText = artistName ? `${artistName}: ${summaryTitle}` : summaryTitle;
                    const publishedTime = item.publishedAt || item.published_at;
                    const timeText = publishedTime ? formatTimeAgo(publishedTime) : "Just now";
                    const sourceUrl = item.sourceUrl || item.source_url || "#";

                    return (
                      <div
                        key={item.id || idx}
                        onClick={() => {
                          if (sourceUrl && sourceUrl !== "#") {
                            window.open(sourceUrl, "_blank", "noopener,noreferrer");
                          }
                        }}
                        className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 shadow-xs cursor-pointer transition-colors group"
                      >
                        <div
                          className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: meta.color }}
                        >
                          <IconComp className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#0f172a" }}>
                              {meta.name}
                            </span>
                            <span className="text-[10px] shrink-0" style={{ color: "#94a3b8" }}>
                              {timeText}
                            </span>
                          </div>
                          <p className="text-[10.5px] sm:text-[11px] mt-0.5 truncate font-medium" style={{ color: "#475569" }}>
                            {bodyText}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="absolute -inset-8 bg-gradient-to-b from-slate-900/5 via-slate-900/3 to-transparent rounded-[4rem] blur-2xl -z-10" />
        </motion.div>

        {/* Platform Logos Row Below Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-10 mb-16 relative z-10 max-w-[290px] sm:max-w-none mx-auto"
        >
          <YouTubeIcon className="w-7 sm:w-8 h-7 sm:h-8 hover:scale-110 transition-transform cursor-pointer" colored />
          <FacebookIcon className="w-7 sm:w-8 h-7 sm:h-8 hover:scale-110 transition-transform cursor-pointer" colored />
          <InstagramIcon className="w-7 sm:w-8 h-7 sm:h-8 hover:scale-110 transition-transform cursor-pointer" colored />
          <WeverseIcon className="w-7 sm:w-8 h-7 sm:h-8 hover:scale-110 transition-transform cursor-pointer" colored />
          <XIcon className="w-7 sm:w-8 h-7 sm:h-8 hover:scale-110 transition-transform cursor-pointer" colored />
          <SpotifyIcon className="w-7 sm:w-8 h-7 sm:h-8 hover:scale-110 transition-transform cursor-pointer" colored />
        </motion.div>
      </section>
    </div>
  );
}

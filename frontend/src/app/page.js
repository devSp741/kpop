"use client";

import React from "react";
import { motion } from "framer-motion";

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
          <linearGradient id="ig-gradient-hero" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="25%" stopColor="#F77737" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="75%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-gradient-hero)"
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

const LogoMark = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const notificationFeed = [
  { platform: "YouTube", icon: YouTubeIcon, color: "#FF0000", body: "JIMIN posted: 'Who' Official MV", time: "Just now" },
  { platform: "Instagram", icon: InstagramIcon, color: "#E1306C", body: "V shared a new story", time: "2m ago" },
  { platform: "TikTok", icon: TikTokIcon, color: "#000000", body: "Stray Kids posted a dance challenge", time: "5m ago" },
  { platform: "Spotify", icon: SpotifyIcon, color: "#1DB954", body: "BLACKPINK dropped 'Pink Venom' remix", time: "12m ago" },
  { platform: "Weverse", icon: WeverseIcon, color: "#0FCEA6", body: "Jungkook is live now!", time: "18m ago" },
  { platform: "X", icon: XIcon, color: "#000000", body: "aespa retweeted a fan post", time: "24m ago" }
];

const platformBadges = [
  { icon: YouTubeIcon, color: "#FF0000" },
  { icon: InstagramIcon, color: "#E1306C" },
  { icon: TikTokIcon, color: "#000000" },
  { icon: SpotifyIcon, color: "#1DB954" },
  { icon: WeverseIcon, color: "#0FCEA6" },
  { icon: XIcon, color: "#000000" }
];

export default function KpopRadarHeroOnlyPage() {
  return (
    <div className="flex flex-col min-h-screen w-full mx-auto overflow-x-hidden relative bg-background">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 bottom-0 mx-auto left-1/2 transform -translate-x-1/2 z-0 w-full md:w-[1200px] lg:w-[1600px] max-w-screen pointer-events-none">
        <img src={shapesFull} className="hidden lg:block w-full h-full object-cover" alt="" />
        <img src={shapesTablet} className="hidden md:block lg:hidden w-full h-full object-cover" alt="" />
        <img src={shapesMobile} className="md:hidden w-full h-full object-cover" alt="" />
      </div>

      {/* Hero Section Container */}
      <main className="relative z-10 flex-grow flex flex-col items-center">
        {/* Video Area */}
        <section className="relative w-full min-h-[500px] md:min-h-[560px] lg:min-h-[620px] flex flex-col justify-start pt-16 md:pt-20 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={demoVideo}
            />
            {/* Dark overlay gradients matching screenshot */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/95" />
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-md mb-5"
            >
              Keep up with your favorite<br className="hidden sm:block" /> Kpop group in one place
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8 font-normal leading-relaxed drop-shadow"
            >
              Instagram, TikTok, Weverse, YouTube, X, Spotify. Your idol posts everywhere. KpopRadar pulls it all into one place so you never miss a comeback, a live, or a random 2am selfie.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-row gap-4 justify-center items-center mb-10"
            >
              <a
                href="#"
                className="rounded-full bg-white px-7 py-3 text-sm sm:text-base font-semibold text-black hover:bg-white/90 transition-all shadow-md"
              >
                Get started free
              </a>
              <a
                href="#"
                className="rounded-full bg-white/10 backdrop-blur-md border border-white/40 px-7 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                See how it works
              </a>
            </motion.div>
          </div>
        </section>

        {/* Centered Phone Inbox Mockup - Overlapping Video Section */}
        <section className="relative z-20 -mt-28 md:-mt-36 sm:px-6 w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-[310px] sm:w-[360px] rounded-[2.8rem] border-[7px] border-neutral-900 bg-background shadow-2xl overflow-hidden relative"
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[24px] bg-neutral-900 rounded-b-xl z-30" />

            <div className="pt-8 pb-6 px-4 bg-background">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-2 mb-3">
                <span className="text-[11px] font-semibold text-muted-foreground">9:41</span>
                <div className="w-4 h-2 rounded-[2px] border border-muted-foreground/50 relative">
                  <div className="absolute inset-[1px] right-[2px] bg-muted-foreground/70 rounded-[1px]" />
                </div>
              </div>

              {/* Inbox Header */}
              <div className="mb-3 px-1 text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                  KPOPRADAR
                </p>
                <h3 className="text-sm font-bold text-foreground leading-tight">
                  All your platforms,<br />one inbox
                </h3>
              </div>

              {/* Platform Badges Row */}
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {platformBadges.map((badge, idx) => {
                  const IconComp = badge.icon;
                  return (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: badge.color }}
                    >
                      <IconComp className="w-3 h-3 text-white" />
                    </div>
                  );
                })}
                <div className="flex items-center gap-1 ml-0.5">
                  <svg width="18" height="10" viewBox="0 0 22 12" fill="none" className="text-muted-foreground/60">
                    <path d="M1 6H18M18 6L13 1M18 6L13 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
                    <LogoMark className="w-3 h-3 text-background" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-border/50 mb-2.5 mx-1" />

              {/* Notification Cards Feed */}
              <div className="space-y-1.5 text-left">
                {notificationFeed.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-secondary/50 border border-border/30"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        <IconComp className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-[11px] font-bold text-foreground">{item.platform}</span>
                          <span className="text-[9px] text-muted-foreground shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Platform Logos Row Below Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-6 sm:gap-8 mt-10 mb-16"
          >
            <InstagramIcon className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" colored />
            <TikTokIcon className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" colored />
            <YouTubeIcon className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" colored />
            <WeverseIcon className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" colored />
            <XIcon className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" colored />
            <SpotifyIcon className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" colored />
          </motion.div>
        </section>
      </main>
    </div>
  );
}

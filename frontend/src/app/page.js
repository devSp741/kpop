"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// SVGs / Assets definitions
const shapesFull = "/assets/shapes-full-Dioh5wVH.svg";
const shapesTablet = "/assets/shapes-tablet-k91Wsh10.svg";
const shapesMobile = "/assets/shapes-mobile-B-8oJFTG.svg";
const demoVideo = "/assets/demo-video-B_b7c4Gx.mp4";
const heroIdols = "/assets/hero-idols-DZmJP1G3.jpg";
const concertCrowd = "/assets/concert-crowd-BGux2aCJ.jpg";
const grid1 = "/assets/grid-1-7yxANZFe.jpg";
const grid2 = "/assets/grid-2-CaGEcGhM.jpg";
const grid3 = "/assets/grid-3-B-kHS-ul.jpg";
const grid4 = "/assets/grid-4-B2yZzcab.jpg";

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
          <linearGradient id="ig-gradient-main" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="25%" stopColor="#F77737" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="75%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-gradient-main)"
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

// Data Lists
const notificationFeed = [
  { platform: "YouTube", icon: YouTubeIcon, color: "hsl(0 72% 51%)", body: "JIMIN posted: 'Who' Official MV", time: "Just now" },
  { platform: "Instagram", icon: InstagramIcon, color: "hsl(330 80% 55%)", body: "V shared a new story", time: "2m ago" },
  { platform: "TikTok", icon: TikTokIcon, color: "hsl(0 0% 0%)", body: "Stray Kids posted a dance challenge", time: "5m ago" },
  { platform: "Spotify", icon: SpotifyIcon, color: "hsl(141 73% 42%)", body: "BLACKPINK dropped 'Pink Venom' remix", time: "12m ago" },
  { platform: "Weverse", icon: WeverseIcon, color: "hsl(160 60% 45%)", body: "Jungkook is live now!", time: "18m ago" },
  { platform: "X", icon: XIcon, color: "hsl(0 0% 10%)", body: "aespa retweeted a fan post", time: "24m ago" }
];

const platformBadges = [
  { icon: YouTubeIcon, color: "hsl(0 72% 51%)" },
  { icon: InstagramIcon, color: "hsl(330 80% 55%)" },
  { icon: TikTokIcon, color: "hsl(0 0% 0%)" },
  { icon: SpotifyIcon, color: "hsl(141 73% 42%)" },
  { icon: WeverseIcon, color: "hsl(160 60% 45%)" },
  { icon: XIcon, color: "hsl(0 0% 10%)" }
];

const artistsList = [
  { name: "BTS", members: "7 members", img: grid1 },
  { name: "BLACKPINK", members: "4 members", img: grid2 },
  { name: "Stray Kids", members: "8 members", img: grid3 },
  { name: "TWICE", members: "9 members", img: grid4 },
  { name: "SEVENTEEN", members: "13 members", img: heroIdols },
  { name: "aespa", members: "4 members", img: concertCrowd },
  { name: "ATEEZ", members: "8 members", img: grid1 },
  { name: "IVE", members: "6 members", img: grid2 },
  { name: "ENHYPEN", members: "7 members", img: grid3 },
  { name: "LE SSERAFIM", members: "5 members", img: grid4 },
  { name: "TXT", members: "5 members", img: heroIdols },
  { name: "(G)I-DLE", members: "5 members", img: concertCrowd }
];

// Motion Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 }
};

// Section Container with Intersection Observer Animation
function MotionSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Phone Inbox Mockup Component
function PhoneInboxMockup() {
  return (
    <div className="relative mx-auto w-[320px] sm:w-[360px]">
      <div className="relative rounded-[3rem] border-[8px] border-foreground/90 bg-foreground/5 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-foreground/90 rounded-b-2xl z-20" />

        <div className="pt-10 pb-8 px-4 min-h-[600px] bg-background">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-2 mb-4">
            <span className="text-xs font-semibold text-muted-foreground">9:41</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-4 h-2.5 rounded-sm border border-muted-foreground/40 relative">
                <div className="absolute inset-[1px] right-[2px] bg-muted-foreground/60 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Inbox Header */}
          <div className="mb-4 px-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              KpopRadar
            </p>
            <h3 className="text-base font-bold text-foreground leading-tight">
              All your platforms,<br />one inbox
            </h3>
          </div>

          {/* Platform Badges Row */}
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            {platformBadges.map((badge, idx) => {
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: badge.color }}
                >
                  <IconComponent className="w-3.5 h-3.5 text-white" />
                </motion.div>
              );
            })}
            <div className="flex items-center gap-1 ml-1">
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="text-muted-foreground/50">
                <path d="M1 6H18M18 6L13 1M18 6L13 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
                <LogoMark className="w-3.5 h-3.5 text-background" />
              </div>
            </div>
          </div>

          <div className="h-px bg-border/60 mb-3 mx-1" />

          {/* Feed List */}
          <motion.div
            className="space-y-2"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {notificationFeed.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-secondary/70 border border-border/40"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-foreground">{item.platform}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="absolute -inset-8 bg-gradient-to-b from-foreground/5 via-foreground/3 to-transparent rounded-[4rem] blur-2xl -z-10" />
    </div>
  );
}

// Artist Cards Grid Component
function ArtistGrid() {
  return (
    <div className="max-w-screen-xl px-6 mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          200+ artists and counting
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          Your favorite idols, supported
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          From the biggest groups to rising soloists. If they post, we track it.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {artistsList.map((artist) => (
          <motion.div
            key={artist.name}
            variants={cardScale}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
          >
            <img
              src={artist.img}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-primary-foreground">{artist.name}</h3>
              <p className="text-xs text-primary-foreground/70">{artist.members}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-8">
        <p className="text-lg font-semibold text-muted-foreground">and more...</p>
      </div>
    </div>
  );
}

export default function KpopRadarLandingPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="flex flex-col min-h-screen h-full mx-auto overflow-hidden relative bg-background">
      <div className="flex-grow">
        {/* Background Responsive Decorative Shapes */}
        <div className="absolute top-0 bottom-0 mx-auto left-1/2 transform -translate-x-1/2 z-0 w-full md:w-[1200px] lg:w-[1600px] max-w-screen pointer-events-none">
          <img src={shapesFull} className="hidden lg:block w-full h-full object-cover" alt="" />
          <img src={shapesTablet} className="hidden md:block lg:hidden w-full h-full object-cover" alt="" />
          <img src={shapesMobile} className="md:hidden w-full h-full object-cover" alt="" />
        </div>

        {/* Hero Section with Video Overlay */}
        <section className="relative min-h-[100vh] flex flex-col" ref={heroRef}>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={demoVideo}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background" />
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center max-w-screen-xl px-6 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24 w-full">
            <div className="text-center">
              <motion.div
                className="max-w-2xl mx-auto"
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.h1
                  variants={fadeInUp}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-lg md:text-6xl mb-6"
                >
                  Keep up with your favorite Kpop group in one place
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-lg md:text-xl font-normal text-white/80 md:max-w-xl md:mx-auto mb-8 md:mb-12 drop-shadow"
                >
                  Instagram, TikTok, Weverse, YouTube, X, Spotify. Your idol posts everywhere. KpopRadar pulls it all into one place so you never miss a comeback, a live, or a random 2am selfie.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <a
                    href="#"
                    className="inline-block rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Get started free
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-block rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-all"
                  >
                    See how it works
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Inbox & Mobile Phone Preview */}
        <MotionSection className="py-16 md:py-24 relative z-10">
          <div className="max-w-screen-xl px-6 mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                All your platforms in one place
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                For the real ones
              </h2>
            </div>
            <PhoneInboxMockup />
          </div>
        </MotionSection>

        {/* Section 3: Supported Artists Grid */}
        <MotionSection className="py-16 md:py-24 relative z-10">
          <ArtistGrid />
        </MotionSection>

        {/* Section 4: 3-Step Workflow ("How it works") */}
        <MotionSection className="py-16 md:py-24 relative z-10" id="how-it-works">
          <div className="max-w-screen-xl px-6 mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                How it works
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                Three steps. Zero effort.
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Set it up once and your feed stays current forever.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-3xl p-8 bg-card border border-border/60 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary mb-6">
                    Step 1
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3">Follow your idols</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Pick the groups and soloists you care about. We track them all across every major platform.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl p-8 bg-card border border-border/60 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary mb-6">
                    Step 2
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3">Connect your platforms</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Link your YouTube, Instagram, TikTok, Weverse, X, and Spotify in seconds.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl p-8 bg-card border border-border/60 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary mb-6">
                    Step 3
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3">Enjoy your feed</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Get a clean, single chronological stream of posts, lives, stories, and drops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Section 5: Community Section */}
        <MotionSection className="py-16 md:py-24 relative z-10">
          <div className="max-w-screen-xl px-6 mx-auto">
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-16 bg-foreground text-background">
              <div className="absolute inset-0 z-0 opacity-20">
                <img src={concertCrowd} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Built by fans, for fans
                </h2>
                <p className="text-primary-foreground/75 text-lg max-w-md mb-6">
                  Whether you follow one group or fifty, KpopRadar keeps you connected to the content that matters most.
                </p>
                <a
                  href="#"
                  className="inline-block rounded-full bg-primary-foreground px-8 py-3.5 text-base font-semibold text-foreground hover:opacity-90 transition-opacity"
                >
                  Join the community
                </a>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Section 6: Cross-Platform Feature */}
        <MotionSection className="py-16 md:py-24 relative z-10">
          <div className="max-w-screen-xl px-6 mx-auto">
            <div className="rounded-3xl p-8 md:p-16 bg-card border border-border/60">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Cross-platform
                </p>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                  Every platform. Every post. One place.
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  YouTube shorts. Weverse lives. TikTok challenges. X threads. Spotify drops. Stop bouncing between six apps. KpopRadar gives you a single chronological feed tailored to your taste.
                </p>
                <a
                  href="#"
                  className="inline-block rounded-full bg-foreground px-8 py-3.5 text-base font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Start tracking
                </a>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Section 7: Final Call To Action Banner */}
        <MotionSection className="py-16 md:py-24 relative z-10">
          <div className="max-w-screen-xl px-6 mx-auto">
            <div className="rounded-3xl p-8 md:p-16 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                Your bias deserves better than a missed post
              </h2>
              <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-8">
                Free to use. Takes under a minute to set up. Never scroll through five apps again.
              </p>
              <a
                href="#"
                className="inline-block rounded-full bg-background px-8 py-3.5 text-base font-semibold text-foreground hover:opacity-90 transition-opacity shadow-lg"
              >
                Get started free
              </a>
            </div>
          </div>
        </MotionSection>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 relative z-10 bg-background">
        <div className="max-w-screen-xl px-6 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoMark className="w-5 h-5 text-foreground" />
            <span className="font-bold text-foreground">KpopRadar</span>
          </div>
          <span className="text-sm text-muted-foreground">
            © 2026 KpopRadar. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

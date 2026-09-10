"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const concertBg = "/assets/concert-crowd-BGux2aCJ.jpg";

// Scalloped Badge Icons matching the 1, 2, 3 badges in design
const Step1BadgeIcon = () => (
  <div className="w-14 h-14 rounded-2xl bg-[#FFF5E6] flex items-center justify-center mx-auto mb-6 shadow-xs">
    <div className="relative w-9 h-9 flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-full h-full text-[#F59E0B] fill-current drop-shadow-xs">
        <path d="M20 0c2.2 0 4.2 1.1 5.4 2.9 1.9-.6 4-.1 5.3 1.3 1.4 1.4 1.9 3.4 1.3 5.3 1.8 1.2 2.9 3.2 2.9 5.4 0 2.2-1.1 4.2-2.9 5.4.6 1.9.1 4-1.3 5.3-1.4 1.4-3.4 1.9-5.3 1.3-1.2 1.8-3.2 2.9-5.4 2.9-2.2 0-4.2-1.1-5.4-2.9-1.9.6-4 .1-5.3-1.3-1.4-1.4-1.9-3.4-1.3-5.3-1.8-1.2-2.9-3.2-2.9-5.4 0-2.2 1.1-4.2 2.9-5.4-.6-1.9-.1-4 1.3-5.3 1.4-1.4 3.4-1.9 5.3-1.3 1.2-1.8 3.2-2.9 5.4-2.9z" />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-sm select-none"
        style={{ bottom: "8px" }}
      >
        1
      </span>
    </div>
  </div>
);

const Step2BadgeIcon = () => (
  <div className="w-14 h-14 rounded-2xl bg-[#E6F9F3] flex items-center justify-center mx-auto mb-6 shadow-xs">
    <div className="relative w-9 h-9 flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-full h-full text-[#10B981] fill-current drop-shadow-xs">
        <path d="M20 0c2.2 0 4.2 1.1 5.4 2.9 1.9-.6 4-.1 5.3 1.3 1.4 1.4 1.9 3.4 1.3 5.3 1.8 1.2 2.9 3.2 2.9 5.4 0 2.2-1.1 4.2-2.9 5.4.6 1.9.1 4-1.3 5.3-1.4 1.4-3.4 1.9-5.3 1.3-1.2 1.8-3.2 2.9-5.4 2.9-2.2 0-4.2-1.1-5.4-2.9-1.9.6-4 .1-5.3-1.3-1.4-1.4-1.9-3.4-1.3-5.3-1.8-1.2-2.9-3.2-2.9-5.4 0-2.2 1.1-4.2 2.9-5.4-.6-1.9-.1-4 1.3-5.3 1.4-1.4 3.4-1.9 5.3-1.3 1.2-1.8 3.2-2.9 5.4-2.9z" />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-sm select-none"
        style={{ bottom: "8px" }}
      >
        2
      </span>
    </div>
  </div>
);

const Step3BadgeIcon = () => (
  <div className="w-14 h-14 rounded-2xl bg-[#F0EBFF] flex items-center justify-center mx-auto mb-6 shadow-xs">
    <div className="relative w-9 h-9 flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-full h-full text-[#8B5CF6] fill-current drop-shadow-xs">
        <path d="M20 0c2.2 0 4.2 1.1 5.4 2.9 1.9-.6 4-.1 5.3 1.3 1.4 1.4 1.9 3.4 1.3 5.3 1.8 1.2 2.9 3.2 2.9 5.4 0 2.2-1.1 4.2-2.9 5.4.6 1.9.1 4-1.3 5.3-1.4 1.4-3.4 1.9-5.3 1.3-1.2 1.8-3.2 2.9-5.4 2.9-2.2 0-4.2-1.1-5.4-2.9-1.9.6-4 .1-5.3-1.3-1.4-1.4-1.9-3.4-1.3-5.3-1.8-1.2-2.9-3.2-2.9-5.4 0-2.2 1.1-4.2 2.9-5.4-.6-1.9-.1-4 1.3-5.3 1.4-1.4 3.4-1.9 5.3-1.3 1.2-1.8 3.2-2.9 5.4-2.9z" />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-sm select-none"
        style={{ bottom: "8px" }}
      >
        3
      </span>
    </div>
  </div>
);

const stepsData = [
  {
    badge: Step1BadgeIcon,
    title: "Pick your idols",
    description:
      "Search for any artist and add them to your radar. Groups, soloists, producers, dancers. If they're in K-pop, they're on here.",
  },
  {
    badge: Step2BadgeIcon,
    title: "Get a unified feed",
    description:
      "Their Instagram, TikTok, Weverse, YouTube, X, and Spotify activity shows up in one chronological timeline.",
  },
  {
    badge: Step3BadgeIcon,
    title: "Never miss a thing",
    description:
      "Turn on smart alerts for comebacks, live streams, new releases, and surprise drops. We notify you the second it happens.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorksSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-screen-xl px-6 mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <p
            className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#64748b" }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight mb-4 leading-tight"
            style={{ color: "#0f172a" }}
          >
            Three steps. Zero effort.
          </h2>
          <p
            className="text-base sm:text-lg font-normal leading-relaxed max-w-md mx-auto"
            style={{ color: "#64748b" }}
          >
            Set it up once and your feed stays current forever.
          </p>
        </div>

        {/* 3 Steps Columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center w-full mx-auto mb-16 sm:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {stepsData.map((step, idx) => {
            const BadgeComp = step.badge;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center px-2 sm:px-4"
              >
                <BadgeComp />
                <h3
                  className="text-xl font-bold leading-7 mb-2.5 text-slate-900"
                  style={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 700, color: "#0f172a" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm sm:text-[15px] leading-relaxed max-w-sm"
                  style={{ color: "#64748b" }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Concert Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex items-end shadow-xl w-full mx-auto"
        >
          {/* Concert Background Image */}
          <img
            src={concertBg}
            alt="Built by fans, for fans concert stage"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Gradient Overlay for Readable Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Card Content at Bottom Left */}
          <div className="relative z-10 p-7 sm:p-12 md:p-16 max-w-xl text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Built by fans, for fans
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed mb-6 sm:mb-8 max-w-md">
              Whether you follow one group or fifty, KpopRadar keeps you connected to the content that matters most.
            </p>
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-slate-900 hover:bg-slate-100 transition-all shadow-lg active:scale-95"
            >
              Join the community
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

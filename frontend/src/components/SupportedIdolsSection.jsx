"use client";

import React from "react";
import { motion } from "framer-motion";

const idolArtists = [
  { name: "BTS", members: "7 members", img: "/assets/idol-1-DFC3HPfk.jpg" },
  { name: "BLACKPINK", members: "4 members", img: "/assets/idol-2-CpsI_gBv.jpg" },
  { name: "Stray Kids", members: "8 members", img: "/assets/idol-3-Oh5Wt3k4.jpg" },
  { name: "TWICE", members: "9 members", img: "/assets/idol-4-C9_zUveq.jpg" },
  { name: "SEVENTEEN", members: "13 members", img: "/assets/idol-5-BVvNrB6N.jpg" },
  { name: "aespa", members: "4 members", img: "/assets/idol-6-BvDCJLf3.jpg" },
  { name: "ATEEZ", members: "8 members", img: "/assets/idol-group-1-CgSyGZct.jpg" },
  { name: "IVE", members: "6 members", img: "/assets/idol-8-lcG_lRTj.jpg" },
  { name: "ENHYPEN", members: "7 members", img: "/assets/idol-9-C3f5zclZ.jpg" },
  { name: "LE SSERAFIM", members: "5 members", img: "/assets/idol-10-DS0U59SX.jpg" },
  { name: "TXT", members: "5 members", img: "/assets/idol-11-zckwJxUC.jpg" },
  { name: "(G)I-DLE", members: "5 members", img: "/assets/idol-12-BMEy7eLA.jpg" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function SupportedIdolsSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-transparent text-slate-900 overflow-hidden">
      <div className="max-w-screen-xl px-6 mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#64748b" }}
          >
            200+ ARTISTS AND COUNTING
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
            style={{ color: "#0f172a" }}
          >
            Your favorite idols, supported
          </h2>
          <p
            className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
            style={{ color: "#64748b" }}
          >
            From the biggest groups to rising soloists. If they post, we track it.
          </p>
        </div>

        {/* 12 Idol Group Cards Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {idolArtists.map((artist) => (
            <motion.div
              key={artist.name}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm bg-slate-100"
            >
              {/* Idol Image */}
              <img
                src={artist.img}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bottom Dark Gradient Overlay for High Contrast Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Text Label at Bottom Left */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {artist.name}
                </h3>
                <p className="text-xs text-white/75 font-normal mt-0.5">
                  {artist.members}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Footer Text */}
        <div className="text-center mt-10">
          <p className="text-base sm:text-lg font-semibold" style={{ color: "#94a3b8" }}>
            and more...
          </p>
        </div>
      </div>
    </section>
  );
}

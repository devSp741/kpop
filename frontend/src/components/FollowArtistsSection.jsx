"use client";

import React from "react";
import { motion } from "framer-motion";

const grid1 = "/assets/grid-1-7yxANZFe.jpg";
const grid2 = "/assets/grid-2-CaGEcGhM.jpg";
const grid3 = "/assets/grid-3-B-kHS-ul.jpg";
const grid4 = "/assets/grid-4-B2yZzcab.jpg";

const gridImages = [
  { src: grid1, alt: "BTS at Billboard Music Awards" },
  { src: grid2, alt: "BLACKPINK In Your Area Tour" },
  { src: grid3, alt: "Felix of Stray Kids" },
  { src: grid4, alt: "NewJeans group photo" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export default function FollowArtistsSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-screen-xl px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Description with Decorative Blob Accent */}
          <div className="relative">
            {/* Decorative Green Accent Blob behind text */}
            <div className="absolute -left-12 -top-10 w-64 h-80 bg-[#00b99a]/15 rounded-full blur-3xl -z-10 pointer-events-none" />

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              FOR THE REAL ONES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Follow the artists you actually care about
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Build your personal radar with any idol, group, or soloist. From BTS to NewJeans, ATEEZ to aespa. We track their activity across every major platform so you get a single, clean timeline of everything they post.
            </p>
          </div>

          {/* Right Column: 2x2 Photo Grid */}
          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {gridImages.map((img, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] bg-slate-100 shadow-sm border border-slate-200/60"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

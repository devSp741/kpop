"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BiasCTASection() {
  return (
    <section className="relative py-20 sm:py-28 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-screen-xl px-6 mx-auto relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5 text-center"
            style={{ color: "#0f172a" }}
          >
            Your bias deserves better<br />than a missed post
          </h2>

          <p
            className="text-base sm:text-lg font-normal leading-relaxed mb-8 text-center max-w-lg"
            style={{ color: "#64748b" }}
          >
            Free to use. Takes under a minute to set up. Never<br className="hidden sm:inline" /> scroll through five apps again.
          </p>

          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            Get started free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

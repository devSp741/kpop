"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable KPOP Radar Premium Theme Loader Component
 * @param {string} text - Optional loading label text
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} className - Optional container styling
 */
export default function Loader({ text = "Loading...", size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-[2.5px]",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-6 text-slate-400 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-slate-200 border-t-slate-900 border-r-slate-800 shrink-0`}
      />
      {text && (
        <p className="text-xs font-medium text-slate-500 tracking-wide animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

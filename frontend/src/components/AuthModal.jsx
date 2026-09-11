"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    closeAuthModal,
    login,
    register,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (authModalTab === "login") {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register({ name: formData.name, email: formData.email, password: formData.password });
      }
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        {/* Backdrop Click Listener */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0"
        />

        {/* Modal Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 text-slate-900"
          style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
        >
          {/* Top Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="pt-8 px-8 pb-4 text-center">
            <h3
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: "#0f172a" }}
            >
              {authModalTab === "login" ? "Welcome back to KpopRadar" : "Start Tracking Your Idols"}
            </h3>
            <p
              className="text-xs sm:text-sm font-normal mt-2 leading-relaxed max-w-xs mx-auto"
              style={{ color: "#64748b" }}
            >
              {authModalTab === "login"
                ? "Sign in to access your customized bias feed and followed idols."
                : "Create a free account to follow your favorite K-Pop groups & soloists."}
            </p>

            {/* Tab Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mt-6 border border-slate-200/60" style={{ backgroundColor: "#f1f5f9" }}>
              <button
                type="button"
                onClick={() => {
                  setAuthModalTab("login");
                  setErrorMessage("");
                }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  authModalTab === "login"
                    ? "bg-white shadow-sm"
                    : "hover:text-slate-900"
                }`}
                style={authModalTab === "login" ? { backgroundColor: "#ffffff", color: "#0f172a" } : { color: "#64748b" }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalTab("register");
                  setErrorMessage("");
                }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  authModalTab === "register"
                    ? "bg-white shadow-sm"
                    : "hover:text-slate-900"
                }`}
                style={authModalTab === "register" ? { backgroundColor: "#ffffff", color: "#0f172a" } : { color: "#64748b" }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-4">
            {errorMessage && (
              <div className="p-3 text-xs font-medium bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
                {errorMessage}
              </div>
            )}

            {authModalTab === "register" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left" style={{ color: "#334155" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Kim"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-400"
                  style={{
                    backgroundColor: "#f8fafc",
                    color: "#0f172a",
                    border: "1.5px solid #cbd5e1",
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left" style={{ color: "#334155" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-400"
                style={{
                  backgroundColor: "#f8fafc",
                  color: "#0f172a",
                  border: "1.5px solid #cbd5e1",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left" style={{ color: "#334155" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-400"
                style={{
                  backgroundColor: "#f8fafc",
                  color: "#0f172a",
                  border: "1.5px solid #cbd5e1",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            >
              {loading ? (
                <Loader text="" size="sm" className="py-0 text-white" />
              ) : (
                <span>{authModalTab === "login" ? "Sign In" : "Create Account"}</span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

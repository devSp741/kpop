"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Hash,
  Palette,
  Sliders,
  CheckCircle2,
  ListFilter,
  Layers,
  ArrowRight,
  Bell,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextarea from "@/components/ui/CustomTextarea";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import CustomRadio from "@/components/ui/CustomRadio";
import CustomSelect from "@/components/ui/CustomSelect";
import MultiSelect from "@/components/ui/MultiSelect";
import SearchableSelect from "@/components/ui/SearchableSelect";

export default function ThemeShowcasePage() {
  // Form State
  const [textInput, setTextInput] = useState("");
  const [emailInput, setEmailInput] = useState("fan@kpopradar.com");
  const [passwordInput, setPasswordInput] = useState("secret123");
  const [numberInput, setNumberInput] = useState(5);
  const [textareaInput, setTextareaInput] = useState(
    "Never miss an update from your favorite K-pop idols across YouTube, Spotify, and Instagram!"
  );

  const [notificationsChecked, setNotificationsChecked] = useState(true);
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("daily");

  // Select States
  const [selectedCategory, setSelectedCategory] = useState("kpop_groups");
  const [selectedGroups, setSelectedGroups] = useState(["bts", "blackpink", "straykids"]);
  const [selectedArtist, setSelectedArtist] = useState("felix");

  // Sample Options Data
  const categoryOptions = [
    { value: "kpop_groups", label: "K-Pop Groups" },
    { value: "solo_artists", label: "Solo Idols & Vocalists" },
    { value: "agencies", label: "Agencies & Labels" },
    { value: "comebacks", label: "Upcoming Comebacks" },
  ];

  const groupOptions = [
    { value: "bts", label: "BTS (방탄소년단)" },
    { value: "blackpink", label: "BLACKPINK" },
    { value: "straykids", label: "Stray Kids" },
    { value: "twice", label: "TWICE" },
    { value: "newjeans", label: "NewJeans" },
    { value: "aespa", label: "aespa" },
    { value: "txt", label: "TOMORROW X TOGETHER" },
    { value: "seventeen", label: "SEVENTEEN" },
    { value: "ive", label: "IVE" },
    { value: "itzy", label: "ITZY" },
  ];

  const artistOptions = [
    { value: "jungkook", label: "Jungkook", subtitle: "BTS • BIGHIT MUSIC" },
    { value: "lisa", label: "Lisa", subtitle: "BLACKPINK • LLOUD" },
    { value: "felix", label: "Felix", subtitle: "Stray Kids • JYP Entertainment" },
    { value: "karina", label: "Karina", subtitle: "aespa • SM Entertainment" },
    { value: "hanni", label: "Hanni", subtitle: "NewJeans • ADOR" },
    { value: "chaewon", label: "Kim Chaewon", subtitle: "LE SSERAFIM • SOURCE MUSIC" },
    { value: "jennie", label: "Jennie", subtitle: "BLACKPINK • ODD ATELIER" },
  ];

  // Toast Handler Demos
  const showSuccessToast = () => {
    toast.success("Idol Added to Radar!", {
      description: "You will now receive instant updates for BTS comebacks.",
    });
  };

  const showErrorToast = () => {
    toast.error("Failed to Sync Feed", {
      description: "Weverse API key missing or network request timed out.",
    });
  };

  const showWarningToast = () => {
    toast.warning("Tracking Limit Reached", {
      description: "You are tracking 5/5 idols on your free plan.",
    });
  };

  const showInfoToast = () => {
    toast.info("New Comeback Teaser", {
      description: "Stray Kids released a new MV concept photo on X.",
    });
  };

  const showActionToast = () => {
    toast("Artist Unfollowed", {
      description: "Removed Jennie from your radar list.",
      action: {
        label: "Undo",
        onClick: () => toast.success("Restored Jennie to your radar list!"),
      },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] pb-20">
      {/* Background Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,var(--color-primary-light)_0%,transparent_70%)] pointer-events-none z-0 opacity-60" />

      {/* Header Container */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]/95 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-glow)] shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>K-POP RADAR</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30">
                  Theme System Showcase
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] hidden sm:block">
                Centralized Design Tokens & UI Form Components Playground
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="btn-secondary text-xs py-2 px-3.5">
              ← Home Page
            </Link>
            <button type="button" className="btn-primary text-xs py-2 px-3.5">
              <Palette className="w-3.5 h-3.5" /> Tokens Active
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Intro Hero Section */}
        <section className="theme-card p-6 sm:p-8 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-bg-alt)] to-[var(--color-surface)] relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-3 py-1 rounded-full border border-[var(--color-primary)]/20">
              <Layers className="w-3.5 h-3.5" /> Design System Architecture
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Centralized Theme & Form Components Setup
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              Ye theme setup pure project ke liye centralized design system serve kar raha hai. Jab bhi project start hoga, aap single source of truth (<code className="text-[var(--color-primary)]">globals.css</code>) se font, color, typography, custom scrollbar, aur components easily change/use kar sakte hain.
            </p>
          </div>
        </section>

        {/* Section 1: Color Tokens & Typography Hierarchy */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
            <Palette className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-lg font-bold">1. Typography Hierarchy & Color Tokens</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Typography Specimens */}
            <div className="theme-card p-6 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold border-b border-[var(--color-border)] pb-2">
                Headings Scale (H1 - H6)
              </h3>
              <div className="space-y-3">
                <div>
                  <h1 className="text-gradient text-3xl">H1. Main Headline</h1>
                  <span className="text-[10px] text-[var(--color-text-dim)]">Outfit / Plus Jakarta Sans • 800 ExtraBold</span>
                </div>
                <div>
                  <h2 className="text-2xl">H2. Section Header Title</h2>
                  <span className="text-[10px] text-[var(--color-text-dim)]">Outfit • 700 Bold</span>
                </div>
                <div>
                  <h3 className="text-xl">H3. Card & Module Title</h3>
                  <span className="text-[10px] text-[var(--color-text-dim)]">Outfit • 700 SemiBold</span>
                </div>
                <div>
                  <h4 className="text-lg">H4. Subsection Subheading</h4>
                  <span className="text-[10px] text-[var(--color-text-dim)]">Outfit • 600 SemiBold</span>
                </div>
                <div>
                  <h5 className="text-base">H5. Component Header Label</h5>
                  <span className="text-[10px] text-[var(--color-text-dim)]">Plus Jakarta Sans • 600 Medium</span>
                </div>
                <div>
                  <h6>H6. OVERLINE METADATA CAPTION</h6>
                  <span className="text-[10px] text-[var(--color-text-dim)]">Plus Jakarta Sans • Uppercase 0.05em</span>
                </div>
              </div>
            </div>

            {/* Color Palette Tokens */}
            <div className="theme-card p-6 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold border-b border-[var(--color-border)] pb-2">
                Color Swatches & State Tokens
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[var(--color-primary)] text-white text-xs font-semibold flex flex-col justify-between h-20 shadow-[var(--shadow-glow)]">
                  <span>Primary Crimson</span>
                  <code className="text-[10px] opacity-90">#E60046</code>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-accent)] text-white text-xs font-semibold flex flex-col justify-between h-20">
                  <span>Accent Pink</span>
                  <code className="text-[10px] opacity-90">#FF2A6D</code>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-accent-purple)] text-white text-xs font-semibold flex flex-col justify-between h-20">
                  <span>Accent Purple</span>
                  <code className="text-[10px] opacity-90">#8B5CF6</code>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold flex flex-col justify-between h-20">
                  <span>Surface Base</span>
                  <code className="text-[10px] text-[var(--color-text-dim)]">#151722</code>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border-hover)] text-xs font-semibold flex flex-col justify-between h-20">
                  <span>Surface Hover</span>
                  <code className="text-[10px] text-[var(--color-text-dim)]">#1D1F2D</code>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-xs font-semibold flex flex-col justify-between h-20">
                  <span>BG Alt</span>
                  <code className="text-[10px] text-[var(--color-text-dim)]">#0F1017</code>
                </div>
              </div>

              {/* State Alerts Preview */}
              <div className="space-y-2 pt-2">
                <div className="px-3 py-2 rounded-md bg-[var(--color-success-bg)] text-[var(--color-success)] text-xs flex items-center gap-2 border border-[var(--color-success)]/30">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> State: Success Badge Active
                </div>
                <div className="px-3 py-2 rounded-md bg-[var(--color-error-bg)] text-[var(--color-error)] text-xs flex items-center gap-2 border border-[var(--color-error)]/30">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> State: Error Validation Triggered
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Form Inputs, Textarea, Checkbox & Numbers */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
            <Sliders className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-lg font-bold">2. Native & Custom Input Controls</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Input Controls Card */}
            <div className="theme-card p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-[var(--color-border)] pb-2">
                Input Fields (Text, Email, Password, Number)
              </h3>

              <CustomInput
                label="Standard Username Input"
                placeholder="e.g. jungkook_stan"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                icon={User}
                helperText="Enter your preferred display name"
              />

              <CustomInput
                label="Email Input"
                type="email"
                placeholder="name@domain.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                icon={Mail}
                required
              />

              <CustomInput
                label="Password Input (Toggle Hide/Show)"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                icon={Lock}
              />

              <CustomInput
                label="Number Input (Tracked Idols Count)"
                type="number"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                icon={Hash}
                min={1}
                max={50}
              />
            </div>

            {/* Textarea & Disabled State Card */}
            <div className="theme-card p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-[var(--color-border)] pb-2">
                Textarea & Validation States
              </h3>

              <CustomTextarea
                label="Bio & K-Pop Preferences"
                placeholder="Tell us which groups you follow..."
                value={textareaInput}
                onChange={(e) => setTextareaInput(e.target.value)}
                maxLength={200}
                rows={4}
                helperText="Max 200 characters allowed"
              />

              <CustomInput
                label="Error Input State Example"
                placeholder="Invalid input value"
                value="Invalid input string"
                onChange={() => {}}
                error="Username is already taken by another user"
              />

              <CustomInput
                label="Disabled Input State"
                placeholder="Cannot edit this field"
                disabled
                value="System Readonly Field"
                onChange={() => {}}
              />
            </div>

            {/* Checkbox, Radio & Scrollbar Showcase */}
            <div className="theme-card p-6 space-y-5">
              <h3 className="text-sm font-semibold text-white border-b border-[var(--color-border)] pb-2">
                Checkboxes, Radios & Custom Scrollbar
              </h3>

              {/* Checkboxes */}
              <div className="space-y-3">
                <span className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider block">
                  Checkboxes
                </span>
                <CustomCheckbox
                  label="Push Notifications"
                  description="Receive instant alerts when new comebacks are announced"
                  checked={notificationsChecked}
                  onChange={(val) => setNotificationsChecked(val)}
                />

                <CustomCheckbox
                  label="Weekly Digest Email"
                  description="A summary of top trending news every Sunday"
                  checked={newsletterChecked}
                  onChange={(val) => setNewsletterChecked(val)}
                />
              </div>

              {/* Radio options */}
              <div className="space-y-3 pt-2 border-t border-[var(--color-border)]">
                <span className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider block">
                  Radio Group (Update Frequency)
                </span>

                <div className="flex flex-col gap-3">
                  <CustomRadio
                    name="frequency"
                    value="daily"
                    label="Daily Updates"
                    description="Receive daily real-time idol updates"
                    checked={selectedRadio === "daily"}
                    onChange={(val) => setSelectedRadio(val)}
                  />
                  <CustomRadio
                    name="frequency"
                    value="weekly"
                    label="Weekly Summary"
                    description="Consolidated weekly digest"
                    checked={selectedRadio === "weekly"}
                    onChange={(val) => setSelectedRadio(val)}
                  />
                </div>
              </div>

              {/* Custom Scrollbar preview box */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--color-border)]">
                <span className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider block">
                  Custom Scrollbar Box Test
                </span>
                <div className="h-24 overflow-y-auto p-2 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-xs text-[var(--color-text-muted)] space-y-1.5">
                  <p>1. BTS - Released new digital single concept photos.</p>
                  <p>2. BLACKPINK - World tour ticketing opens next week.</p>
                  <p>3. Stray Kids - Dominate Billboard 200 charts with new album.</p>
                  <p>4. TWICE - Announce special fan meeting in Seoul.</p>
                  <p>5. NewJeans - Tops Spotify global streaming charts.</p>
                  <p>6. aespa - Win 1st place on Music Bank stage.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Advanced Dropdown Select Controls */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
            <ListFilter className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-lg font-bold">3. Advanced Select & Dropdown Controls</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Custom Standard Select */}
            <div className="theme-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
                <h3 className="text-sm font-semibold text-white">Standard Select Dropdown</h3>
                <span className="text-[10px] px-2 py-0.5 bg-[var(--color-surface-hover)] rounded text-[var(--color-text-muted)] font-mono">
                  CustomSelect.jsx
                </span>
              </div>

              <p className="text-xs text-[var(--color-text-muted)]">
                Custom styled single-selection dropdown with custom arrow and hover focus effects.
              </p>

              <CustomSelect
                label="Select Category"
                options={categoryOptions}
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                helperText="Choose the main monitoring category"
              />

              <div className="p-3 bg-[var(--color-bg-alt)] rounded-[var(--radius-sm)] border border-[var(--color-border)] text-xs">
                <span className="text-[var(--color-text-dim)]">Selected Value: </span>
                <code className="text-[var(--color-primary)] font-mono font-semibold">
                  {selectedCategory || "None"}
                </code>
              </div>
            </div>

            {/* Multi-Select Box */}
            <div className="theme-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
                <h3 className="text-sm font-semibold text-white">Multi-Select Tag Box</h3>
                <span className="text-[10px] px-2 py-0.5 bg-[var(--color-surface-hover)] rounded text-[var(--color-text-muted)] font-mono">
                  MultiSelect.jsx
                </span>
              </div>

              <p className="text-xs text-[var(--color-text-muted)]">
                Tag pills, individual remove buttons, inline search filter, and selection counters.
              </p>

              <MultiSelect
                label="Followed K-Pop Groups"
                options={groupOptions}
                value={selectedGroups}
                onChange={(val) => setSelectedGroups(val)}
                placeholder="Choose groups to follow..."
                helperText="Select as many groups as you want"
              />

              <div className="p-3 bg-[var(--color-bg-alt)] rounded-[var(--radius-sm)] border border-[var(--color-border)] text-xs">
                <span className="text-[var(--color-text-dim)]">Selected Count: </span>
                <code className="text-[var(--color-primary)] font-mono font-semibold">
                  {selectedGroups.length} items ({selectedGroups.join(", ")})
                </code>
              </div>
            </div>

            {/* Searchable Select Box */}
            <div className="theme-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
                <h3 className="text-sm font-semibold text-white">Searchable Combobox Select</h3>
                <span className="text-[10px] px-2 py-0.5 bg-[var(--color-surface-hover)] rounded text-[var(--color-text-muted)] font-mono">
                  SearchableSelect.jsx
                </span>
              </div>

              <p className="text-xs text-[var(--color-text-muted)]">
                Combobox dropdown with instant live filter, clear button, and subtitle metadata display.
              </p>

              <SearchableSelect
                label="Search Bias Idol"
                options={artistOptions}
                value={selectedArtist}
                onChange={(val) => setSelectedArtist(val)}
                placeholder="Type idol name or group..."
                helperText="Live filter across name and agency"
              />

              <div className="p-3 bg-[var(--color-bg-alt)] rounded-[var(--radius-sm)] border border-[var(--color-border)] text-xs">
                <span className="text-[var(--color-text-dim)]">Selected Artist ID: </span>
                <code className="text-[var(--color-primary)] font-mono font-semibold">
                  {selectedArtist || "None"}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Toast Notifications Showcase */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
            <Bell className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-lg font-bold">4. Toast Notification Triggers (Sonner Library)</h2>
          </div>

          <div className="theme-card p-6 space-y-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              Click any button below to trigger live toast notifications configured with high-contrast theme colors (Success Green 🟢, Error Red 🔴, Warning Yellow 🟡, Info Blue 🔵, and Action Pink 💖).
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={showSuccessToast}
                className="px-4 py-2.5 rounded-[var(--radius-md)] bg-[#04381C] text-[#34D399] border border-[#10B981] text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-110"
              >
                <CheckCircle2 className="w-4 h-4" /> Success Toast (Green)
              </button>

              <button
                type="button"
                onClick={showErrorToast}
                className="px-4 py-2.5 rounded-[var(--radius-md)] bg-[#450A0A] text-[#F87171] border border-[#EF4444] text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-110"
              >
                <XCircle className="w-4 h-4" /> Error Toast (Red)
              </button>

              <button
                type="button"
                onClick={showWarningToast}
                className="px-4 py-2.5 rounded-[var(--radius-md)] bg-[#451A03] text-[#FBBF24] border border-[#F59E0B] text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-110"
              >
                <AlertTriangle className="w-4 h-4" /> Warning Toast (Yellow)
              </button>

              <button
                type="button"
                onClick={showInfoToast}
                className="px-4 py-2.5 rounded-[var(--radius-md)] bg-[#0B192C] text-[#60A5FA] border border-[#3B82F6] text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-110"
              >
                <Info className="w-4 h-4" /> Info Toast (Blue)
              </button>

              <button
                type="button"
                onClick={showActionToast}
                className="btn-secondary text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-[var(--color-primary)]" /> Action Toast with Undo
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action Footer Summary */}
        <section className="theme-card p-6 bg-gradient-to-br from-[var(--color-surface-hover)] to-[var(--color-bg-alt)] border border-[var(--color-primary)]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)]" /> Centralized Theme Setup Complete
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              All typography, colors, scrollbars, form components, and Sonner toasts are ready in <code className="text-[var(--color-primary)]">globals.css</code>.
            </p>
          </div>
          <Link href="/" className="btn-primary text-xs py-2.5 px-5 shrink-0">
            ← Back to Home Page
          </Link>
        </section>
      </main>
    </div>
  );
}

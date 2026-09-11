"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Search, X } from "lucide-react";
import { fetchArtists } from "@/services/api";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";

const PAGE_SIZE = 8;

export default function SupportedIdolsSection() {
  const { toggleFollow, isFollowing } = useAuth();
  const [artists, setArtists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);

  // Search state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchLoading, setSearchLoading] = React.useState(false);
  const debounceRef = React.useRef(null);

  // Initial load of first page
  React.useEffect(() => {
    loadArtists("", true);
  }, []);

  // Debounced search: re-fetch from API when query changes
  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadArtists(searchQuery, true);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [searchQuery]);

  async function loadArtists(query = "", reset = false) {
    try {
      if (reset) {
        query ? setSearchLoading(true) : setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const offset = reset ? 0 : artists.length;
      const response = await fetchArtists({
        limit: PAGE_SIZE,
        offset,
        search: query || undefined,
      });

      if (response.data) {
        setArtists(reset ? response.data : (prev) => [...prev, ...response.data]);
        setHasMore(Boolean(response.pagination?.hasMore));
        setTotalCount(response.pagination?.total || response.data.length);
      }
    } catch (err) {
      console.error("Failed to load artists from backend API:", err);
    } finally {
      setLoading(false);
      setSearchLoading(false);
      setLoadingMore(false);
    }
  }

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    loadArtists(searchQuery, false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <section id="supported-idols" className="relative py-16 sm:py-24 bg-transparent text-slate-900 overflow-hidden">
      <div className="max-w-screen-xl px-6 mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-slate-500">
            200+ ARTISTS AND COUNTING
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-slate-900">
            Your favorite idols, supported
          </h2>
          <p className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed text-slate-500 mb-8">
            From the biggest groups to rising soloists. If they post, we track it.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search BTS, BLACKPINK, SEVENTEEN..."
              className="w-full rounded-2xl text-sm font-medium transition-all focus:outline-none"
              style={{
                backgroundColor: "#ffffff",
                color: "#0f172a",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                paddingLeft: "2.75rem",
                paddingRight: "2.5rem",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#94a3b8";
                e.target.style.boxShadow = "0 0 0 3px rgba(148,163,184,0.18)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "0 1px 4px rgba(0,0,0,0.07)";
              }}
            />
            {isSearching && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-3 flex items-center px-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Idol Cards Grid */}
        {loading ? (
          <Loader text="Loading supported idols from API..." size="md" className="py-16" />
        ) : searchLoading ? (
          <Loader text={`Searching for "${searchQuery}"...`} size="md" className="py-16" />
        ) : artists.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-500 font-medium text-sm">
              No idols found for <span className="font-bold text-slate-900">"{searchQuery}"</span>
            </p>
            <button
              onClick={handleClearSearch}
              className="mt-4 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {artists.map((artist, idx) => {
                const name = artist.name;
                const followerCount = artist.followerCount || "0";
                const groupName = artist.groupName;
                const type = artist.type || "GROUP";
                const followed = isFollowing(artist.id);

                const subtitle = groupName
                  ? `${groupName} • ${followerCount} followers`
                  : `${type === "GROUP" ? "Group" : "Soloist"} • ${followerCount} followers`;

                const avatarUrl = artist.avatar;

                return (
                  <motion.div
                    key={artist.id || artist.slug || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25 }}
                    className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm bg-slate-800 border border-slate-200/60 hover:shadow-md transition-all"
                  >
                    {/* Idol Image directly from Backend API */}
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Dark Gradient Overlay for High Contrast Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                    {/* Top Right Follow Button */}
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollow(artist.id, name);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                          followed
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "bg-white/90 backdrop-blur-md text-slate-900 hover:bg-white"
                        }`}
                      >
                        {followed ? (
                          <><Check className="w-3.5 h-3.5" strokeWidth={2.5} /> Following</>
                        ) : (
                          <><Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Follow</>
                        )}
                      </button>
                    </div>

                    {/* Text Label at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug truncate">
                        {name}
                      </h3>
                      <p className="text-xs text-white/80 font-normal mt-0.5 truncate">
                        {subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}

        {/* Load More Button */}
        {!loading && !searchLoading && artists.length > 0 && (
          <div className="text-center mt-10">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm sm:text-base hover:bg-slate-800 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {loadingMore ? (
                  <span>Loading next page...</span>
                ) : (
                  <>
                    <span>Load More Idols</span>
                    {totalCount > artists.length && (
                      <span className="text-xs bg-slate-700 px-2.5 py-0.5 rounded-full text-slate-200 font-medium">
                        +{Math.min(PAGE_SIZE, totalCount - artists.length)} more
                      </span>
                    )}
                  </>
                )}
              </button>
            ) : (
              <p className="text-sm font-semibold text-slate-400">
                {isSearching
                  ? `Found ${artists.length} idol${artists.length !== 1 ? "s" : ""} matching "${searchQuery}"`
                  : `Showing all ${totalCount || artists.length} idols & groups`}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

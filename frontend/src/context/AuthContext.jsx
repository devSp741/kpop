"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { getAuthToken, getCurrentUserProfile, loginUser as apiLogin, registerUser as apiRegister, logoutUser as apiLogout, toggleFollowArtist as apiToggleFollow } from "@/services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [followingIds, setFollowingIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login"); // 'login' | 'register'

  // Load user session on initial load
  useEffect(() => {
    async function loadUserSession() {
      const storedToken = getAuthToken();
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await getCurrentUserProfile();
          if (response.data) {
            setUser(response.data);
            // If user profile contains followed artist IDs, sync set
            if (response.data.followedArtistIds) {
              setFollowingIds(new Set(response.data.followedArtistIds));
            }
          }
        } catch (err) {
          console.error("Failed to verify token session:", err);
          apiLogout();
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadUserSession();
  }, []);

  const openLoginModal = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      setIsAuthModalOpen(false);
      // Reload profile to fetch follow status
      const profile = await getCurrentUserProfile();
      if (profile.data && profile.data.followedArtistIds) {
        setFollowingIds(new Set(profile.data.followedArtistIds));
      }
    }
    return res;
  };

  const register = async (credentials) => {
    const res = await apiRegister(credentials);
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      setIsAuthModalOpen(false);
    }
    return res;
  };

  const logout = () => {
    apiLogout();
    setToken(null);
    setUser(null);
    setFollowingIds(new Set());
  };

  // Toggle follow an artist with auth check
  const toggleFollow = async (artistId, artistName = "Artist") => {
    if (!token) {
      openLoginModal();
      return false;
    }

    try {
      // Optimistic UI update
      setFollowingIds((prev) => {
        const next = new Set(prev);
        if (next.has(artistId)) {
          next.delete(artistId);
        } else {
          next.add(artistId);
        }
        return next;
      });

      const res = await apiToggleFollow(artistId);
      if (res.data) {
        setFollowingIds((prev) => {
          const next = new Set(prev);
          if (res.data.isFollowed) {
            next.add(artistId);
          } else {
            next.delete(artistId);
          }
          return next;
        });

        if (res.data.isFollowed) {
          if (res.data.latestNotification) {
            toast.success(`Live Radar Alert: Followed ${artistName}!`, {
              description: `Latest Sync: ${res.data.latestNotification.summaryTitle}`,
            });
          } else {
            toast.success(`Followed ${artistName}!`, {
              description: `Real-time updates synced to your custom feed.`,
            });
          }
        } else {
          toast.info(`Unfollowed ${artistName}`, {
            description: `Removed from your bias radar feed.`,
          });
        }
      }
      return true;
    } catch (err) {
      console.error("Failed to toggle follow artist:", err);
      toast.error("Failed to update follow status. Please try again.");
      return false;
    }
  };

  const isFollowing = (artistId) => followingIds.has(artistId);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        followingIds,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
        login,
        register,
        logout,
        toggleFollow,
        isFollowing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

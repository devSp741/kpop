/**
 * KPOP Radar - Clean & Secure API Client Service
 * Connects Frontend UI with Express Backend API (http://localhost:5000/api)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Token Storage Keys
 */
const TOKEN_KEY = 'kpop_radar_token';

/**
 * Get JWT token securely from localStorage
 */
export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

/**
 * Remove token on logout
 */
export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Centralized API Fetch Request Handler
 * @param {string} endpoint - API path (e.g. '/artists')
 * @param {Object} options - Fetch options (method, body, headers)
 * @param {boolean} requiresAuth - Whether API strictly requires JWT Authorization Header
 */
async function request(endpoint, options = {}, requiresAuth = false) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Get token if available
  const token = getAuthToken();

  // If endpoint strictly requires Auth and token is missing, throw immediate error
  if (requiresAuth && !token) {
    throw new Error('Authentication required. Please login.');
  }

  // Attach Authorization Bearer Token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 404) {
        logoutUser();
      }
      throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    if (endpoint !== '/auth/me') {
      console.error(`API Error [${endpoint}]:`, error.message);
    }
    throw error;
  }
}

// ============================================================================
// 1. PUBLIC APIS (No Token Required)
// ============================================================================

/**
 * Fetch list of Top Groups & Idols
 * Endpoint: GET /api/artists
 */
export async function fetchArtists(params = {}) {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  if (params.search) query.append('search', params.search);
  if (params.limit !== undefined && params.limit !== null) query.append('limit', params.limit);
  if (params.offset !== undefined && params.offset !== null) query.append('offset', params.offset);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return request(`/artists${queryString}`, { method: 'GET' }, false);
}

/**
 * Fetch 6-Platform Activity Feed (YouTube, Instagram, TikTok, Spotify, Weverse, X)
 * Endpoint: GET /api/feed
 */
export async function fetchActivityFeed(params = {}) {
  const query = new URLSearchParams();
  if (params.platform && params.platform !== 'all') {
    query.append('platform', params.platform);
  }
  if (params.artistId) query.append('artistId', params.artistId);
  if (params.limit) query.append('limit', params.limit);
  if (params.page) query.append('page', params.page);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return request(`/feed${queryString}`, { method: 'GET' }, false);
}

/**
 * Fetch Activity Feed for followed idols only
 * Endpoint: GET /api/feed?followedOnly=true
 */
export async function fetchFollowingFeed(params = {}) {
  const query = new URLSearchParams();
  query.append('followedOnly', 'true');
  if (params.platform && params.platform !== 'all') {
    query.append('platform', params.platform);
  }
  if (params.artistId) query.append('artistId', params.artistId);
  if (params.limit) query.append('limit', params.limit);
  if (params.page) query.append('page', params.page);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return request(`/feed${queryString}`, { method: 'GET' }, true);
}

/**
 * Login user with email & password
 * Endpoint: POST /api/auth/login
 * Security: Saves ONLY the JWT Token in localStorage
 */
export async function loginUser(credentials) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }, false);

  if (data.token && typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  return data;
}

/**
 * Register new user account
 * Endpoint: POST /api/auth/register
 * Security: Saves ONLY the JWT Token in localStorage
 */
export async function registerUser(credentials) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }, false);

  if (data.token && typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  return data;
}

// ============================================================================
// 2. PROTECTED APIS (Strictly Requires JWT Token)
// ============================================================================

/**
 * Fetch current user profile info securely using stored JWT token
 * Endpoint: GET /api/auth/me
 */
export async function getCurrentUserProfile() {
  return request('/auth/me', { method: 'GET' }, true);
}

/**
 * Toggle follow/unfollow status for an idol
 * Endpoint: POST /api/artists/:artistId/follow
 */
export async function toggleFollowArtist(artistId) {
  return request(`/artists/${artistId}/follow`, {
    method: 'POST',
  }, true);
}

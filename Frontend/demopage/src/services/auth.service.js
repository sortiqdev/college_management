import API from "./api";

/**
 * Helper function to clear all cookies from the browser
 */
const clearAllCookies = () => {
  try {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

      if (name) {
        // Clear cookie with default path
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
        
        // Clear cookie with specific application path
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/demopage`;
        
        // Clear cookie with domain
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/demopage/;domain=${window.location.hostname}`;
      }
    }
  } catch (error) {
    console.error("Error clearing cookies:", error);
  }
};

/**
 * Authentication Service
 * Handles user authentication, token management, and session cleanup
 */
const authService = {
  /**
   * Logout user - Invalidates JWT token on backend and clears all frontend session data
   * @returns {Promise<boolean>} true if logout successful
   */
  logout: async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Call backend to invalidate token
      if (token) {
        try {
          await API.post(
            "logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.warn("Backend logout endpoint failed:", error.message);
          // Continue with frontend cleanup even if backend call fails
        }
      }

      // Clear all localStorage items
      localStorage.clear();

      // Clear all sessionStorage items
      sessionStorage.clear();

      // Clear all cookies
      clearAllCookies();

      return true;
    } catch (error) {
      console.error("Logout error:", error);
      
      // Still clear frontend data even if there's an error
      try {
        localStorage.clear();
        sessionStorage.clear();
        clearAllCookies();
      } catch (cleanupError) {
        console.error("Error during cleanup:", cleanupError);
      }
      
      return false;
    }
  },

  /**
   * Check if user is currently authenticated
   * @returns {boolean} true if user has valid token
   */
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token && token.trim().length > 0;
  },

  /**
   * Get stored JWT token from localStorage
   * @returns {string|null} JWT token or null if not found
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Get stored user data from localStorage
   * @returns {Object|null} User object or null if not found
   */
  getUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  /**
   * Get user role from localStorage
   * @returns {string|null} User role or null if not found
   */
  getRole: () => {
    return localStorage.getItem("role");
  },

  /**
   * Get user ID from localStorage
   * @returns {string|null} User ID or null if not found
   */
  getUserId: () => {
    return localStorage.getItem("userId");
  },

  /**
   * Store authentication data in localStorage
   * @param {string} token - JWT token
   * @param {Object} user - User object
   * @param {string} role - User role
   * @param {string} userId - User ID
   */
  setAuthData: (token, user, role, userId) => {
    try {
      if (token) localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (role) localStorage.setItem("role", role);
      if (userId) localStorage.setItem("userId", userId);
    } catch (error) {
      console.error("Error storing auth data:", error);
    }
  },

  /**
   * Clear only auth-related data (keep other localStorage items)
   */
  clearAuthData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  },
};

export default authService;

// Import centralized axios instance
import apiClient from './apiClient';

/**
 * Get the stored authentication token from localStorage
 */
const getToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Store authentication token in localStorage
 */
const setToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

/**
 * Get stored user data from localStorage
 */
const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Store user data in localStorage
 */
const setUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

/**
 * Clear all authentication data from localStorage
 */
const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

/**
 * Make an authenticated API request using axios
 * This function wraps axios calls and maintains compatibility with existing code
 * The apiClient instance handles baseURL, headers, and interceptors automatically
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    // Extract method and data from options
    const method = options.method || 'GET';
    let data = options.data;
    
    // Handle legacy 'body' option (for backward compatibility)
    if (options.body && !data) {
      data = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
    }
    
    // Build request config - exclude 'body' and 'method' from options spread
    const { body, ...restOptions } = options;
    
    // Use axios instance which handles baseURL, auth headers, and error handling
    // apiClient.request() is the standard way to make requests with axios instances
    const response = await apiClient.request({
      url: endpoint,
      method: method,
      data: data,
      ...restOptions, // Spread other options (headers, params, etc.) but not 'body'
    });

    // Axios automatically parses JSON responses
    // Return data property which contains the response body
    return response.data;
  } catch (error) {
    // Error handling is done in apiClient interceptor
    // Re-throw to maintain existing error handling flow
    throw error;
  }
};

/**
 * Login with email and password
 * Uses axios via apiClient for API requests
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data and token
 */
export const login = async (email, password) => {
  try {
    // Use axios - apiClient handles baseURL and JSON serialization automatically
    // Note: Django URLs require trailing slashes
    const data = await apiRequest('/login/', {
      method: 'POST',
      data: { email, password }, // axios uses 'data' instead of 'body'
    });

    if (data.token) {
      setToken(data.token);
    }

    if (data.user) {
      setUser(data.user);
    } else if (data.email || data.id) {
      setUser({ email: data.email || email, ...data });
    }

    return data;
  } catch (error) {
    clearAuth();
    throw error;
  }
};

/**
 * Logout the current user
 * Uses axios via apiClient for API requests
 * @returns {Promise<Object>} - Logout response
 */
export const logout = async () => {
  try {
    const token = getToken();
    
    if (token) {
      // Use axios - apiClient handles authentication headers automatically
      // Note: Django URLs require trailing slashes
      await apiRequest('/logout/', {
        method: 'POST',
      });
    }
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    clearAuth();
  }
};

/**
 * Get current user information
 * Uses axios via apiClient for API requests
 * @returns {Promise<Object>} - Current user data
 */
export const getMe = async () => {
  try {
    // Use axios - apiClient handles authentication headers automatically
    // Note: Django URLs require trailing slashes
    const data = await apiRequest('/me/', {
      method: 'GET',
    });

    if (data.user) {
      setUser(data.user);
    } else if (data.email || data.id) {
      setUser({ ...data });
    }

    return data;
  } catch (error) {
    if (error.status === 401) {
      clearAuth();
    }
    throw error;
  }
};

/**
 * Check if user is authenticated (has token)
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  return getUser();
};


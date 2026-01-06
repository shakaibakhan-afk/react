const API_BASE_URL = 'http://localhost:5000';

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
 * Make an authenticated API request
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  let data;
  
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data and token
 */
export const login = async (email, password) => {
  try {
    const data = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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
 * @returns {Promise<Object>} - Logout response
 */
export const logout = async () => {
  try {
    const token = getToken();
    
    if (token) {
      await apiRequest('/logout', {
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
 * @returns {Promise<Object>} - Current user data
 */
export const getMe = async () => {
  try {
    const data = await apiRequest('/me', {
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


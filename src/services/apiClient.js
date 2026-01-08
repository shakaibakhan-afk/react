import axios from 'axios';

/**
 * Centralized Axios instance for API requests
 * 
 * This instance is configured with:
 * - Base URL from environment variables (VITE_API_URL)
 * - Default headers for JSON content
 * - Request interceptor to add authentication token
 * - Response interceptor for error handling and logging
 */

// Get base URL from environment variable
// Vite uses VITE_ prefix for environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Create axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request interceptor: Add authentication token to requests
 * Automatically attaches Bearer token from localStorage if available
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging (only in development)
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error) => {
    // Log request error
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor: Handle responses and errors globally
 * Provides consistent error handling and logging
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log successful response for debugging (only in development)
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Handle axios errors
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const { status, data } = error.response;
      
      // Log error response for debugging
      console.error(`[API Error Response] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status,
        data,
      });
      
      // Create error object with status and data for consistent error handling
      const apiError = new Error(data?.message || data?.error || `HTTP error! status: ${status}`);
      apiError.status = status;
      apiError.data = data;
      apiError.response = error.response;
      
      return Promise.reject(apiError);
    } else if (error.request) {
      // Request was made but no response received (network error)
      console.error('[API Network Error]', {
        url: error.config?.url,
        message: 'No response received from server',
      });
      
      const networkError = new Error('Network error: Unable to reach server. Please check your connection.');
      networkError.status = 0;
      networkError.data = { message: 'Network error' };
      
      return Promise.reject(networkError);
    } else {
      // Error setting up the request
      console.error('[API Request Setup Error]', error.message);
      
      const setupError = new Error(error.message || 'Request setup error');
      setupError.status = 0;
      setupError.data = { message: error.message };
      
      return Promise.reject(setupError);
    }
  }
);

export default apiClient;







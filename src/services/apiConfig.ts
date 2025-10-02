export const API_CONFIG = {
  // Update this to match your Django backend URL
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    AUTH: {
      SIGNUP: '/auth/signup/',
      LOGIN: '/auth/login/',
      LOGOUT: '/auth/logout/',
      FORGOT_PASSWORD: '/auth/forgot-password/',
      VERIFY_OTP: '/auth/verify-otp/',
      RESEND_OTP: '/auth/resend-otp/',
      RESET_PASSWORD: '/auth/reset-password/',
      REFRESH_TOKEN: '/auth/refresh/',
      PROFILE: '/auth/profile/',
    },
    USERS: {
      PROFILE_DETAIL: '/users/profile/',
      PROFILE_UPDATE: '/users/profile/update/',
      CHANGE_PASSWORD: '/users/change-password/',
      SETTINGS: '/users/settings/',
    },
    HEALTH: '/health/',
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Request timeout configuration
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Authentication token storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'pefoma_access_token',
  REFRESH_TOKEN: 'pefoma_refresh_token',
  USER_DATA: 'pefoma_user_data',
};

export default API_CONFIG;
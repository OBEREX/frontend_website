// src/services/authService.ts

import httpClient from './httpClient';
import { API_CONFIG, STORAGE_KEYS } from './apiConfig';
import { OTP_TYPES, OTPType } from '../constants/otpTypes';

// Types matching your Django backend
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  city: string;
  state: string;
  isVerified: boolean;
  accountTier: string;
  avatarUrl?: string;
  theme: string;
  language: string;
  timezone: string;
  lastLogin?: string;
  createdAt: string;
  queriesRemainingToday: number;
  dailyQueryLimit: number;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  state: string;
  city: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  session?: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
  };
  errors?: Record<string, string[]>;
}

export interface OTPVerificationResponse {
  success: boolean;
  message: string;
  token?: string; // For password reset flow
  errors?: Record<string, string[]>;
}

export interface LoginResponse extends AuthResponse {
  requiresVerification?: boolean;  // New field
}


class AuthService {
  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.SIGNUP,
        {
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          company: userData.company,
          business_type: userData.businessType,
          state: userData.state,
          city: userData.city,
          password: userData.password,
          confirm_password: userData.password, // Your backend expects this
        },
        false // Don't include auth header for signup
      );

      if (response.success && response.user) {
        // Transform backend response to frontend format
        const user: User = this.transformUserData(response.user);
        
        
        return {
          success: true,
          message: response.message || 'Registration successful',
          user,
        };
      }

      return {
        success: false,
        message: response.message || 'Registration failed',
        errors: response.errors,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  }

  

async login(email: string, password: string, rememberMe: boolean = false): Promise<LoginResponse> {
  try {
    const response = await httpClient.post(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      {
        email,
        password,
        remember_me: rememberMe,
      },
      false
    );
    console.log('Login API raw response:', response);

    // ✅ Check for EMAIL_NOT_CONFIRMED error FIRST (before checking success)
    if (response.error === 'EMAIL_NOT_CONFIRMED') {
      console.log('Email not confirmed, setting requiresVerification flag');
      return {
        success: false,
        message: response.message || 'Please verify your email before signing in',
        requiresVerification: true,  // ⭐ This triggers OTP flow
        errors: response.errors,
      };
    }

    // Then check for successful login
    if (response.success && response.user && response.session) {
      console.log('Login successful');
      const user: User = this.transformUserData(response.user);
      const tokens = {
        accessToken: response.session.access_token,
        refreshToken: response.session.refresh_token,
        expiresIn: response.session.expires_in,
      };

      this.storeAuthData(user, tokens);

      return {
        success: true,
        message: response.message || 'Login successful',
        user,
        session: response.session,
      };
    }

    // Handle other errors (invalid credentials, etc.)
    console.log('Login failed:', response.message);
    return {
      success: false,
      message: response.message || 'Login failed',
      errors: response.errors,
    };
  } catch (error) {
    console.error('Login error:', error);
    
    // Check if error response contains EMAIL_NOT_CONFIRMED
    if (error instanceof Error && error.message.includes('EMAIL_NOT_CONFIRMED')) {
      return {
        success: false,
        message: 'Please verify your email before signing in',
        requiresVerification: true,
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed. Please try again.',
    };
  }
}


private storeAuthData(user: User, tokens: any): void {
  this.storeTokens(tokens);
  this.storeUserData(user);
}

  //Method to resend registration verification OTP
  async resendRegistrationVerificationOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP,
        {
          email,
          type: 'registration',  // Using 'registration' type
        },
        false
      );

      return {
        success: response.success,
        message: response.message || (response.success ? 'Verification code sent' : 'Failed to send code'),
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send verification code',
      };
    }
  }


  // Get user profile
  async getUserProfile(): Promise<{ success: boolean; user?: User; message?: string }> {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
      
      if (response.success && response.user) {
        const user = this.transformUserData(response.user);
        this.storeUserData(user);
        
        return {
          success: true,
          user,
        };
      }

      return {
        success: false,
        message: response.message || 'Failed to fetch profile',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch profile',
      };
    }
  }

  async sendPasswordResetOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email },
        false
      );

      return {
        success: response.success,
        message: response.message || (response.success ? 'Reset code sent to your email' : 'Failed to send reset code'),
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send reset code',
      };
    }
  }

  // Verify password reset OTP - UPDATED
  async verifyPasswordResetOTP(email: string, token: string): Promise<OTPVerificationResponse> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP,
        {
          token,
          email,
          type: OTP_TYPES.PASSWORD_RESET, // Using constant
        },
        false
      );

      return {
        success: response.success,
        message: response.message || (response.success ? 'Code verified' : 'Invalid code'),
        token: response.token,
        errors: response.errors,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Verification failed',
      };
    }
  }

  // Resend OTP - UPDATED with type parameter
  async resendOTP(
    email: string, 
    type: OTPType = OTP_TYPES.PASSWORD_RESET
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP,
        { 
          email, 
          type  // Send the type parameter
        },
        false
      );

      return {
        success: response.success,
        message: response.message || (response.success ? 'Code resent' : 'Failed to resend code'),
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to resend code',
      };
    }
  }

  // NEW: Resend registration OTP
  async resendRegistrationOTP(email: string): Promise<{ success: boolean; message: string }> {
    return this.resendOTP(email, OTP_TYPES.REGISTRATION);
  }

  // NEW: Resend email verification OTP
  async resendEmailVerificationOTP(email: string): Promise<{ success: boolean; message: string }> {
    return this.resendOTP(email, OTP_TYPES.EMAIL_VERIFICATION);
  }

  // NEW: Verify registration OTP
  async verifyRegistrationOTP(email: string, token: string): Promise<OTPVerificationResponse> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP,
        {
          token,
          email,
          type: OTP_TYPES.REGISTRATION,
        },
        false
      );

      return {
        success: response.success,
        message: response.message || (response.success ? 'Registration verified' : 'Invalid code'),
        token: response.token,
        errors: response.errors,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Verification failed',
      };
    }
  }

  // Verify reset token (for reset password page)
  async verifyResetToken(token: string): Promise<{ valid: boolean; message?: string }> {
    try {
      // You might need to add this endpoint to your backend
      const response = await httpClient.post(
        '/auth/verify-reset-token/', // Add this endpoint to your Django backend
        { token },
        false
      );

      return {
        valid: response.success,
        message: response.message,
      };
    } catch (error) {
      return {
        valid: false,
        message: 'Invalid or expired token',
      };
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD,
        {
          access_token: token,
          password: newPassword,
          confirm_password: newPassword,
        },
        false
      );

      return {
        success: response.success,
        message: response.message || (response.success ? 'Password reset successful' : 'Password reset failed'),
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Password reset failed',
      };
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await httpClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return !!(token && userData);
  }

  // Get current user from storage
  getCurrentUser(): User | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  // Helper methods
  private transformUserData(backendUser: any): User {
    return {
      id: backendUser.id,
      firstName: backendUser.first_name,
      lastName: backendUser.last_name,
      fullName: backendUser.full_name || `${backendUser.first_name} ${backendUser.last_name}`,
      email: backendUser.email,
      phone: backendUser.phone,
      company: backendUser.company,
      businessType: backendUser.business_type,
      city: backendUser.city,
      state: backendUser.state,
      isVerified: backendUser.is_verified,
      accountTier: backendUser.account_tier,
      avatarUrl: backendUser.avatar_url,
      theme: backendUser.theme,
      language: backendUser.language,
      timezone: backendUser.timezone,
      lastLogin: backendUser.last_login,
      createdAt: backendUser.created_at,
      queriesRemainingToday: backendUser.queries_remaining_today,
      dailyQueryLimit: backendUser.daily_query_limit,
    };
  }

  private storeTokens(tokens: any): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
  }

  private storeUserData(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  }

  private clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }
}

export const authService = new AuthService();
export default authService;
import { API_CONFIG, REQUEST_TIMEOUT, STORAGE_KEYS } from './apiConfig';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultHeaders = API_CONFIG.HEADERS;
  }

  // Get stored access token
  private getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Get stored refresh token
  private getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // Store tokens
  private storeTokens(tokens: AuthTokens): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
  }

  // Clear stored tokens
  private clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // Build headers with authentication
  private buildHeaders(includeAuth: boolean = true): Record<string, string> {
    const headers = { ...this.defaultHeaders };
    
    if (includeAuth) {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    
    return headers;
  }

  // Handle token refresh
  private async refreshTokens(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await this.request(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
        {
          method: 'POST',
          body: { refresh_token: refreshToken },
          includeAuth: false,
        }
      );

      if (response.success && response.session) {
        this.storeTokens(response.session);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  // Main request method
  async request<T = any>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      body?: any;
      headers?: Record<string, string>;
      includeAuth?: boolean;
      timeout?: number;
    } = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      body,
      headers: customHeaders = {},
      includeAuth = true,
      timeout = REQUEST_TIMEOUT,
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      ...this.buildHeaders(includeAuth),
      ...customHeaders,
    };

    const config: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(timeout),
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && includeAuth) {
        const refreshSuccess = await this.refreshTokens();
        if (refreshSuccess) {
          // Retry the original request with new token
          const newHeaders = {
            ...this.buildHeaders(true),
            ...customHeaders,
          };
          const retryResponse = await fetch(url, {
            ...config,
            headers: newHeaders,
          });
          return await this.handleResponse(retryResponse);
        } else {
          // Refresh failed, clear tokens and redirect to login
          this.clearTokens();
          window.location.href = '/login';
          throw new Error('Authentication failed');
        }
      }

      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Network request failed');
    }
  }

  // Handle response parsing
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Handle different error response formats
      if (typeof data === 'object' && data.errors) {
        return {
          success: false,
          message: data.message || 'Request failed',
          errors: data.errors,
        };
      }
      
      return {
        success: false,
        message: data.message || data || `HTTP Error: ${response.status}`,
      };
    }

    // Handle successful responses
    return {
      success: true,
      ...data,
    };
  }

  // Convenience methods
  async get<T = any>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', includeAuth });
  }

  async post<T = any>(endpoint: string, body?: any, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, includeAuth });
  }

  async put<T = any>(endpoint: string, body?: any, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, includeAuth });
  }

  async patch<T = any>(endpoint: string, body?: any, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body, includeAuth });
  }

  async delete<T = any>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', includeAuth });
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();
export default httpClient;
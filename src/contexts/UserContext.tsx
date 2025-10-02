// src/contexts/UserContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/authService';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user data on app start
  useEffect(() => {
    const initializeUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Try to get user from storage first
          const storedUser = authService.getCurrentUser();
          if (storedUser) {
            setUser(storedUser);
          }

          // Then refresh from server to ensure data is current
          const profileResponse = await authService.getUserProfile();
          if (profileResponse.success && profileResponse.user) {
            setUser(profileResponse.user);
          } else if (!storedUser) {
            // If no stored user and server request failed, user is not authenticated
            await authService.logout();
          }
        }
      } catch (error) {
        console.error('Failed to initialize user:', error);
        await authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      // Redirect will be handled by the auth service or route guards
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      // Update stored user data
      localStorage.setItem('pefoma_user_data', JSON.stringify(updatedUser));
    }
  };

  const refreshUser = async () => {
    if (!authService.isAuthenticated()) {
      return;
    }

    try {
      const profileResponse = await authService.getUserProfile();
      if (profileResponse.success && profileResponse.user) {
        setUser(profileResponse.user);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && authService.isAuthenticated(),
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
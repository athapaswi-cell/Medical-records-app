'use client';

import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, User, RegisterData, authStorage, createDemoUsers } from '@/lib/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize demo users and check for existing authentication
    const initializeAuth = () => {
      createDemoUsers();
      const currentUser = authStorage.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authenticatedUser = authStorage.validateLogin(email, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        authStorage.setCurrentUser(authenticatedUser);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const result = authStorage.registerUser(userData);
      if (result.success && result.user) {
        setUser(result.user);
        authStorage.setCurrentUser(result.user);
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    authStorage.setCurrentUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
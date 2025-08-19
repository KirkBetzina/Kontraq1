import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole }>;
  signup: (name: string, email: string, password: string, role: UserRole, phone?: string) => Promise<boolean>;
  logout: () => void;
  getTrialInfo: (userId: string) => { trialStartDate: Date; trialEndDate: Date; isTrialActive: boolean; daysRemaining: number };
  updatePaymentStatus: (userId: string, status: 'pending' | 'active' | 'expired') => void;
  getPaymentStatus: (userId: string) => 'pending' | 'active' | 'expired';
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  userRole: null,
  login: async () => ({ success: false }),
  signup: async () => false,
  logout: () => {},
  getTrialInfo: () => ({ trialStartDate: new Date(), trialEndDate: new Date(), isTrialActive: false, daysRemaining: 0 }),
  updatePaymentStatus: () => {},
  getPaymentStatus: () => 'pending'
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

// Mock user storage with trial info and payment status
const mockUsers: Record<string, User & { password: string; trialStartDate: Date; trialEndDate: Date; paymentStatus: 'pending' | 'active' | 'expired' }> = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // For demo purposes, create an admin user if none exists
  useEffect(() => {
    if (!mockUsers['admin@example.com']) {
      const now = new Date();
      mockUsers['admin@example.com'] = {
        id: 'admin-id',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        trialStartDate: now,
        trialEndDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        paymentStatus: 'active'
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; role?: UserRole }> => {
    const mockUser = mockUsers[email];
    
    if (mockUser && mockUser.password === password) {
      const { password: _, trialStartDate, trialEndDate, paymentStatus, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      return { success: true, role: mockUser.role };
    }
    
    return { success: false };
  };

  const signup = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole,
    phone?: string
  ): Promise<boolean> => {
    if (mockUsers[email]) {
      return false;
    }
    
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role,
      phone,
      trialStartDate: now,
      trialEndDate: trialEnd,
      paymentStatus: 'pending' as const
    };
    
    mockUsers[email] = newUser;
    
    const { password: _, trialStartDate, trialEndDate, paymentStatus, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    
    return true;
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const getTrialInfo = (userId: string) => {
    const userEntry = Object.values(mockUsers).find(u => u.id === userId);
    if (!userEntry) {
      const now = new Date();
      return {
        trialStartDate: now,
        trialEndDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        isTrialActive: true,
        daysRemaining: 14
      };
    }
    
    const now = new Date();
    const diffTime = userEntry.trialEndDate.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    return {
      trialStartDate: userEntry.trialStartDate,
      trialEndDate: userEntry.trialEndDate,
      isTrialActive: daysRemaining > 0,
      daysRemaining
    };
  };

  const updatePaymentStatus = (userId: string, status: 'pending' | 'active' | 'expired') => {
    const userEntry = Object.values(mockUsers).find(u => u.id === userId);
    if (userEntry) {
      userEntry.paymentStatus = status;
    }
  };

  const getPaymentStatus = (userId: string): 'pending' | 'active' | 'expired' => {
    const userEntry = Object.values(mockUsers).find(u => u.id === userId);
    return userEntry?.paymentStatus || 'pending';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userRole: user?.role || null,
        login,
        signup,
        logout,
        getTrialInfo,
        updatePaymentStatus,
        getPaymentStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
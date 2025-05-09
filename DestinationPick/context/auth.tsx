import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

type User = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextData = {
  user: User;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// For demonstration purposes - would be replaced with actual API call
const mockUsers = [
  { id: '1', email: 'user@example.com', password: 'password123', name: 'Test User' },
  { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is already logged in
    async function loadUserFromStorage() {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      } finally {
        setLoading(false);
      }
    }
    
    loadUserFromStorage();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your API here
      // This is a mock implementation for demonstration
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const foundUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = foundUser;
        await SecureStore.setItemAsync('user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (e) {
      setError('An error occurred during login');
      console.error(e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
      router.replace('/login');
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

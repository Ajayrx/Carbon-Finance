import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  carbonBalance: number;
  updateCarbonBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [carbonBalance, setCarbonBalance] = useState(0);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const savedBalance = localStorage.getItem('carbonBalance');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedBalance) {
      setCarbonBalance(parseInt(savedBalance));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0]
    };
    
    setUser(mockUser);
    setCarbonBalance(42); // Mock initial balance
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('carbonBalance', '42');
    
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      email,
      name
    };
    
    setUser(mockUser);
    setCarbonBalance(0);
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('carbonBalance', '0');
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setCarbonBalance(0);
    localStorage.removeItem('user');
    localStorage.removeItem('carbonBalance');
    // Also clear official session if exists
    localStorage.removeItem('officialUser');
  };

  const updateCarbonBalance = (newBalance: number) => {
    setCarbonBalance(newBalance);
    localStorage.setItem('carbonBalance', newBalance.toString());
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      carbonBalance,
      updateCarbonBalance
    }}>
      {children}
    </AuthContext.Provider>
  );
};
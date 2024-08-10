import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
  username: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  const login = (username: string, token: string) => {
    setUsername(username);
    localStorage.setItem('token', token); // Simple example; in production, handle tokens securely
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

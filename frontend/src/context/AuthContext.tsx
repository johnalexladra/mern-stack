import React, { createContext, ReactNode, useState } from 'react';

// Define the context type
interface AuthContextType {
  username: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  // Define login method
  const login = (username: string, token: string) => {
    setUsername(username);
    localStorage.setItem('token', token); // Example: handle tokens securely in production
  };

  // Define logout method
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

// Export the AuthContext
export { AuthContext };

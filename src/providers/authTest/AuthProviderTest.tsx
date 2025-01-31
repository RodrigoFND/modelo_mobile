import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  roles: string[];
  login: (roles: string[]) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  const login = (userRoles: string[]) => {
    setIsAuthenticated(true);
    setRoles(userRoles);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

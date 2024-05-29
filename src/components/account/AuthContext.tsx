import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'user' | 'admin' | null;
}

interface AuthContextType {
  user: User;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ username: '', role: null });

  const login = (username: string, password: string) => {
    // Тут може бути запит до сервера для перевірки користувача
    const role = username === 'admin' ? 'admin' : 'user';
    setUser({ username, role });
  };

  const logout = () => {
    setUser({ username: '', role: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
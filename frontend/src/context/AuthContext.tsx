import React, { useState, useContext } from 'react';
import { AuthInfo, Role } from '../types/globalTypes';

export type AuthContextType = {
  setAuth: (info: AuthInfo | undefined) => void;
  auth?: AuthInfo;
};

const AuthContext = React.createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthInfo | undefined>({
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg0ODA1NDY1LCJleHAiOjE1ODQ4NDE0NjV9.O6qQ6ZE3zewK71p1KcZ_-lhMqebxQOiyNe1IpxqUbDY',
    user: {
      displayName: 'admin',
      username: 'admin',
      id: 'c3434f6e-81d8-4f5d-a9c5-e6dcbce7dfa4',
      role: 'admin' as Role,
    },
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuthInfo = () => useContext(AuthContext);
export const useCurrentUser = () => useAuthInfo()?.auth?.user;

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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg0ODEyMzcyLCJleHAiOjE1ODQ4NDgzNzJ9.4taCLCNe84voRbceOtuHLjP1qt21N3pSDahV_rcu4x8',
    user: {
      displayName: 'admin',
      username: 'admin',
      id: '99742908-7791-4b1f-9ecc-a2e57268f0bc',
      role: 'admin' as Role,
    },
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuthInfo = () => useContext(AuthContext);
export const useCurrentUser = () => useAuthInfo()?.auth?.user;

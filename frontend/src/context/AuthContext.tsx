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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg0ODI0MjgxLCJleHAiOjE1ODQ4NjAyODF9.UIBopKs9EdOQhkP7y2kS2txO_mM3oUmxvfg1ppG3qow',
    user: {
      displayName: 'admin',
      username: 'admin',
      id: 'f22c9f8f-cb83-4ab1-a950-48a7987c4847',
      role: 'admin' as Role,
    },
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuthInfo = () => useContext(AuthContext);
export const useCurrentUser = () => useAuthInfo()?.auth?.user;

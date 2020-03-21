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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg0ODEwODE0LCJleHAiOjE1ODQ4NDY4MTR9.dz9yvRWZkntP8Ke7NH8VXeuKXgCfr6lwLE6Ug_9VcNU',
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

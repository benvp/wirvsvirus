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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg0ODIwMjUxLCJleHAiOjE1ODQ4NTYyNTF9.Mqo4k3BSpoER3U1I-JOv12AqpyIW7tvRZmWzCHYRnJ8',
    user: {
      displayName: 'admin',
      username: 'admin',
      id: '1f9d202a-3a1e-46a8-8532-22b6b7e352ca',
      role: 'admin' as Role,
    },
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuthInfo = () => useContext(AuthContext);
export const useCurrentUser = () => useAuthInfo()?.auth?.user;

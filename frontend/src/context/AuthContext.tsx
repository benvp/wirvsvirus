import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthInfo, Role } from '../types/globalTypes';

const AUTH_INFO_STORAGE_KEY = 'trimmdichzuhause-auth-info';

const restoreSession = (): AuthInfo | undefined => {
  const info = window.localStorage.getItem(AUTH_INFO_STORAGE_KEY);

  return info ? JSON.parse(info) : undefined;
};

export type AuthContextType = {
  setAuth: (info: AuthInfo | undefined) => void;
  logout: () => void;
  auth?: AuthInfo;
};

const AuthContext = React.createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthInfo | undefined>();

  useEffect(() => {
    if (auth) {
      window.localStorage.setItem(AUTH_INFO_STORAGE_KEY, JSON.stringify(auth));
    }
  }, [auth]);

  useEffect(() => {
    const info = restoreSession();
    setAuth(info);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_INFO_STORAGE_KEY);
    setAuth(undefined);
  }, [AUTH_INFO_STORAGE_KEY]);

  return <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthInfo = () => useContext(AuthContext);
export const useCurrentUser = () => useAuthInfo()?.auth?.user;

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthInfo } from '@@/context/AuthContext';
import { ROUTES } from '@@modules/routes';

export const requireAuth = <P extends object = {}>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = props => {
    const router = useRouter();
    const { auth, setAuth } = useAuthInfo();

    useEffect(() => {
      if (!auth?.accessToken) {
        setAuth(undefined);
      }
    }, [auth]);

    return auth?.accessToken ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

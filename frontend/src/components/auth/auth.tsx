import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthInfo } from '@@/context/AuthContext';
import { ROUTES } from '@@modules/routes';

export const requireAuth = <P extends object = {}>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = props => {
    const router = useRouter();
    const { auth } = useAuthInfo();

    useEffect(() => {
      if (!auth?.accessToken) {
        router.replace(ROUTES.LOGIN);
      }
    }, [auth]);

    return auth?.accessToken ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

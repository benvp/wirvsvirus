import { useAuthInfo } from '@@/context/AuthContext';

export const API_BASE_URL = 'http://localhost:3001';

const apiRoute = (r: string) => `${API_BASE_URL}${r}`;

export const API_ROUTES = {
  LOGIN: apiRoute('/auth/signin'),
  TRAININGS: apiRoute('/trainings'),
};

export const useFetch = () => {
  const auth = useAuthInfo();

  return (url: string, init?: RequestInit | undefined) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${auth.auth?.accessToken}`,
        'Content-Type': 'application/json',
      },
      ...init,
    });
};

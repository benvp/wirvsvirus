import { useAuthInfo } from '@@/context/AuthContext';
import { useRouter } from 'next/router';
import { ROUTES } from '@@modules/routes';

export const API_BASE_URL = 'http://localhost:3001';

const apiRoute = (r: string) => `${API_BASE_URL}${r}`;

export const apiRoutes = {
  login: apiRoute('/auth/signin'),
  signUp: apiRoute('/auth/register'),
  tags: apiRoute('/tags'),
  trainings: apiRoute('/trainings'),
  training: (id: number) => apiRoute(`/trainings/${id}`),
  trainingAttend: (id: number) => apiRoute(`/trainings/${id}/attend`),
  profilePictureUpload: apiRoute(`/users/picture`),
  profile: (id: string) => apiRoute(`/auth/user/${id}`),
};

export const useFetch = () => {
  const auth = useAuthInfo();
  const router = useRouter();

  return (url: string, init?: RequestInit | undefined) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${auth.auth?.accessToken}`,
        'Content-Type': 'application/json',
      },
      ...init,
    }).then(res => {
      if (res.status === 401) {
        auth.setAuth(undefined);
        router.replace(ROUTES.LOGIN);

        throw new Error('Unauthorized');
      }

      return res;
    });
};

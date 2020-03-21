export const API_BASE_URL = 'http://localhost:3001';

const apiRoute = (r: string) => `${API_BASE_URL}${r}`;

export const API_ROUTES = {
  LOGIN: apiRoute('/auth/signin'),
};

export const DYNAMIC_ROUTES = {
  TRAINING: '/trainings/[id]',
};

export const ROUTES = {
  ROOT: '/',
  PROJECT: '/project',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  TRAININGS: '/trainings',
  training: (id: number) => `/trainings/${id}`,
  TRAININGS_NEW: '/trainings/new',
};

export const PUBLIC_ROUTES = [ROUTES.ROOT, ROUTES.PROJECT];

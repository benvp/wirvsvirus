export const DYNAMIC_ROUTES = {
  TRAINING: '/trainings/[id]',
  USER_PROFILE: '/profile/[id]',
};

export const ROUTES = {
  ROOT: '/',
  PROJECT: '/project',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  TRAININGS: '/trainings',
  training: (id: number) => `/trainings/${id}`,
  TRAININGS_NEW: '/trainings/new',
  userProfile: (id: string) => `/profile/${id}`,
  IMPRINT: '/imprint',
};

export const PUBLIC_ROUTES = [ROUTES.ROOT, ROUTES.PROJECT];

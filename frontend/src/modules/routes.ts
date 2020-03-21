export const DYNAMIC_ROUTES = {
  TRAINING: '/trainings/[id]',
};

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  TRAININGS: '/trainings',
  training: (id: number) => `/trainings/${id}`,
};

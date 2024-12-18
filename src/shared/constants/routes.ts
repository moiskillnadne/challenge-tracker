export const Routes = {
  LOGIN: '/login',
  HOME: '/home',
  SETTINGS: '/settings',
  SETTINGS_LANGUAGE: '/settings/language',
  SETTINGS_FAST_LOGIN: '/settings/fast-login',
  SETTINGS_FAST_LOGIN_CREATE: '/settings/fast-login/create',
  CHALLENGE: {
    path: '/challenge/:challengeId',
    navigateTo: (id: string) => `/challenge/${id}`,
  },
  CREATE_CHALLENGE: '/create-challenge',
}

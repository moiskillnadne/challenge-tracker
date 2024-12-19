export const Routes = {
  LOGIN: '/login',
  HOME: '/home',
  SETTINGS: '/settings',
  SETTINGS_LANGUAGE: '/settings/language',
  SETTINGS_FAST_LOGIN: '/settings/fast-login',
  SETTINGS_FAST_LOGIN_CREATE: '/settings/fast-login/create',
  CHALLENGE: {
    path: '/challenge/:challengeId',
    navigateTo: (id: string, type: string) => `/challenge/${id}?type=${type}`,
  },
  CREATE_CHALLENGE: '/create-challenge',
}

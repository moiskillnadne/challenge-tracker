export const Routes = {
  LOGIN: '/login',
  HOME: '/home',
  SETTINGS: '/settings',
  SETTINGS_LANGUAGE: '/settings/language',
  SETTINGS_FAST_LOGIN: '/settings/fast-login',
  SETTINGS_FAST_LOGIN_CREATE: '/settings/fast-login/create',
  SETTINGS_EXPERIMENTAL_FEATURES: '/settings/experimental-features',
  COUNTERS: '/settings/experimental-features/counters',
  COUNTER: {
    path: '/settings/experimental-features/counters/:counterId',
    navigateTo: (counterId: string) =>
      `/settings/experimental-features/counters/${counterId}`,
  },
  COUNTERS_CREATE: '/settings/experimental-features/counters/create',
  CHALLENGE: {
    path: '/challenge/:challengeId',
    navigateTo: (id: string, type: string) => `/challenge/${id}?type=${type}`,
  },
  CREATE_CHALLENGE: '/create-challenge',
}

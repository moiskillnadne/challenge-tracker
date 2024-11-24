import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { ChallengeBuilderPage } from './ChallengeBuilderPage'
import ChallengePage from './ChallengePage'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'

import ProtectedRoute from '~/feature/ProtectedRoute'
import { SettingsPage } from '~/pages/SettingsPage.tsx'
import { Routes } from '~/shared/constants'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={Routes.HOME} />,
  },
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: Routes.HOME,
        element: <HomePage />,
      },
      {
        path: Routes.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: Routes.SETTINGS_LANGUAGE,
        element: <div>language settings</div>,
      },
      {
        path: Routes.SETTINGS_FAST_LOGIN,
        element: <div>fast login settings</div>,
      },
      {
        path: Routes.CHALLENGE,
        element: <ChallengePage />,
      },
      {
        path: Routes.CREATE_CHALLENGE,
        element: <ChallengeBuilderPage />,
      },

      {
        path: '*',
        element: <Navigate to={Routes.HOME} />,
      },
    ],
  },
])

const ApplicationRouter = () => {
  return <RouterProvider router={router} />
}

export default ApplicationRouter

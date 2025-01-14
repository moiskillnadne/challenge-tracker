import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { ChallengeBuilderPage } from './ChallengeBuilderPage'
import ChallengePage from './ChallengePage'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'

import ProtectedRoute from '~/feature/ProtectedRoute'
import { SettingsPage } from '~/pages/SettingsPage.tsx'
import { Routes } from '~/shared/constants'
import { Counters } from '~/widget/Counters'
import { AddNewCounter } from '~/widget/Counters/AddNewCounter.tsx'
import { Counter } from '~/widget/Counters/Counter.tsx'
import { ExperimentalFeatures } from '~/widget/ExperimentalFeatures'
import { FastLoginSetting } from '~/widget/FastLoginSetting'
import { AddNewDevice } from '~/widget/FastLoginSetting/AddNewDevice.tsx'
import { LanguageSetting } from '~/widget/LanguageSetting'
import { SettingList } from '~/widget/SettingList'

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
        children: [
          {
            index: true,
            element: <SettingList />,
          },
          {
            path: Routes.SETTINGS_LANGUAGE,
            element: <LanguageSetting />,
          },
          {
            path: Routes.SETTINGS_EXPERIMENTAL_FEATURES,
            element: <ExperimentalFeatures />,
          },
          {
            path: Routes.COUNTERS,
            element: <Counters />,
          },
          {
            path: Routes.COUNTERS_CREATE,
            element: <AddNewCounter />,
          },
          {
            path: Routes.COUNTER.path,
            element: <Counter />,
          },
          {
            path: Routes.SETTINGS_FAST_LOGIN,
            children: [
              {
                index: true,
                element: <FastLoginSetting />,
              },
              {
                path: Routes.SETTINGS_FAST_LOGIN_CREATE,
                element: <AddNewDevice />,
              },
            ],
          },
        ],
      },
      {
        path: Routes.CHALLENGE.path,
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

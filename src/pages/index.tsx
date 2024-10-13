import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ChallengePage from './ChallengePage';
import { LoginPage } from './LoginPage';
import { AccountPage } from './AccountPage';
import ProtectedRoute from '../feature/ProtectedRoute';
import { ChallengeBuilderPage } from './ChallengeBuilderPage';
import { AppVersion } from '../widget/AppVersion';
import { Page } from '../shared/ui';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/account" />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/account',
    element: <ProtectedRoute element={<AccountPage />} />,
  },
  {
    path: '/challenge/:challengeId',
    element: <ProtectedRoute element={<ChallengePage />} />,
  },
  {
    path: '/create-challenge',
    element: <ProtectedRoute element={<ChallengeBuilderPage />} />,
  },
]);

const ApplicationRouter = () => {
  return (
    <Page>
      <RouterProvider router={router} />
      <AppVersion />
    </Page>
  );
};

export default ApplicationRouter;

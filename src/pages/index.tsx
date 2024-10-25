import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ChallengePage from './ChallengePage';
import { LoginPage } from './LoginPage';
import { AccountPage } from './AccountPage';
import ProtectedRoute from '../feature/ProtectedRoute';
import { ChallengeBuilderPage } from './ChallengeBuilderPage';
import { Routes } from '../shared/constants';
import { HomePage } from './HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={Routes.ACCOUNT} />,
  },
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: Routes.HOME,
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: Routes.ACCOUNT,
    element: <ProtectedRoute element={<AccountPage />} />,
  },
  {
    path: Routes.CHALLENGE,
    element: <ProtectedRoute element={<ChallengePage />} />,
  },
  {
    path: Routes.CREATE_CHALLENGE,
    element: <ProtectedRoute element={<ChallengeBuilderPage />} />,
  },
]);

const ApplicationRouter = () => {
  return <RouterProvider router={router} />;
};

export default ApplicationRouter;

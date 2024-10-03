import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ChallengePage from './ChallengePage';
import { LoginPage } from './LoginPage';
import { AccountPage } from './AccountPage';
import ProtectedRoute from '../feature/ProtectedRoute';

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
]);

const ApplicationRouter = () => {
  return <RouterProvider router={router} />;
};

export default ApplicationRouter;

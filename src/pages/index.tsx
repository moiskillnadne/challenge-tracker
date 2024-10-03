import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChallengePage from './ChallengePage';
import { LoginPage } from './LoginPage';
import { AccountPage } from './AccountPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChallengePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/account',
    element: <AccountPage />,
  },
  {
    path: '/challenge/:challengeId',
    element: <ChallengePage />,
  },
]);

const ApplicationRouter = () => {
  return <RouterProvider router={router} />;
};

export default ApplicationRouter;

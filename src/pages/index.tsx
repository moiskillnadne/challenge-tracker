import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChallengePage from './ChallengePage';
import { LoginPage } from './LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChallengePage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

const ApplicationRouter = () => {
  return <RouterProvider router={router} />;
};

export default ApplicationRouter;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChallengePage from './ChallengePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChallengePage />,
  },
]);

const ApplicationRouter = () => {
  return <RouterProvider router={router} />;
};

export default ApplicationRouter;

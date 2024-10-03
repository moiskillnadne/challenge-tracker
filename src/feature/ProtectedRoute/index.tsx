import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../entity/user';
import { Page } from '../../shared/ui';
import { Loader } from '../../shared/ui/Loader';

type Props = {
  element: React.ReactNode;
};

function ProtectedRoute({ element }: Props) {
  const { isAuthenticated, isLoading } = useAuthenticated();

  if (isLoading) {
    return (
      <Page>
        <div className="w-full h-full flex justify-center items-center">
          <Loader />;
        </div>
      </Page>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
}

export default ProtectedRoute;

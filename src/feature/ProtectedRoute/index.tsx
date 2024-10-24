import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../entity/user';
import { Page } from '../../shared/ui';
import { Loader } from '../../shared/ui/Loader';
import { EventEmitter } from '../../shared/lib/EventEmitter';

type Props = {
  element: React.ReactNode;
};

function ProtectedRoute({ element }: Props) {
  const { isAuthenticated, isLoading } = useAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    const handleRefreshTokenExpired = () => {
      return navigate('/login');
    };

    EventEmitter.on('refreshTokenExpired', handleRefreshTokenExpired);

    return () => {
      EventEmitter.off('refreshTokenExpired', handleRefreshTokenExpired);
    };
  }, []);

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

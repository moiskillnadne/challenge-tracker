import React, { useEffect } from 'react'

import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { useAuthenticated } from '~/entity/user'
import { EventEmitter } from '~/shared/lib/EventEmitter'
import { PageLoader } from '~/shared/ui'

type Props = {
  element?: React.ReactNode
}

function ProtectedRoute({ element }: Props) {
  const { isAuthenticated, isLoading } = useAuthenticated()

  const navigate = useNavigate()

  useEffect(() => {
    const handleRefreshTokenExpired = () => {
      return navigate('/login')
    }

    EventEmitter.on('refreshTokenExpired', handleRefreshTokenExpired)

    return () => {
      EventEmitter.off('refreshTokenExpired', handleRefreshTokenExpired)
    }
  }, [navigate])

  if (isLoading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return element ?? <Outlet />
}

export default ProtectedRoute

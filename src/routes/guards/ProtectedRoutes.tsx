import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'

export const ProtectedRoutes = () => {

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const value = await AuthServiceManager.getIntance().isAuthorized() === true
      setIsAuthorized(value)
    }
    window.addEventListener('storage', checkAuth)
    checkAuth()
    return () => {
      window.removeEventListener('storage', checkAuth)
    }
  }, [])

  return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" />
}
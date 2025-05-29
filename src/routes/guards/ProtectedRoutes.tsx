import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'

export const ProtectedRoutes = () => {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = async () => {
      const value = await AuthServiceManager.getIntance().isAuthorized()
      setIsAuthorized(value)
    }

    setTimeout(() => {
      checkAuth()
    }, 100)
  }, [])
  
  return isAuthorized ? <Outlet /> : <Navigate to = {'/auth/login'} />
}
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {

  const isAuthorized = true

  if(isAuthorized) {
    return <Outlet />
  }
  return <Navigate to = {'/auth/login'} />
}
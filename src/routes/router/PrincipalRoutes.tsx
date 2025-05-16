import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ProtectedRoutes } from '../guards/ProtectedRoutes'
import { MainLayout } from '../../layouts/main/MainLayout'
import { ProfilePage } from '../../pages/profile-page/ProfilePage'
import { PetPage } from '../../pages/pet-page/PetPage'
import { MedicalShiftPage } from '../../pages/medical-shift-page/MedicalShiftPage'
import { ErrorPage } from '../../pages/error-page/ErrorPage'
import { AuthLayout } from '../../layouts/auth/AuthLayout'
import { LoginPage } from '../../pages/login-page/LoginPage'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { ProfileLayout } from '../../pages/profile-page/ProfileLayout'
import { NotificationsPage } from '../../components/notification/NotificationsPage'

export const PrincipalRoutes = () => {

  const handleTitlePet = () => {
    return AuthServiceManager.getIntance().isVet() ? 'Pacientes' : 'Mascotas'
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/auth" element = { <AuthLayout /> }>
          <Route path = "login" element = { <LoginPage /> }/>
        </Route>
        <Route element = { <ProtectedRoutes /> }>
          <Route path = "/" element = { <MainLayout /> } >
            <Route path="profile" element={<ProfileLayout />}>
  <Route index element={<ProfilePage />} />
  <Route path="notifications" element={<NotificationsPage />} />
</Route>
           <Route path = "pets" element = { <PetPage name={ handleTitlePet() } /> } />
            <Route path = "medical-shift" element = { <MedicalShiftPage /> } />
            <Route path = "*" element = { <ErrorPage /> } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
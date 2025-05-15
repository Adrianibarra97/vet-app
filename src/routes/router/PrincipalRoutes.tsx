import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ProtectedRoutes } from '../guards/ProtectedRoutes'
import { MainLayout } from '../../layouts/main/MainLayout'
import { ProfilePage } from '../../pages/profile-page/ProfilePage'
import { PetPage } from '../../pages/pet-page/PetPage'
import { MedicalShiftPage } from '../../pages/medical-shift-page/MedicalShiftPage'
import { ErrorPage } from '../../pages/error-page/ErrorPage'
import { AuthLayout } from '../../layouts/auth/AuthLayout'
import { LoginPage } from '../../pages/login-page/LoginPage'
import { PetDetail } from '../../pages/pet-detail-page/PetDetailPage'

export const PrincipalRoutes = () => {

    const titleToTypeUser = () => {
      return "Pacientes"
    }

    return (
      <BrowserRouter>
          <Routes>
            <Route path = "/auth" element = { <AuthLayout /> }>
              <Route path = "login" element = { <LoginPage /> }/>
            </Route>
            <Route element = { <ProtectedRoutes /> }>
              <Route path = "/" element = { <MainLayout /> } >
                <Route path = "profile" element={<ProfilePage name="Perfil" />} />
                <Route path = "pets" element = { <PetPage name={ titleToTypeUser() } /> } />
                <Route path = "medical-shift" element = { <MedicalShiftPage /> } />
                <Route path = 'pet-detail/:petID' element = {<PetDetail/>}/>
                <Route path = "*" element = { <ErrorPage /> } />
              </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    )
  }
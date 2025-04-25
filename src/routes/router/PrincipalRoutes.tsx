import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ProtectedRoutes } from '../guards/ProtectedRoutes'
import { MainLayout } from '../../layouts/main/MainLayout'
import { ProfilePage } from '../../pages/profile-page/ProfilePage'
import { PetPage } from '../../pages/pet-page/PetPage'
import { MedicalShiftPage } from '../../pages/medical-shift-page/MedicalShiftPage'
import { ErrorPage } from '../../pages/error-page/ErrorPage'

export const PrincipalRoutes = () => {

    const titleToTypeUser = () => {
      return "Pacientes"
    }

    return (
      <BrowserRouter>
          <Routes>
            {/* <Route exact path = "/auth" element = { <AuthLayout /> }>
              <Route exact path = "/auth/login" element = { <Login /> }/>
            </Route> */}
            <Route element = { <ProtectedRoutes /> }>
              <Route path = "/" element = { <MainLayout /> } >
                <Route path = "/profile" element={<ProfilePage name="Perfil" />} />
                <Route path = "/pets" element = { <PetPage name={ titleToTypeUser() } /> } />
                <Route path = "/medical-shift" element = { <MedicalShiftPage /> } />
                <Route path = "*" element = { <ErrorPage /> } />
              </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    )
  }
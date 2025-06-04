import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { FormControlModal } from '../../components/form-control-modal/FormControlModal'
import { ButtonsModal } from '../../components/buttons-modal/ButtonsModal'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { AuthCredentialsLoginDTO } from '../../domain/User'
import { modalItem, buttonContent, passButton } from './LoginPageStyle'
import './LoginPage.css'
import { useAuth } from '../../context/AuthContext'
import { getUserID } from '../../services/auth-service/AuthService'
import { useUser } from '../../context/UserContext'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import { Vet } from '../../domain/Vet'
import { PetOwner } from '../../domain/PetOwner'


export const LoginPage = () => {

  const navigate = useNavigate()
  const { updateIsAuthorized } = useAuth()
  const { updateUser } = useUser()
  const [userLogin, setUserLogin] = useState({ username: '', password: '' })
  const [errorActive, setErrorActive] = useState(false)
  

  const hasRequiredFields = (): boolean => userLogin.username != '' && userLogin.password != ''

  const handleUsername = (value: string) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: value,
      password: userLogin.password
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  const handlePassword = (value: string) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: userLogin.username,
      password: value
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  const handleLogin = async () => {
    if(hasRequiredFields()) {
      setErrorActive(false)
      AuthServiceManager.getIntance().login(userLogin)
      setTimeout(async () => {
        const userId: number = getUserID()
        if(userId >= 0) {
          if(AuthServiceManager.getIntance().isVet()) {
            const user: Vet = await VetServiceManager.getInstance().getOneById(userId)
            updateUser(user)
          } else {
            const user: PetOwner = await PetOwnerServiceManager.getInstance().getOneById(userId)
            updateUser(user)
          }
          updateIsAuthorized(true)
        } else {
          updateIsAuthorized(false)
        }
      }, 100)
      setTimeout(async () => {
        navigate('/pets')
      }, 500)
    } else {
      setErrorActive(true)
    }
  }

  useEffect(() => {
    localStorage.clear()
  },[])

  return (
    <main className="auth__main">
      <div className="login">
        {/* <h1 className="title__login">VetApp <i className="fa-solid fa-paw logo__login"></i></h1> */}
        <figure className="title__login">
          <img className="logo__image" src="../../src/assets/logo-vet-app-horizontal.png" />
        </figure>
        <form className="login__form">
          <Box sx={ modalItem }>
            <FormControlModal
              isActive={ true } errorActive={ errorActive } label={ 'Usuario' } type={ 'text' }
              defaultValue={ userLogin.username } labelColor={ 'success' } handleInputChanges={ handleUsername }
            />
          </Box>
          <Box sx={ modalItem }>
            <FormControlModal
              isActive={ true } errorActive={ errorActive } label={ 'Contraseña' } type={ 'password' }
              defaultValue={ userLogin.password } labelColor={ 'success' } handleInputChanges={ handlePassword }
            />
          </Box>
          <Button
            sx={ passButton } onClick={ () => navigate('/auth/reset-password') }
          >Olvidó su contraseña?</Button>
          <Box sx={ buttonContent }>
            <ButtonsModal
              confirLabel={ 'Crear' } cancelLabel={ 'Ingresar' }
              confirm={ () => navigate('/auth/create-user') } cancel={ () => handleLogin() } 
            />
          </Box>
        </form>
      </div>
    </main>
  )
}
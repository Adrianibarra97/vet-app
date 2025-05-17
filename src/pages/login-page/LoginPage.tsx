import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { FormControlModal } from '../../components/form-control-modal/FormControlModal'
import { ButtonsModal } from '../../components/buttons-modal/ButtonsModal'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { AuthCredentialsLoginDTO } from '../../domain/User'
import { modalItem, buttonContent, passButton } from './LoginPageStyle'
import './LoginPage.css'


export const LoginPage = () => {

  const navigate = useNavigate()
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

  const handleLogin = () => {
    if(hasRequiredFields()) {
      setErrorActive(false)
      AuthServiceManager.getIntance().login(userLogin)
      navigate('/pets')
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
        <h1 className="title__login">VetApp <i className="fa-solid fa-paw logo__login"></i></h1>
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
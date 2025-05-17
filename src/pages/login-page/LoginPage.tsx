import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { FormControlModalLogin } from '../../components/form-control-modal-login/FormControlModalLogin'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { AuthCredentialsLoginDTO } from '../../domain/User'
import { button__Container, BkgButton, passButton } from './LoginPageStyle'
import './LoginPage.css'

export const LoginPage = () => {

  const navigate = useNavigate()
  const [userLogin, setUserLogin] = useState({ username: '', password: '' })
  const [errorActive, setErrorActive] = useState(false)

  const hasRequiredFields = (): boolean => userLogin.username != '' && userLogin.password != ''

  const handleUsername = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: e.target.value,
      password: userLogin.password
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: userLogin.username,
      password: e.target.value
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  const handleLogin = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
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
          <FormControlModalLogin
            isActive={ true } errorActive={ errorActive } label={ 'Usuario' } type={ 'text' }
            defaultValue={ userLogin.username } labelColor={ 'primary' } handleInputChanges={ handleUsername }
          />
          <FormControlModalLogin
            isActive={ true } errorActive={ errorActive } label={ 'Contraseña' } type={ 'password' }
            defaultValue={ userLogin.password } labelColor={ 'primary' } handleInputChanges={ handlePassword }
          />
          <Button sx={ passButton } onClick={ () => navigate('/auth/reset-password') }>Olvidó su contraseña?</Button>
          <Box sx={ button__Container }>
            <Button variant="contained" sx={ BkgButton } onClick={ handleLogin }>Ingresar</Button>
            <Button variant="contained" sx={ BkgButton } onClick={ () => navigate('/auth/create-user') }>Crear</Button>
          </Box>
        </form>
      </div>
    </main>
  )
}
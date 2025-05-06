import { useNavigate } from 'react-router-dom'
import { AuthCredentialsLoginDTO } from '../../domain/User'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import './LoginPage.css'
import { ChangeEvent, MouseEvent, useState } from 'react'

export const LoginPage = () => {

  const navigate = useNavigate()
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: ''
  })

  const handleLogin = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    AuthServiceManager.getIntance().login(userLogin)
    navigate('/pets')
  }

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: e.target.value,
      password: userLogin.password
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: userLogin.username,
      password: e.target.value
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  return (
    <main className="auth__main">
      <div className='login'>
        <h1 className="main__title">Login</h1>
        <form className='login__form'>
          <div className='login__item'>
            <label>Username</label>
            <input type="text" onChange={ (e) => { handleUsername(e) } } />
          </div>
          <div className='login__item'>
            <label>Password</label>
            <input type="text" onChange={ (e) => { handlePassword(e) } } />
          </div>
          <button onClick={ (e) => handleLogin(e) }>Ingresar</button>
        </form>
      </div>
    </main>
  )
}
import { useNavigate } from 'react-router-dom'
import { UserLogin } from '../../domain/User'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import './LoginPage.css'
import { useState } from 'react'

export const LoginPage = () => {

  const navigate = useNavigate()
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: ''
  })

  const handleLogin = () => {
    const userLogin: UserLogin = {
      username: 'adri9730',
      password: '1234'
    }
    AuthServiceManager.getIntance().login(userLogin)
    navigate('/pets')
  }

  return (
    <main className="auth__main">
      <div className='login'>
        <h1 className="main__title">Login</h1>
        <form className='login__form'>
          <div className='login__item'>
            <label>Username</label>
            <input type="text" />
          </div>
          <div className='login__item'>
            <label>Password</label>
            <input type="text" />
          </div>
          <button onClick={ () => handleLogin() }>Ingresar</button>
        </form>
      </div>
    </main>
  )
}
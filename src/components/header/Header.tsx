
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import './Header.css'
import { useAuth } from '../../context/AuthContext'

export const Header = () => {

  const { user } = useUser()
  const { isAuthorized } = useAuth()
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const [interUser, setInterUser] = useState(user)
  
  const logoutApp = () => {
    AuthServiceManager.getIntance().logout()
		navigate('/auth/login')
  }

  const handleTitlePet = () => {
    return AuthServiceManager.getIntance().isVet() ? 'Pacientes' : 'Mascotas'
  }

  useEffect(() => {
    setInterUser(user)
  }, [user])

  return (
    <header className="header">
      <figure className="logo">
        <i className="fa-solid fa-paw logo__image"></i>
        <label className="logo__label">VetApp</label>
      </figure>
      <figure className="button__content--menu" onClick={ () => setOpenMenu(true) }>
        {
          isAuthorized && interUser?.photo
          ? <img className="user__image" src={ interUser?.photo }/>
          : <i className="fa-solid fa-circle-user header__button--menu"></i>
        }
      </figure>
      <nav className={ openMenu ? "nav" : "nav nav__none" }>
        <div className="nav__button">
          <button className="fa-solid fa-xmark nav__button--close" onClick={ () => setOpenMenu(false) }></button>
        </div>
        <ul className="nav__ul">
          <Link className="nav__ul--link" to="./profile">Perfil</Link>
          <Link className="nav__ul--link" id="link-page" to="./pets">{ handleTitlePet() }</Link>
          <Link className="nav__ul--link" to="./medical-shift">Turnos</Link>
          <button
            className="fa-solid fa-right-from-bracket nav__ul--logout nav__ul--link"
            onClick = { () => logoutApp() }
          ></button>
        </ul>
      </nav>
    </header>
  )
}
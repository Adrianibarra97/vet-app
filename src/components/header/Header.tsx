
import { Link, useNavigate } from 'react-router-dom'

import './Header.css'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { useState } from 'react'

export const Header = () => {

  const[openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()

  const logoutApp = () => {
    AuthServiceManager.getIntance().logout()
		navigate('/auth/login')
  }

  return (
    <header className="header">
      <figure className="logo">
        <i className="fa-solid fa-paw logo__image"></i>
        <label className="logo__label">VetApp</label>
      </figure>
      <figure className="button__content--menu" onClick={ () => setOpenMenu(true) }>
        {
          AuthServiceManager.getIntance().isAuthorized()
          ? <img className="user__image" src="/src/assets/adri.jfif"/>
          : <i className="fa-solid fa-circle-user header__button--menu"></i>
        }
      </figure>
      <nav className={ openMenu ? "nav" : "nav nav__none" }>
        <div className="nav__button">
          <button className="fa-solid fa-xmark nav__button--close" onClick={ () => setOpenMenu(false) }></button>
        </div>
        <ul className="nav__ul">
          <Link className="nav__ul--link" to="./profile">Perfil</Link>
          <Link className="nav__ul--link" id="link-page" to="./pets">{ AuthServiceManager.getIntance().isVet() ? 'Pacientes' : 'Mascotas' }</Link>
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
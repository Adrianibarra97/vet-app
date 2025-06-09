
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import './Header.css'
import { NotificationServiceManager } from '../../services/notification-service/NotificationServiceManager'

export const Header = () => {

  const { user } = useUser()
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const [interUser, setInterUser] = useState(user)
  const [notiCounter, setNotiCounter] = useState(0)
  
  const logoutApp = () => {
    AuthServiceManager.getIntance().logout()
		navigate('/auth/login')
  }

  const handleTitlePet = () => {
    return AuthServiceManager.getIntance().isVet() ? 'Pacientes' : 'Mascotas'
  }

  const handleNavNotification = () => {
    navigate('/profile/notifications')
  }

  const getNotificationCountByUser = async () => {
    const userId: number = interUser?.id ? interUser?.id : -1
    const counter: number = await NotificationServiceManager
      .getInstance()
      .getNotificationService()
      .getNotificationsCountByUser(userId, interUser?.typeOfUser)
    setNotiCounter(counter)
  }

  useEffect(() => {
    setInterUser(user)
    getNotificationCountByUser()
  }, [user])

  return (
    <header className="header">
      <figure className="logo">
        <img className="logo__image" src="../../src/assets/logo-vet-app-horinzotal-2.png" />
      </figure>
      <div className="menu__content">
        <figure className="button__content--noti" onClick={ () => handleNavNotification() }>
          <i className="fa-solid fa-bell header__button--noti">
            {
              notiCounter > 0
              ? <p className="noti__count">{ notiCounter }</p>
              : ''
            }
          </i>
        </figure>
        <figure className="button__content--menu" onClick={ () => setOpenMenu(true) }>
          {
            AuthServiceManager.getIntance().isAuthorized() && interUser?.photo
            ? <img className="user__image" src={ interUser?.photo }/>
            : <i className="fa-solid fa-circle-user header__button--menu"></i>
          }
        </figure>
      </div>
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
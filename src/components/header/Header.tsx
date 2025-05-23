
import { Link, useNavigate } from 'react-router-dom'

import './Header.css'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { useEffect, useState } from 'react'
import { User } from '../../domain/User'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import { getUserID } from '../../services/auth-service/AuthService'
// import { useUser } from '../../context/UserContext'

export const Header = () => {

  // const { user } = useUser()

  const [user, setUser] = useState<User | null>(null)
  const[openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()

  const logoutApp = () => {
    AuthServiceManager.getIntance().logout()
		navigate('/auth/login')
  }

  const handleTitlePet = () => {
    return AuthServiceManager.getIntance().isVet() ? 'Pacientes' : 'Mascotas'
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const fetchedUser: User = AuthServiceManager.getIntance().isVet()
        ? await VetServiceManager.getInstance().getOneById(getUserID())
        : await PetOwnerServiceManager.getInstance().getOneById(getUserID())
      setUser(fetchedUser)
    }

    fetchProfileData()
  }, [])

  return (
    <header className="header">
      <figure className="logo">
        <i className="fa-solid fa-paw logo__image"></i>
        <label className="logo__label">VetApp</label>
      </figure>
      <figure className="button__content--menu" onClick={ () => setOpenMenu(true) }>
        {
          AuthServiceManager.getIntance().isAuthorized()
          ? <img className="user__image" src={ user?.photo }/>
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

import { Link } from 'react-router-dom'

import './Header.css'


export const Header = () => {

  // const navigate = useNavigate()

  const menuOpenHandler = (setLayoutName: string) => {
    const nav = document.getElementById('nav')
    const linkPage = document.getElementById('link-page')
    nav.style.display = 'flex'
    linkPage.innerHTML = setLayoutName
  }
  
  const menuCloseHandler = () => {
    const nav = document.getElementById('nav')
    nav.style.display = 'none'
  }

  const logoutApp = () => {
    // authService.logout()
		// navigate('/auth/login')
    alert('Está funcionalidad de momento no se encuentra disponible!')
  }

  return (
    <header className="header">
      <figure className="logo">
        <i className="fa-solid fa-paw logo__image"></i>
        <label className="logo__label">VetApp</label>
      </figure>
      <button className="fa-solid fa-circle-user header__button--menu" onClick={ () => menuOpenHandler('Pacientes') }></button>
      <nav id="nav" className="nav">
        <div className="nav__button">
          <button className="fa-solid fa-xmark nav__button--close" onClick={ () => menuCloseHandler() }></button>
        </div>
        <ul className="nav__ul">
          <Link className="nav__ul--link" to="./profile">Perfil</Link>
          <Link className="nav__ul--link" id="link-page" to="./pets">Xxxxxx</Link>
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
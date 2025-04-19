import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { ProfileForm } from '../../components/user-form-component/User-form-component'
export const ProfilePage = () => {
  return (
    <main className="main">
      <h1 className="main__title">Perfil</h1>

      <div className="main__content">
        <div className="main__content--filter">
          <div className="content__menu">
            <h2>Menú</h2>
            <nav className="menu">
              <ProfileMenu />
            </nav>
          </div>
        </div>

        <div className="main__content--data">
          <ProfileForm />
        </div>
      </div>
    </main>
  )
}

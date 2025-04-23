import { useState, useEffect } from 'react'
import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { ProfileForm } from '../../components/user-form-component/User-form-component'
import { ProfessionalInfo } from '../../domain/ProfessionalInfo'
import UserServiceManager from '../../services/user-service/UserServiceManager'
import { User } from '../../domain/User'

export const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [professional, setProfessional] = useState<ProfessionalInfo | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const personal = await UserServiceManager.getInstance().getUserInfo()
      const prof = await UserServiceManager.getInstance().getProfessionalInfo()
      setUser(personal)
      setProfessional(prof)
    }
    fetchData()
  }, [])

  const handleSave = async (section: 'personal' | 'professional', data: any) => {
    if (section === 'personal') {
      await UserServiceManager.getInstance().updateUserInfo(data)
    } else {
      await UserServiceManager.getInstance().updateProfessionalInfo(data)
    }
  }

  if (!user || !professional) return <p>Cargando...</p>

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
        <ProfileForm personal={user} professional={professional} onSave={handleSave} />
        </div>
      </div>
    </main>
  )
}

import { useState, useEffect } from 'react'
import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { ProfileForm } from '../../components/user-form-component/User-form-component'
import { ProfessionalInfo } from '../../domain/ProfessionalInfo'
import UserServiceManager from '../../services/user-service/UserServiceManager'
import { User } from '../../domain/User'

export const ProfilePage = () => {
  const userService = UserServiceManager.getInstance()

  const [user, setUser] = useState<User | null>(null)
  const [professional, setProfessional] = useState<ProfessionalInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.getOneById(1).then(({ user, professional }) => {
      setUser(user)
      setProfessional(professional)
      setLoading(false)
    })
  }, [])

  const handleSave = (section: 'personal' | 'professional', data: any) => {
    const updatedUser = section === 'personal' ? data : user
    const updatedProfessional = section === 'professional' ? data : professional

    if (updatedUser && updatedProfessional) {
      userService.update(updatedUser, updatedProfessional).then(() => {
        setUser(updatedUser)
        setProfessional(updatedProfessional)
      })
    }
  }


  if (loading || !user || !professional) return <p>Cargando...</p>

  return (
    <main className="main">
      <h1 className="main__title">Perfil</h1>

      <div className="main__content">
        <div className="main__content--filter">
          <div className="content__menu">
            <h2>Menú</h2>
            <nav className="menu">
              <ProfileMenu user={user} />
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

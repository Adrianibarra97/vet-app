import { useState, useEffect } from 'react'
import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { ProfileForm } from '../../components/user-form-component/User-form-component'
import { ProfessionalInfo } from '../../domain/ProfessionalInfo'
import UserServiceManager from '../../services/user-service/UserServiceManager'
import { User } from '../../domain/User'
interface TitleProp {
  name: string
}

export const ProfilePage = ({ name }: TitleProp) => {
  const userService = UserServiceManager.getInstance()

  const [user, setUser] = useState<User | null>(null)
  const [professional, setProfessional] = useState<ProfessionalInfo | null>(null)

  const fetchProfileData = async () => {
    const { user, professional } = await userService.getOneById(1)
    setUser(user)
    setProfessional(professional)
  }

  const handleChangesProfile = async (section: 'personal' | 'professional', data: any) => {
    const updatedUser = section === 'personal' ? data : user
    const updatedProfessional = section === 'professional' ? data : professional

    if (updatedUser && updatedProfessional) {
      await userService.update(updatedUser, updatedProfessional)
      setUser(updatedUser)
      setProfessional(updatedProfessional)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (
    <main className="main">
      <h1 className="main__title">{name}</h1>
      <div className="main__content">
        <div className="main__content--filter">
          <div className="content__menu">
            <h2>Menú</h2>
            <nav className="menu">
              {user && <ProfileMenu user={user} />}
            </nav>
          </div>
        </div>
        <div className="main__content--data">
          {user && professional && (
         <ProfileForm
         personal={user}
         professional={professional}
         onSave={handleChangesProfile}
         showProfessionalInfo={UserServiceManager.getUserType() === "vet"} 
       />
       
          )}
        </div>
      </div>
    </main>
  )
}
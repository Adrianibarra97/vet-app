import { useState, useEffect } from 'react'
import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { ProfileForm } from '../../components/user-form-component/User-form-component'
import { User } from '../../domain/User'
import { PetOwner } from '../../domain/PetOwner'
import { Vet } from '../../domain/Vet'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import { obtenerUserID } from '../../services/auth-service/AuthService'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
interface TitleProp {
  name: string
}

export const ProfilePage = ({ name }: TitleProp) => {
  const [user, setUser] = useState<User | Vet | PetOwner | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      let fetchedUser: Vet | PetOwner

      if (AuthServiceManager.getIntance().isOwner()) {
        fetchedUser = await PetOwnerServiceManager.getInstance().getOneById(await obtenerUserID())
      } else {
        fetchedUser = await VetServiceManager.getInstance().getOneById(await obtenerUserID())
      }

      setUser(fetchedUser)
    }

    fetchProfileData()
  }, [])

  const handleChangesProfile = async (updatedUser: User | Vet | PetOwner) => {
    if (userType === 'vet') {
      await VetServiceManager.getInstance().update(updatedUser as Vet)
    } else {
      await PetOwnerServiceManager.getInstance().update(updatedUser as PetOwner)
    }
    setUser(updatedUser)
  }

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
        {user && (
            <ProfileForm
              user={user}
              onSave={handleChangesProfile}
              showProfessionalInfo={user instanceof Vet}
            />
          )}
        </div>
      </div>
    </main>
  )
}
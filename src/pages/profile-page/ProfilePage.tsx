import { useState, useEffect } from 'react'
import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { ProfileForm } from '../../components/user-form-component/User-form-component'
import { User } from '../../domain/User'
import { PetOwner } from '../../domain/PetOwner'
import { Vet } from '../../domain/Vet'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import { getUserID } from '../../services/auth-service/AuthService'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'

interface TitleProp {
  name: string
}

export const ProfilePage = ({ name }: TitleProp) => {
  const [user, setUser] = useState<User | Vet | PetOwner | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      let fetchedUser: Vet | PetOwner
      if (AuthServiceManager.getIntance().isVet()) {
        fetchedUser =
          await VetServiceManager.getInstance().getOneById(getUserID())
        fetchedUser.typeOfUser = 'vet'
      } else {
        fetchedUser =
          await PetOwnerServiceManager.getInstance().getOneById(getUserID())
        fetchedUser.typeOfUser = 'petOwner'
      }

      setUser(fetchedUser)
    }

    fetchProfileData()
  }, [])

  const handleChangesProfile = async (updatedUser: User | Vet | PetOwner) => {
    if (AuthServiceManager.getIntance().isVet()) {
      await VetServiceManager.getInstance().update(updatedUser as Vet)
    } else {
      await PetOwnerServiceManager.getInstance().update(updatedUser as PetOwner)
    }
    setUser(updatedUser)
    SnackbarUtilities.succes('Perfil actualizado correctamente')
  }

  return (
    <main className="main">
      <h1 className="main__title">{name}</h1>
      <div className="main__content">
        <div className="main__content--filter">
          <div className="content__menu">
            <h2>Menú</h2>
            <nav className="menu">
              {user && (
                <ProfileMenu
                  user={user}
                  onPhotoChange={(newPhoto: string) => {
                    const updated = Object.assign(
                      Object.create(Object.getPrototypeOf(user)),
                      { ...user, photo: newPhoto },
                    )
                    setUser(updated)
                  }}
                />
              )}
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

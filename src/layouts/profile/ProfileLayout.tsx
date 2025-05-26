import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { PetOwner } from '../../domain/PetOwner'
import { Vet } from '../../domain/Vet'
import { User } from '../../domain/User'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import { getUserID } from '../../services/auth-service/AuthService'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import './ProfileLayout.css'

export const ProfileLayout = () => {
  const [user, setUser] = useState<User | Vet | PetOwner | null>(null)

  const location = useLocation()

  const title = location.pathname.includes('notifications')
    ? 'Notificaciones'
    : 'Mi Perfil'

  useEffect(() => {
    const fetchUser = async () => {
      const id = getUserID()
      const service = AuthServiceManager.getIntance().isVet()
        ? VetServiceManager.getInstance()
        : PetOwnerServiceManager.getInstance()

      const fetched = await service.getOneById(id)
      fetched.typeOfUser = AuthServiceManager.getIntance().isVet()
        ? 'VET'
        : 'PETOWNER'
      setUser(fetched)
    }
    fetchUser()
  }, [])

  return (
    <main className="main">
      <h1 className="main__title">{title}</h1>
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

        <div className="main__data-wrapper main__content--data">
          {user && <Outlet context={user} />}
        </div>
      </div>
    </main>
  )
}

import { createContext, useContext, useState, useEffect } from 'react'
import AuthServiceManager from '../services/auth-service/AuthServiceManager'
import { getUserID } from '../services/auth-service/AuthService'
import VetServiceManager from '../services/vet-service/VetServiceManager'
import PetOwnerServiceManager from '../services/pet-owner-service/PetOwnerServiceManager'
import { User } from '../domain/User'
import { PetOwner } from '../domain/PetOwner'
import { Vet } from '../domain/Vet'

interface UserContextType {
  user: User | PetOwner | Vet | null
  updateUser: (newUser: User) => void
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [user, setUser] = useState<User | PetOwner | Vet | null>(null)

  const updateUser = (newUser: User) => setUser(newUser)

  const refreshUser = async () => {
    if(getUserID() > 0) {
      const fetchedUser: User = AuthServiceManager.getIntance().isVet()
      ? await VetServiceManager.getInstance().getOneById(getUserID())
      : await PetOwnerServiceManager.getInstance().getOneById(getUserID())
      setUser(fetchedUser)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, refreshUser, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}
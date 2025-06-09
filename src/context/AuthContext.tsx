import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isAuthorized: boolean
  updateIsAuthorized: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  const updateIsAuthorized = (value: boolean) => {
    setIsAuthorized(value)
  }

  return (
    <AuthContext.Provider value={{ isAuthorized, updateIsAuthorized }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}
import { SnackbarProvider } from 'notistack'
import { PrincipalRoutes } from './routes/router/PrincipalRoutes'
import { SnackbarUtilitiesConfigurator } from './util/snackbar/SnackbarManager'
import { UserProvider } from './context/UserContext'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <SnackbarProvider>
      <SnackbarUtilitiesConfigurator />
      <AuthProvider>
        <UserProvider>
          <PrincipalRoutes />
        </UserProvider>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
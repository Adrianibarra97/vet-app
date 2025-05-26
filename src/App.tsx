import { SnackbarProvider } from 'notistack'
import { PrincipalRoutes } from './routes/router/PrincipalRoutes'
import { SnackbarUtilitiesConfigurator } from './util/snackbar/SnackbarManager'
import { UserProvider } from './context/UserContext'

function App() {

  return (
    <SnackbarProvider>
      <SnackbarUtilitiesConfigurator />
      <UserProvider>
        <PrincipalRoutes />
      </UserProvider>
    </SnackbarProvider>
  )
}

export default App
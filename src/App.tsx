import { SnackbarProvider } from "notistack"
import { PrincipalRoutes } from "./routes/router/PrincipalRoutes"
import { SnackbarUtilitiesConfigurator } from "./util/snackbar/SnackbarManager"

function App() {

  return (
    <SnackbarProvider>
      <SnackbarUtilitiesConfigurator />
      <PrincipalRoutes />
    </SnackbarProvider>
  )
}

export default App
import axios, { AxiosError } from 'axios'
import { handleError } from '../util/handle-error/handleError'
import { SnackbarUtilities } from '../util/snackbar/SnackbarManager'

export const AxiosInterceptor = () => {

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      const errorCodeText: string = error.code ? error.code : 'ERROR'
      const errorMsg: string = handleError(errorCodeText)
      SnackbarUtilities.error(errorMsg)
      return Promise.reject(error)
    }
  )
}
import axios, { AxiosError } from 'axios'
import { handleError } from '../util/handle-error/handleError'
import { SnackbarUtilities } from '../util/snackbar/SnackbarManager'

export const AxiosInterceptor = () => {

  // const updateheader = (request: AxiosRequestConfig) => {
  //   const token = '11218683284682134682341823648123'
  //   const newheaders = {
  //     Authorization: token,
  //     'Content-type': 'Application/json'
  //   }
  //   request.headers = newheaders
  //   return request
  // }

  // axios.interceptors.request.use((request: AxiosRequestConfig) => {
  //   return updateheader(request)
  // })

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
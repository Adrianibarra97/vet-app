import axios, { AxiosError } from 'axios'
import { handleError } from '../util/handle-error/handleError'

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
      console.log('response', response)
      return response
    },
    (error: AxiosError) => {
      const errorCodeText: string = error.code ? error.code : 'ERROR'
      console.log('Error:', handleError(errorCodeText))
      return Promise.reject(error)
    }
  )
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './css/index.css'
import { AxiosInterceptor } from './interceptors/axios.interceptor.tsx'

AxiosInterceptor()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
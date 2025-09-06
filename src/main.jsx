import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom"
import { router } from './routes/index.jsx'
import { UserProvider } from './context/UserContext.jsx'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>

   <RouterProvider router={router}/>
   <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </UserProvider>


  </StrictMode>,
)

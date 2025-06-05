import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './layouts/Root'
import ContextProvider from './Contextes/ContextProvider'
import Assignments from './pages/publicPages/Assignments'
import Home from './pages/publicPages/Home'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
    path: '/',
    element: <Home />
  },
  {
    path: '/assignments',
    element: <Assignments />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)

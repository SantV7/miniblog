import { StrictMode } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import NotFound from './pages/NotFound404/NotFound'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

import { useAuthValue } from './context/AuthContext'


function RedirectIfAuth({ children } : { children: ReactNode }) {
  const { user } = useAuthValue()
  return user ? <Navigate to="/" /> : children
}

function RequireAuth({ children } : { children: ReactNode }) {
  const { user } = useAuthValue()
  return user ? children : <Navigate to="/login" />
}

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <RedirectIfAuth><Login /></RedirectIfAuth> },
      { path: '/register', element: <RedirectIfAuth><Register /></RedirectIfAuth> },
      { path: '/posts/create', element: <RequireAuth><CreatePost /></RequireAuth> },
      { path: '/dashboard', element: <RequireAuth><Dashboard /></RequireAuth> }
    ]
  },
  { path: '*', element: <NotFound /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
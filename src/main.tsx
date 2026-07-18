import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import App from './App';
import NotFound from './pages/NotFound404/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';



const router = createBrowserRouter([
  {path: '/', element: <App />, children: [
    { path: "/home",element: <Home /> },
    { path: "/about",element: <About /> },
  ]},
  { path: "/login",element: <Login />},
  { path: "/register",element: <Register />},
  { path: "*",element: <NotFound />}

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

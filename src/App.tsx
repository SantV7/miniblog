
import { Link, Outlet } from 'react-router-dom'
import './style/global.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { useState, useEffect } from 'react'
import useAutentication from './hooks/useAutentication'

function App() {

 const [user, setUser] = useState<User | null | undefined>(undefined)

  const { auth } = useAutentication()

  const loadingUser = user === undefined

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe();
  }, [auth])
  

  if(loadingUser) {
    return <p style={{display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      fontSize: "3.76rem", 
      height: "100vh"}
    }>
      Wellcome👾
    </p>
  } 

  return (
    <>
    <AuthProvider value={{user}}>
        <header id='main_header'>
          <Link id='your_blog' to='/'>YourMoments</Link>
          <Navbar />
        </header>

        <div className="container">
          <Outlet />
        </div>
        
        <Footer />      
    </AuthProvider>
    </>
  )
}

export default App

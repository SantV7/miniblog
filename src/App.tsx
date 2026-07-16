
import { Link, Outlet } from 'react-router-dom'
import './style/global.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'



function App() {


  return (
    <>
      
        <header id='main_header'>
          <Link id='your_blog' to='/'>YourBlog</Link>
          <Navbar />
        </header>



        <div className="container">
          <Outlet />
        </div>
        
        <Footer />
    </>
  )
}

export default App

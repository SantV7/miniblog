
import { Outlet } from 'react-router-dom'
import './style/global.css'
import Navbar from './components/Navbar/Navbar'



function App() {


  return (
    <>
      <div className='app'>
        <header id='main_header'>
          <h1>Mini Blog</h1>
          <Navbar />
        </header>

        <div className="container">
          <Outlet />
        </div>


      </div>
            
    </>
  )
}

export default App

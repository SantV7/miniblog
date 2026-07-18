import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';

const Navbar = () => {

  const [showMenu, setShowMenu]= useState<boolean>(false)

  function setterMenu() {
    setShowMenu(!showMenu)
  }


  return (
    <>
    {showMenu ? <X onClick={setterMenu}/> : <Menu className={styles.menu_burguer} onClick={setterMenu}/>}
    
    <nav className={showMenu ? styles.menu_on : styles.menu_off}>
      <ul className={styles.ul_links}>
        <li>
          <Link className={styles.links}  to='/home'>Home</Link>
        </li>
        <li>
          <Link className={styles.links}  to='/about'>About</Link>
        </li>
        <li>
          <Link className={styles.links}  to='/register'>Registrar</Link>
        </li>
        <li>
          <Link className={styles.links}  to='/login'>Entrar</Link>
        </li>        
      </ul>
    </nav>
    </>
  )
}

export default Navbar
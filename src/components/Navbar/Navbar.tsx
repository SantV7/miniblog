import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthValue } from '../../context/AuthContext';

const Navbar = () => {

  const [showMenu, setShowMenu]= useState<boolean>(false);

  function setterMenu() {
    setShowMenu(!showMenu)
  };

  const { user } = useAuthValue();


  return (
    <>
    {showMenu ? <X className={styles.menu_burguer} onClick={setterMenu}/> : <Menu className={styles.menu_burguer} onClick={setterMenu}/>}
    
    <nav className={showMenu ? styles.menu_on : styles.menu_off}>
      <ul className={styles.ul_links}>
        <li>
          <Link className={styles.links}  to='/home'>Home</Link>
        </li>
        <li>
          <Link className={styles.links}  to='/about'>About</Link>
        </li>

        {user && (
          <>
           <li>
            <Link className={styles.links}  to='/posts/create'>Postar</Link>
           </li>
           <li>
            <Link className={styles.links}  to='/dashboard'>Dashboard</Link>
           </li>        
          </>
        )}

        {!user && (
          <>
        <li>
          <Link className={`${styles.links} ${styles.link_login}`}  to='/login'>Entrar</Link>
        </li>
        <li>
          <Link className={`${styles.links} ${styles.link_register}`}  to='/register'>Cadastrar-se</Link>
        </li>        
          </>
        )}
      </ul>
    </nav>
    </>
  )
}

export default Navbar
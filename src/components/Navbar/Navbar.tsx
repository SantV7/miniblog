import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'


const Navbar = () => {


  return (
    <>
    <nav>
      <ul className={styles.ul_links}>
        <li>
          <Link className={styles.links}  to='/home'>Home</Link>
        </li>
        <li>
          <Link className={styles.links}  to='/about'>About</Link>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default Navbar
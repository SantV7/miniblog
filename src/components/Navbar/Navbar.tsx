import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <>
    <nav>
      <ul className={styles.ul_links}>
        <Link className={styles.links} to='/home'>Home</Link>
        <Link className={styles.links} to='/about'>About</Link>
      </ul>
    </nav>
    </>
  )
}

export default Navbar
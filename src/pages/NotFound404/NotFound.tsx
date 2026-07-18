import style from './NotFound.module.css'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <>
     <div className={style.not_found}>
        <div className={style.content}>
            <h1>404</h1>
            <h2>Page not found</h2>

            <Link className={style.home}  to='/home'>Back to Home</Link>
        </div>
     </div>
    </>
  )
}

export default NotFound
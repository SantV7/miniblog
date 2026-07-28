import { Link } from 'react-router-dom'
import styles from './About.module.css'

const About = () => {

  return (
    <>
    <div className={styles.about}>
      <h1>Projeto para aplicar muitas coisas em React e Typescript</h1>
      <p>Projeto desenvolvido com React, Typescript & Firebase, usando validações e tratamentos.</p>
       <Link className={styles.posts_btn} to='/posts/create'>Criar postagem</Link>
    </div>
    </>
  )
}

export default About
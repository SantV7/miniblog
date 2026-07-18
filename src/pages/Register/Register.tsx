import { useState } from 'react'
import styles from './Register.module.css'

const Register = () => {

  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')


  return (
    <>
     <div>Register</div>

     <form>
      <label>
        <span>Nome</span>
        <input 
         minLength={3}
         type="text"
         name='name'
         required
         placeholder='nome de usuário'
         value={userName}
         onChange={(e) => setUserName(e.target.value)}
        />
      </label>


      <label>
        <span>Email</span>
        <input 
         type="email"
         name='email'
         required
         placeholder='exemple@gmail.com'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
      </label>      
     </form>
    </>
  )
}

export default Register
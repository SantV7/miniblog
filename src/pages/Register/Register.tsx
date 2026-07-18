import { useState, type FormEvent } from 'react'
import styles from './Register.module.css'
import type { UserData } from '../../types/user.type'
const Register = () => {

  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if(userName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') return;

    const newUser: UserData = {
      userName,
      email, 
      password,
      confirmPassword
    }



    setUserName('')
    setEmail('')
    setPassword('')
    }


  return (
    <>
     <h1>Cadastre no YourBlog para uma experiência melhor</h1>
     <p>Crie seu usuário e compartilhe seus momentos.</p>

     <form onSubmit={handleSubmit}>
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

      <label>
        <span>Senha</span>
        <input 
         type="password"
         name='passowrd'
         minLength={8}
         maxLength={14}
         required
         placeholder='Senha do usuário'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
      </label>         

      <label>
        <span>Confirme a senha</span>
        <input 
         type="password"
         name='confirmpassowrd'
         minLength={8}
         maxLength={14}
         required
         placeholder='Confirme a senha'
         value={password}
         onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>

      <div id='btn_log'>
        <button type='submit'>Cadastrar-se</button>  
      </div>         
     </form>
    </>
  )
}

export default Register
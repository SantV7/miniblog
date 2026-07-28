import { useState, useEffect, type FormEvent  } from 'react'
import styles from './Login.module.css'
import useAutentication from '../../hooks/useAutentication'
import type { LoginUser } from '../../types/login.type'

const Login = () => {

    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorWarning, setErrorWarning] = useState<string>()
    const {authError, loading, createUser} = useAutentication()


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if( userName.trim() === '' || email.trim() === '' || password.trim() === '')
     return setErrorWarning('É necessário concluir todos os campos');

    if(userName.length < 3  || userName.length > 50) 
     return setErrorWarning("O Nome de usuário deve conter no minimo 3 caracteres ");

    if(password.length < 8 || password.length > 13)
     return setErrorWarning("A senha deve conter entre 8 a 13 caracteres");

 
    const newUser: LoginUser = {
      userName,
      email,
      password
    }

    const res = await createUser(newUser);

    console.log(res);

    setErrorWarning('');
    setUserName('');
    setEmail('');
    setPassword('');
  }

    useEffect(() => {
      if(authError) setErrorWarning(authError)
    }, [authError])
  


  return (
    <>
       <header className={styles.headerText}>
        <h1>Entre em YourMoments</h1>
        <p>Faça o login para uma experiência completa.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <span>Nome</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Nome de usuário"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Senha do usuário"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </label>


        <div id="btn_log" className={styles.btnContainer}>
          {loading ? <button disabled className={styles.button_disabled}>Carregando...</button> : <button type="submit" className={styles.button}>Entrar</button>}
          
          {errorWarning && <p className={styles.warning_alert}>{errorWarning}</p>}
        </div>
      </form>
    </>
  )
}

export default Login
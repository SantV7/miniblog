import { useEffect, useState, type FormEvent } from 'react'
import styles from './Register.module.css'
import type { UserData } from '../../types/user.type'
import useAutentication from '../../hooks/useAutentication'


const Register = () => {
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [errorWarning, setErrorWarning] = useState<string>()

  const {authError, loading, auth, createUser} = useAutentication()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(userName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') return setErrorWarning('É necessário concluir todos os campos');

    if(userName.length < 3  || userName.length > 50) return setErrorWarning("O Nome de usuário deve conter no minimo 3 caracteres ");

    if(password.length < 8 || password.length > 13) return setErrorWarning("A senha deve conter entre 8 a 13 caracteres");

    if(password !== confirmPassword) return setErrorWarning('As duas senhas devem ser iguais');
 
    const newUser: UserData = {
      userName,
      email,
      password,
      confirmPassword
    }

    const res = await createUser(newUser);

    console.log(res);

    setErrorWarning('');
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  useEffect(() => {
    if(authError) setErrorWarning(authError)
  }, [authError])




  return (
    <div className={styles.container}>
      <header className={styles.headerText}>
        <h1>Cadastre no YourMoments para uma experiência melhor</h1>
        <p>Crie seu usuário e compartilhe seus momentos.</p>
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

        <label className={styles.label}>
          <span>Confirme a senha</span>
          <input
            type="password"
            name="confirmpassword"
            required
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </label>

        <div id="btn_log" className={styles.btnContainer}>
          <button type="submit" className={styles.button}>Cadastrar-se</button>
          {errorWarning && <p className={styles.warning_alert}>{errorWarning}</p>}
        </div>
      </form>
    </div>
  )
}

export default Register
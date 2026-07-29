import { useState, type FormEvent } from 'react'
import styles from './CreatePost.module.css'
import { useAuthValue } from '../../context/AuthContext'

const CreatePost = () => {

  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [errorWarning, setErrorWarning] = useState<string | null>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)


  function handleSubmit(e: FormEvent) {
    e.preventDefault()


    try {
      setIsLoading(true);
      setErrorWarning(null);
    } catch (err) {
      if(err instanceof Error) {
        setErrorWarning(err.message)
      }
    }
  }
  
  return (
    <>
    <h2>Crie seu Post</h2>
    <p>Fale sobre e compartilhe com a gente seu Post </p>

    <form onSubmit={handleSubmit}></form>
    <label>
      <span>Titulo</span>
      <input 
        type="text" 
        name='title' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required/>
    </label>

    <label>
      <span>Imagem</span>
      <input 
        type="text" 
        placeholder='Selecione sua'
        name='image' 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
        required/>
    </label>

    <label>
      <span>Descrição</span>
      <textarea
        placeholder='Conteúdo do Post' 
        name='description' 
        value={body} 
        onChange={(e) => setBody(e.target.value)} 
        required
      >
      </textarea>
    </label>

    <label>
      <span>Add Tags</span>
      <input 
        type="text" 
        name='tags' 
        value={tags} 
        onChange={(e) => setTags([e.target.value])} 
        required/>
    </label>

    {isLoading ? <button disabled className={styles.button_disabled}>Carregando...</button> 
    : <button type="submit" className={styles.button}>Cadastrar-se</button>}
          
    {errorWarning && <p className={styles.warning_alert}>{errorWarning}</p>}


    
    </>
  )
}

export default CreatePost
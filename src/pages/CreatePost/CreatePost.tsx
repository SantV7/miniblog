import { useState, type FormEvent } from 'react'
import styles from './CreatePost.module.css'
import { useAuthValue } from '../../context/AuthContext'
import useInsertDocument from '../../hooks/useInsertDocument'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [tagsInput, setTagsInput] = useState<string>('')
  const [errorWarning, setErrorWarning] = useState<string | null>(null)

  const { user } = useAuthValue() || {}
  const { insertDocument, response } = useInsertDocument("posts")
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorWarning(null)

    try {
      new URL(image)
    } catch {
      setErrorWarning('Por favor, insira uma URL válida para a imagem.')
      return
    }

    const tagsArray = tagsInput
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0)

    if (tagsArray.length === 0) {
      setErrorWarning('Insira pelo menos uma tag.')
      return
    }

    const postData = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user?.uid,
      createdBy: user?.displayName,
    }

    await insertDocument(postData)

    if (!response.error) {
      setTitle('')
      setImage('')
      setBody('')
      setTagsInput('')
      navigate('/home')
    }
  }

  return (
    <div className={styles.create_post}>
      <h2>Crie seu Post</h2>
      <p>Fale sobre e compartilhe com a gente o seu conteúdo</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Pense num bom título..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>URL da Imagem:</span>
          <input
            type="text"
            name="image"
            placeholder="https://exemplo.com/imagem.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Insira o conteúdo do seu post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira as tags separadas por vírgula (ex: react, css)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            required
          />
        </label>

        {response.loading ? (
          <button disabled className={styles.button_disabled}>
            Carregando...
          </button>
        ) : (
          <button type="submit" className={styles.button}>
            Criar Post
          </button>
        )}

        {(errorWarning || response.error) && (
          <p className={styles.warning_alert}>{errorWarning || response.error}</p>
        )}
      </form>
    </div>
  )
}

export default CreatePost
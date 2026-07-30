import { useState } from 'react'
import styles from './Home.module.css'

const Home = () => {

  const [searchPosts, setSearchPosts] = useState<string>('')
  return (
        <>
          <div>
            <h1>Posts recentes</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" />
              
            </form>
          </div>
        </>
  )
}

export default Home